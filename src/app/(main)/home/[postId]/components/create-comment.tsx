import UserAvatar from "@/components/ui/user-avatar";
import CommentForm from "./comment-form";

type CreateCommentType = {
  createBy: string;
  postId?: string;
  commentId?: string;
  modal?: boolean;
};

export default async function CreateComment({
  createBy,
  postId,
  commentId,
  modal,
}: CreateCommentType) {
  return (
    <section className="flex gap-3 px-2.5">
      <div className="max-[480px]:hidden">
        <UserAvatar />
      </div>
      <CommentForm
        postId={postId}
        commentId={commentId}
        modal={modal}
        createdBy={createBy}
      />
    </section>
  );
}
