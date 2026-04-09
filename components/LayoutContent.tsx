'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from "./ThemeToggle";
import { SECTIONS } from "@/lib/sections";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* Sidebar izquierdo */}
      <aside className="w-64 bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] dark:border-gray-700 fixed h-full overflow-y-auto transition-colors duration-300">
        <div className="p-6">
          {/* Descripción introductoria */}
          <p className="text-sm text-gray-300 dark:text-gray-300 leading-relaxed mb-8" style={{ lineHeight: '1.6' }}>
            Diario de los días que nos dejan atrás, registro inconstante de hechos cotidianos que nos suceden por única vez, conjunto de eventos intrascendentes en el tiempo que nos toca en suerte, banda sonora del viajero en la tierra que suena en modo aleatorio, mientras esperamos la iluminación.
          </p>

          <div className="border-t border-gray-600 dark:border-gray-600 pt-8 mb-8">
            <h1 className="text-2xl font-bold text-gray-100 dark:text-gray-100 mb-4" style={{ fontFamily: "'Libre Baskerville', serif", letterSpacing: '0.02em' }}>
              <a href="/" className="hover:text-gray-300 dark:hover:text-gray-300 transition-colors duration-200">
                DIARIO DE EVASIÓN
              </a>
            </h1>

            <p className="text-sm text-gray-300 dark:text-gray-300 leading-relaxed italic" style={{ lineHeight: '1.6' }}>
              ¿Dónde podemos vivir, sino en los días? <span className="text-gray-400 dark:text-gray-400">(Philip Larkin)</span>
            </p>
          </div>

          {/* Theme Toggle */}
          <div className="mb-6">
            {mounted && <ThemeToggle />}
          </div>

          <div className="border-t border-gray-600 dark:border-gray-600 pt-6 mb-8">
            <h2 className="text-sm font-semibold text-gray-100 dark:text-gray-100 mb-4">
              Páginas
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/section/intro" className="text-gray-300 dark:text-gray-300 hover:text-gray-100 dark:hover:text-gray-100 transition-colors duration-200">
                  INTRO
                </a>
              </li>
              <li>
                <a href="/section/lado-a" className="text-gray-300 dark:text-gray-300 hover:text-gray-100 dark:hover:text-gray-100 transition-colors duration-200">
                  LADO A: Los años borrados
                </a>
              </li>
              <li>
                <a href="/section/lado-b" className="text-gray-300 dark:text-gray-300 hover:text-gray-100 dark:hover:text-gray-100 transition-colors duration-200">
                  LADO B: De otras vidas que la mía
                </a>
              </li>
              <li>
                <a href="/section/bonus-track" className="text-gray-300 dark:text-gray-300 hover:text-gray-100 dark:hover:text-gray-100 transition-colors duration-200">
                  BONUS TRACK: Canciones perdidas
                </a>
              </li>
            </ul>
          </div>

          <div className="border-t border-gray-600 dark:border-gray-600 pt-6">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-3 mx-auto transition-transform duration-300 hover:scale-105">
              <img
                src="/images/nico-dalmasso.jpg"
                alt="Nico Dalmasso"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <a href="/perfil" className="text-sm text-gray-300 dark:text-gray-300 hover:text-gray-100 dark:hover:text-gray-100 transition-colors duration-200">
                Ver perfil completo
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 ml-64">
        <header className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] dark:border-gray-700 py-6 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              DIARIO DE EVASIÓN
            </h2>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-8 py-12">
          {children}
        </main>

        <footer className="bg-[var(--sidebar-bg)] border-t border-[var(--border-color)] dark:border-gray-700 mt-16 py-8 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-8 text-center text-gray-600 dark:text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Diario de Evasión. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
