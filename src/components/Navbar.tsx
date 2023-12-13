import Link from 'next/link';
import Image from 'next/image';
import {
  AlignRight,
  BellDot,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ModeToggle } from './ui/mode-toggle';

export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-50 bg-primary/70 dark:bg-primary-dark/70 backdrop-blur-sm flex items-center justify-between h-[60px] max-md:px-5 md:px-8 ">
      <div className="flex items-center gap-7">
        <Link
          href={'/'}
          aria-label="back to homepage"
          className="flex items-center gap-3"
        >
          <Image src="/logo.svg" alt="DevSpace" width={40} height={40} />
          <h3 className="font-bold text-lg text-secondary dark:text-secondary-dark">
            DevSpace
          </h3>
        </Link>

        <div className="flex items-center max-sm:hidden">
          <Button variant={'ghost'} size={'icon'} className="rounded-full">
            <ChevronLeft />
          </Button>
          <Button variant={'ghost'} size={'icon'} className="rounded-full">
            <ChevronRight />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        <Button variant={'ghost'} size={'icon'} className="rounded-full">
          <BellDot />
        </Button>

        {/* <div className="relative">
          <Search className="max-sm:absolute max-sm:top-1/2 max-sm:-translate-y-1/2 max-sm:left-1" />
          <Input
          type="text"
          placeholder="Search..."
          className="pl-8 max-sm:hidden"
          />
        </div> */}
        <Button variant={'ghost'} size={'icon'} className="rounded-full">
          <Search />
        </Button>
        <ModeToggle />
        <Button
          variant={'ghost'}
          size={'icon'}
          className="rounded-full sm:hidden"
        >
          <AlignRight />
        </Button>
      </div>
    </nav>
  );
}
