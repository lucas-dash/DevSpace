'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../../../components/ui/input';
import createSupabaseBrowserClient from '@/lib/supabase/client';
// import { signInWithEmailAndPassword } from '../actions';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must cointain at least 6 character(s)' })
    .max(100),
});

export default function LoginForm() {
  const supabase = createSupabaseBrowserClient();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const { error } = await supabase.auth.signInWithPassword(data);
      // const result = await signInWithEmailAndPassword(data);

      // const { error } = await JSON.parse(result);

      if (error?.message) {
        toast.warning(error?.message);
      } else {
        toast.success('Successfully logged in!');
        form.reset();
        router.refresh();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@email.com"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
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
          className="w-full"
          disabled={isPending}
          aria-disabled={isPending}
        >
          {isPending && <Loader2 className="animate-spin mr-1" />}
          Login
        </Button>
      </form>
    </Form>
  );
}
