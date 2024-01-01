import Post from '@/components/post/post';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

type UsersPostsType = {
  userId: string;
};

export default async function UsersPosts({ userId }: UsersPostsType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: posts } = await supabase
    .from('posts')
    .select()
    .eq('created_by', userId)
    .order('created_at', { ascending: false });

  return (
    <section className="py-3.5">
      <div className="pb-2.5">
        <p className="font-semibold text-lg p-1">Posts</p>
        <hr />
      </div>

      <section className="flex flex-col gap-5">
        {posts?.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </section>
    </section>
  );
}
