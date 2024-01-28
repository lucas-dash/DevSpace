"use client";

import { bookmarkPost, unbookmarkPost } from "@/app/(main)/home/actions";
import { toast } from "sonner";
import { sendNotification } from "@/app/(main)/notification/actions/notification";
import { Bookmark } from "lucide-react";
import { Button } from "../ui/button";

type BookmarkButtonProps = {
  bookmarked: Bookmarks | null;
  bookmarks: number | undefined;
  userId: string;
  postId: string;
  createdBy: string;
};
export default function BookmarkButton({
  bookmarked,
  bookmarks,
  createdBy,
  postId,
  userId,
}: BookmarkButtonProps) {
  const handleBookmarkButton = async () => {
    const { error } = await bookmarkPost(postId, userId);
    if (!error?.message) {
      toast.success("Bookmarked!");

      // notification
      if (userId !== createdBy) {
        const { error: notifyError } = await sendNotification(
          createdBy,
          "bookmarks",
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

  const handleUnbookmarkButton = async () => {
    const { error } = await unbookmarkPost(postId, userId);
    if (!error?.message) {
      toast.success("Unbookmarked!");
    } else {
      toast.error(error?.message);
    }
  };

  return (
    <div className="flex items-center text-sm gap-1 ">
      <Button
        size={"icon"}
        className={`rounded-full hover:text-orange-500 dark:hover:text-orange-600 ${
          bookmarked ? "text-orange-500 dark:text-orange-600" : ""
        }`}
        variant={"ghost"}
        aria-label="bookmark post"
        onClick={!bookmarked ? handleBookmarkButton : handleUnbookmarkButton}
      >
        <Bookmark
          size={18}
          className={`${
            bookmarked ? "fill-orange-500 dark:fill-orange-600 " : ""
          }`}
        />
      </Button>
      <p className="font-medium">{bookmarks}</p>
    </div>
  );
}
