import Post from '@/components/post/post';
import { readPosts } from '../../home/actions';

type UsersPostsType = {
  userId: string;
};

export default async function UsersPosts({ userId }: UsersPostsType) {
  const { data: posts } = await readPosts(userId);

  return (
    <section className="flex flex-col gap-5 py-3.5">
      {posts?.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </section>
  );
}
