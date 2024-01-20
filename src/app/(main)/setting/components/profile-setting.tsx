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
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { Textarea } from '@/components/ui/textarea';
import { useTransition } from 'react';
import { Edit, Link, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { updateProfileById } from '../../[profileId]/actions';
import createSupabaseBrowserClient from '@/lib/supabase/client';
import DrawerContents from '@/components/drawer-content';
import ChangeAvatar from './change-avatar';

type ProfileSettingType = {
  userId: string;
  profile: Profile;
};

export default function ProfileSetting({
  userId,
  profile: {
    bio,
    username,
    display_name,
    avatar_url,
    social_link_one,
    social_link_two,
    social_link_three,
    company,
    hire_email,
    url,
  },
}: ProfileSettingType) {
  const supabase = createSupabaseBrowserClient();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      username: username || '',
      name: display_name || '',
      avatar_url: avatar_url || '',
      bio: bio || '',
      company: company || '',
      url: url || '',
      hireEmail: hire_email || '',
      link1: social_link_one || '',
      link2: social_link_two || '',
      link3: social_link_three || '',
    },
  });

  function onSubmit(data: z.infer<typeof ProfileSchema>) {
    const checkUsername = async () => {
      let prevUsername = username;

      const { data: userData, error } = await supabase
        .from('profile')
        .select()
        .ilike('username', `%${data.username}%`)
        .single();
      if (
        userData?.username !== data.username ||
        prevUsername === data.username
      ) {
        const { error } = await updateProfileById(userId, data);
        if (error?.message) {
          toast.error(error?.message);
        } else {
          toast.success('The profile has been edited!');
          router.refresh();
        }
      } else if (!error?.message && userData?.username === data.username) {
        toast.warning('Username already exists!');
      } else if (error?.message) {
        toast.error(error?.message);
      }
    };

    startTransition(async () => {
      await checkUsername();
    });
  }

  return (
    <article className="py-5">
      <div className="flex max-sm:flex-col max-sm:items-stretch justify-between gap-5 sm:gap-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex-1 max-sm:order-2"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="sm:w-max">
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
                <FormItem className="sm:w-max">
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
                      maxLength={160}
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
                <FormItem>
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

            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium">Social Links</h4>
              <FormField
                control={form.control}
                name="link1"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <Link className="mr-1.5" size={20} />
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
                name="link2"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <Link className="mr-1.5" size={20} />
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
                name="link3"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <Link className="mr-1.5" size={20} />
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
            </div>

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

        <section className="flex justify-center">
          <div className="w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] rounded-full flex items-center justify-center border-2 border-primary-dark dark:border-primary relative">
            {avatar_url ? (
              <div className="max-w-[120px] max-h-[120px]">
                <Image
                  src={avatar_url}
                  alt={`${username} profile picture`}
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </div>
            ) : (
              <p className="text-3xl">{display_name[0]}</p>
            )}
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  className="absolute -bottom-4 left-0 rounded-full"
                  size={'icon'}
                >
                  <Edit />
                </Button>
              </DrawerTrigger>
              <DrawerContents
                title="Upload your avatar"
                description="Your image must have a maximum size of 5 MB."
              >
                <ChangeAvatar prevAvatar={avatar_url} />
              </DrawerContents>
            </Drawer>
          </div>
        </section>
      </div>
    </article>
  );
}
