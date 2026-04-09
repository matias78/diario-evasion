'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname?.startsWith(path);
  };

  return (
    <div className="flex gap-4 mb-8">
      <Link
        href="/admin"
        className={`px-4 py-2 rounded-lg transition-colors ${
          isActive('/admin') && !pathname?.includes('/posts') && !pathname?.includes('/comments') && !pathname?.includes('/settings')
            ? 'bg-[var(--accent-orange)] text-white'
            : 'bg-[var(--card-bg)] text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
        }`}
      >
        Dashboard
      </Link>
      <Link
        href="/admin/posts-manage"
        className={`px-4 py-2 rounded-lg transition-colors ${
          isActive('/admin/posts')
            ? 'bg-[var(--accent-orange)] text-white'
            : 'bg-[var(--card-bg)] text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
        }`}
      >
        Gestionar Posts
      </Link>
      <Link
        href="/admin/comments"
        className={`px-4 py-2 rounded-lg transition-colors ${
          isActive('/admin/comments')
            ? 'bg-[var(--accent-orange)] text-white'
            : 'bg-[var(--card-bg)] text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
        }`}
      >
        Comentarios
      </Link>
      <Link
        href="/admin/settings"
        className={`px-4 py-2 rounded-lg transition-colors ${
          isActive('/admin/settings')
            ? 'bg-[var(--accent-orange)] text-white'
            : 'bg-[var(--card-bg)] text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
        }`}
      >
        Configuración
      </Link>
      <Link
        href="/admin/account"
        className={`px-4 py-2 rounded-lg transition-colors ${
          isActive('/admin/account')
            ? 'bg-[var(--accent-orange)] text-white'
            : 'bg-[var(--card-bg)] text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
        }`}
      >
        Mi Cuenta
      </Link>
    </div>
  );
}
