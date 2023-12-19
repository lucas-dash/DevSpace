'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  User2,
  UserRoundPlus,
} from 'lucide-react';
import Link from 'next/link';
import { Session } from '@supabase/supabase-js';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import DeleteAlert from './delete-alert';

type PostActionsType = {
  id: string;
  content?: string;
  session: Session | null;
  createdBy: string;
};

export default function PostActions({
  id,
  session,
  createdBy,
}: PostActionsType) {
  // follow

  return (
    <AlertDialog>
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
              {session.user.id === createdBy ? (
                <>
                  <DropdownMenuItem>
                    <Pencil className="mr-1.5" size={18} />
                    <Link
                      href={`${session.user.user_metadata.username}/${id}`}
                      className="w-full"
                    >
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <AlertDialogTrigger className="flex items-center text-red-500 dark:text-red-700 hover:text-red-500 dark:hover:text-red-700 w-full">
                      <Trash2
                        className="mr-1.5 text-primary-dark dark:text-primary"
                        size={18}
                      />
                      Delete
                    </AlertDialogTrigger>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem>
                  <UserRoundPlus className="mr-1.5" size={18} />
                  Follow
                </DropdownMenuItem>
              )}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlert id={id} />
    </AlertDialog>
  );
}
