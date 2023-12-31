import Post from '@/components/post/post';
import createSupabaseServerClient from '@/lib/supabase/server';
import { readPosts } from '../../home/actions';

type UsersPostsType = {
  userId: string;
};

export default async function UsersPosts({ userId }: UsersPostsType) {
  const { data: posts } = await readPosts(userId);

  // const { data: reposts } = await supabase
  //   .from('reposts')
  //   .select()
  //   .eq('user_id', userId);

  return (
    <section className="py-3.5">
      <div className="pb-2.5">
        <p className="font-semibold text-lg p-1">Posts</p>
        <hr />
      </div>

      <section className="flex flex-col gap-5">
        {/* {reposts?.map(async (repost) => {
          const { data: reposted } = await supabase
            .from('posts')
            .select()
            .eq('id', repost.post_id);

          if (reposted && posts) {
            // return reposted?.map((post) => {
            //   return <Post key={post.id} {...post} />;
            // });

            return [...reposted, ...posts]?.map((post) => {
              return <Post key={post.id} {...post} />;
            });
          }
        })} */}

        {posts?.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </section>
    </section>
  );
}
