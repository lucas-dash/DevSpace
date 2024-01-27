"use client";

import { MessageCircle, Heart, Bookmark, Repeat2 } from "lucide-react";
import {
  bookmarkPost,
  likePost,
  repostPost,
  unbookmarkPost,
  unlikePost,
  unrepostPost,
} from "@/app/(main)/home/actions";
import { toast } from "sonner";
import Link from "next/link";
import { sendNotification } from "@/app/(main)/notification/actions/notification";
import { Button } from "../ui/button";

type PostUserActionsType = {
  postId: string;
  userId: string;
  createdBy: string;
  liked: Likes | null;
  likes: number | undefined;
  bookmarked: Bookmarks | null;
  bookmarks: number | undefined;
  reposted: Reposts | null;
  reposts: number | undefined;
  comments: number | undefined;
};

export default function PostUserActions({
  postId,
  userId,
  createdBy,
  liked,
  likes,
  bookmarked,
  bookmarks,
  reposted,
  reposts,
  comments,
}: PostUserActionsType) {
  // likes actions
  const handleLikeButton = async () => {
    const { error } = await likePost(postId, userId);
    if (!error?.message) {
      toast.success("Liked!");
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
    } else {
      toast.error(error?.message);
    }
  };

  const handleUnlikeButton = async () => {
    const { error } = await unlikePost(postId, userId);

    if (!error?.message) {
      toast.success("Unliked!");
    } else {
      toast.error(error?.message);
    }
  };

  // bookmark actions
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

  // respost
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
    <div className="flex items-center justify-between min-[390px]:justify-evenly ">
      <Link href={`/home/${postId}`}>
        <div className="flex items-center text-sm gap-1">
          <Button
            size={"icon"}
            className="rounded-full hover:text-blue-500 dark:hover:text-blue-600"
            variant={"ghost"}
            aria-label="link to comments of this post"
          >
            <MessageCircle size={18} />
          </Button>
          <p className="font-medium">{comments}</p>
        </div>
      </Link>

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

      <div className="flex items-center text-sm gap-1">
        <Button
          size={"icon"}
          className={`rounded-full group hover:text-red-500 dark:hover:text-red-600 ${
            liked ? "text-red-500 dark:text-red-600" : ""
          }`}
          variant={"ghost"}
          onClick={!liked ? handleLikeButton : handleUnlikeButton}
          aria-label="like post"
        >
          <Heart
            size={18}
            className={`${liked ? "fill-red-500 dark:fill-red-600 " : ""}`}
          />
        </Button>
        <p className="font-medium">{likes}</p>
      </div>

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
    </div>
  );
}
