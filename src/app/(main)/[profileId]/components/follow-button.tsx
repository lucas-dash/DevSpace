'use client';

import { Button } from '@/components/ui/button';
import { followUser, unfollowUser } from '../actions';
import { Loader2, UserRoundPlus, UserRoundMinus } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type FollowButtonType = {
  userId: string | undefined;
  followId: string;
  followed: Following[] | null;
};

export default function FollowButton({
  userId,
  followId,
  followed,
}: FollowButtonType) {
  const [isPending, startTranstion] = useTransition();
  const router = useRouter();

  if (!userId) {
    return;
  }

  const handleFollowUser = () => {
    startTranstion(async () => {
      const { error } = await followUser(userId, followId);

      if (!error?.message) {
        toast.success('You started following the new user!');
        router.refresh();
      } else {
        toast.error('Something went wrong!');
      }
    });
  };

  const handleUnfollowUser = () => {
    startTranstion(async () => {
      const { error } = await unfollowUser(userId, followId);

      if (!error?.message) {
        toast.success('Unfollowing the user was successful!');
        router.refresh();
      } else {
        toast.error('Something went wrong!');
      }
    });
  };

  if (followed?.length !== 0) {
    return (
      <Button
        variant={'destructive'}
        onClick={handleUnfollowUser}
        disabled={isPending}
        aria-disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="mr-1 animate-spin" size={20} />
        ) : (
          <UserRoundMinus className="mr-1" size={20} />
        )}
        Unfollow
      </Button>
    );
  }

  return (
    <Button
      variant={'accent'}
      onClick={handleFollowUser}
      disabled={isPending}
      aria-disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="mr-1 animate-spin" size={20} />
      ) : (
        <UserRoundPlus className="mr-1" size={20} />
      )}
      Follow
    </Button>
  );
}
