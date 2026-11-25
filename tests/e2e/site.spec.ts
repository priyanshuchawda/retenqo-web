import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = [
  '/',
  '/features',
  '/how-it-works',
  '/download',
  '/faq',
  '/privacy',
  '/security',
];

for (const route of ROUTES) {
  test(`route ${route} renders with zero axe-core violations and no console errors`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    const response = await page.goto(route);
    expect(response?.status()).toBe(200);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('404 page renders gracefully', async ({ page }) => {
  const response = await page.goto('/non-existent-route-12345');
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { name: 'Page not found' })
  ).toBeVisible();
});
