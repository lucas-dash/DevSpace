'use client';

import { MessageCircle, Heart, Share, Bookmark } from 'lucide-react';
import { Button } from '../ui/button';
import {
  bookmarkPost,
  likePost,
  unbookmarkPost,
  unlikePost,
} from '@/app/(main)/home/actions';
import { toast } from 'sonner';

type PostUserActionsType = {
  postId: string;
  userId: string;
  liked: Likes | null;
  likes: number | undefined;
  bookmarked: Bookmarks | null;
  bookmarks: number | undefined;
};

export default function PostUserActions({
  postId,
  userId,
  liked,
  likes,
  bookmarked,
  bookmarks,
}: PostUserActionsType) {
  // likes actions
  const handleLikeButton = async () => {
    const { error } = await likePost(postId, userId);
    if (!error?.message) {
      toast.success('Liked!');
    } else {
      toast.error(error?.message);
    }
  };

  const handleUnlikeButton = async () => {
    const { error } = await unlikePost(postId, userId);

    if (!error?.message) {
      toast.success('Unliked!');
    } else {
      toast.error(error?.message);
    }
  };

  // bookmark actions
  const handleBookmarkButton = async () => {
    const { error } = await bookmarkPost(postId, userId);
    if (!error?.message) {
      toast.success('Bookmarked!');
    } else {
      toast.error(error?.message);
    }
  };

  const handleUnbookmarkButton = async () => {
    const { error } = await unbookmarkPost(postId, userId);
    if (!error?.message) {
      toast.success('Unbookmarked!');
    } else {
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex items-center justify-between pr-2">
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

      <div className="flex items-center text-sm gap-1 ">
        <Button
          size={'icon'}
          className={`rounded-full hover:text-orange-500 dark:hover:text-orange-600 ${
            bookmarked ? 'text-orange-500 dark:text-orange-600' : ''
          }`}
          variant={'ghost'}
          onClick={!bookmarked ? handleBookmarkButton : handleUnbookmarkButton}
        >
          <Bookmark
            size={18}
            className={`${
              bookmarked ? 'fill-orange-500 dark:fill-orange-600 ' : ''
            }`}
          />
        </Button>
        <p>{bookmarks}</p>
      </div>
    </div>
  );
}
