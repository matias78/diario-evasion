'use client';

import { useState, useEffect } from 'react';

interface Comment {
  id: string;
  name: string;
  email?: string;
  text: string;
  date: string;
}

export default function Comments({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadComments();
  }, [postSlug]);

  const loadComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comments/${postSlug}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !text.trim()) {
      alert('Por favor completa tu nombre y comentario');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/comments/${postSlug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), text: text.trim() }),
      });

      if (res.ok) {
        setName('');
        setEmail('');
        setText('');
        loadComments();
      } else {
        alert('Error al enviar comentario');
      }
    } catch (error) {
      alert('Error al enviar comentario');
    }
    setSubmitting(false);
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

  return (
    <div className="mt-16 pt-8 border-t border-gray-300 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6" style={{ fontFamily: "'Libre Baskerville', serif" }}>
        Comentarios
      </h3>

      {/* Lista de comentarios */}
      {loading ? (
        <p className="text-gray-400">Cargando comentarios...</p>
      ) : comments.length > 0 ? (
        <div className="space-y-6 mb-8">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-[var(--card-bg)] border border-[var(--border-color)] p-4 rounded-lg">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {comment.name}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDate(comment.date)}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mb-8">No hay comentarios aún. ¡Sé el primero en comentar!</p>
      )}

      {/* Formulario para nuevo comentario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nombre *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email (opcional)
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Comentario *
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Enviando...' : 'Publicar comentario'}
        </button>
      </form>
    </div>
  );
}
