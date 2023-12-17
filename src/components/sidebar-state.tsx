import readUserSession from '@/lib/actions';
import { Button } from './ui/button';
import Link from 'next/link';
import SignOut from '@/app/auth/components/sign-out';
import { User } from '@supabase/supabase-js';

type SidebarStateType = {
  user: User | null;
  username: string;
  display_name: string;
};

export default async function SidebarState({
  user,
  username,
  display_name,
}: SidebarStateType) {
  if (!user) {
    return (
      <div className="flex w-full">
        <Button asChild className="w-full" variant={'default'}>
          <Link href={'/auth'}>Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <Button variant={'default'}>New Post</Button>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2.5">
          {/* use image */}
          <div className="h-[40px] w-[40px] bg-slate-400 grid place-items-center rounded-full">
            L
          </div>
          <Link href={`/${username}`}>
            <p className="font-semibold text-lg">{display_name}</p>
            {/* fade text if its too long */}
            <p className="text-fadeText dark:text-fadeText-dark text-sm">
              @{username}
            </p>
          </Link>
        </div>

        <SignOut />
      </div>
    </div>
  );
}
