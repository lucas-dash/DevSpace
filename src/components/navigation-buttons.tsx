"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function NavigationButtons() {
  const router = useRouter();

  return (
    <div className="flex items-center max-sm:hidden">
      <Button
        variant={"ghost"}
        size={"icon"}
        className="rounded-full"
        onClick={() => router.back()}
        aria-label="back"
        aria-describedby="go to previous page"
      >
        <ChevronLeft />
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        className="rounded-full"
        onClick={() => router.forward()}
        aria-label="forward"
        aria-describedby="go to next page"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
