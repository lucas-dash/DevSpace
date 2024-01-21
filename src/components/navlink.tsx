'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type NavLinkProps = {
  href: string;
  title: string;
  icon?: JSX.Element;
} & HTMLAttributes<HTMLAnchorElement>;

export default function NavLink({
  href,
  title,
  icon,
  className,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      asChild
      variant={`${active ? 'default' : 'ghost'}`}
      className={'w-full flex items-center justify-start gap-2'}
    >
      <Link href={href} className={cn(className, '')} {...props}>
        {icon}
        {title}
      </Link>
    </Button>
  );
}
