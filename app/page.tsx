import { getAllPosts } from '@/lib/posts';
import PostsList from '@/components/PostsList';

export default function Home() {
  const posts = getAllPosts();

  return <PostsList posts={posts} />;
}
