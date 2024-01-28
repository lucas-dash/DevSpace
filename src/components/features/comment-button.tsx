import { HTMLAttributes } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "../ui/button";

type CommentButtonProps = {
  comments: number | undefined;
  postId: string;
  userId: string;
  createdBy?: string;
  commentId?: string;
} & HTMLAttributes<HTMLAnchorElement>;
export default function CommentButton({
  comments,
  postId,
  commentId,
  createdBy,
  userId,
  ...props
}: CommentButtonProps) {
  const customlink = !commentId
    ? `/home/${postId}`
    : `?comment=${commentId}&createdBy=${createdBy}&postId=${postId}`;

  return (
    <Link href={`${userId ? customlink : "/auth"}`} {...props}>
      <div className="flex items-center text-sm gap-1">
        <Button
          size={"icon"}
          className="rounded-full hover:text-blue-500 dark:hover:text-blue-600"
          variant={"ghost"}
        >
          <MessageCircle size={18} />
        </Button>
        <p className="font-medium">{comments}</p>
      </div>
    </Link>
  );
}
