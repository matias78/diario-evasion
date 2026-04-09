import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getAllPostsIncludingDrafts } from '@/lib/posts';

export async function GET() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const posts = getAllPostsIncludingDrafts();
  return NextResponse.json(posts);
}
