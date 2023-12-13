import readUserSession from '@/lib/actions';
import { Button } from './ui/button';
import Link from 'next/link';
import SignOut from '@/app/auth/components/sign-out';

export default async function SidebarState() {
  const { data } = await readUserSession();

  if (!data.session?.user) {
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
          <div>
            <p className="font-semibold text-lg">Lou</p>
            {/* fade text */}
            <p className="text-fadeText dark:text-fadeText-dark text-sm">
              @spacecode_
            </p>
          </div>
        </div>

        <SignOut />
      </div>
    </div>
  );
}
