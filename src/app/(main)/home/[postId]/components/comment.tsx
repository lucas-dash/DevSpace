import PostUser from '@/components/post/post-user';
import UserAvatar from '@/components/ui/user-avatar';
import CommentActions from './comment-actions';
import CommentInteraction from './comment-interaction';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import ChildComment from './child-comment';
import CreateComment from './create-comment';
import Modal from '@/components/Modal';

export default async function Comment({
  content,
  user_id,
  created_at,
  parentCommentId,
  post_id,
  comment_id,
}: Comments) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: childComments } = await supabase
    .from('comments')
    .select()
    .eq('parentCommentId', comment_id)
    .order('created_at', { ascending: false });

  return (
    <section className="border-t border-slate-200 dark:border-slate-600">
      <article className="p-2.5 flex gap-3.5">
        <UserAvatar userId={user_id} />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <PostUser createdAt={created_at} createdBy={user_id} />
            <CommentActions createdBy={user_id} commentId={comment_id} />
          </div>
          <p className="py-1">{content}</p>
          <CommentInteraction
            comments={childComments?.length}
            commentId={comment_id}
          />
        </div>
      </article>

      {/* child comment styling */}

      {childComments?.length !== 0 &&
        childComments?.map((comment) => (
          <ChildComment key={comment.comment_id} {...comment} />
        ))}
    </section>
  );
}
