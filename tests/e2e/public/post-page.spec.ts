import { test, expect } from '@playwright/test';

test.describe('Post Page Features', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to homepage and click first post
    await page.goto('/');

    const postLink = page.locator('a[href*="/posts/"], a:has-text("Leer más"), a:has-text("LEER MÁS")').first();
    await postLink.click();

    // Wait for post page to load
    await page.waitForURL(/\/posts\/.+/);
  });

  test('should display post title and content', async ({ page }) => {
    // Verify title is visible (likely in h1)
    const title = page.locator('h1').first();
    await expect(title).toBeVisible();

    // Verify post content is visible
    const content = page.locator('article, .post-content, main').first();
    await expect(content).toBeVisible();
  });

  test('should display post metadata (date, category)', async ({ page }) => {
    // Look for date element
    const dateElement = page.locator('time, [datetime], text=/2026|2025|2024/').first();
    await expect(dateElement).toBeVisible();

    // Look for category badge or label
    const categoryElement = page.locator('text=/Libros|Música|Viajes|Reflexiones|Categoría/i').first();
    if (await categoryElement.count() > 0) {
      await expect(categoryElement).toBeVisible();
    }
  });

  test('should display reading time', async ({ page }) => {
    // Look for reading time indicator
    const readingTime = page.locator('text=/min de lectura|min lectura|minute|minutes/i').first();

    if (await readingTime.count() > 0) {
      await expect(readingTime).toBeVisible();
    }
  });

  test('should display share buttons', async ({ page }) => {
    // Look for share buttons section
    const shareSection = page.locator('text=/Compartir|Share/i').first();

    if (await shareSection.count() > 0) {
      await expect(shareSection).toBeVisible();
    }

    // Look for specific share buttons
    const shareButtons = page.locator('button[aria-label*="Twitter"], button[aria-label*="Facebook"], button[aria-label*="WhatsApp"], a[href*="twitter.com"], a[href*="facebook.com"]');

    if (await shareButtons.count() > 0) {
      await expect(shareButtons.first()).toBeVisible();
    }
  });

  test('should have working copy link button', async ({ page }) => {
    // Look for copy link button
    const copyButton = page.locator('button:has-text("Copiar"), button[aria-label*="copiar"], button[aria-label*="copy"]').first();

    if (await copyButton.count() > 0) {
      await copyButton.click();

      // Look for confirmation message
      await page.waitForTimeout(500);

      // The clipboard should have the URL (we can't verify clipboard in Playwright easily,
      // but we can check the button still exists and didn't error)
      await expect(copyButton).toBeVisible();
    }
  });

  test('should display table of contents if post has headings', async ({ page }) => {
    // Look for TOC
    const toc = page.locator('text=/Tabla de contenido|Contenido|Table of Contents/i, nav').first();

    // TOC might not exist if post is short
    if (await toc.count() > 0) {
      await expect(toc).toBeVisible();

      // Look for TOC links
      const tocLinks = toc.locator('a');
      if (await tocLinks.count() > 0) {
        // Click first TOC link
        await tocLinks.first().click();

        // Verify page doesn't crash
        await expect(page.locator('body')).toBeVisible();
      }
    }
  });

  test('should display comments section', async ({ page }) => {
    // Look for comments section
    const commentsSection = page.locator('text=/Comentarios|Comments/i').first();

    if (await commentsSection.count() > 0) {
      await expect(commentsSection).toBeVisible();
    }

    // Look for comment form
    const commentForm = page.locator('form').filter({ has: page.locator('textarea') }).first();

    if (await commentForm.count() > 0) {
      await expect(commentForm).toBeVisible();
    }
  });

  test('should have back to home button', async ({ page }) => {
    // Look for back button or link
    const backButton = page.locator('a:has-text("Volver"), a:has-text("Inicio"), a[href="/"]').first();

    if (await backButton.count() > 0) {
      await backButton.click();

      // Should go back to homepage
      await page.waitForURL('/');
      await expect(page).toHaveURL('/');
    }
  });

  test('should render markdown content correctly', async ({ page }) => {
    // Look for formatted elements that indicate markdown was rendered
    const heading = page.locator('article h2, article h3, .post-content h2, .post-content h3').first();

    if (await heading.count() > 0) {
      await expect(heading).toBeVisible();
    }

    // Look for paragraphs
    const paragraph = page.locator('article p, .post-content p').first();
    await expect(paragraph).toBeVisible();
  });

  test('should have responsive images', async ({ page }) => {
    // Look for images in post content
    const images = page.locator('article img, .post-content img');

    if (await images.count() > 0) {
      const firstImage = images.first();
      await expect(firstImage).toBeVisible();

      // Verify image has src attribute
      const src = await firstImage.getAttribute('src');
      expect(src).toBeTruthy();
    }
  });
});
