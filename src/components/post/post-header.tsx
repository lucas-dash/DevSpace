import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import UserInfo from "./user-info";

type PostHeaderProps = {
  createdBy: string;
  createdAt: string;
  postId: string;
};

export default function PostHeader({
  createdAt,
  createdBy,
  postId,
}: PostHeaderProps) {
  const LazyPostActions = dynamic(() => import("./post-actions"));

  return (
    <section className="flex items-center justify-between">
      <UserInfo createdBy={createdBy} createdAt={createdAt} />
      <Suspense fallback={<Loader2 className="animate-spin" />}>
        <LazyPostActions postId={postId} createdBy={createdBy} />
      </Suspense>
    </section>
  );
}
