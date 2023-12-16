'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { MoreHorizontal, User2 } from 'lucide-react';
import { deletePostById } from '@/app/(main)/home/actions';
import Link from 'next/link';
import { Session, User } from '@supabase/supabase-js';

type PostActionsType = {
  id: string;
  content?: string;
  session: Session | null;
  createdBy: string;
  userId: string | undefined;
};

export default function PostActions({
  id,
  content,
  session,
  createdBy,
  userId,
}: PostActionsType) {
  // follow
  // dialog

  const deletePost = deletePostById.bind(null, id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'sm'} className="rounded-full h-auto">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-lg">
        {!session ? (
          <DropdownMenuItem>
            <Link href={'/auth'} className="flex items-center font-semibold">
              <User2 className="mr-1" />
              You must be Login
            </Link>
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem>Follow</DropdownMenuItem>
            {userId === createdBy ? (
              <>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                  <form action={deletePost} className="w-full">
                    <button className="w-full text-left text-red-500 dark:text-red-800 hover:text-red-500 dark:hover:text-red-700 px-2 py-1.5">
                      Delete
                    </button>
                  </form>
                </DropdownMenuItem>
              </>
            ) : (
              ''
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
