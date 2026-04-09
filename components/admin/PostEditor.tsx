'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from './RichTextEditor';

interface PostEditorProps {
  slug?: string;
}

export default function PostEditor({ slug }: PostEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [section, setSection] = useState<string>('');
  const [order, setOrder] = useState(0);
  const [draft, setDraft] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (slug && slug !== 'new') {
      loadPost();
    }
  }, [slug]);

  const loadPost = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/posts/${slug}`);
      const data = await response.json();
      setTitle(data.title);
      setContent(data.content);
      setExcerpt(data.excerpt);
      setCategory(data.category || '');
      setSection(data.section || '');
      setOrder(data.order || 0);
      setDraft(data.draft || false);
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (publish: boolean = false) => {
    setSaving(true);
    try {
      const postData = {
        title,
        content,
        excerpt,
        category,
        section,
        order,
        draft: !publish,
        date: new Date().toISOString().split('T')[0],
      };

      const url = slug && slug !== 'new'
        ? `/api/admin/posts/${slug}`
        : '/api/admin/posts/create';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        alert('Error al guardar el post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error al guardar el post');
    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-gray-400">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-[var(--card-bg)] border-b border-[var(--border-color)] dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            {slug && slug !== 'new' ? 'Editar Post' : 'Nuevo Post'}
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar Borrador'}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="px-4 py-2 bg-[var(--accent-orange)] hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título del post"
                className="w-full px-4 py-3 text-3xl font-bold bg-[var(--card-bg)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg text-[var(--foreground)] placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)]"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              />
            </div>

            {/* Content Editor */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg p-6">
              <RichTextEditor
                value={content}
                onChange={setContent}
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Extracto
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Breve descripción del post..."
                className="w-full h-24 px-4 py-3 bg-[var(--card-bg)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg text-[var(--foreground)] placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)] resize-none"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Categoría
              </h3>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="ej: Libros, Música"
                className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)]"
              />
            </div>

            {/* Section */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Sección
              </h3>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)]"
              >
                <option value="">Sin sección</option>
                <option value="intro">INTRO</option>
                <option value="lado-a">LADO A</option>
                <option value="lado-b">LADO B</option>
                <option value="bonus-track">BONUS TRACK</option>
              </select>
            </div>

            {/* Order */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Orden
              </h3>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)]"
              />
              <p className="text-xs text-gray-600 dark:text-gray-500 mt-2">
                Número menor aparece primero
              </p>
            </div>

            {/* Help */}
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-blue-200 mb-2">
                Ayuda del Editor
              </h3>
              <div className="text-xs text-blue-300/80 space-y-1">
                <p>• Usa la barra de herramientas para formatear</p>
                <p>• Click en imagen 🖼️ para insertar imágenes</p>
                <p>• Ej: /images/disco-lado-a.jpg</p>
                <p>• Ctrl+B = Negrita, Ctrl+I = Cursiva</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
