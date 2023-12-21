'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ProfileSchema } from '@/lib/validations';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

export default function UserProfileSet({
  bio,
  username,
  display_name,
}: Profile) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      username: username || '',
      name: display_name || '',
      bio: bio || '',
      company: '',
      url: '',
      hireEmail: '',
    },
  });

  function onSubmit(data: z.infer<typeof ProfileSchema>) {
    console.log(data);
    startTransition(async () => {
      //   const result = await updatePostById(id, data.content, pathname, user);
      //   const { error } = JSON.parse(result);
      //   if (!error?.message) {
      //     toast.success('The post has been edited!');
      // router.refresh()
      //   } else {
      //     toast.warning(error?.message);
      //   }
    });
  }

  return (
    <article className="py-5">
      <div className="flex max-sm:flex-col max-sm:items-stretch justify-between gap-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 flex-1 max-sm:order-2"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-max">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="johndoe"
                      maxLength={20}
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-max">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      maxLength={20}
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none rounded-lg"
                      maxLength={90}
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="https://"
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="w-max">
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="@Netflix"
                      maxLength={20}
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hireEmail"
              render={({ field }) => (
                <FormItem className="w-max">
                  <FormLabel>Hire Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="johndoe@gmail.com"
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
              Save
            </Button>
          </form>
        </Form>

        <div className="w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] rounded-full flex items-center justify-center border-2 border-primary-dark dark:border-primary">
          L
        </div>
      </div>
    </article>
  );
}
