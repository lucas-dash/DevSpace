import { selectUserNotification } from '@/app/(main)/notification/actions/notification';
import Notify from '@/app/(main)/notification/components/notify';
import RealtimeNotify from '@/app/(main)/notification/components/realtime-notify';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { BellDot } from 'lucide-react';
import { cookies } from 'next/headers';
import { Button } from './ui/button';
import Link from 'next/link';
import EmptyState from './empty-state';

export default async function NotificationPanel() {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <aside className="max-lg:hidden sticky top-[calc(60px+20px)] rounded-2xl bg-primary dark:bg-primary-dark min-w-[250px] max-w-[260px] xl:max-w-[420px] h-max p-3 flex-1">
        <h3 className="font-semibold flex items-center gap-1.5 pb-2">
          <BellDot size={22} />
          Activity
        </h3>
        <div className="flex justify-evenly gap-3">
          <Button asChild className="w-full">
            <Link href={'/auth'}>Login</Link>
          </Button>
          <Button asChild variant={'accent'} className="w-full">
            <Link href={'/auth'}>Sign Up</Link>
          </Button>
        </div>
      </aside>
    );
  }

  const { data: notifications } = await selectUserNotification(user?.id);

  return (
    <aside className="max-lg:hidden sticky top-[calc(60px+20px)] rounded-2xl bg-primary dark:bg-primary-dark min-w-[250px] max-w-[280px] xl:max-w-[420px] h-max p-3 flex-1">
      <Link
        href={'/notification'}
        className="font-semibold flex items-center gap-1.5 pb-3 pl-2 hover:underline"
      >
        <BellDot size={22} />
        Activity
      </Link>

      <RealtimeNotify>
        {notifications?.length === 0 || !notifications ? (
          <EmptyState
            title="You have no notifications."
            image
            className="text-base"
          />
        ) : (
          notifications?.slice(0, 5).map((notify, index) => (
            <div key={notify.notify_id}>
              <Notify key={notify.notify_id} {...notify} />
              {index === 4 && (
                <Button
                  asChild
                  variant={'link'}
                  size={'sm'}
                  className="text-accent dark:text-accent-dark w-full mt-1"
                >
                  <Link href={'/notification'} className="text-center">
                    Show More
                  </Link>
                </Button>
              )}
            </div>
          ))
        )}
      </RealtimeNotify>
    </aside>
  );
}
