import { Skeleton } from '../skeleton';

export default function NotifySkeleton() {
  return (
    <div className="bg-primary dark:bg-primary-dark min-h-max rounded-2xl p-3">
      <div className="flex items-center gap-2 pb-2">
        <Skeleton className="rounded-full h-10 w-10" />
        <Skeleton className="rounded-lg h-5 w-1/2" />
      </div>
    </div>
  );
}
