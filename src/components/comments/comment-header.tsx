import CommentActions from "@/components/comments/comment-actions";
import UserInfo from "../post/user-info";

type CommentHeaderProps = {
  createdBy: string;
  createdAt: string;
  commentId: string;
};
export default function CommentHeader({
  createdAt,
  createdBy,
  commentId,
}: CommentHeaderProps) {
  return (
    <section className="flex items-center justify-between">
      <UserInfo createdBy={createdBy} createdAt={createdAt} />
      <CommentActions createdBy={createdBy} commentId={commentId} />
    </section>
  );
}
