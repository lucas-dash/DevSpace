"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteUserAccount } from "@/app/auth/actions";

export default function DeleteAccount({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDeleteAccount = () => {
    startTransition(async () => {
      const result = await deleteUserAccount(userId);

      const { error } = JSON.parse(result);

      if (!error.message) {
        toast.success("Account has been deleted!");
        redirect("/");
      } else {
        toast.error(error?.message);
      }
    });
  };

  return (
    <section>
      <h3 className="text-lg font-semibold text-red-500 dark:text-red-700">
        Danger Section
      </h3>
      <hr className="border-red-500 dark:border-red-700" />
      <p className="tex-xs py-3 ">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"}>Delete your account?</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant={"destructive"}
                className="bg-red-500 dark:bg-red-900 dark:text-white hover:bg-red-500/90 dark:hover:bg-red-900/90"
                onClick={handleDeleteAccount}
              >
                {isPending && <Loader2 className="animate-spin mr-1" />}
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
