import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getPostBySlug } from '@/lib/posts';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
    const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.md`);

    fs.writeFileSync(filePath, fileContent, 'utf8');

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
  console.log('🗑️ DELETE request received');

  const authenticated = await isAuthenticated();
  console.log('🔐 Authenticated:', authenticated);

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await params;
    console.log('📄 Slug to delete:', slug);

    const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.md`);
    console.log('📂 File path:', filePath);
    console.log('📁 File exists:', fs.existsSync(filePath));

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('✅ File deleted successfully');
      return NextResponse.json({ success: true, message: 'Post deleted successfully' });
    } else {
      console.log('❌ File not found');
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('❌ Error deleting post:', error);
    return NextResponse.json({
      error: 'Server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
