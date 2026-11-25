# Retenqo Website (`retenqo-web`)

Official static website and verified Android APK distribution platform for **Retenqo** — a private, on-device AI personal memory assistant for Android.

## Architecture

- **Framework**: Astro (Static Site Generation)
- **Language**: TypeScript (`strictest` mode)
- **Styling**: Tailwind CSS v4 + CSS design tokens (light/dark mode, `prefers-reduced-motion`)
- **Validation**: Zod + `fast-check` property-based tests for GitHub Release URLs and metadata
- **Testing**: Vitest (unit) + Playwright + `@axe-core/playwright` (E2E & WCAG 2.2 AA accessibility)
- **Security**: Zero backend, zero tracking cookies, Cloudflare Pages `_headers`, `/.well-known/security.txt`, strict GitHub Releases URL allowlisting

## Local Development

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Verification

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
