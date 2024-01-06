import PostUser from '@/components/post/post-user';
import UserAvatar from '@/components/ui/user-avatar';
import CommentActions from './comment-actions';

export default function Comment({
  content,
  user_id,
  created_at,
  parentCommentId,
  post_id,
  comment_id,
}: Comments) {
  return (
    <article className="p-2.5 flex gap-3.5">
      <UserAvatar userId={user_id} />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <PostUser createdAt={created_at} createdBy={user_id} />
          <CommentActions createdBy={user_id} commentId={comment_id} />
        </div>
        <p className="py-1">{content}</p>
      </div>
      {/* comment interaction */}
    </article>
  );
}
