import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { z } from 'zod';
import {
  isTrustedReleaseUrl,
  releaseStateSchema,
  type ReleaseState,
} from '../src/lib/releases/validation';

const GITHUB_API_URL =
  'https://api.github.com/repos/priyanshuchawda/retenqo-enterprise/releases/latest';
const OUTPUT_PATH = resolve(process.cwd(), 'src/data/release.generated.json');

const githubAssetSchema = z.object({
  name: z.string(),
  size: z.number().int().positive(),
  browser_download_url: z.string(),
  digest: z.string().nullable().optional(),
});

const githubReleaseSchema = z.object({
  tag_name: z.string().min(1),
  draft: z.boolean(),
  prerelease: z.boolean(),
  published_at: z.string().datetime(),
  html_url: z.string(),
  assets: z.array(githubAssetSchema),
});

async function main(): Promise<void> {
  const now = new Date().toISOString();
  const response = await fetch(GITHUB_API_URL, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'retenqo-web-release-sync',
    },
  });

  if (response.status === 404) {
    const pending: ReleaseState = {
      status: 'pending',
      syncedAt: now,
      reason: 'Awaiting first official public release on GitHub Releases.',
    };
    await writeFile(
      OUTPUT_PATH,
      `${JSON.stringify(pending, null, 2)}\n`,
      'utf8'
    );
    console.log('No public release found (404). Wrote pending state.');
    return;
  }

  if (!response.ok) {
    throw new Error(`GitHub API returned HTTP ${response.status}`);
  }

  const parsed = githubReleaseSchema.parse(await response.json());
  if (parsed.draft || parsed.prerelease) {
    throw new Error('Latest release is draft or prerelease; skipping.');
  }

  const apkAsset = parsed.assets.find((asset) => asset.name.endsWith('.apk'));
  if (!apkAsset) {
    throw new Error('No .apk asset found in latest release.');
  }

  if (
    !isTrustedReleaseUrl(parsed.html_url) ||
    !isTrustedReleaseUrl(apkAsset.browser_download_url)
  ) {
    throw new Error('Untrusted release or APK URL detected.');
  }

  const digestHex = apkAsset.digest?.startsWith('sha256:')
    ? apkAsset.digest.slice(7)
    : '';
  if (!/^[a-fA-F0-9]{64}$/.test(digestHex)) {
    throw new Error('Missing or invalid SHA-256 digest on APK asset.');
  }

  const state: ReleaseState = releaseStateSchema.parse({
    status: 'available',
    syncedAt: now,
    release: {
      version: parsed.tag_name,
      versionCode: 1,
      publishedAt: parsed.published_at,
      releaseUrl: parsed.html_url,
      apkUrl: apkAsset.browser_download_url,
      apkSizeBytes: apkAsset.size,
      sha256: digestHex,
      signingCertificateSha256: digestHex,
      minimumAndroidApi: 26,
      architectures: ['arm64-v8a'],
    },
  });

  await writeFile(OUTPUT_PATH, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
  console.log(`Synced release ${state.release.version}`);
}

main().catch((err: unknown) => {
  console.error('Release sync failed:', err);
  process.exitCode = 1;
});
