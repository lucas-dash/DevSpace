import UserAvatar from "../ui/user-avatar";
import CommentHeader from "./comment-header";
import CommentInteraction from "./comment-interaction";

type CommentProps = {
  createdBy: string;
  createdAt: string;
  commentDivider: boolean | undefined;
  commentId: string;
  postId: string;
  comments: number | undefined;
  content: string;
};
export default function Comment({
  commentDivider,
  commentId,
  postId,
  comments,
  createdAt,
  createdBy,
  content,
}: CommentProps) {
  return (
    <article className={"px-2.5 max-[380px]:px-0 flex gap-3.5 relative"}>
      {commentDivider && (
        <div className="border-l-2 border-slate-200 dark:border-slate-600 absolute top-1/2 left-7 h-20" />
      )}
      <UserAvatar userId={createdBy} />

      <div className="flex-1">
        <CommentHeader
          commentId={commentId}
          createdAt={createdAt}
          createdBy={createdBy}
        />
        <p className="py-1">{content}</p>
        <CommentInteraction
          comments={comments}
          commentId={commentId}
          createdBy={createdBy}
          postId={postId}
        />
      </div>
    </article>
  );
}
