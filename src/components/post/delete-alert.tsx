import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { FormEvent, useTransition } from 'react';
import { deletePostById } from '@/app/(main)/home/actions';

export default function DeleteAlert({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const deleteOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await deletePostById(id);
      const { error } = JSON.parse(result);
      // toast

      if (error?.message) {
        // toast failded
        console.log('failed');
      } else {
        // success
        console.log('success');
      }
    });
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your post.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <form onSubmit={deleteOnSubmit}>
          <Button variant={'destructive'} className="flex items-center w-full">
            {isPending && <Loader2 className="mr-1 animate-spin" size={20} />}
            Delete
          </Button>
        </form>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
