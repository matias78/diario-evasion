import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { getAllPosts, getPostBySlug, getPostsBySection, getAllPostsIncludingDrafts } from '@/lib/posts';
import fs from 'fs';
import path from 'path';

describe('Posts Library', () => {
  const testPostsDir = path.join(process.cwd(), 'content/posts');
  const testPostPath = path.join(testPostsDir, 'test-vitest-post.md');
  const testDraftPath = path.join(testPostsDir, 'test-vitest-draft.md');

  const testPost = `---
title: "Test Post for Vitest"
date: "2026-04-09"
excerpt: "Test excerpt for unit testing"
category: "Test"
section: "lado-a"
order: 1
draft: false
---

# Test Content

This is a test post for unit testing.`;

  const testDraft = `---
title: "Test Draft Post"
date: "2026-04-09"
excerpt: "Test draft excerpt"
category: "Test"
section: "lado-b"
order: 2
draft: true
---

# Draft Content

This is a draft post.`;

  beforeAll(() => {
    // Ensure test posts directory exists
    if (!fs.existsSync(testPostsDir)) {
      fs.mkdirSync(testPostsDir, { recursive: true });
    }

    // Create test posts
    fs.writeFileSync(testPostPath, testPost);
    fs.writeFileSync(testDraftPath, testDraft);
  });

  afterAll(() => {
    // Clean up test posts
    if (fs.existsSync(testPostPath)) {
      fs.unlinkSync(testPostPath);
    }
    if (fs.existsSync(testDraftPath)) {
      fs.unlinkSync(testDraftPath);
    }
  });

  describe('getAllPosts', () => {
    it('should return an array of posts', () => {
      const posts = getAllPosts();
      expect(posts).toBeDefined();
      expect(Array.isArray(posts)).toBe(true);
    });

    it('should not include draft posts', () => {
      const posts = getAllPosts();
      const draftPost = posts.find(p => p.title === 'Test Draft Post');
      expect(draftPost).toBeUndefined();
    });

    it('should include published posts', () => {
      const posts = getAllPosts();
      const testPost = posts.find(p => p.title === 'Test Post for Vitest');
      expect(testPost).toBeDefined();
      expect(testPost?.draft).toBe(false);
    });

    it('should sort posts by date (newest first)', () => {
      const posts = getAllPosts();
      if (posts.length > 1) {
        for (let i = 0; i < posts.length - 1; i++) {
          const current = new Date(posts[i].date);
          const next = new Date(posts[i + 1].date);
          expect(current.getTime()).toBeGreaterThanOrEqual(next.getTime());
        }
      }
    });

    it('should return posts with required fields', () => {
      const posts = getAllPosts();
      const testPost = posts.find(p => p.title === 'Test Post for Vitest');

      if (testPost) {
        expect(testPost.slug).toBeDefined();
        expect(testPost.title).toBeDefined();
        expect(testPost.date).toBeDefined();
        expect(testPost.excerpt).toBeDefined();
        expect(testPost.content).toBeDefined();
      }
    });
  });

  describe('getAllPostsIncludingDrafts', () => {
    it('should include draft posts', () => {
      const posts = getAllPostsIncludingDrafts();
      const draftPost = posts.find(p => p.title === 'Test Draft Post');
      expect(draftPost).toBeDefined();
      expect(draftPost?.draft).toBe(true);
    });

    it('should include published posts', () => {
      const posts = getAllPostsIncludingDrafts();
      const publishedPost = posts.find(p => p.title === 'Test Post for Vitest');
      expect(publishedPost).toBeDefined();
    });
  });

  describe('getPostBySlug', () => {
    it('should get post by valid slug', () => {
      const post = getPostBySlug('test-vitest-post');
      expect(post).toBeDefined();
      expect(post?.title).toBe('Test Post for Vitest');
      expect(post?.category).toBe('Test');
    });

    it('should return null for non-existent slug', () => {
      const post = getPostBySlug('non-existent-slug-xyz123');
      expect(post).toBeNull();
    });

    it('should return post with HTML content', () => {
      const post = getPostBySlug('test-vitest-post');
      expect(post?.content).toBeDefined();
      expect(post?.content).toContain('<h1>');
    });

    it('should handle draft posts', () => {
      const post = getPostBySlug('test-vitest-draft');
      expect(post).toBeDefined();
      expect(post?.draft).toBe(true);
    });
  });

  describe('getPostsBySection', () => {
    it('should return posts for specific section', () => {
      const posts = getPostsBySection('lado-a');
      expect(Array.isArray(posts)).toBe(true);

      const testPost = posts.find(p => p.title === 'Test Post for Vitest');
      expect(testPost).toBeDefined();
    });

    it('should not include posts from other sections', () => {
      const postsLadoA = getPostsBySection('lado-a');
      postsLadoA.forEach(post => {
        expect(post.section).toBe('lado-a');
      });
    });

    it('should not include draft posts', () => {
      const postsLadoB = getPostsBySection('lado-b');
      const draftPost = postsLadoB.find(p => p.draft === true);
      expect(draftPost).toBeUndefined();
    });

    it('should sort posts by order field', () => {
      const posts = getPostsBySection('lado-a');
      if (posts.length > 1) {
        for (let i = 0; i < posts.length - 1; i++) {
          const currentOrder = posts[i].order || 0;
          const nextOrder = posts[i + 1].order || 0;
          expect(currentOrder).toBeLessThanOrEqual(nextOrder);
        }
      }
    });
  });
});
