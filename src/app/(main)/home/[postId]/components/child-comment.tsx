import PostUser from '@/components/post/post-user';
import UserAvatar from '@/components/ui/user-avatar';
import CommentActions from './comment-actions';
import CommentInteraction from './comment-interaction';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { checkLikedComment, getLikesByCommentId } from '@/lib/actions/comments';

export default async function ChildComment({
  user_id,
  created_at,
  content,
  comment_id,
}: Comments) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: childComments } = await supabase
    .from('comments')
    .select()
    .eq('parentCommentId', comment_id)
    .order('created_at', { ascending: false });

  const { data: liked } = await checkLikedComment(comment_id, user_id);
  const { data: likes } = await getLikesByCommentId(comment_id);

  return (
    <section>
      <article className="px-5 py-2.5 flex gap-3.5">
        <UserAvatar userId={user_id} />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <PostUser createdAt={created_at} createdBy={user_id} />
            <CommentActions createdBy={user_id} commentId={comment_id} />
          </div>
          <p className="py-1">{content}</p>

          <CommentInteraction
            commentId={comment_id}
            comments={childComments?.length}
            userId={user_id}
            liked={liked}
            likes={likes?.length}
          />
        </div>
      </article>
      {childComments?.length !== 0 &&
        childComments?.map((comment) => (
          <ChildComment key={comment.comment_id} {...comment} />
        ))}
    </section>
  );
}
