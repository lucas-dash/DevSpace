import Post from '@/components/post/post';
import { readPosts } from '../../home/actions';
import EmptyState from '@/components/empty-state';

type UsersPostsType = {
  userId: string;
};

export default async function UsersPosts({ userId }: UsersPostsType) {
  const { data: posts } = await readPosts(userId);

  return (
    <section className="flex flex-col gap-5">
      {posts?.length === 0 || !posts ? (
        <EmptyState title="No Posts Yet!" image className="text-base" />
      ) : (
        posts?.map((post) => <Post key={post.id} {...post} />)
      )}
    </section>
  );
}
