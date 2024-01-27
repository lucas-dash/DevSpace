import { checkForFollowedUser } from "@/app/(main)/[profileId]/actions";
import { User } from "@supabase/supabase-js";
import PostDropdown from "./post-dropdown";

type PostAsyncActionsType = {
  postId: string;
  user: User | null;
  createdBy: string;
};

export default async function PostActions({
  user,
  postId,
  createdBy,
}: PostAsyncActionsType) {
  if (!user) {
    return;
  }

  const { data } = await checkForFollowedUser(user.id, createdBy);

  return (
    <PostDropdown
      postId={postId}
      user={user}
      createdById={createdBy}
      followingData={data}
    />
  );
}
