import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nico Dalmasso - Perfil',
  description: 'Acerca de Nico Dalmasso - Escritor, lector y blogger',
};

export default function PerfilPage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[var(--accent-orange)] mb-8" style={{ fontFamily: "'Libre Baskerville', serif" }}>
          Nico Dalmasso
        </h1>

        <div className="flex justify-center mb-8">
          <img
            src="/images/nico-dalmasso.jpg"
            alt="Nico Dalmasso"
            className="w-48 h-48 rounded-lg object-cover shadow-lg"
          />
        </div>
      </div>

      {/* Mis blogs */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4" style={{ fontFamily: "'Libre Baskerville', serif" }}>
          Mis blogs
        </h2>
        <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline text-lg">
          Diario de evasión
        </a>
      </section>

      {/* Acerca de mí */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6" style={{ fontFamily: "'Libre Baskerville', serif" }}>
          Acerca de mí
        </h2>

        <div className="space-y-6">
          {/* Género */}
          <div className="grid grid-cols-3 gap-4">
            <dt className="font-semibold text-gray-900 dark:text-gray-100">Género</dt>
            <dd className="col-span-2 text-gray-700 dark:text-gray-300">Hombre</dd>
          </div>

          {/* Ubicación */}
          <div className="grid grid-cols-3 gap-4">
            <dt className="font-semibold text-gray-900 dark:text-gray-100">Ubicación</dt>
            <dd className="col-span-2 text-gray-700 dark:text-gray-300">Mar del Plata, Buenos Aires, Argentina</dd>
          </div>

          {/* Intereses */}
          <div className="grid grid-cols-3 gap-4">
            <dt className="font-semibold text-gray-900 dark:text-gray-100">Intereses</dt>
            <dd className="col-span-2 text-gray-700 dark:text-gray-300">
              Leer y escribir, nadar, conversar, caminar sin mapas, divagar, perder el tiempo, los objetos inútiles, las ceremonias íntimas, las lluvias de verano, los días de invierno, los nombres de las cosas.
            </dd>
          </div>

          {/* Películas favoritas */}
          <div className="grid grid-cols-3 gap-4">
            <dt className="font-semibold text-gray-900 dark:text-gray-100">Películas favoritas</dt>
            <dd className="col-span-2 text-gray-700 dark:text-gray-300">
              Cuestión de tiempo, 500 días con ella, Afersun, Vidas pasadas, Gran Hotel Budapest, Eterno resplandor de una mente sin recuerdos, Historia de un matrimonio, Amelie, Cigarros, Lo que queda del día.
            </dd>
          </div>

          {/* Música favorita */}
          <div className="grid grid-cols-3 gap-4">
            <dt className="font-semibold text-gray-900 dark:text-gray-100">Música favorita</dt>
            <dd className="col-span-2 text-gray-700 dark:text-gray-300">
              Tom Waits, Counting Crows, The Cure, Radiohead, Jorge Drexler, Andrés Calamaro, Loli Molina, Norah Jones, The Cranberries, R.E.M.
            </dd>
          </div>

          {/* Libros favoritos */}
          <div className="grid grid-cols-3 gap-4">
            <dt className="font-semibold text-gray-900 dark:text-gray-100">Libros favoritos</dt>
            <dd className="col-span-2 text-gray-700 dark:text-gray-300">
              Seda, Los detectives salvajes, Ciudad de cristal, Nocturno hindú, La elegancia del erizo, La novela luminosa, Una guía sobre el arte de perderse, Tinta invisible, Crónicas marcianas, El Principito.
            </dd>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="mb-10 pb-8 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4" style={{ fontFamily: "'Libre Baskerville', serif" }}>
          Contacto
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          En Blogger desde: <span className="font-semibold">marzo de 2026</span>
        </p>
      </section>

      {/* Volver */}
      <div className="mt-8">
        <a
          href="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200 hover:-translate-x-1"
        >
          ← Volver al inicio
        </a>
      </div>
    </div>
  );
}
