'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle, Heart } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { likeComment, unlikeComment } from '@/lib/actions/comments';

type CommentInteractionType = {
  comments?: number | undefined;
  commentId: string;
  userId: string;
  liked: Likes | null;
  likes: number | undefined;
};

export default function CommentInteraction({
  comments,
  commentId,
  userId,
  liked,
  likes,
}: CommentInteractionType) {
  const handleLikeButton = async () => {
    const { error } = await likeComment(commentId, userId);
    if (!error?.message) {
      toast.success('Liked!');
    } else {
      toast.error(error?.message);
    }
  };

  const handleUnlikeButton = async () => {
    const { error } = await unlikeComment(commentId, userId);

    if (!error?.message) {
      toast.success('Unliked!');
    } else {
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center text-sm gap-1">
        <Link href={`?comment=${commentId}`}>
          <Button
            size={'icon'}
            className="rounded-full hover:text-blue-500 dark:hover:text-blue-600"
            variant={'ghost'}
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