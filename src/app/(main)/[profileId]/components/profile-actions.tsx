import { Button } from '@/components/ui/button';
import Link from 'next/link';
import FollowButton from './follow-button';
import { Session } from '@supabase/supabase-js';
import { checkForFollowedUser } from '../actions';

type ProfileActionsType = {
  session: Session | null;
  profileId: string;
  id: string;
};

export default async function ProfileActions({
  session,
  profileId,
  id,
}: ProfileActionsType) {
  if (!session) {
    return;
  }

  const { data } = await checkForFollowedUser(session?.user.id, id);

  return (
    <div className="flex gap-2.5 max-sm:flex-col">
      {session?.user.user_metadata.username === profileId ? (
        <Button asChild variant={'outline'}>
          <Link href="/setting">Edit Profile</Link>
        </Button>
      ) : (
        <>
          <Button variant={'outline'}>Get in touch</Button>
          <FollowButton
            userId={session?.user.id}
            followId={id}
            followed={data}
          />
        </>
      )}
    </div>
  );
}
