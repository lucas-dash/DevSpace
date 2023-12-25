import { Button } from './ui/button';
import Link from 'next/link';
import SignOut from '@/app/auth/components/sign-out';
import { Session } from '@supabase/supabase-js';
import UserAvatar from './ui/user-avatar';

type SidebarStateType = {
  session: Session | null;
  username: string;
  display_name: string;
};

export default async function SidebarState({
  session,
  username,
  display_name,
}: SidebarStateType) {
  if (!session) {
    return (
      <div className="flex w-full">
        <Button asChild className="w-full">
          <Link href={'/auth'}>Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <Button variant={'accent'} size={'lg'} className="rounded-2xl">
        New Post
      </Button>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2.5">
          <UserAvatar id={session.user.id} />
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
