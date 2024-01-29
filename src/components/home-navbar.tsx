import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle";

export default function HomeNavbar() {
  return (
    <nav className="container h-14 flex items-center justify-between">
      <Link
        href={"/"}
        aria-label="back to homepage"
        className="flex items-center gap-3"
      >
        <Image src="/logo.svg" alt="DevSpace" width={40} height={40} />
        <h3 className="font-bold text-lg text-secondary dark:text-secondary-dark">
          DevSpace
        </h3>
      </Link>

      <ModeToggle />
    </nav>
  );
}
