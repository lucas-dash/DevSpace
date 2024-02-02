"use client";

import { useEffect, useState } from "react";
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
  const [isLiked, setIsLiked] = useState(Boolean(liked));
  const [allLikes, setAllLikes] = useState<number>(0);

  useEffect(() => {
    if (likes) {
      setAllLikes(likes);
    }
  }, [likes]);

  const handleLikeButton = async () => {
    let likeError;

    // post like
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

    // comment like
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
    if (likeError) {
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

  const toggleLike = async () => {
    if (isLiked) {
      setIsLiked(false);
      setAllLikes((prev) => prev - 1);
      handleUnlikeButton();
    } else {
      setIsLiked(true);
      setAllLikes((prev) => prev + 1);
      handleLikeButton();
    }
  };

  return (
    <div className="flex items-center text-sm gap-1">
      <Button
        size={"icon"}
        className={`rounded-full group hover:text-red-500 dark:hover:text-red-600 ${
          isLiked ? "text-red-500 dark:text-red-600" : ""
        }`}
        variant={"ghost"}
        onClick={toggleLike}
        aria-label="I like it"
        disabled={!userId}
        aria-disabled={!userId}
      >
        <Heart
          size={18}
          className={`${isLiked ? "fill-red-500 dark:fill-red-600 " : ""}`}
        />
      </Button>
      <p className="font-medium">{allLikes}</p>
    </div>
  );
}
