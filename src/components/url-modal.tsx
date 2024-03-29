"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { HTMLAttributes } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CommentForm from "@/app/(main)/home/[postId]/components/comment-form";
import PostForm from "./post/post-form";

type URLModalProps = {} & HTMLAttributes<HTMLDivElement>;

export default function URLModal({ className, ...props }: URLModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const comment = searchParams.get("comment");
  const createdBy = searchParams.get("createdBy");
  const postId = searchParams.get("postId");

  return (
    <div>
      {(modal || comment) && (
        <Dialog defaultOpen onOpenChange={() => router.back()}>
          <DialogContent className={cn(className, "")} {...props}>
            <DialogHeader>
              <DialogTitle>
                {modal ? "Add Post" : "Reply to Comment"}
              </DialogTitle>
            </DialogHeader>

            {comment && createdBy && postId ? (
              <CommentForm
                createdBy={createdBy}
                commentId={comment}
                postId={postId}
                modal
              />
            ) : (
              <PostForm modalPost />
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
