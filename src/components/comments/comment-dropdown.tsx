"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import FollowButton from "@/app/(main)/[profileId]/components/follow-button";
import DeleteAlert from "@/components/post/delete-alert";
import DeleteMenuItem from "@/components/features/delete-menu-item";

type CommentDropdownType = {
  currentUser: string;
  createdById: string;
  followingData: number | undefined;
  commentId: string;
};

export default function CommentDropdown({
  currentUser,
  createdById,
  followingData,
  commentId,
}: CommentDropdownType) {
  const isOwner = currentUser === createdById;

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"sm"} className="rounded-full h-auto">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-lg">
          {isOwner ? (
            <DeleteMenuItem />
          ) : (
            <DropdownMenuItem>
              <FollowButton
                currentUser={currentUser}
                profileId={createdById}
                isFollowing={followingData}
                variant={"ghost"}
                unVariant={"ghost"}
                className="w-full h-5 rounded-md"
              />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlert id={commentId} type="Comment" />
    </AlertDialog>
  );
}
