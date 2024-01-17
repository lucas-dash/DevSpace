import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import Comment from './comment';

type PostCommentsType = {
  postId: string;
};

export default async function PostComments({ postId }: PostCommentsType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: comments } = await supabase
    .from('comments')
    .select()
    .eq('post_id', postId)
    .order('created_at', { ascending: false });

  return (
    <section className="flex flex-col gap-2">
      {comments?.map((comment) => (
        <Comment key={comment.comment_id} comment={comment} postId={postId} />
      ))}
    </section>
  );
}
