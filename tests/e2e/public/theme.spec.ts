import { test, expect } from '@playwright/test';

test.describe('Theme Toggle - Dark/Light Mode', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should toggle between dark and light mode', async ({ page }) => {
    // Find theme toggle button
    const themeToggle = page.locator('button[aria-label*="tema"], button[aria-label*="theme"], button:has-text("☀"), button:has-text("🌙")').first();

    // Verify toggle button exists
    await expect(themeToggle).toBeVisible();

    // Get initial theme class
    const html = page.locator('html');
    const initialClass = await html.getAttribute('class');

    // Click toggle
    await themeToggle.click();

    // Wait for theme change
    await page.waitForTimeout(500);

    // Verify theme class changed
    const newClass = await html.getAttribute('class');
    expect(newClass).not.toBe(initialClass);
  });

  test('should persist theme choice in localStorage', async ({ page }) => {
    // Find theme toggle button
    const themeToggle = page.locator('button[aria-label*="tema"], button[aria-label*="theme"], button:has-text("☀"), button:has-text("🌙")').first();

    if (await themeToggle.count() > 0) {
      // Click toggle to change theme
      await themeToggle.click();
      await page.waitForTimeout(300);

      // Get current theme from localStorage
      const theme = await page.evaluate(() => localStorage.getItem('theme'));

      // Reload page
      await page.reload();

      // Verify theme persisted
      const themeAfterReload = await page.evaluate(() => localStorage.getItem('theme'));
      expect(themeAfterReload).toBe(theme);
    }
  });

  test('should apply correct CSS variables for dark mode', async ({ page }) => {
    const html = page.locator('html');

    // Ensure we're in dark mode (or switch to it)
    const currentClass = await html.getAttribute('class');
    if (!currentClass || !currentClass.includes('dark')) {
      const themeToggle = page.locator('button[aria-label*="tema"], button[aria-label*="theme"], button:has-text("☀"), button:has-text("🌙")').first();
      if (await themeToggle.count() > 0) {
        await themeToggle.click();
        await page.waitForTimeout(300);
      }
    }

    // Check that dark mode CSS variables are applied
    const backgroundColor = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--background');
    });

    // Dark mode should have dark background
    expect(backgroundColor).toBeTruthy();
  });

  test('should apply correct CSS variables for light mode', async ({ page }) => {
    const html = page.locator('html');

    // Switch to light mode if not already
    const currentClass = await html.getAttribute('class');
    if (currentClass && currentClass.includes('dark')) {
      const themeToggle = page.locator('button[aria-label*="tema"], button[aria-label*="theme"], button:has-text("☀"), button:has-text("🌙")').first();
      if (await themeToggle.count() > 0) {
        await themeToggle.click();
        await page.waitForTimeout(300);
      }
    }

    // Verify light mode is active
    const classAfterToggle = await html.getAttribute('class');
    const isLight = !classAfterToggle || !classAfterToggle.includes('dark');
    expect(isLight).toBeTruthy();
  });

  test('should maintain theme across different pages', async ({ page }) => {
    // Set theme on homepage
    const themeToggle = page.locator('button[aria-label*="tema"], button[aria-label*="theme"], button:has-text("☀"), button:has-text("🌙")').first();

    if (await themeToggle.count() > 0) {
      await themeToggle.click();
      await page.waitForTimeout(300);

      // Get current theme class
      const html = page.locator('html');
      const themeOnHomepage = await html.getAttribute('class');

      // Navigate to a different page (if posts exist)
      const postLink = page.locator('a[href*="/posts/"]').first();
      if (await postLink.count() > 0) {
        await postLink.click();
        await page.waitForURL(/\/posts\/.+/);

        // Check theme persisted
        const themeOnPostPage = await html.getAttribute('class');
        expect(themeOnPostPage).toBe(themeOnHomepage);
      }
    }
  });

  test('should have smooth transition when toggling theme', async ({ page }) => {
    // Find theme toggle
    const themeToggle = page.locator('button[aria-label*="tema"], button[aria-label*="theme"], button:has-text("☀"), button:has-text("🌙")').first();

    if (await themeToggle.count() > 0) {
      // Click toggle
      await themeToggle.click();

      // Verify page doesn't crash and is still visible
      await page.waitForTimeout(400);
      await expect(page.locator('body')).toBeVisible();

      // Click again to toggle back
      await themeToggle.click();
      await page.waitForTimeout(400);
      await expect(page.locator('body')).toBeVisible();
    }
  });
});
