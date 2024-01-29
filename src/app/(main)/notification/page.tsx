import { redirect } from "next/navigation";
import EmptyState from "@/components/ui/state/empty-state";
import { getUser } from "@/lib/actions";
import Notify from "./components/notify";
import RealtimeNotify from "./components/realtime-notify";
import { selectUserNotification } from "./actions/notification";

export default async function Notification() {
  const {
    data: { user },
  } = await getUser();

  if (!user) {
    return redirect("/auth");
  }

  const { data: notifications } = await selectUserNotification(user?.id);

  return (
    <section className="h-max bg-primary dark:bg-primary-dark rounded-2xl p-3">
      <RealtimeNotify>
        {notifications?.length === 0 || !notifications ? (
          <EmptyState title="You have no notifications." />
        ) : (
          notifications?.map((notify) => (
            <Notify key={notify.notify_id} {...notify} />
          ))
        )}
      </RealtimeNotify>
    </section>
  );
}
