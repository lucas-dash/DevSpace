"use client";

import Link from "next/link";
import Image from "next/image";
import { AlignRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import NavigationButtons from "./navigation-buttons";
import SearchCommand from "./search/search-command";
import MobileNavbar from "./mobile-navbar";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  return (
    <nav className="w-full sticky top-0 z-50 bg-primary/70 dark:bg-primary-dark/70 backdrop-blur-sm flex items-center justify-between h-[60px] max-md:px-5 md:px-8 ">
      <div className="flex items-center gap-7">
        <Link
          href={"/"}
          aria-label="back to homepage"
          className="flex items-center gap-3"
        >
          <Image src="/logo.svg" alt="DevSpace" width={40} height={40} />
          <h3 className="font-bold text-lg text-secondary dark:text-secondary-dark max-[370px]:hidden">
            DevSpace
          </h3>
        </Link>

        <NavigationButtons />
      </div>

      <div className="flex items-center gap-0 sm:gap-3">
        <SearchCommand />

        <ModeToggle />

        <Button
          variant={"ghost"}
          size={"icon"}
          className="rounded-full md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <AlignRight />
        </Button>

        {open && <MobileNavbar close={setOpen} />}
      </div>
    </nav>
  );
}
