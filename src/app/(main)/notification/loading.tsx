import NotifySkeleton from "@/components/ui/skeletons/notify-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-5">
      {Array(5)
        .fill(0)
        .map((a, i) => (
          <NotifySkeleton key={i} />
        ))}
    </div>
  );
}
