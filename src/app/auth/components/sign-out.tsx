import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { redirect } from 'next/navigation';
import { singOut } from '../actions';

export default function SignOut() {
  // const logOut = async () => {
  //   'use server';
  //   // const supabase = await createSupabaseServerActionClient();
  //   await supabase.auth.signOut();
  //   redirect('/auth');
  // };

  const logOut = async () => {
    'use server';
    const { error } = await singOut();
    redirect('/');
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
