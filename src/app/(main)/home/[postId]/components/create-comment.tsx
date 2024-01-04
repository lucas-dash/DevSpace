import UserAvatar from '@/components/ui/user-avatar';
import CommentForm from './comment-form';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase/server';

type CreateCommentType = {
  postId: string;
};

export default async function CreateComment({ postId }: CreateCommentType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  return (
    <section className="flex gap-3 px-2.5">
      <div className="max-[480px]:hidden">
        <UserAvatar />
      </div>
      <CommentForm postId={postId} userId={user?.id} />
    </section>
  );
}
