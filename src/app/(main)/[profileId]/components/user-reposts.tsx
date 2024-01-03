import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { readPosts } from '../../home/actions';
import Post from '@/components/post/post';

export default async function UserReposts({ userId }: { userId: string }) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: reposts } = await supabase
    .from('reposts')
    .select()
    .eq('user_id', userId);

  const { data: posts } = await readPosts();

  const repostPosts = reposts?.flatMap(
    (repost) => posts?.filter((post) => post.id === repost.post_id) || []
  );

  return (
    <section className="flex flex-col gap-5">
      {repostPosts?.length === 0 || !repostPosts ? (
        <div className="flex items-center justify-center py-5">
          <h3 className="font-semibold">No Reposts Yet!</h3>
        </div>
      ) : (
        repostPosts?.map((post) => <Post key={post.id} {...post} />)
      )}
    </section>
  );
}
