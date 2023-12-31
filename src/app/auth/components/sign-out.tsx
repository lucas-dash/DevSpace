'use client';

import { Button } from '@/components/ui/button';
import createSupabaseBrowserClient from '@/lib/supabase/client';
import { LogOut } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';

export default function SignOut() {
  const router = useRouter();
  // const logOut = async () => {
  //   'use server';
  //   // const supabase = await createSupabaseServerActionClient();
  //   await supabase.auth.signOut();
  //   redirect('/auth');
  // };
  const supabase = createSupabaseBrowserClient();

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    router.push('/');
  };

  return (
    // <form action={logOut}>
    <Button
      variant={'ghost'}
      size={'icon'}
      onClick={logOut}
      className="rounded-2xl hover:bg-red-500 hover:text-primary dark:hover:bg-red-800"
    >
      <LogOut />
    </Button>
    // </form>
  );
}
