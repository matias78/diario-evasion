'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';

interface Comment {
  id: string;
  name: string;
  email?: string;
  text: string;
  date: string;
  postSlug?: string;
}

interface CommentGroup {
  postSlug: string;
  comments: Comment[];
}

export default function CommentsManagementPage() {
  const router = useRouter();
  const [commentGroups, setCommentGroups] = useState<CommentGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    loadComments();
  }, []);

  const checkAuth = async () => {
    const res = await fetch('/api/admin/check-auth');
    if (!res.ok) {
      router.push('/admin/login');
    }
  };

  const loadComments = async () => {
    try {
      const res = await fetch('/api/admin/comments');
      if (res.ok) {
        const data = await res.json();
        setCommentGroups(data.commentGroups || []);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    }
    setLoading(false);
  };

  const deleteComment = async (postSlug: string, commentId: string) => {
    if (!confirm('¿Estás seguro de que quieres borrar este comentario?')) {
      return;
    }

    try {
      const res = await fetch(`/api/comments/${postSlug}/${commentId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        loadComments();
      } else {
        alert('Error al borrar comentario');
      }
    } catch (error) {
      alert('Error al borrar comentario');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalComments = commentGroups.reduce((sum, group) => sum + group.comments.length, 0);

  return (
    <div>
      <AdminNav />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Gestión de Comentarios</h1>
      </div>

      {loading ? (
        <p className="text-gray-400">Cargando comentarios...</p>
      ) : commentGroups.length === 0 ? (
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-8 text-center">
          <p className="text-gray-400">No hay comentarios aún</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-400">
              Total de comentarios: <span className="font-semibold text-gray-200">{totalComments}</span>
            </p>
          </div>

          <div className="space-y-8">
            {commentGroups.map((group) => (
              <div key={group.postSlug} className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-100 mb-4 pb-3 border-b border-gray-700">
                  Post: {group.postSlug}
                  <span className="ml-3 text-sm font-normal text-gray-400">
                    ({group.comments.length} {group.comments.length === 1 ? 'comentario' : 'comentarios'})
                  </span>
                </h2>

                <div className="space-y-4">
                  {group.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-baseline gap-3 mb-1">
                            <span className="font-semibold text-gray-100">
                              {comment.name}
                            </span>
                            {comment.email && (
                              <span className="text-xs text-gray-500">
                                {comment.email}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatDate(comment.date)}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteComment(group.postSlug, comment.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                        >
                          Borrar
                        </button>
                      </div>
                      <p className="text-gray-300 whitespace-pre-wrap">
                        {comment.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
