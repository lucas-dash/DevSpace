import PostForm from '@/components/post/post-form';
import { readPosts } from './actions';
import Post from '@/components/post/post';
import readUserSession from '@/lib/actions';

export default async function Main() {
  const { data: posts } = await readPosts();
  const {
    data: { session },
  } = await readUserSession();

  return (
    <section className="flex flex-col gap-5">
      <PostForm session={session} />
      {posts?.map((post: Post) => (
        <Post key={post.id} {...post} />
      ))}
    </section>
  );
}
