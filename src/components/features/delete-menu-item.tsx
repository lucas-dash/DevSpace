import { Trash2 } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { AlertDialogTrigger } from "../ui/alert-dialog";

export default function DeleteMenuItem() {
  return (
    <DropdownMenuItem>
      <AlertDialogTrigger className="flex items-center text-red-500 dark:text-red-700 hover:text-red-500 dark:hover:text-red-700 w-full font-semibold">
        <Trash2 className="mr-1.5 text-inherit bg-inherit" size={18} />
        Delete
      </AlertDialogTrigger>
    </DropdownMenuItem>
  );
}
