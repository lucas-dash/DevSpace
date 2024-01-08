import UserAvatar from '@/components/ui/user-avatar';
import CommentForm from './comment-form';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase/server';

type CreateCommentType = {
  postId?: string;
  commentId?: string;
};

export default async function CreateComment({
  postId,
  commentId,
}: CreateCommentType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // delete user.id from supabase table and automatic asign user.id
  if (!user) return;

  return (
    <section className="flex gap-3 px-2.5">
      <div className="max-[480px]:hidden">
        <UserAvatar />
      </div>
      <CommentForm postId={postId} userId={user?.id} commentId={commentId} />
    </section>
  );
}
