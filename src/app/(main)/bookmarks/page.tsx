import readUserSession from '@/lib/actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function Bookmarks() {
  const {
    data: { session },
  } = await readUserSession();

  if (!session) {
    return (
      <section className="bg-primary dark:bg-primary-dark h-full rounded-2xl flex flex-col items-center justify-center gap-5">
        <h1 className="text-lg md:text-xl font-semibold">
          You must be Logged In!
        </h1>
        <Button variant={'accent'} asChild>
          <Link href={'/auth'}>Log In</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="bg-primary dark:bg-primary-dark h-full rounded-2xl"></section>
  );
}
