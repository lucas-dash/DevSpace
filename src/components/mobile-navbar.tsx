"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  BellDot,
  Bookmark,
  CircleUserRound,
  Layout,
  LogOut,
  Settings2,
  X,
} from "lucide-react";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import NavLink from "./navlink";
import { Button } from "./ui/button";

export default function MobileNavbar({
  close,
}: {
  close: Dispatch<SetStateAction<boolean>>;
}) {
  const supabase = createSupabaseBrowserClient();
  const [currentSession, setCurrentSession] = useState<Session | null>();
  const router = useRouter();

  const profilePath =
    currentSession?.user.user_metadata.username ||
    currentSession?.user.user_metadata.user_name;

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error?.message) {
      router.push("/auth");
    } else {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    const getUsername = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error?.message) {
        toast.error("Something went wrong!");
      } else {
        setCurrentSession(session);
      }
    };
    getUsername();
  }, [supabase]);

  const navbarLinks = [
    {
      title: "Home",
      path: "/home",
      icon: <Layout />,
    },
    {
      title: "Notification",
      path: "/notification",
      icon: <BellDot />,
    },
    {
      title: "Bookmarks",
      path: "/bookmarks",
      icon: <Bookmark />,
    },
    {
      title: "Profile",
      path: `/${profilePath}`,
      icon: <CircleUserRound />,
    },
    {
      title: "Setting",
      path: "/setting",
      icon: <Settings2 />,
    },
  ];

  return (
    <nav className="fixed inset-0 z-50 min-h-screen bg-primary/95 dark:bg-primary-dark/95 backdrop-blur-3xl md:hidden flex flex-col items-center justify-center">
      <Button
        variant={"ghost"}
        size={"icon"}
        className="rounded-full md:hidden absolute top-3 right-5"
        onClick={() => close(false)}
      >
        <X />
        <span className="sr-only">Close</span>
      </Button>

      {!currentSession ? (
        <div className="flex items-center justify-center gap-5">
          <Button asChild className="w-full">
            <Link href={"/auth"}>Login</Link>
          </Button>
          <Button asChild className="w-full" variant={"accent"}>
            <Link href={"/auth"}>Sign Up</Link>
          </Button>
        </div>
      ) : (
        <>
          <ul className="flex flex-col gap-5 w-4/5 mx-auto mt-16">
            {navbarLinks.map(({ icon, path, title }) => {
              return (
                <li key={path}>
                  <NavLink
                    href={path}
                    title={title}
                    icon={icon}
                    onClick={() => close(false)}
                  />
                </li>
              );
            })}
          </ul>

          <Button
            variant={"destructive"}
            className="rounded-2xl w-max mt-10"
            onClick={handleSignOut}
          >
            <LogOut className="mr-1" />
            Sign Out
          </Button>
        </>
      )}
    </nav>
  );
}
