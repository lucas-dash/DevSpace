import { Button } from '@/components/ui/button';
import Link from 'next/link';
import FollowButton from './follow-button';
import { User } from '@supabase/supabase-js';
import { checkForFollowedUser } from '../actions';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Modal from '@/components/modal';
import SendEmail from './send-email';

type ProfileActionsType = {
  currentUser: User | null;
  profileId: string;
  userId: string;
  hireEmail: string | null;
};

export default async function ProfileActions({
  currentUser,
  profileId,
  userId,
  hireEmail,
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={'outline'}>Get in touch</Button>
              </DialogTrigger>
              <Modal title="Contact User here">
                <SendEmail hireEmail={hireEmail} />
              </Modal>
            </Dialog>
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
