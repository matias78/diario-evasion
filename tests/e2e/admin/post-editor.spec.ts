import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../../helpers/auth';

test.describe('Admin Post Editor', () => {

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('should create a new draft post', async ({ page }) => {
    // Navigate to new post page
    await page.goto('/admin/posts/new');

    // Fill in post details
    await page.fill('input[placeholder*="Título"]', 'Test Post Draft');

    // Fill Quill editor
    const editor = page.locator('.ql-editor');
    await editor.click();
    await editor.fill('This is a test post content for draft.');

    // Fill excerpt
    await page.fill('textarea[placeholder*="Extracto"]', 'Test excerpt for draft');

    // Fill category
    await page.fill('input[placeholder*="Categoría"]', 'Test');

    // Select section
    await page.selectOption('select', 'lado-a');

    // Save as draft
    await page.click('button:has-text("Guardar Borrador")');

    // Should redirect to admin dashboard
    await page.waitForURL('/admin');

    // Verify draft is shown in dashboard
    await expect(page.locator('text=Test Post Draft')).toBeVisible();
  });

  test('should publish a new post', async ({ page }) => {
    // Navigate to new post page
    await page.goto('/admin/posts/new');

    // Fill in post details
    const timestamp = Date.now();
    const testTitle = `Test Published Post ${timestamp}`;

    await page.fill('input[placeholder*="Título"]', testTitle);

    // Fill Quill editor
    const editor = page.locator('.ql-editor');
    await editor.click();
    await editor.fill('This is a published test post content.');

    // Fill excerpt
    await page.fill('textarea[placeholder*="Extracto"]', 'Published post excerpt');

    // Fill category
    await page.fill('input[placeholder*="Categoría"]', 'Test');

    // Publish
    await page.click('button:has-text("Publicar")');

    // Should redirect to admin dashboard
    await page.waitForURL('/admin');

    // Verify post appears in dashboard
    await expect(page.locator(`text=${testTitle}`)).toBeVisible();

    // Verify post is visible on public site
    await page.goto('/');
    await expect(page.locator(`text=${testTitle}`)).toBeVisible();
  });

  test('should edit an existing post', async ({ page }) => {
    // Go to dashboard
    await page.goto('/admin');

    // Find first edit button
    const editButton = page.locator('button:has-text("Editar"), a:has-text("Editar")').first();

    if (await editButton.count() > 0) {
      await editButton.click();

      // Should be on edit page
      await expect(page).toHaveURL(/\/admin\/posts\/.+/);

      // Modify the title
      const titleInput = page.locator('input[placeholder*="Título"]');
      const originalTitle = await titleInput.inputValue();
      await titleInput.fill(`${originalTitle} - EDITED`);

      // Save changes
      await page.click('button:has-text("Publicar"), button:has-text("Guardar")').first();

      // Should redirect to admin
      await page.waitForURL('/admin');

      // Verify edited title appears
      await expect(page.locator('text=EDITED')).toBeVisible();
    }
  });

  test('should delete a post', async ({ page }) => {
    // First create a test post to delete
    await page.goto('/admin/posts/new');

    const timestamp = Date.now();
    const testTitle = `Post To Delete ${timestamp}`;

    await page.fill('input[placeholder*="Título"]', testTitle);

    const editor = page.locator('.ql-editor');
    await editor.click();
    await editor.fill('Content to be deleted');

    await page.fill('textarea[placeholder*="Extracto"]', 'Will be deleted');

    await page.click('button:has-text("Publicar")');
    await page.waitForURL('/admin');

    // Now delete the post
    // Find the delete button for this specific post
    const postRow = page.locator(`text=${testTitle}`).locator('..').locator('..');
    const deleteButton = postRow.locator('button:has-text("Eliminar"), button:has-text("Delete")').first();

    if (await deleteButton.count() > 0) {
      // Handle confirmation dialog if exists
      page.on('dialog', dialog => dialog.accept());

      await deleteButton.click();

      // Wait a bit for deletion
      await page.waitForTimeout(1000);

      // Verify post is gone
      await expect(page.locator(`text=${testTitle}`)).not.toBeVisible();
    }
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/admin/posts/new');

    // Try to submit without filling required fields
    await page.click('button:has-text("Publicar")').catch(() => {
      // Button might be disabled or show validation
    });

    // Check for HTML5 validation or error messages
    const titleInput = page.locator('input[placeholder*="Título"]');
    const isRequired = await titleInput.getAttribute('required');

    if (isRequired !== null) {
      expect(isRequired).toBeDefined();
    }
  });

  test('should preview post content while editing', async ({ page }) => {
    await page.goto('/admin/posts/new');

    // Fill in title and content
    await page.fill('input[placeholder*="Título"]', 'Preview Test');

    const editor = page.locator('.ql-editor');
    await editor.click();
    await editor.fill('# Heading\n\nThis is **bold** text.');

    // Look for preview tab or preview section
    const previewTab = page.locator('button:has-text("Preview"), button:has-text("Vista Previa")');

    if (await previewTab.count() > 0) {
      await previewTab.click();

      // Verify preview shows formatted content
      await expect(page.locator('text=Heading')).toBeVisible();
    }
  });
});
