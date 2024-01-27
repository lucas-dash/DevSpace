"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import FollowButton from "@/app/(main)/[profileId]/components/follow-button";
import DeleteAlert from "@/components/post/delete-alert";

type CommentDropdownType = {
  activeUser: string;
  createdBy: string;
  followingData: Following[] | null;
  commentId: string;
};

export default function CommentDropdown({
  activeUser,
  createdBy,
  followingData,
  commentId,
}: CommentDropdownType) {
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"sm"} className="rounded-full h-auto">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-lg">
          {activeUser === createdBy ? (
            <DropdownMenuItem>
              <AlertDialogTrigger className="flex items-center text-red-500 dark:text-red-700 hover:text-red-500 dark:hover:text-red-700 w-full font-semibold">
                <Trash2 className="mr-1.5 text-inherit bg-inherit" size={18} />
                Delete
              </AlertDialogTrigger>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <FollowButton
                followId={createdBy}
                userId={activeUser}
                followed={followingData}
              />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlert id={commentId} type="Comment" />
    </AlertDialog>
  );
}
