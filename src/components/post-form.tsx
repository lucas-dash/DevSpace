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
import { createPost } from '@/app/(main)/home/actions';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

export default function PostForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: '',
    },
  });

  function onSubmit(data: z.infer<typeof PostSchema>) {
    startTransition(async () => {
      const result = await createPost(data.content);

      const { error } = JSON.parse(result);
      if (!error?.message) {
        // toast

        form.reset();
      }
    });
  }

  return (
    <div className="bg-primary dark:bg-primary-dark rounded-2xl w-full flex gap-3.5 p-2.5">
      <div className="h-[40px] w-[40px] bg-slate-400 flex items-center justify-center rounded-full flex-shrink-0">
        L
      </div>
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
            className="rounded-2xl"
            disabled={isPending}
            aria-disabled={isPending}
          >
            {isPending && <Loader2 className="animate-spin mr-1" />}
            Post
          </Button>
        </form>
      </Form>
    </div>
  );
}
