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
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useState, useTransition } from 'react';
import { createPost } from '@/app/(main)/home/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Checkbox } from '../ui/checkbox';

export default function PostForm({ modalPost }: { modalPost?: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [draft, setDraft] = useState(false);

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: '',
      draft: false,
    },
  });

  function onSubmit(data: z.infer<typeof PostSchema>) {
    startTransition(async () => {
      const result = await createPost(data.content, data.draft);
      const { error } = JSON.parse(result);
      if (!error?.message) {
        toast.success(!data.draft ? 'Posted!' : 'Draft is saved!');
        form.reset();

        if (modalPost) {
          router.back();
        }
      } else {
        toast.error(error?.message);
      }
    });
  }

  return (
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
                  placeholder="What are you working on?"
                  className="resize-none rounded-lg"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-5">
          <FormField
            control={form.control}
            name="draft"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="mt-2 mr-1.5">Draft?</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    onClick={() => setDraft((prev) => !prev)}
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
            {!draft ? 'Post' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
