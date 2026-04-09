'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';

export default function AccountPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('admin');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const res = await fetch('/api/admin/check-auth');
    if (!res.ok) {
      router.push('/admin/login');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Validaciones
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Contraseña actualizada correctamente');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        // Cerrar sesión después de 2 segundos
        setTimeout(() => {
          router.push('/admin/login');
        }, 2000);
      } else {
        setError(data.error || 'Error al cambiar la contraseña');
      }
    } catch (error) {
      setError('Error al cambiar la contraseña');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <AdminNav />

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Configuración de Cuenta</h1>

        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Información de Usuario</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                disabled
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-[var(--border-color)] dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                El usuario no se puede cambiar
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Cambiar Contraseña</h2>

          {message && (
            <div className="mb-4 p-4 bg-green-900/20 border border-green-700/30 rounded-lg">
              <p className="text-green-200">{message}</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-900/20 border border-red-700/30 rounded-lg">
              <p className="text-red-200">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contraseña Actual *
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)]"
                placeholder="Ingresa tu contraseña actual"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nueva Contraseña *
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)]"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirmar Nueva Contraseña *
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)]"
                placeholder="Repite la nueva contraseña"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-[var(--accent-orange)] hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Guardando...' : 'Cambiar Contraseña'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                  setError('');
                  setMessage('');
                }}
                className="px-6 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-200 mb-2">Consejos de seguridad</h3>
            <ul className="text-xs text-blue-300/80 space-y-1">
              <li>• Usa al menos 6 caracteres</li>
              <li>• Combina letras, números y símbolos</li>
              <li>• No uses la misma contraseña que otros sitios</li>
              <li>• Después de cambiar la contraseña, deberás iniciar sesión nuevamente</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
