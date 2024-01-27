"use client";

import { Button } from "../button";

type ErrorStateProps = {
  reset: () => void;
};

export default function ErrorState({ reset }: ErrorStateProps) {
  return (
    <div>
      <h2 className="text-xl">Something went wrong!</h2>
      <Button variant={"accent"} onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
