export interface FaqItem {
  readonly id: string;
  readonly category:
    | 'General'
    | 'Installation & Updates'
    | 'Privacy & Security'
    | 'AI & Features'
    | 'Troubleshooting';
  readonly question: string;
  readonly answer: string;
}

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'what-is-retenqo',
    category: 'General',
    question: 'What is Retenqo?',
    answer:
      'Retenqo is a private, on-device AI personal memory assistant for Android. It helps you capture important information from notifications, screenshots, voice notes, and text, and retrieve it later using natural language.',
  },
  {
    id: 'is-retenqo-free',
    category: 'General',
    question: 'Is Retenqo free and do I need an account?',
    answer:
      'Retenqo is free to use and does not require creating an account. Your memories stay on your device under your control.',
  },
  {
    id: 'does-it-work-offline',
    category: 'General',
    question: 'Does Retenqo work offline?',
    answer:
      'Yes. Core memory capture, storage, search, and local AI inference work offline once the on-device model is available. Internet access is only needed if you explicitly download a model or check for app updates.',
  },
  {
    id: 'ios-availability',
    category: 'General',
    question: 'Is Retenqo available for iOS?',
    answer: 'Retenqo is currently built exclusively for Android.',
  },
  {
    id: 'how-to-download',
    category: 'Installation & Updates',
    question: 'How do I download and install Retenqo safely?',
    answer:
      'Download the official APK from our Download page, which links directly to verified GitHub Releases. You can verify the SHA-256 checksum before installing. See the Installation Guide for step-by-step instructions.',
  },
  {
    id: 'android-warning',
    category: 'Installation & Updates',
    question: 'Why does Android display an installation warning for APKs?',
    answer:
      'Android warns users whenever an app is installed outside the Google Play Store. Grant temporary install permission only to your trusted browser or file manager, complete installation, and revoke it afterward. Never disable Google Play Protect.',
  },
  {
    id: 'will-updating-delete',
    category: 'Installation & Updates',
    question: 'Will updating Retenqo delete my memories?',
    answer:
      'No. Installing a newer signed release over the existing app preserves your local memory database. We still recommend exporting an encrypted backup before major updates.',
  },
  {
    id: 'where-data-stored',
    category: 'Privacy & Security',
    question: 'Where is my personal data stored?',
    answer:
      'Your captured memories, commitments, and embeddings are stored locally on your Android device. Retenqo does not upload your personal memories to a cloud AI provider.',
  },
  {
    id: 'passwords-otps',
    category: 'Privacy & Security',
    question: 'Can Retenqo access my passwords, OTPs, or banking apps?',
    answer:
      'Notification capture is strictly opt-in and user-controlled. You choose which apps are allowed, and you can pause capture or exclude sensitive apps at any time.',
  },
  {
    id: 'encrypted-backups',
    category: 'Privacy & Security',
    question: 'Are my backups encrypted?',
    answer:
      'Yes. Retenqo supports encrypted backup export and import so you can safely back up or migrate your memory archive.',
  },
  {
    id: 'report-vulnerability',
    category: 'Privacy & Security',
    question: 'How do I report a security vulnerability?',
    answer:
      'Please report security vulnerabilities privately via the contact details on our Security page or in SECURITY.md. Do not open public issues for unpatched vulnerabilities.',
  },
  {
    id: 'source-backed-answers',
    category: 'AI & Features',
    question: 'How are AI answers connected to my saved memories?',
    answer:
      'Retenqo uses retrieval-augmented generation locally on your device. Every answer links back to the specific saved memory or commitment it was derived from so you can verify accuracy.',
  },
  {
    id: 'ai-mistakes',
    category: 'AI & Features',
    question: 'Can Retenqo answer questions incorrectly?',
    answer:
      'Like any AI system, on-device models can occasionally misinterpret ambiguous context. Always check the linked source memory for critical commitments or dates.',
  },
  {
    id: 'notification-not-working',
    category: 'Troubleshooting',
    question: 'Why is notification capture not working?',
    answer:
      'Ensure Notification Access is enabled for Retenqo in Android Settings, capture is not paused, and battery optimization is not aggressively killing the background service.',
  },
  {
    id: 'slow-inference',
    category: 'Troubleshooting',
    question: 'Why is local AI inference slow on my device?',
    answer:
      'On-device LLM speed depends on your device RAM, CPU/NPU, and thermal state. Closing heavy background apps or using a smaller quantized model improves responsiveness.',
  },
];

export const FAQ_CATEGORIES = [
  'General',
  'Installation & Updates',
  'Privacy & Security',
  'AI & Features',
  'Troubleshooting',
] as const;
