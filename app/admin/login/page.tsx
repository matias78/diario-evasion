'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="max-w-md w-full mx-4">
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            Panel de Administración
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Diario de Evasión
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)]"
                required
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)]"
                required
              />
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3 text-red-200 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--accent-orange)] hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
