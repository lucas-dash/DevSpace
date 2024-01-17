'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { readNotification } from '../actions/notification';

type ReadButtonType = {
  notifyId: string;
};

export default function ReadButton({ notifyId }: ReadButtonType) {
  const handleReadNotification = async () => {
    const { error } = await readNotification(notifyId);

    if (error?.message) {
      console.log(error?.message);
    }
  };

  return (
    <div className="absolute -top-2 -right-2">
      <Button
        variant={'ghost'}
        size={'icon'}
        className="rounded-full"
        onClick={handleReadNotification}
      >
        <CheckCircle size={20} />
      </Button>
    </div>
  );
}
