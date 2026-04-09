import { Page } from '@playwright/test';

/**
 * Login as admin user in the admin panel
 */
export async function loginAsAdmin(page: Page) {
  await page.goto('/admin/login');
  await page.fill('input#username', 'admin');
  await page.fill('input#password', 'admin123');
  await page.click('button[type="submit"]');
  await page.waitForURL('/admin');
}

/**
 * Logout from admin panel
 */
export async function logout(page: Page) {
  await page.click('text=Cerrar Sesión');
  await page.waitForURL('/admin/login');
}

/**
 * Create a test post via the admin UI
 */
export async function createTestPost(page: Page, postData: {
  title: string;
  content: string;
  excerpt: string;
  category?: string;
  section?: string;
  order?: number;
  publish?: boolean;
}) {
  await page.goto('/admin/posts/new');

  // Fill title
  await page.fill('input[placeholder*="Título"]', postData.title);

  // Fill content in Quill editor
  const editor = page.locator('.ql-editor');
  await editor.click();
  await editor.fill(postData.content);

  // Fill excerpt
  await page.fill('textarea[placeholder*="Extracto"]', postData.excerpt);

  // Fill category if provided
  if (postData.category) {
    await page.fill('input[placeholder*="Categoría"]', postData.category);
  }

  // Select section if provided
  if (postData.section) {
    await page.selectOption('select[id*="section"]', postData.section);
  }

  // Fill order if provided
  if (postData.order !== undefined) {
    await page.fill('input[type="number"]', postData.order.toString());
  }

  // Click appropriate button
  const buttonText = postData.publish ? 'Publicar' : 'Guardar Borrador';
  await page.click(`button:has-text("${buttonText}")`);

  // Wait for redirect to admin dashboard
  await page.waitForURL('/admin');
}
