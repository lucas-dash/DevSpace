import { Button } from '@/components/ui/button';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { LogOut } from 'lucide-react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function SignOut() {
  const signOut = async () => {
    'use server';

    const cookieStore = cookies();
    const supabase = createSupabaseServerClient(cookieStore);
    await supabase.auth.signOut();
    return redirect('/auth');
  };

  return (
    <form action={signOut}>
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
