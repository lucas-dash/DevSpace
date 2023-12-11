import HomeNav from '@/components/HomeNav';
import AuthForm from './components/auth-form';
import readUserSession from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function Auth() {
  const {
    data: { session },
  } = await readUserSession();

  if (session) {
    return redirect('/home');
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <HomeNav />
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-secondary dark:text-secondary-dark font-semibold text-center p-5">
        Start Posting Coll Stuff!
      </h1>

      <div className="w-80">
        <AuthForm />
      </div>

      <div className="rounded-full bg-foreground dark:bg-foreground-dark absolute h-[180px] w-[180px] left-[5%] top-[55%] -z-10"></div>
      <div className="rounded-full bg-accent dark:bg-accent-dark absolute h-[180px] w-[180px] right-[5%] top-[50%] -z-10"></div>
      <div className="rounded-full bg-secondary dark:bg-secondary-dark absolute h-[100px] w-[100px] left-[50%] top-[75%] -z-10"></div>
    </div>
  );
}
