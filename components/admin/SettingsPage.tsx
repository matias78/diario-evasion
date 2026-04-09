'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ThemeColors {
  dark: {
    background: string;
    foreground: string;
    sidebarBg: string;
    cardBg: string;
    borderColor: string;
    accentOrange: string;
  };
  light: {
    background: string;
    foreground: string;
    sidebarBg: string;
    cardBg: string;
    borderColor: string;
    accentOrange: string;
  };
}

export default function SettingsPage() {
  const [colors, setColors] = useState<ThemeColors>({
    dark: {
      background: '#2b2b2b',
      foreground: '#e8e8e8',
      sidebarBg: '#1f1f1f',
      cardBg: '#333333',
      borderColor: '#4a4a4a',
      accentOrange: '#ff6b35',
    },
    light: {
      background: '#f5f5f5',
      foreground: '#1a1a1a',
      sidebarBg: '#ffffff',
      cardBg: '#ffffff',
      borderColor: '#e0e0e0',
      accentOrange: '#ff6b35',
    },
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadColors();
  }, []);

  const loadColors = async () => {
    try {
      const response = await fetch('/api/admin/settings/colors');
      if (response.ok) {
        const data = await response.json();
        setColors(data);
      }
    } catch (error) {
      console.error('Error loading colors:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    try {
      const response = await fetch('/api/admin/settings/colors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(colors),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        // Reload page to apply new colors
        window.location.reload();
      } else {
        alert('Error al guardar los colores');
      }
    } catch (error) {
      console.error('Error saving colors:', error);
      alert('Error al guardar los colores');
    } finally {
      setSaving(false);
    }
  };

  const updateColor = (theme: 'dark' | 'light', key: keyof ThemeColors['dark'], value: string) => {
    setColors(prev => ({
      ...prev,
      [theme]: {
        ...prev[theme],
        [key]: value,
      },
    }));
  };

  const ColorInput = ({ label, theme, colorKey }: { label: string; theme: 'dark' | 'light'; colorKey: keyof ThemeColors['dark'] }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="color"
          value={colors[theme][colorKey]}
          onChange={(e) => updateColor(theme, colorKey, e.target.value)}
          className="h-10 w-20 rounded cursor-pointer"
        />
        <input
          type="text"
          value={colors[theme][colorKey]}
          onChange={(e) => updateColor(theme, colorKey, e.target.value)}
          className="flex-1 px-4 py-2 bg-[var(--background)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)]"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-[var(--card-bg)] border-b border-[var(--border-color)] dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            Configuración
          </h1>
          <div className="flex gap-4">
            <Link
              href="/admin"
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              Volver al Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex gap-4 mb-8">
          <Link
            href="/admin"
            className="px-4 py-2 bg-[var(--card-bg)] text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Posts
          </Link>
          <Link
            href="/admin/settings"
            className="px-4 py-2 bg-[var(--accent-orange)] text-white rounded-lg"
          >
            Configuración
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dark Theme */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Tema Oscuro
            </h2>
            <div className="space-y-4">
              <ColorInput label="Fondo Principal" theme="dark" colorKey="background" />
              <ColorInput label="Color de Texto" theme="dark" colorKey="foreground" />
              <ColorInput label="Fondo Sidebar" theme="dark" colorKey="sidebarBg" />
              <ColorInput label="Fondo Tarjetas" theme="dark" colorKey="cardBg" />
              <ColorInput label="Color Bordes" theme="dark" colorKey="borderColor" />
              <ColorInput label="Color Acento (Naranja)" theme="dark" colorKey="accentOrange" />
            </div>
          </div>

          {/* Light Theme */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              Tema Claro
            </h2>
            <div className="space-y-4">
              <ColorInput label="Fondo Principal" theme="light" colorKey="background" />
              <ColorInput label="Color de Texto" theme="light" colorKey="foreground" />
              <ColorInput label="Fondo Sidebar" theme="light" colorKey="sidebarBg" />
              <ColorInput label="Fondo Tarjetas" theme="light" colorKey="cardBg" />
              <ColorInput label="Color Bordes" theme="light" colorKey="borderColor" />
              <ColorInput label="Color Acento (Naranja)" theme="light" colorKey="accentOrange" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-[var(--accent-orange)] hover:bg-orange-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
          {saved && (
            <span className="text-green-400">
              ✓ Cambios guardados correctamente
            </span>
          )}
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-900/20 border border-blue-700/30 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-blue-200 mb-2">
            Información
          </h3>
          <p className="text-sm text-blue-300/80">
            Los cambios se aplicarán inmediatamente después de guardar. La página se recargará automáticamente para aplicar los nuevos colores.
          </p>
        </div>
      </div>
    </div>
  );
}
