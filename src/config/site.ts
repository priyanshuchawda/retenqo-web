export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export const SITE_CONFIG = {
  name: 'Retenqo',
  tagline: 'Remember what matters. Privately.',
  description:
    'Retenqo is a private, on-device AI personal memory assistant for Android. Capture important information, track commitments, and retrieve memories offline.',
  url: 'https://retenqo.pages.dev',
  appRepoUrl: 'https://github.com/priyanshuchawda/retenqo-enterprise',
  appReleasesUrl: 'https://github.com/priyanshuchawda/retenqo-enterprise/releases',
  webRepoUrl: 'https://github.com/priyanshuchawda/retenqo-web',
  contactEmail: 'priyanshuchawda20@gmail.com',
  nav: [
    { label: 'Features', href: '/features' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Security', href: '/security' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Download', href: '/download' },
  ] as readonly NavItem[],
} as const;
