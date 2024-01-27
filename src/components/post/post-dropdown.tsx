'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import DeleteAlert from './delete-alert';
import FollowButton from '@/app/(main)/[profileId]/components/follow-button';

type PostDropdownType = {
  postId: string;
  user: User;
  createdById: string;
  followingData: Following[] | null;
};

export default function PostDropdown({
  postId,
  createdById,
  user,
  followingData,
}: PostDropdownType) {
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} size={'sm'} className="rounded-full h-auto">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-lg">
          {user.id === createdById ? (
            <>
              <DropdownMenuItem className="font-semibold">
                <Pencil className="mr-1.5" size={18} />
                <Link
                  href={`/${user.user_metadata.username}/${postId}`}
                  className="w-full"
                >
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AlertDialogTrigger className="flex items-center text-red-500 dark:text-red-700 hover:text-red-500 dark:hover:text-red-700 w-full font-semibold">
                  <Trash2
                    className="mr-1.5 text-inherit bg-inherit"
                    size={18}
                  />
                  Delete
                </AlertDialogTrigger>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem className="m-0 p-0">
              <FollowButton
                currentUser={user.id}
                profileId={createdById}
                isFollowing={followingData?.length}
                variant={'ghost'}
                unVariant={'ghost'}
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
