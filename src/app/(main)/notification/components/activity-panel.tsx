import EmptyState from "@/components/ui/state/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Notify from "./notify";
import RealtimeNotify from "./realtime-notify";
import { selectUserNotification } from "../actions/notification";

interface ActivityPanelProps {
  userId: string;
}

export default async function ActivityPanel({ userId }: ActivityPanelProps) {
  const { data: notifications } = await selectUserNotification(userId);
  return (
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
                variant="link"
                size="sm"
                className="text-accent dark:text-accent-dark w-full mt-1"
              >
                <Link href="/notification" className="text-center">
                  Show More
                </Link>
              </Button>
            )}
          </div>
        ))
      )}
    </RealtimeNotify>
  );
}
