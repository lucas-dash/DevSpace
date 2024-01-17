import PostUser from '@/components/post/post-user';
import UserAvatar from '@/components/ui/user-avatar';
import CommentActions from './comment-actions';
import CommentInteraction from './comment-interaction';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import ChildComment from './child-comment';
import { checkLikedComment, getLikesByCommentId } from '@/lib/actions/comments';

type CommentType = {
  comment: Comments;
  postId: string;
};

export default async function Comment({
  comment: { content, user_id, created_at, comment_id },
  postId,
}: CommentType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: childComments } = await supabase
    .from('comments')
    .select()
    .eq('parentCommentId', comment_id)
    .order('created_at', { ascending: false });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: liked } = await checkLikedComment(comment_id, user_id);
  const { data: likes } = await getLikesByCommentId(comment_id);

  const commentDivider = childComments?.some(
    (comment) => comment.parentCommentId === comment_id
  );

  return (
    <section className="border-t border-slate-200 dark:border-slate-600 py-2.5">
      <article className={'px-2.5 max-[380px]:px-0 flex gap-3.5 relative'}>
        {commentDivider && (
          <div className="border-l-2 border-slate-200 dark:border-slate-600 absolute top-1/2 left-7 h-20"></div>
        )}
        <UserAvatar userId={user_id} />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <PostUser createdAt={created_at} createdBy={user_id} />
            <CommentActions
              createdBy={user_id}
              commentId={comment_id}
              userId={user?.id}
            />
          </div>
          <p className="py-1">{content}</p>
          <CommentInteraction
            comments={childComments?.length}
            commentId={comment_id}
            createdBy={user_id}
            liked={liked}
            likes={likes?.length}
            userId={user?.id}
            postId={postId}
          />
        </div>
      </article>

      {childComments?.length !== 0 &&
        childComments?.map((comment) => (
          <ChildComment
            key={comment.comment_id}
            comment={comment}
            postId={postId}
          />
        ))}
    </section>
  );
}
