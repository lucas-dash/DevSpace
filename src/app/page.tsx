import HomeNav from '@/components/HomeNav';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <HomeNav />
      <main className="flex flex-col min-h-[calc(100vh-56px)] items-center justify-start">
        <section className="mt-9">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-secondary dark:text-secondary-dark font-bold text-center p-5">
            Join the Developer Community
          </h1>

          <div className="flex gap-5 justify-center pt-10 pb-5">
            <Button className="rounded-2xl">Sign Up</Button>
            <Button className="rounded-2xl" asChild>
              <Link href={'/login'}>Log In</Link>
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-[1fr,1fr] md:grid-cols-[1fr_200px] gap-1 md:gap-5 h-full w-full sm:w-4/5 mx-auto mt-16">
          <section className="grid  md:grid-cols-4 gap-1 md:gap-5">
            <div className="bg-secondary dark:bg-secondary-dark rounded-5xl lg:rounded-6xl flex items-center justify-center min-h-[100px] max-md:col-span-2 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-primary dark:text-primary-dark font-semibold p-3">
                Share your work with the world.
              </h3>
            </div>

            <div className="bg-secondary dark:bg-secondary-dark rounded-5xl lg:rounded-6xl flex items-center  min-h-[105px] md:col-span-2 lg:col-span-1"></div>
            <div className="bg-secondary dark:bg-secondary-dark rounded-5xl lg:rounded-6xl flex items-center  min-h-[105px] md:col-span-2 lg:col-span-1"></div>

            <div className="bg-foreground dark:bg-foreground-dark rounded-5xl lg:rounded-6xl flex justify-center items-center max-md:col-span-2 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-secondary font-semibold p-3">
                Connect with others.
              </h3>
            </div>
          </section>

          <div>
            <div className="bg-accent dark:bg-accent-dark rounded-5xl lg:rounded-6xl max-h-[444px] sm:min-h-full sm:min-w-full aspect-9/16"></div>
          </div>
        </section>
      </main>
    </>
  );
}
