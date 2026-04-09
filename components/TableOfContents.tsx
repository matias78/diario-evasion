'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extraer headers del contenido HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headers = doc.querySelectorAll('h2, h3');

    const tocItems: TOCItem[] = [];
    headers.forEach((header, index) => {
      const id = `toc-${index}`;
      header.id = id;
      tocItems.push({
        id,
        text: header.textContent || '',
        level: parseInt(header.tagName.substring(1))
      });
    });

    setToc(tocItems);

    // Agregar IDs a los headers reales en el DOM
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const realHeaders = document.querySelectorAll('.prose h2, .prose h3');
        realHeaders.forEach((header, index) => {
          header.id = `toc-${index}`;
        });
      }, 100);
    }

    // Observer para activar el header actual
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    setTimeout(() => {
      document.querySelectorAll('.prose h2, .prose h3').forEach((header) => {
        observer.observe(header);
      });
    }, 200);

    return () => observer.disconnect();
  }, [content]);

  if (toc.length === 0) return null;

  return (
    <nav className="mb-8 p-6 bg-[var(--card-bg)] border border-[var(--border-color)] dark:border-gray-700 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4" style={{ fontFamily: "'Libre Baskerville', serif" }}>
        Contenido
      </h3>
      <ul className="space-y-2">
        {toc.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
          >
            <a
              href={`#${item.id}`}
              className={`text-sm hover:text-[var(--accent-orange)] transition-colors duration-200 block ${
                activeId === item.id
                  ? 'text-[var(--accent-orange)] font-medium'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
