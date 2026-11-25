export interface AndroidRelease {
  readonly version: string;
  readonly versionCode: number;
  readonly publishedAt: string;
  readonly releaseUrl: string;
  readonly apkUrl: string;
  readonly apkSizeBytes: number;
  readonly sha256: string;
  readonly signingCertificateSha256: string;
  readonly minimumAndroidApi: number;
  readonly architectures: readonly string[];
}

export type ReleaseState =
  | {
      readonly status: 'available';
      readonly syncedAt: string;
      readonly release: AndroidRelease;
    }
  | {
      readonly status: 'pending';
      readonly syncedAt: string;
      readonly reason: string;
    };
