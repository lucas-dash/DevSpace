import { checkForFollowedUser } from "@/app/(main)/[profileId]/actions";
import CommentDropdown from "./comment-dropdown";

type CommentActionsType = {
  createdBy: string;
  commentId: string;
  userId: string | undefined;
};

export default async function CommentActions({
  createdBy,
  commentId,
  userId,
}: CommentActionsType) {
  if (!userId) return;

  const { data: followData } = await checkForFollowedUser(userId, createdBy);

  return (
    <CommentDropdown
      activeUser={userId}
      createdBy={createdBy}
      followingData={followData}
      commentId={commentId}
    />
  );
}
