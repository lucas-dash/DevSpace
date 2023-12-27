import { checkForFollowedUser } from '@/app/(main)/[profileId]/actions';
import { Session } from '@supabase/supabase-js';
import PostDropdown from './post-dropdown';

type PostAsyncActionsType = {
  postId: string;
  session: Session | null;
  createdById: string;
};

export default async function PostAsyncActions({
  session,
  postId,
  createdById,
}: PostAsyncActionsType) {
  if (!session) {
    return;
  }

  const { data } = await checkForFollowedUser(session.user.id, createdById);

  return (
    <PostDropdown
      postId={postId}
      user={session.user}
      createdById={createdById}
      followingData={data}
    />
  );
}
