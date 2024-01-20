import PostSkeleton from '@/components/ui/skeletons/post-skeleton';

export default function Loading() {
  const mockupArray = new Array(5).fill(0);
  return (
    <div className="flex flex-col gap-5">
      {mockupArray.map((a, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
}
