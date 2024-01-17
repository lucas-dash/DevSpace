'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle, Heart } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { likeComment, unlikeComment } from '@/lib/actions/comments';
import { sendNotification } from '@/app/(main)/notification/actions/notification';

type CommentInteractionType = {
  comments?: number | undefined;
  commentId: string;
  createdBy: string;
  liked: Likes | null;
  likes: number | undefined;
  userId: string | undefined;
};

export default function CommentInteraction({
  comments,
  commentId,
  createdBy,
  liked,
  likes,
  userId,
}: CommentInteractionType) {
  const handleLikeButton = async () => {
    const { error } = await likeComment(commentId, createdBy);
    if (!error?.message) {
      toast.success('Liked!');

      // notification
      if (userId !== createdBy) {
        const { error: notifyError } = await sendNotification(
          createdBy,
          'comments',
          commentId
        );
        notifyError?.message && console.log(notifyError?.message);
      }
    } else {
      toast.error(error?.message);
    }
  };

  const handleUnlikeButton = async () => {
    const { error } = await unlikeComment(commentId, createdBy);

    if (!error?.message) {
      toast.success('Unliked!');
    } else {
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center text-sm gap-1">
        <Link
          href={`${
            userId ? `?comment=${commentId}&createdBy=${createdBy}` : '/auth'
          }`}
        >
          <Button
            size={'icon'}
            className="rounded-full hover:text-blue-500 dark:hover:text-blue-600"
            variant={'ghost'}
            aria-label={`${
              userId ? 'comment button' : 'you must be login to comment'
            }`}
          >
            <MessageCircle size={18} />
          </Button>
        </Link>
        {comments && <p className="font-medium">{comments}</p>}
      </div>

      <div className="flex items-center text-sm gap-1">
        <Button
          size={'icon'}
          className={`rounded-full group hover:text-red-500 dark:hover:text-red-600 ${
            liked ? 'text-red-500 dark:text-red-600' : ''
          }`}
          variant={'ghost'}
          aria-label="like comment"
          disabled={!userId}
          aria-disabled={!userId}
          onClick={!liked ? handleLikeButton : handleUnlikeButton}
        >
          <Heart
            size={18}
            className={`${liked ? 'fill-red-500 dark:fill-red-600 ' : ''}`}
          />
        </Button>
        <p className="font-medium">{likes}</p>
      </div>
    </div>
  );
}
