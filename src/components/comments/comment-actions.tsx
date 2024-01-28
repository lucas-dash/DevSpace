import { getUser } from "@/lib/actions";
import { checkForFollowedUser } from "@/app/(main)/[profileId]/actions";
import AlertState from "@/components/ui/state/alert-state";
import CommentDropdown from "./comment-dropdown";

type CommentActionsType = {
  createdBy: string;
  commentId: string;
};

export default async function CommentActions({
  createdBy,
  commentId,
}: CommentActionsType) {
  const {
    data: { user },
  } = await getUser();

  if (!user) return;

  const { data: followData, error } = await checkForFollowedUser(
    user.id,
    createdBy,
  );

  if (error?.message) {
    return <AlertState errorMessage={error?.message} />;
  }

  return (
    <CommentDropdown
      commentId={commentId}
      currentUser={user.id}
      createdById={createdBy}
      followingData={followData?.length}
    />
  );
}
