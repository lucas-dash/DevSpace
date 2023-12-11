import HomeNav from '@/components/HomeNav';
import LoginForm from '@/components/login-form';

export default function Login() {
  return (
    <div className="relative">
      <HomeNav />
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-secondary dark:text-secondary-dark font-semibold text-center p-5">
        Start Posting Coll Stuff!
      </h1>

      <LoginForm />

      <div className="rounded-full bg-foreground dark:bg-foreground-dark absolute h-[180px] w-[180px] left-[5%] top-[100%]"></div>
      <div className="rounded-full bg-accent dark:bg-accent-dark absolute h-[180px] w-[180px] right-[5%] top-[200%]"></div>
      <div className="rounded-full bg-secondary dark:bg-secondary-dark absolute h-[100px] w-[100px] left-[50%] top-[150%]"></div>
    </div>
  );
}
