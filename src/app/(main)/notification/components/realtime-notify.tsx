'use client';

import createSupabaseBrowserClient from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

type RealtimeNotifyType = {
  children: ReactNode;
};

export default function RealtimeNotify({ children }: RealtimeNotifyType) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel('realtime notify')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notification',
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, supabase]);

  return <section className="flex flex-col gap-3">{children}</section>;
}
