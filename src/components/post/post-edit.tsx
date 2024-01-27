'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { PostSchema } from '@/lib/validations';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { updatePostById } from '@/app/(main)/home/actions';

type PostEditType = {
  post: Post;
  user: string;
};

export default function PostEdit({
  post: { content, id },
  user,
}: PostEditType) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: content || '',
    },
  });

  function onSubmit(data: z.infer<typeof PostSchema>) {
    startTransition(async () => {
      const result = await updatePostById(id, data.content, pathname, user);

      const { error } = JSON.parse(result);

      if (!error?.message) {
        toast.success('The post has been edited!');
        router.back();
      } else {
        toast.warning(error?.message);
      }
    });
  }

  return (
    <article>
      <h3 className="text-xl font-semibold px-2 py-3">Edit Post</h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 w-full flex flex-col items-end"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    placeholder="What's happening?!"
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
            variant={'accent'}
            disabled={isPending}
            aria-disabled={isPending}
          >
            {isPending && <Loader2 className="animate-spin mr-1" />}
            Edit Post
          </Button>
        </form>
      </Form>
    </article>
  );
}
