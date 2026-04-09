'use client';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ShareButtons from './ShareButtons';
import Comments from './Comments';
import TableOfContents from './TableOfContents';
import { calculateReadingTime, formatReadingTime } from '@/lib/utils';

interface PostContentProps {
  post: {
    title: string;
    date: string;
    category?: string;
    content: string;
    slug: string;
  };
}

export default function PostContent({ post }: PostContentProps) {
  const readingTime = calculateReadingTime(post.content);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-12 pb-8 border-b border-gray-300 dark:border-gray-800">
        <h1
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 uppercase tracking-wide"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            letterSpacing: '0.02em',
            lineHeight: '1.2'
          }}
        >
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm flex-wrap">
          <time dateTime={post.date} className="font-normal">
            {format(new Date(post.date), "d 'de' MMMM 'de' yyyy", { locale: es })}
          </time>
          <span className="text-gray-400 dark:text-gray-600">•</span>
          <span className="font-normal">{formatReadingTime(readingTime)}</span>
          {post.category && (
            <>
              <span className="text-gray-400 dark:text-gray-600">•</span>
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 text-xs uppercase tracking-wider rounded-sm">
                {post.category}
              </span>
            </>
          )}
        </div>
      </header>

      <TableOfContents content={post.content} />

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <ShareButtons title={post.title} url={currentUrl} />

      <Comments postSlug={post.slug} />

      <div className="mt-16 pt-8 border-t border-gray-300 dark:border-gray-700">
        <a
          href="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200 hover:-translate-x-1"
        >
          ← Volver al inicio
        </a>
      </div>
    </article>
  );
}
