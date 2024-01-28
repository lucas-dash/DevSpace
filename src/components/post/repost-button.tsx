"use client";

import { Repeat2 } from "lucide-react";
import { repostPost, unrepostPost } from "@/app/(main)/home/actions";
import { sendNotification } from "@/app/(main)/notification/actions/notification";
import { toast } from "sonner";
import { Button } from "../ui/button";

type RepostButtonProps = {
  reposts: number | undefined;
  reposted: Reposts | null;
  createdBy: string;
  userId: string;
  postId: string;
};
export default function RepostButton({
  createdBy,
  reposted,
  reposts,
  postId,
  userId,
}: RepostButtonProps) {
  const handleRepostButton = async () => {
    const { error } = await repostPost(postId, userId);
    if (!error?.message) {
      toast.success("Reposted!");

      // notification
      if (userId !== createdBy) {
        const { error: notifyError } = await sendNotification(
          createdBy,
          "reposts",
          postId,
        );
        if (notifyError?.message) {
          toast.error(notifyError?.message);
        }
      }
    } else {
      toast.error(error?.message);
    }
  };

  const handleUnrepostButton = async () => {
    const { error } = await unrepostPost(postId, userId);
    if (!error?.message) {
      toast.success("Unreposted!");
    } else {
      toast.error(error?.message);
    }
  };
  return (
    <div className="flex items-center text-sm gap-1">
      <Button
        size={"icon"}
        className={`rounded-full hover:text-green-500 dark:hover:text-green-600 ${
          reposted ? "text-green-500 " : ""
        }`}
        variant={"ghost"}
        onClick={!reposted ? handleRepostButton : handleUnrepostButton}
        aria-label="repost post"
      >
        <Repeat2 size={18} />
      </Button>
      <p className="font-medium">{reposts}</p>
    </div>
  );
}
