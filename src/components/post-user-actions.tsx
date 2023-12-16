import { MessageCircle, Heart, Share, Bookmark } from 'lucide-react';
import { Button } from './ui/button';

type PostUserActionsType = {
  likes: number;
  reposts: number;
  bookmarks: number;
};

export default function PostUserActions({
  reposts,
  likes,
  bookmarks,
}: PostUserActionsType) {
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
        <p>{reposts}</p>
      </div>

      <div className="flex items-center text-sm gap-1">
        <Button
          size={'icon'}
          className="rounded-full hover:text-blue-500 dark:hover:text-blue-600"
          variant={'ghost'}
        >
          <MessageCircle size={18} />
        </Button>
        <p>20</p>
      </div>

      <div className="flex items-center text-sm gap-1">
        <Button
          size={'icon'}
          className="rounded-full hover:text-red-500 dark:hover:text-red-600"
          variant={'ghost'}
        >
          <Heart size={18} />
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
        <p>{bookmarks}</p>
      </div>
    </div>
  );
}
