import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, content, excerpt, category, section, order, draft, date } = body;

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

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

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Post with this title already exists' }, { status: 400 });
    }

    fs.writeFileSync(filePath, fileContent, 'utf8');

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
