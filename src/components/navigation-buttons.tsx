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
      >
        <ChevronLeft />
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        className="rounded-full"
        onClick={() => router.forward()}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
