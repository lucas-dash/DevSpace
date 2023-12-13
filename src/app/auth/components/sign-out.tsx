import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import createSupabaseServerClient from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default function SignOut() {
  const logOut = async () => {
    'use server';
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect('/auth');
  };

  return (
    <form action={logOut}>
      <Button
        variant={'ghost'}
        size={'icon'}
        className="rounded-2xl hover:bg-red-500 hover:text-primary dark:hover:bg-red-800"
      >
        <LogOut />
      </Button>
    </form>
  );
}
