import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category?: string;
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group bg-[#333333] border border-gray-700 hover:border-gray-600 hover:shadow-lg transition-all duration-300 p-8 mb-8 hover:bg-[#383838]" data-testid="post-card">
      <Link href={`/posts/${post.slug}`} className="block">
        <div>
          {post.category && (
            <span className="text-xs text-gray-400 font-medium mb-3 block uppercase tracking-wider group-hover:text-[#ff6b35] transition-colors duration-200" data-testid="post-category">
              {post.category}
            </span>
          )}
          <h2
            className="text-3xl font-bold text-gray-100 mb-4 group-hover:text-gray-50 transition-colors duration-200"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              letterSpacing: '-0.02em',
              lineHeight: '1.3'
            }}
            data-testid="post-title"
          >
            {post.title}
          </h2>
          <time className="text-sm text-gray-500 block mb-5 font-normal">
            {format(new Date(post.date), "d 'de' MMMM 'de' yyyy", { locale: es })}
          </time>
          <p className="text-gray-300 leading-relaxed text-base mb-5" style={{ lineHeight: '1.75' }}>
            {post.excerpt}
          </p>
          <span className="text-gray-400 font-medium inline-block group-hover:text-gray-200 transition-all duration-200 text-sm group-hover:translate-x-1">
            Leer más →
          </span>
        </div>
      </Link>
    </article>
  );
}
