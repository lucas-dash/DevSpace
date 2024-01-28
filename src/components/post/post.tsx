import Link from "next/link";
import UserAvatar from "../ui/user-avatar";
import PostInteraction from "./post-interaction";
import PostHeader from "./post-header";

export default async function Post({
  id,
  content,
  created_by,
  created_at,
}: Post) {
  return (
    <article className="w-full bg-primary dark:bg-primary-dark rounded-2xl p-2.5">
      <div className="flex gap-3.5">
        <UserAvatar userId={created_by} />
        <div className="flex-1">
          <PostHeader
            createdBy={created_by}
            createdAt={created_at}
            postId={id}
          />

          <Link href={`/home/${id}`}>
            <p className="py-1">{content}</p>
          </Link>
        </div>
      </div>
      <PostInteraction postId={id} createdBy={created_by} />
    </article>
  );
}
