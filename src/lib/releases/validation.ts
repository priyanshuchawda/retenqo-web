import { z } from 'zod';
import type { AndroidRelease, ReleaseState } from '../../types/release';

const TRUSTED_OWNER = 'priyanshuchawda';
const TRUSTED_REPO = 'retenqo-enterprise';
const TRUSTED_PREFIX = `/${TRUSTED_OWNER}/${TRUSTED_REPO}/releases/`;

export function isTrustedReleaseUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:') return false;
    if (parsed.hostname !== 'github.com') return false;
    if (parsed.username !== '' || parsed.password !== '') return false;
    if (parsed.search !== '' || parsed.hash !== '') return false;
    if (
      parsed.pathname.includes('..') ||
      parsed.pathname.includes('%2e') ||
      parsed.pathname.includes('%2E')
    ) {
      return false;
    }
    return parsed.pathname.startsWith(TRUSTED_PREFIX);
  } catch {
    return false;
  }
}

export const sha256Schema = z
  .string()
  .regex(/^[a-fA-F0-9]{64}$/, 'Invalid SHA-256 hex digest');

export const androidReleaseSchema = z.object({
  version: z.string().min(1).max(32),
  versionCode: z.number().int().positive(),
  publishedAt: z.string().datetime(),
  releaseUrl: z.string().refine(isTrustedReleaseUrl, 'Untrusted release URL'),
  apkUrl: z.string().refine(isTrustedReleaseUrl, 'Untrusted APK URL'),
  apkSizeBytes: z.number().int().positive(),
  sha256: sha256Schema,
  signingCertificateSha256: sha256Schema,
  minimumAndroidApi: z.number().int().min(21),
  architectures: z.array(z.string().min(1)).min(1),
});

export const releaseStateSchema = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('available'),
    syncedAt: z.string().datetime(),
    release: androidReleaseSchema,
  }),
  z.object({
    status: z.literal('pending'),
    syncedAt: z.string().datetime(),
    reason: z.string().min(1),
  }),
]);

export function parseReleaseState(input: unknown): ReleaseState {
  return releaseStateSchema.parse(input);
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'] as const;
  const idx = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const value = bytes / 1024 ** idx;
  return `${value.toFixed(idx === 0 ? 0 : 1)} ${units[idx]}`;
}

export type { AndroidRelease, ReleaseState };
