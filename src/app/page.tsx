import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col min-h-[calc(100vh-56px)] items-center justify-center">
      <h1 className="text-6xl text-secondary dark:text-secondary-dark font-bold text-center">
        Join the developer community
      </h1>

      <div className="flex gap-5 justify-center py-5">
        <Button className="rounded-2xl">Sign Up</Button>
        <Button className="rounded-2xl" asChild>
          <Link href={'/login'}>Log In</Link>
        </Button>
      </div>
    </main>
  );
}
