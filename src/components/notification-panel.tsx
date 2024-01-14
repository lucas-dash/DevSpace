import { BellDot } from 'lucide-react';

export default function NotificationPanel() {
  return (
    <aside className="max-lg:hidden sticky top-[calc(60px+20px)] rounded-2xl bg-primary dark:bg-primary-dark min-w-[250px] max-w-[260px] xl:max-w-[420px] h-max p-3">
      <h3 className="font-semibold flex items-center gap-1.5">
        <BellDot size={20} />
        Activity
      </h3>

      <section>{/* last 5? notif */}</section>
    </aside>
  );
}
