import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

const CREDENTIALS_FILE = path.join(process.cwd(), 'config', 'credentials.json');

// Get credentials from file or environment
function getCredentials() {
  try {
    if (fs.existsSync(CREDENTIALS_FILE)) {
      const data = fs.readFileSync(CREDENTIALS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading credentials:', error);
  }

  // Fallback to environment variables
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin123',
  };
}

export function verifyCredentials(username: string, password: string): boolean {
  const credentials = getCredentials();
  return username === credentials.username && password === credentials.password;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('admin-auth');
  return authToken?.value === 'authenticated';
}

export async function setAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set('admin-auth', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('admin-auth');
}
