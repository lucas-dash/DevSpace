'use client';

import { updateUserEmail } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const EmailSchema = z.object({
  email: z.string().email(),
});

export default function EmailUpdateForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(data: z.infer<typeof EmailSchema>) {
    startTransition(async () => {
      const result = await updateUserEmail(data.email);
      const { error } = JSON.parse(result);
      if (!error?.message) {
        toast.success('Check your email inbox to confirm the changes.');
        form.reset();
      } else {
        toast.error(error?.message);
      }
    });
  }

  return (
    <section>
      <h3 className="text-lg font-medium">Update E-mail</h3>
      <hr className="border-primary-dark dark:border-primary" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-full flex flex-col gap-2 sm:w-1/2 my-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="newEmail@email.com"
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
            Update
          </Button>
        </form>
      </Form>
    </section>
  );
}
