import { getUser } from "@/lib/actions";
import { BellDot } from "lucide-react";
import Link from "next/link";
import ActivityPanel from "@/app/(main)/notification/components/activity-panel";
import AuthState from "./ui/state/auth-state";

export default async function NotificationPanel() {
  const {
    data: { user },
  } = await getUser();

  return (
    <aside className="max-lg:hidden sticky top-[calc(60px+20px)] rounded-2xl bg-primary dark:bg-primary-dark min-w-[250px] max-w-[280px] xl:max-w-[420px] h-max p-3 flex-1">
      <Link
        href={"/notification"}
        className="font-semibold flex items-center gap-1.5 pb-3 pl-2 hover:underline"
      >
        <BellDot size={22} />
        Activity
      </Link>

      {user ? (
        <ActivityPanel userId={user.id} />
      ) : (
        <AuthState className="w-full" />
      )}
    </aside>
  );
}
