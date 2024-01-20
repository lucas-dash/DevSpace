import NotifySkeleton from '@/components/ui/skeletons/notify-skeleton';

export default function Loading() {
  const mockupArray = new Array(5).fill(0);
  return (
    <div className="flex flex-col gap-5">
      {mockupArray.map((a, i) => (
        <NotifySkeleton key={i} />
      ))}
    </div>
  );
}
