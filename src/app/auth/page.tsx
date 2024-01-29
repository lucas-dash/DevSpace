import HomeNav from "@/components/home-navbar";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";
import AuthForm from "./components/auth-form";

export default async function Auth() {
  const {
    data: { session },
  } = await readUserSession();

  if (session) {
    return redirect("/home");
  }

  return (
    <section className="flex flex-col items-center relative min-h-screen">
      <HomeNav />

      <h1 className="text-4xl sm:text-5xl md:text-6xl text-secondary dark:text-secondary-dark font-semibold text-center p-5">
        Start Posting Cool Stuff!
      </h1>

      <AuthForm />

      <div className="rounded-full bg-foreground dark:bg-foreground-dark absolute h-[180px] w-[180px] left-[5%] top-[53%] -z-10" />

      <div className="rounded-full bg-accent dark:bg-accent-dark absolute h-[160px] w-[160px] right-[8%] bottom-[11%] -z-10" />

      <div className="rounded-full bg-foreground dark:bg-foreground-dark absolute h-[100px] w-[100px] right-[6%] top-[32%] -z-10" />

      <div className="rounded-full bg-secondary dark:bg-secondary-dark absolute h-[100px] w-[100px] left-[6%] top-[24%] -z-10" />

      <div className="rounded-full bg-secondary dark:bg-secondary-dark absolute h-[100px] w-[100px] left-9 sm:left-[42%] bottom-[6%] -z-10" />
    </section>
  );
}
