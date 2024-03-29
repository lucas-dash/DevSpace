import { checkForFollowedUser } from "@/app/(main)/[profileId]/actions";
import { getUser } from "@/lib/actions";
import PostDropdown from "./post-dropdown";
import AlertState from "../ui/state/alert-state";

type PostActionsType = {
  createdBy: string;
  postId: string;
};

export default async function PostActions({
  postId,
  createdBy,
}: PostActionsType) {
  const {
    data: { user },
  } = await getUser();

  if (!user) {
    return;
  }

  const { data: followData, error } = await checkForFollowedUser(
    user.id,
    createdBy,
  );

  if (error?.message) {
    return <AlertState errorMessage={error?.message} />;
  }

  return (
    <PostDropdown
      postId={postId}
      user={user}
      createdById={createdBy}
      followingData={followData?.length}
    />
  );
}
