'use client';

import { Button } from '@/components/ui/button';
import createSupabaseBrowserClient from '@/lib/supabase/client';
import { Github } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function OAuthForm() {
  const supabase = createSupabaseBrowserClient();
  const pathname = usePathname();

  const handleSignInWithGithub = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `http://localhost:3000/auth/callback?next=${pathname}`,
      },
    });
  };

  return (
    <div className="flex items-center justify-center w-full pt-3 pb-1">
      <Button
        variant={'outline'}
        onClick={handleSignInWithGithub}
        className="font-semibold rounded-2xl"
      >
        <Github className="mr-1" />
        Login with Github
      </Button>
    </div>
  );
}
