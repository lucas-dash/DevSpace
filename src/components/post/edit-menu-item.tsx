import { Pencil } from "lucide-react";
import Link from "next/link";
import { DropdownMenuItem } from "../ui/dropdown-menu";

type EditMenuItemProps = {
  username: string;
  postId: string;
};
export default function EditMenuItem({ postId, username }: EditMenuItemProps) {
  return (
    <DropdownMenuItem className="font-semibold">
      <Pencil className="mr-1.5" size={18} />
      <Link href={`/${username}/${postId}`} className="w-full">
        Edit
      </Link>
    </DropdownMenuItem>
  );
}
