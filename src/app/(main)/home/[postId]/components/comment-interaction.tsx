'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle, Heart } from 'lucide-react';
import Link from 'next/link';

type CommentInteractionType = {
  comments?: number | undefined;
};

export default function CommentInteraction({
  comments,
}: CommentInteractionType) {
  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center text-sm gap-1">
        <Link href={'/'}>
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
            false ? 'text-red-500 dark:text-red-600' : ''
          }`}
          variant={'ghost'}
          //   onClick={!liked ? handleLikeButton : handleUnlikeButton}
        >
          <Heart
            size={18}
            // className={`${liked ? 'fill-red-500 dark:fill-red-600 ' : ''}`}
          />
        </Button>
        <p className="font-medium">{0}</p>
      </div>
    </div>
  );
}
