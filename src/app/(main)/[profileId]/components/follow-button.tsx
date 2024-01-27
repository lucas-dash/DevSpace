'use client';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { VariantProps } from 'class-variance-authority';
import { Loader2, UserRoundPlus, UserRoundMinus } from 'lucide-react';
import { HTMLAttributes, useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { sendNotification } from '../../notification/actions/notification';
import { followUser, unfollowUser } from '../actions';

type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
type ButtonSize = VariantProps<typeof buttonVariants>['size'];

type FollowButtonProps = {
  currentUser: string | undefined;
  profileId: string;
  isFollowing: number | undefined;
  variant?: ButtonVariant;
  unVariant?: ButtonVariant;
  size?: ButtonSize;
} & HTMLAttributes<HTMLButtonElement>;

export default function FollowButton({
  currentUser,
  profileId,
  isFollowing,
  variant = 'accent',
  unVariant = 'destructive',
  size = 'default',
  className,
  ...props
}: FollowButtonProps) {
  const [isPending, startTranstion] = useTransition();
  const router = useRouter();

  if (!currentUser) {
    return;
  }

  const handleFollowUser = () => {
    startTranstion(async () => {
      const { error } = await followUser(currentUser, profileId);

      if (!error?.message) {
        toast.success('You started following the new user!');

        const { error: notifyError } = await sendNotification(
          profileId,
          'follows',
          profileId
        );

        if (notifyError?.message) {
          console.log(notifyError?.message);
        }
        router.refresh();
      } else {
        toast.error('Something went wrong!');
      }
    });
  };

  const handleUnfollowUser = () => {
    startTranstion(async () => {
      const { error } = await unfollowUser(currentUser, profileId);

      if (!error?.message) {
        toast.success('Unfollowing the user was successful!');
        router.refresh();
      } else {
        toast.error('Something went wrong!');
      }
    });
  };

  return (
    <Button
      variant={isFollowing ? unVariant : variant}
      size={size}
      onClick={isFollowing ? handleUnfollowUser : handleFollowUser}
      disabled={isPending}
      aria-disabled={isPending}
      className={cn(className, '')}
      {...props}
    >
      {isPending ? (
        <Loader2 className="mr-1 animate-spin" size={20} />
      ) : isFollowing ? (
        <UserRoundMinus className="mr-1" size={20} />
      ) : (
        <UserRoundPlus className="mr-1" size={20} />
      )}
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}
