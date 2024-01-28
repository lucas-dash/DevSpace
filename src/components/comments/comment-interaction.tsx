import { getUser } from "@/lib/actions";
import {
  checkLikedComment,
  getLikesByCommentId,
} from "@/app/(main)/home/[postId]/actions/comments";
import LikeButton from "../features/like-button";
import CommentButton from "../features/comment-button";

type CommentInteractionType = {
  comments?: number | undefined;
  commentId: string;
  createdBy: string;
  postId: string;
};

export default async function CommentInteraction({
  comments,
  commentId,
  createdBy,
  postId,
}: CommentInteractionType) {
  const {
    data: { user },
  } = await getUser();

  if (!user) return;

  const { data: liked } = await checkLikedComment(commentId, user?.id);
  const { data: likes } = await getLikesByCommentId(commentId);

  return (
    <div className="flex items-center gap-5">
      <CommentButton
        comments={comments}
        postId={postId}
        createdBy={createdBy}
        commentId={commentId}
        userId={user.id}
        aria-label={user ? "replay to comment" : "you must be logged in"}
      />

      <LikeButton
        createdBy={createdBy}
        liked={liked}
        likes={likes?.length}
        userId={user?.id}
        commentId={commentId}
        postId={postId}
      />
    </div>
  );
}
