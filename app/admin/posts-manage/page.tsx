'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';

interface Post {
  slug: string;
  title: string;
  date: string;
  section?: string;
  draft?: boolean;
  order?: number;
}

export default function PostsManagePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = async () => {
    const res = await fetch('/api/admin/check-auth');
    if (!res.ok) {
      router.push('/admin/login');
    }
  };

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

  const handleDelete = async (slug: string, title: string) => {
    console.log('🗑️ Attempting to delete post with slug:', slug, 'title:', title);
    if (!confirm(`¿Estás seguro de eliminar el post "${title}"?`)) return;

    const url = `/api/admin/posts/${slug}`;
    console.log('🌐 DELETE URL:', url);

    try {
      const response = await fetch(url, { method: 'DELETE' });
      if (response.ok) {
        fetchPosts();
      } else {
        alert('Error al eliminar el post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error al eliminar el post');
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

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AdminNav />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Gestionar Posts</h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-[var(--accent-orange)] hover:bg-orange-600 text-white rounded-lg transition-colors"
        >
          + Nuevo Post
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar posts por título o slug..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-[var(--card-bg)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg text-[var(--foreground)] placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)]"
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
          Cargando posts...
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm ? 'No se encontraron posts con ese criterio' : 'No hay posts todavía'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.slug}
              className="bg-[var(--card-bg)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg p-6 hover:border-[var(--accent-orange)] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {post.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      post.draft
                        ? 'bg-yellow-900/30 text-yellow-200'
                        : 'bg-green-900/30 text-green-200'
                    }`}>
                      {post.draft ? 'Borrador' : 'Publicado'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>📂 {getSectionName(post.section)}</span>
                    <span>📊 Orden: {post.order || 0}</span>
                    <span>📅 {new Date(post.date).toLocaleDateString()}</span>
                    <span className="text-gray-500 dark:text-gray-500">/{post.slug}</span>
                  </div>
                </div>

                <div className="flex gap-3 ml-6">
                  <Link
                    href={`/admin/posts/${post.slug}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(post.slug, post.title)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Borrar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {!loading && (
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Mostrando {filteredPosts.length} de {posts.length} posts
        </div>
      )}
    </div>
  );
}
