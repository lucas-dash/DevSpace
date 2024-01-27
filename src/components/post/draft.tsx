'use client';

import { Button } from '../ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Loader2, Trash2 } from 'lucide-react';
import { DrawerClose } from '../ui/drawer';
import { deletePostById, postDraft } from '@/app/(main)/home/actions';

export default function Draft({ id, content }: Post) {
  const [isPending, startTransition] = useTransition();

  const updateDraft = () => {
    startTransition(async () => {
      const { error } = await postDraft(id);

      if (!error?.message) {
        toast.success('Draft has been posted!');
      } else {
        toast.error(error?.message);
      }
    });
  };

  const deleteDraft = async () => {
    const { error } = await deletePostById(id);

    if (!error?.message) {
      toast.success('Draft has been deleted!');
    } else {
      toast.error(error?.message);
    }
  };

  return (
    <article className="border-b border-primary-dark dark:border-primary py-2 px-4 flex items-center justify-between">
      <p className="font-medium pr-1.5">{content}</p>
      <div className="flex items-center gap-1.5">
        <DrawerClose asChild>
          <Button variant={'default'} onClick={updateDraft}>
            {isPending && <Loader2 className="animate-spin mr-1" />}
            Post
          </Button>
        </DrawerClose>
        <DrawerClose asChild>
          <Button variant={'destructive'} size={'icon'} onClick={deleteDraft}>
            <Trash2 />
          </Button>
        </DrawerClose>
      </div>
    </article>
  );
}
