import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import CommentDropdown from './comment-dropdown';
import { checkForFollowedUser } from '@/app/(main)/[profileId]/actions';

type CommentActionsType = {
  createdBy: string;
  commentId: string;
};

export default async function CommentActions({
  createdBy,
  commentId,
}: CommentActionsType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data: followData } = await checkForFollowedUser(user?.id, createdBy);

  return (
    <CommentDropdown
      activeUser={user.id}
      createdBy={createdBy}
      followingData={followData}
      commentId={commentId}
    />
  );
}
