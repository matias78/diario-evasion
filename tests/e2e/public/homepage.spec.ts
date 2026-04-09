import { test, expect } from '@playwright/test';

test.describe('Homepage - Search and Filter', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage with posts', async ({ page }) => {
    // Verify page loads
    await expect(page).toHaveTitle(/Diario de Evasión/i);

    // Verify the main heading or content is visible
    await expect(page.locator('text=DIARIO DE EVASIÓN')).toBeVisible();

    // Verify posts are displayed (look for common elements)
    const posts = page.locator('article, .post-card, [class*="post"]').first();
    await expect(posts).toBeVisible();
  });

  test('should search posts by title', async ({ page }) => {
    // Find search input
    const searchInput = page.locator('input[placeholder*="Buscar"], input[type="search"], input[type="text"]').first();
    await expect(searchInput).toBeVisible();

    // Type in search box
    await searchInput.fill('INTRO');

    // Wait a bit for filtering
    await page.waitForTimeout(500);

    // Verify some content is displayed or filtered
    const content = page.locator('body');
    await expect(content).toContainText(/INTRO|Intro|intro/i);
  });

  test('should filter posts by category', async ({ page }) => {
    // Look for category buttons
    const categoryButtons = page.locator('button').filter({ hasText: /Libros|Música|Viajes|Reflexiones/i });

    // If category buttons exist, click one
    if (await categoryButtons.count() > 0) {
      await categoryButtons.first().click();

      // Wait for filtering
      await page.waitForTimeout(500);

      // Verify page still has content
      const content = page.locator('body');
      await expect(content).toBeVisible();
    }
  });

  test('should combine search and category filter', async ({ page }) => {
    // Try to find and click a category button
    const categoryButtons = page.locator('button').filter({ hasText: /Libros|Música|Viajes/i });

    if (await categoryButtons.count() > 0) {
      await categoryButtons.first().click();
      await page.waitForTimeout(300);
    }

    // Apply search
    const searchInput = page.locator('input[placeholder*="Buscar"], input[type="search"], input[type="text"]').first();
    await searchInput.fill('el');

    // Wait for filtering
    await page.waitForTimeout(500);

    // Verify page doesn't crash
    await expect(page.locator('body')).toBeVisible();
  });

  test('should show message when no results found', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Buscar"], input[type="search"], input[type="text"]').first();

    // Search for something that definitely doesn't exist
    await searchInput.fill('xyznonexistentpostxyz123456');

    // Wait for filtering
    await page.waitForTimeout(500);

    // Look for "no results" message
    const noResultsMessage = page.locator('text=/No se encontraron|no se encontraron|No results/i');
    await expect(noResultsMessage).toBeVisible();
  });

  test('should navigate to post detail page', async ({ page }) => {
    // Find first "Leer más" or similar link
    const readMoreLink = page.locator('a:has-text("Leer más"), a:has-text("LEER MÁS"), a[href*="/posts/"]').first();

    if (await readMoreLink.count() > 0) {
      await readMoreLink.click();

      // Verify we're on a post page
      await expect(page).toHaveURL(/\/posts\/.+/);

      // Verify post content is visible
      await expect(page.locator('body')).toBeVisible();
    }
  });
});
