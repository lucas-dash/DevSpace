import Post from '@/components/post/post';
import { readPosts } from '../../home/actions';

type UsersPostsType = {
  userId: string;
};

export default async function UsersPosts({ userId }: UsersPostsType) {
  const { data: posts } = await readPosts(userId);

  return (
    <section className="flex flex-col gap-5">
      {posts?.length === 0 || !posts ? (
        <div className="flex items-center justify-center py-5">
          <h3 className="font-semibold">No Posts Yet!</h3>
        </div>
      ) : (
        posts?.map((post) => <Post key={post.id} {...post} />)
      )}
    </section>
  );
}
