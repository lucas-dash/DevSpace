"use client";

import { Button } from "../button";

type ErrorStateProps = {
  reset: () => void;
};

export default function ErrorState({ reset }: ErrorStateProps) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-3">
      <h2 className="text-xl">Something went wrong!</h2>
      <Button variant={"accent"} onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
