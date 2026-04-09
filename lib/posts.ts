import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Section } from './sections';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Configure marked
marked.setOptions({
  breaks: true,
  gfm: true,
  mangle: false,
  headerIds: false,
});

// Helper to detect if content is HTML or Markdown
function processContent(content: string): string {
  const trimmed = content.trim();

  // Check if content is HTML (from Quill editor)
  // Quill generates HTML with <p>, <h1>, <h2>, <strong>, <em>, etc.
  if (trimmed.startsWith('<p>') ||
      trimmed.startsWith('<h1>') ||
      trimmed.startsWith('<h2>') ||
      trimmed.startsWith('<h3>') ||
      trimmed.startsWith('<ol>') ||
      trimmed.startsWith('<ul>') ||
      trimmed.startsWith('<blockquote>')) {
    return content; // Already HTML, return as-is
  }

  // Otherwise, it's markdown - convert to HTML
  return marked(content) as string;
}

// Helper to strip HTML tags and create plain text excerpt
function createExcerpt(content: string, maxLength: number = 150): string {
  // Strip HTML tags
  const plainText = content.replace(/<[^>]*>/g, '');

  // Remove extra whitespace and newlines
  const cleanText = plainText.replace(/\s+/g, ' ').trim();

  // Truncate to maxLength
  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  return cleanText.substring(0, maxLength).trim() + '...';
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category?: string;
  section?: Section;
  order?: number;
  draft?: boolean;
  content: string;
}

export function getAllPosts(): Post[] {
  // Verificar si existe el directorio
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Sin título',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || createExcerpt(content),
        category: data.category,
        section: data.section as Section,
        order: data.order || 0,
        draft: data.draft || false,
        content: processContent(content),
      };
    });

  // Filter out drafts for public view
  return allPosts
    .filter(post => !post.draft)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getAllPostsIncludingDrafts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Sin título',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || createExcerpt(content),
        category: data.category,
        section: data.section as Section,
        order: data.order || 0,
        draft: data.draft || false,
        content: processContent(content),
      };
    });

  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Sin título',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      category: data.category,
      section: data.section as Section,
      order: data.order || 0,
      draft: data.draft || false,
      content: processContent(content),
    };
  } catch (error) {
    return null;
  }
}

export function getPostsBySection(section: Section): Post[] {
  const allPosts = getAllPosts();
  return allPosts
    .filter(post => post.section === section && !post.draft)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function deletePost(slug: string): boolean {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    // Verificar si el archivo existe
    if (!fs.existsSync(fullPath)) {
      return false;
    }

    // Eliminar el archivo
    fs.unlinkSync(fullPath);
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
}
