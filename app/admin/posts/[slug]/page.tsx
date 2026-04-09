import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import PostEditor from '@/components/admin/PostEditor';

export default async function EditPostPage({ params }: { params: { slug: string } }) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/admin/login');
  }

  return <PostEditor slug={params.slug} />;
}
