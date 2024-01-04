import { Button } from '@/components/ui/button';
import Link from 'next/link';
import FollowButton from './follow-button';
import { User } from '@supabase/supabase-js';
import { checkForFollowedUser } from '../actions';

type ProfileActionsType = {
  user: User | null;
  profileId: string;
  id: string;
};

export default async function ProfileActions({
  user,
  profileId,
  id,
}: ProfileActionsType) {
  if (!user) {
    return;
  }

  const { data } = await checkForFollowedUser(user?.id, id);

  return (
    <div className="flex gap-2.5 max-sm:flex-col">
      {user.user_metadata.username === profileId ? (
        <Button asChild variant={'outline'}>
          <Link href="/setting">Edit Profile</Link>
        </Button>
      ) : (
        <>
          <Button variant={'outline'}>Get in touch</Button>
          <FollowButton userId={user.id} followId={id} followed={data} />
        </>
      )}
    </div>
  );
}
