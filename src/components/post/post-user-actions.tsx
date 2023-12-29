'use client';

import { MessageCircle, Heart, Share, Bookmark } from 'lucide-react';
import { Button } from '../ui/button';
import {
  likePostByUserId,
  unlikePostByUserId,
} from '@/app/(main)/home/actions';
import { toast } from 'sonner';

type PostUserActionsType = {
  postId: string;
  userId: string;
  liked: Likes | null;
  likes: number | undefined;
};

export default function PostUserActions({
  postId,
  userId,
  likes,
  liked,
}: PostUserActionsType) {
  const handleLikeButton = async () => {
    const { error } = await likePostByUserId(postId, userId);
    if (!error?.message) {
      toast.success('Liked!');
    } else {
      toast.error(error?.message);
    }
  };

  const handleUnlikeButton = async () => {
    const { error } = await unlikePostByUserId(postId, userId);

    if (!error?.message) {
      toast.success('Unliked!');
    } else {
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center text-sm gap-1">
        <Button
          size={'icon'}
          className="rounded-full hover:text-green-500 dark:hover:text-green-600"
          variant={'ghost'}
        >
          <Share size={18} />
        </Button>
        <p>0</p>
      </div>

      <div className="flex items-center text-sm gap-1">
        <Button
          size={'icon'}
          className="rounded-full hover:text-blue-500 dark:hover:text-blue-600"
          variant={'ghost'}
        >
          <MessageCircle size={18} />
        </Button>
        <p>0</p>
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
        <p>{likes}</p>
      </div>

      <div className="flex items-center text-sm gap-1">
        <Button
          size={'icon'}
          className="rounded-full hover:text-orange-500 dark:hover:text-orange-600"
          variant={'ghost'}
        >
          <Bookmark size={18} />
        </Button>
        <p>0</p>
      </div>
    </div>
  );
}
