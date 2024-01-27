import Link from 'next/link';
import { Button } from './ui/button';

export default function AuthState() {
  return (
    <Button asChild className="w-full">
      <Link href={'/auth'}>Login</Link>
    </Button>
  );
}
