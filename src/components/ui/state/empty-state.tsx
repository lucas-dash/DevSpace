import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { HTMLAttributes } from "react";
import { Button } from "../button";

type EmptyStateType = {
  title: string;
  linkTo?: string;
  linkTitle?: string;
  icon?: boolean;
  image?: boolean;
  notFound?: boolean;
} & HTMLAttributes<HTMLHeadingElement>;

export default function EmptyState({
  title,
  linkTo,
  linkTitle,
  icon,
  image,
  notFound,
  className,
  ...props
}: EmptyStateType) {
  return (
    <section
      className={
        "h-full flex flex-col gap-5 items-center justify-center bg-primary dark:bg-primary-dark rounded-2xl p-3"
      }
    >
      <h3 className={cn("text-xl font-semibold py-3", className)} {...props}>
        {title}
      </h3>
      {!image && (
        <div className="dark:bg-slate-300 rounded-xl">
          <Image
            src={`${notFound ? "/error.svg" : "/empty-state.svg"}`}
            alt="empty state"
            width={350}
            height={350}
          />
        </div>
      )}
      {linkTo && linkTitle && (
        <Button variant={"accent"} asChild>
          <Link href={`/${linkTo}`}>
            {icon && <ExternalLink className="mr-1" size={22} />}
            {linkTitle}
          </Link>
        </Button>
      )}
    </section>
  );
}
