import Post from '@/components/post/post';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

type PostType = {
  params: {
    postId: string;
  };
};

export default async function PostId({ params: { postId } }: PostType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();

  if (!post) {
    return;
  }
  return (
    <section>
      <Post {...post} />
      {/* //todo comments */}
    </section>
  );
}
