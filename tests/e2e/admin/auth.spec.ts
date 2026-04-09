import { test, expect } from '@playwright/test';

test.describe('Admin Authentication', () => {

  test('should login with correct credentials', async ({ page }) => {
    await page.goto('/admin/login');

    // Verify login page is displayed
    await expect(page.locator('text=/Panel de Administración|Admin/i')).toBeVisible();

    // Fill login form
    await page.fill('input#username', 'admin');
    await page.fill('input#password', 'admin123');

    // Submit
    await page.click('button[type="submit"]');

    // Should redirect to admin dashboard
    await page.waitForURL('/admin');
    await expect(page).toHaveURL('/admin');

    // Verify dashboard content is visible
    await expect(page.locator('text=/Dashboard|Panel|Administración/i')).toBeVisible();
  });

  test('should show error with wrong credentials', async ({ page }) => {
    await page.goto('/admin/login');

    await page.fill('input#username', 'wronguser');
    await page.fill('input#password', 'wrongpass');
    await page.click('button[type="submit"]');

    // Should show error message
    await expect(page.locator('text=/Credenciales incorrectas|Error|incorrect/i')).toBeVisible();

    // Should stay on login page
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.goto('/admin/login');
    await page.fill('input#username', 'admin');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin');

    // Logout - look for logout button/link
    const logoutButton = page.locator('button:has-text("Cerrar Sesión"), a:has-text("Cerrar Sesión"), button:has-text("Logout")').first();
    await logoutButton.click();

    // Should redirect to login
    await page.waitForURL('/admin/login');
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('should redirect to login when accessing protected route', async ({ page }) => {
    // Try to access admin without login
    await page.goto('/admin');

    // Should redirect to login
    await page.waitForURL('/admin/login', { timeout: 5000 });
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('should persist session on page reload', async ({ page }) => {
    // Login
    await page.goto('/admin/login');
    await page.fill('input#username', 'admin');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin');

    // Reload page
    await page.reload();

    // Should still be logged in (not redirected to login)
    await expect(page).toHaveURL('/admin');
    await expect(page.locator('text=/Dashboard|Panel|Administración/i')).toBeVisible();
  });

  test('should access admin dashboard sections when logged in', async ({ page }) => {
    // Login
    await page.goto('/admin/login');
    await page.fill('input#username', 'admin');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/admin');

    // Look for navigation links
    const newPostLink = page.locator('a:has-text("Nuevo Post"), a:has-text("Crear"), button:has-text("Nuevo Post")').first();

    if (await newPostLink.count() > 0) {
      await newPostLink.click();

      // Verify we can access the new post page
      await expect(page).toHaveURL(/\/admin\/posts\/new/);
    }
  });
});
