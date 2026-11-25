import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import {
  formatBytes,
  isTrustedReleaseUrl,
  parseReleaseState,
} from '../../src/lib/releases/validation';

describe('isTrustedReleaseUrl', () => {
  it('accepts official github.com release URLs for priyanshuchawda/retenqo-enterprise', () => {
    expect(
      isTrustedReleaseUrl(
        'https://github.com/priyanshuchawda/retenqo-enterprise/releases/tag/v1.0.0'
      )
    ).toBe(true);
    expect(
      isTrustedReleaseUrl(
        'https://github.com/priyanshuchawda/retenqo-enterprise/releases/download/v1.0.0/Retenqo.apk'
      )
    ).toBe(true);
  });

  it('rejects non-HTTPS, wrong host, wrong repo, query params, and path traversal', () => {
    expect(
      isTrustedReleaseUrl(
        'http://github.com/priyanshuchawda/retenqo-enterprise/releases/tag/v1.0.0'
      )
    ).toBe(false);
    expect(
      isTrustedReleaseUrl(
        'https://evil.com/priyanshuchawda/retenqo-enterprise/releases/tag/v1.0.0'
      )
    ).toBe(false);
    expect(
      isTrustedReleaseUrl(
        'https://github.com/other/retenqo-enterprise/releases/tag/v1.0.0'
      )
    ).toBe(false);
    expect(
      isTrustedReleaseUrl(
        'https://github.com/priyanshuchawda/retenqo-enterprise/releases/tag/v1.0.0?x=1'
      )
    ).toBe(false);
    expect(
      isTrustedReleaseUrl(
        'https://github.com/priyanshuchawda/retenqo-enterprise/releases/../evil'
      )
    ).toBe(false);
  });

  it('never accepts arbitrary non-github URLs (property-based)', () => {
    fc.assert(
      fc.property(fc.webUrl(), (url) => {
        if (
          !url.startsWith(
            'https://github.com/priyanshuchawda/retenqo-enterprise/releases/'
          )
        ) {
          expect(isTrustedReleaseUrl(url)).toBe(false);
        }
      })
    );
  });
});

describe('parseReleaseState', () => {
  it('parses a valid pending release state', () => {
    const parsed = parseReleaseState({
      status: 'pending',
      syncedAt: '2026-11-25T08:00:00.000Z',
      reason: 'Awaiting first release.',
    });
    expect(parsed.status).toBe('pending');
  });

  it('rejects an available release with an untrusted apkUrl or invalid sha256', () => {
    expect(() =>
      parseReleaseState({
        status: 'available',
        syncedAt: '2026-11-25T08:00:00.000Z',
        release: {
          version: 'v1.0.0',
          versionCode: 1,
          publishedAt: '2026-11-25T08:00:00.000Z',
          releaseUrl:
            'https://github.com/priyanshuchawda/retenqo-enterprise/releases/tag/v1.0.0',
          apkUrl: 'https://evil.com/Retenqo.apk',
          apkSizeBytes: 1024,
          sha256: 'a'.repeat(64),
          signingCertificateSha256: 'b'.repeat(64),
          minimumAndroidApi: 26,
          architectures: ['arm64-v8a'],
        },
      })
    ).toThrow();
  });
});

describe('formatBytes', () => {
  it('formats byte sizes cleanly', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(1024)).toBe('1.0 KB');
    expect(formatBytes(1024 * 1024 * 25)).toBe('25.0 MB');
  });
});
