import { Inbox } from "lucide-react";
import { getUser } from "@/lib/actions";
import UserAvatar from "../ui/user-avatar";
import PostForm from "./post-form";
import Drafts from "./drafts";
import CustomDrawer from "../custom-drawer";

export default async function CreatePost() {
  const {
    data: { user },
  } = await getUser();

  if (!user) {
    return;
  }

  return (
    <section className="bg-primary dark:bg-primary-dark rounded-2xl w-full flex gap-3.5 p-2.5">
      <div className="flex flex-col items-center gap-3">
        <UserAvatar />
        <CustomDrawer
          title="Your Drafts"
          buttonChildren={<Inbox size={20} />}
          buttonVariant={"ghost"}
          buttonSize={"icon"}
          aria-label="Drafts"
        >
          <Drafts userId={user.id} />
        </CustomDrawer>
      </div>

      <PostForm />
    </section>
  );
}
