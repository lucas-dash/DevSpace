import Link from 'next/link';
import { Button } from '../button';
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type AuthStateProps = {} & HTMLAttributes<HTMLButtonElement>;

export default function AuthState({ className, ...props }: AuthStateProps) {
  return (
    <Button asChild className={cn(className, '')} {...props}>
      <Link href={'/auth'}>Login</Link>
    </Button>
  );
}
