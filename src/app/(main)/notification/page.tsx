import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Notify from './components/notify';
import { selectUserNotification } from './actions/notification';
import EmptyState from '@/components/empty-state';

export default async function Notification() {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/auth');
  }

  const { data: notifications } = await selectUserNotification(user?.id);

  return (
    <section className="h-full bg-primary dark:bg-primary-dark rounded-2xl p-3 flex flex-col gap-3">
      {notifications?.length === 0 || !notifications ? (
        <EmptyState title="You have no notifications." />
      ) : (
        notifications?.map((notify) => (
          <Notify key={notify.notify_id} {...notify} />
        ))
      )}
    </section>
  );
}
