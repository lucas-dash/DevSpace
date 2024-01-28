"use client";

import { sendNotification } from "@/app/(main)/notification/actions/notification";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { likePost, unlikePost } from "@/app/(main)/home/actions";
import {
  likeComment,
  unlikeComment,
} from "@/app/(main)/home/[postId]/actions/comments";
import { Button } from "../ui/button";

type LikeButtonProps = {
  userId: string;
  createdBy: string;
  postId?: string;
  commentId?: string;
  liked: Likes | null;
  likes: number | undefined;
};
export default function LikeButton({
  userId,
  createdBy,
  commentId,
  postId,
  liked,
  likes,
}: LikeButtonProps) {
  const handleLikeButton = async () => {
    let likeError;
    if (postId && !commentId) {
      const { error } = await likePost(postId, userId);
      likeError = error?.message;
      // notification
      if (userId !== createdBy) {
        const { error: notifyError } = await sendNotification(
          createdBy,
          "likes",
          postId,
        );
        if (notifyError?.message) {
          toast.error(notifyError?.message);
        }
      }
    }
    if (commentId && postId) {
      const { error } = await likeComment(commentId, userId);
      likeError = error?.message;
      // notification
      if (userId !== createdBy) {
        const { error: notifyError } = await sendNotification(
          createdBy,
          "likes",
          postId,
        );
        if (notifyError?.message) {
          toast.error(notifyError?.message);
        }
      }
    }
    if (!likeError) {
      toast.success("Liked!");
    } else {
      toast.error(likeError);
    }
  };

  const handleUnlikeButton = async () => {
    if (postId && !commentId) {
      const { error } = await unlikePost(postId, userId);
      if (error?.message) {
        toast.error(error?.message);
      }
    }
    if (commentId && postId) {
      const { error } = await unlikeComment(commentId, userId);
      if (error?.message) {
        toast.error(error?.message);
      }
    }
  };

  return (
    <div className="flex items-center text-sm gap-1">
      <Button
        size={"icon"}
        className={`rounded-full group hover:text-red-500 dark:hover:text-red-600 ${
          liked ? "text-red-500 dark:text-red-600" : ""
        }`}
        variant={"ghost"}
        onClick={!liked ? handleLikeButton : handleUnlikeButton}
        aria-label="I like it"
        disabled={!userId}
        aria-disabled={!userId}
      >
        <Heart
          size={18}
          className={`${liked ? "fill-red-500 dark:fill-red-600 " : ""}`}
        />
      </Button>
      <p className="font-medium">{likes}</p>
    </div>
  );
}
