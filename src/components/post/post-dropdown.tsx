"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { AlertDialog } from "@/components/ui/alert-dialog";
import FollowButton from "@/app/(main)/[profileId]/components/follow-button";
import DeleteAlert from "./delete-alert";
import { Button } from "../ui/button";
import EditMenuItem from "./edit-menu-item";
import DeleteMenuItem from "../features/delete-menu-item";

type PostDropdownType = {
  postId: string;
  user: User;
  createdById: string;
  followingData: number | undefined;
};

export default function PostDropdown({
  postId,
  createdById,
  user,
  followingData,
}: PostDropdownType) {
  const isOwner = user.id === createdById;

  const username = user.user_metadata.username || user.user_metadata.user_name;

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
            <>
              <EditMenuItem postId={postId} username={username} />
              <DeleteMenuItem />
            </>
          ) : (
            <DropdownMenuItem className="m-0 p-0">
              <FollowButton
                currentUser={user.id}
                profileId={createdById}
                isFollowing={followingData}
                variant={"ghost"}
                unVariant={"ghost"}
                className="w-full h-8 rounded-md"
              />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlert id={postId} type="Post" />
    </AlertDialog>
  );
}
