'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordSchema } from '@/lib/validations';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { updateUserPassword, verifyCurrentPassword } from '@/app/auth/actions';

export default function PasswordUpdateForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  function onSubmit(data: z.infer<typeof PasswordSchema>) {
    startTransition(async () => {
      const verifyPassword = await verifyCurrentPassword(data.currentPassword);
      const { error: PasswordError } = JSON.parse(verifyPassword);

      if (PasswordError) {
        toast.warning('Wrong current password!');
        return;
      }

      const result = await updateUserPassword(data.newPassword);
      const { error } = JSON.parse(result);
      if (!error?.message) {
        toast.success('Password has been succesfully change!');
        form.reset();
      } else {
        toast.error(error?.message);
      }
    });
  }

  return (
    <section>
      <h3 className="text-lg font-medium">Change Password</h3>
      <hr className="border-primary-dark dark:border-primary" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-full flex flex-col gap-3 sm:w-1/2 my-2"
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="******"
                    className="bg-white"
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="******"
                    className="bg-white"
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
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="******"
                    className="bg-white"
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
            className="rounded-2xl w-max"
            disabled={isPending}
            aria-disabled={isPending}
          >
            {isPending && <Loader2 className="animate-spin mr-1" />}
            Update Password
          </Button>
        </form>
      </Form>
    </section>
  );
}
