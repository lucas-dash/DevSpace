'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { PostSchema } from '@/lib/validations';
import { createComment, replayToComment } from '@/lib/actions/comments';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';

type CommentFormType = {
  postId?: string;
  userId: string;
  commentId?: string;
};

export default function CommentForm({
  postId,
  userId,
  commentId,
}: CommentFormType) {
  const [isPending, startTransition] = useTransition();
  const path = usePathname();

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: '',
    },
  });

  function onSubmit(data: z.infer<typeof PostSchema>) {
    startTransition(async () => {
      if (commentId) {
        const { error } = await replayToComment(
          data.content,
          commentId,
          userId,
          path
        );

        if (!error?.message) {
          toast.success('Sent!');
          form.reset();
        } else {
          toast.error(error?.message);
        }
      }

      if (postId) {
        const { error } = await createComment(
          data.content,
          postId,
          userId,
          path
        );
        if (!error?.message) {
          toast.success('Sent!');
          form.reset();
        } else {
          toast.error(error?.message);
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 w-full flex gap-2.5"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea
                  placeholder="Post your reply."
                  className="resize-none rounded-lg"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-2xl"
          disabled={isPending}
          aria-disabled={isPending}
        >
          {isPending && <Loader2 className="animate-spin mr-1" />}
          Reply
        </Button>
      </form>
    </Form>
  );
}
