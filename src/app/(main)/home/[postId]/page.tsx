import Post from '@/components/post';
import createSupabaseServerClient from '@/lib/supabase/server';

type PostType = {
  params: {
    postId: string;
  };
};

export default async function PostId({ params: { postId } }: PostType) {
  const supabase = await createSupabaseServerClient();
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId);

  if (!post) {
    return;
  }
  return (
    <div>
      <Post {...post[0]} />
    </div>
  );
}
