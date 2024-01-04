import { readPosts } from './actions';
import Post from '@/components/post/post';
import readUserSession from '@/lib/actions';
import CreatePost from '@/components/post/create-post';

export default async function Main() {
  const {
    data: { session },
  } = await readUserSession();

  const { data: posts } = await readPosts();

  return (
    <section className="flex flex-col gap-5">
      {session && <CreatePost />}
      {posts?.map((post: Post) => (
        <Post key={post.id} {...post} />
      ))}
    </section>
  );
}
