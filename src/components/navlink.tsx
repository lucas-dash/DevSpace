'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  href: string;
  title: string;
  icon?: JSX.Element;
};

export default function NavLink({ href, title, icon }: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      asChild
      variant={`${active ? 'default' : 'ghost'}`}
      className="w-full flex items-center justify-start gap-2"
    >
      <Link href={href}>
        {icon}
        {title}
      </Link>
    </Button>
  );
}
