import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import PostEditor from '@/components/admin/PostEditor';

export default async function NewPostPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect('/admin/login');
  }

  return <PostEditor slug="new" />;
}
