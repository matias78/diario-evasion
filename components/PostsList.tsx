'use client';

import { useState, useMemo } from 'react';
import PostCard from './PostCard';
import SearchBar from './SearchBar';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category?: string;
  content: string;
}

interface PostsListProps {
  posts: Post[];
}

export default function PostsList({ posts }: PostsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(posts.map(p => p.category).filter(Boolean) as string[]);
    return Array.from(cats).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === null ||
        post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-6">
          Últimas publicaciones
        </p>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {/* Filtros de categoría */}
      {categories.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === null
                  ? 'bg-[var(--accent-orange)] text-white'
                  : 'bg-[var(--card-bg)] text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Todas
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-[var(--accent-orange)] text-white'
                    : 'bg-[var(--card-bg)] text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-[var(--border-color)] dark:border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-0">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
          <p>No se encontraron publicaciones{searchQuery && ` para "${searchQuery}"`}.</p>
        </div>
      )}
    </div>
  );
}
