import PostSkeleton from "@/components/ui/skeletons/post-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-5">
      {Array(5)
        .fill(0)
        .map((a, i) => (
          <PostSkeleton key={i} />
        ))}
    </div>
  );
}
