import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { deletePostById } from "@/app/(main)/home/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteCommentById } from "@/lib/actions/comments";

type DeleteAlertType = {
  id: string;
  type: "Post" | "Comment";
};

export default function DeleteAlert({ id, type }: DeleteAlertType) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const deleteOnSubmit = () => {
    startTransition(async () => {
      if (type === "Post") {
        const { error } = await deletePostById(id);

        if (error?.message) {
          toast.error(error?.message);
        } else {
          toast.success("The post has been deleted!");
          router.refresh();
        }
      }

      if (type === "Comment") {
        const { error } = await deleteCommentById(id);

        if (error?.message) {
          toast.error(error?.message);
        } else {
          toast.success("The comment has been deleted!");
          router.refresh();
        }
      }
    });
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your{" "}
          {type === "Post" ? "post" : "comment"}.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={deleteOnSubmit}
          className="bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90"
        >
          {isPending && <Loader2 className="mr-1 animate-spin" size={20} />}
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
