import Link from "next/link";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../button";

type AuthStateProps = {} & HTMLAttributes<HTMLButtonElement>;

export default function AuthState({ className, ...props }: AuthStateProps) {
  return (
    <Button asChild className={cn(className, "")} {...props}>
      <Link href={"/auth"}>Login</Link>
    </Button>
  );
}
