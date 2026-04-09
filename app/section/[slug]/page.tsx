import { getPostsBySection } from '@/lib/posts';
import { SECTIONS, Section } from '@/lib/sections';
import PostCard from '@/components/PostCard';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return Object.keys(SECTIONS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const sectionInfo = SECTIONS[params.slug as Section];

  if (!sectionInfo) {
    return {
      title: 'Sección no encontrada',
    };
  }

  return {
    title: sectionInfo.name,
    description: `Posts de la sección ${sectionInfo.name}`,
  };
}

export default function SectionPage({ params }: { params: { slug: string } }) {
  const section = params.slug as Section;
  const sectionInfo = SECTIONS[section];

  if (!sectionInfo) {
    notFound();
  }

  const posts = getPostsBySection(section);

  return (
    <div>
      <div className="mb-12">
        <h1
          className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          style={{ fontFamily: "'Libre Baskerville', serif", letterSpacing: '0.02em' }}
        >
          {sectionInfo.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {posts.length} {posts.length === 1 ? 'publicación' : 'publicaciones'}
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-0">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
          <p>Aún no hay publicaciones en esta sección.</p>
        </div>
      )}
    </div>
  );
}
