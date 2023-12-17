import PostForm from '@/components/post/post-form';
import { readPosts } from './actions';
import Post from '@/components/post/post';

export default async function Main() {
  const { data: posts } = await readPosts();

  return (
    <section className="flex flex-col gap-5">
      <PostForm />
      {posts?.map((post: Post) => (
        <Post key={post.id} {...post} />
      ))}
    </section>
  );
}
