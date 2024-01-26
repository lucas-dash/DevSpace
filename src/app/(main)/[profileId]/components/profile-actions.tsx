import Link from 'next/link';
import { Button } from '@/components/ui/button';
import FollowButton from './follow-button';
import Modal from '@/components/modal';
import SendEmail from './send-email';
import { User } from '@supabase/supabase-js';
import { checkForFollowedUser } from '../actions';

type ProfileActionsType = {
  currentUser: User | null;
  profileId: string;
  userId: string;
  hireEmail: string | null;
  username: string;
};

export default async function ProfileActions({
  currentUser,
  profileId,
  userId,
  hireEmail,
  username,
}: ProfileActionsType) {
  if (!currentUser) {
    return;
  }

  const { data } = await checkForFollowedUser(currentUser?.id, userId);

  const isUserProfile =
    currentUser.user_metadata.username === profileId ||
    currentUser.user_metadata.user_name === profileId;

  return (
    <div className="flex gap-2.5 max-sm:flex-col">
      {isUserProfile ? (
        <Button asChild variant={'outline'}>
          <Link href="/setting">Edit Profile</Link>
        </Button>
      ) : (
        <>
          {hireEmail && (
            <Modal
              title={`Contact ${username} here.`}
              buttonChildren="Get in touch"
              buttonVariant={'outline'}
            >
              <SendEmail hireEmail={hireEmail} />
            </Modal>
          )}
          <FollowButton
            userId={currentUser.id}
            followId={userId}
            followed={data}
          />
        </>
      )}
    </div>
  );
}
