import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import PostActions from "./post-actions";
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
  return (
    <section className="flex items-center justify-between">
      <UserInfo createdBy={createdBy} createdAt={createdAt} />
      <Suspense fallback={<Loader2 className="animate-spin" />}>
        <PostActions postId={postId} createdBy={createdBy} />
      </Suspense>
    </section>
  );
}
