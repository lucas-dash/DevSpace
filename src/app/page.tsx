import HomeNavbar from "@/components/home-navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HomeNavbar />
      <main className="flex flex-col min-h-[calc(100dvh-56px)] items-center lg:justify-center 2xl:container mb-10">
        <section className="mt-9">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-primary-dark dark:text-primary font-bold text-center p-5">
            Join the Developer Community
          </h1>

          <div className="flex gap-5 justify-center pt-10 pb-5">
            <Button variant={"default"} asChild>
              <Link href={"/home"}>Explore</Link>
            </Button>
            <Button asChild variant={"accent"}>
              <Link href={"/auth"}>Log In</Link>
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-[1fr,1fr] md:grid-cols-[1fr_200px] gap-1.5 md:gap-5 h-full min-[450px]:w-4/5 mx-auto mt-16">
          <section className="grid md:grid-cols-4 gap-1.5 md:gap-5">
            <div className="bg-primary-dark dark:bg-primary rounded-3xl lg:rounded-6xl flex items-center justify-center min-h-[100px] max-md:col-span-2 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-primary dark:text-primary-dark font-semibold p-3 max-md:text-center">
                Share your work with the world.
              </h3>
            </div>

            <div className="bg-primary-dark dark:bg-primary rounded-3xl lg:rounded-6xl flex items-center justify-center min-h-[105px] md:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center text-primary dark:text-primary-dark font-semibold p-1 sm:p-3">
                Get inspired
              </h3>
            </div>

            <div className="bg-primary-dark dark:bg-primary rounded-3xl lg:rounded-6xl flex items-center justify-center min-h-[105px] md:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center text-primary dark:text-primary-dark font-semibold p-1 sm:p-3">
                Get Hired
              </h3>
            </div>

            <div className="bg-foreground dark:bg-foreground-dark rounded-3xl lg:rounded-6xl flex justify-center items-center max-md:col-span-2 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-primary-dark font-semibold p-3 max-md:text-center">
                Connect with others.
              </h3>
            </div>
          </section>

          <div className="bg-accent dark:bg-accent-dark rounded-5xl lg:rounded-6xl max-h-[444px] max-[340px]:h-full min-[341px]:aspect-9/16 lg:min-h-[390px]" />
        </section>
      </main>
    </>
  );
}
