import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getPostBySlug } from '@/lib/posts';
import { isProduction, createOrUpdateFileInGitHub, deleteFileInGitHub } from '@/lib/github';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const body = await request.json();
    const { title, content, excerpt, category, section, order, draft, date } = body;

    const frontmatter = {
      title,
      date,
      excerpt,
      category,
      section,
      order: parseInt(order) || 0,
      draft: Boolean(draft),
    };

    const fileContent = matter.stringify(content, frontmatter);
    const filePath = `content/posts/${slug}.md`;

    if (isProduction()) {
      // Use GitHub API in production
      const success = await createOrUpdateFileInGitHub(
        filePath,
        fileContent,
        `Update post: ${title}`
      );

      if (!success) {
        return NextResponse.json({ error: 'Failed to update post in GitHub' }, { status: 500 });
      }
    } else {
      // Use file system in local development
      const localPath = path.join(process.cwd(), filePath);
      fs.writeFileSync(localPath, fileContent, 'utf8');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const filePath = `content/posts/${slug}.md`;

    if (isProduction()) {
      // Use GitHub API in production
      const success = await deleteFileInGitHub(
        filePath,
        `Delete post: ${slug}`
      );

      if (!success) {
        return NextResponse.json({ error: 'Failed to delete post in GitHub' }, { status: 500 });
      }
    } else {
      // Use file system in local development
      const localPath = path.join(process.cwd(), filePath);

      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
      } else {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
    }

    return NextResponse.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({
      error: 'Server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
