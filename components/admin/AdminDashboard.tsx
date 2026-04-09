'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminNav from './AdminNav';

interface Post {
  slug: string;
  title: string;
  date: string;
  section?: string;
  draft?: boolean;
  order?: number;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleDelete = async (slug: string) => {
    console.log('🗑️ Attempting to delete post with slug:', slug);
    if (!confirm('¿Estás seguro de eliminar este post?')) return;

    const url = `/api/admin/posts/${slug}`;
    console.log('🌐 DELETE URL:', url);

    try {
      const response = await fetch(url, { method: 'DELETE' });

      if (!response.ok) {
        const error = await response.json();
        alert(`Error al eliminar: ${error.error || 'Error desconocido'}`);
        return;
      }

      alert('Post eliminado exitosamente');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error al eliminar el post. Por favor intenta nuevamente.');
    }
  };

  const getSectionName = (section?: string) => {
    const sections: Record<string, string> = {
      'intro': 'INTRO',
      'lado-a': 'LADO A',
      'lado-b': 'LADO B',
      'bonus-track': 'BONUS TRACK',
    };
    return section ? sections[section] || section : 'Sin sección';
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-[var(--card-bg)] border-b border-[var(--border-color)] dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            Panel de Administración
          </h1>
          <div className="flex gap-4">
            <Link
              href="/"
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              Ver sitio
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <AdminNav />

        {/* Actions */}
        <div className="mb-6">
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center px-6 py-3 bg-[var(--accent-orange)] hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Post
          </Link>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            Cargando posts...
          </div>
        ) : (
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Sección
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Orden
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
                {posts.map((post) => (
                  <tr key={post.slug} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {post.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-500">
                        {post.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {getSectionName(post.section)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {post.order || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.draft
                          ? 'bg-yellow-900/30 text-yellow-200'
                          : 'bg-green-900/30 text-green-200'
                      }`}>
                        {post.draft ? 'Borrador' : 'Publicado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {new Date(post.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/posts/${post.slug}`}
                        className="text-[var(--accent-orange)] hover:text-orange-400 mr-4"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {posts.length === 0 && (
              <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                No hay posts todavía. ¡Crea el primero!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
