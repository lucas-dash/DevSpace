import { Inbox } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { getUser } from "@/lib/actions";
import UserAvatar from "../ui/user-avatar";
import PostForm from "./post-form";
import CustomDrawer from "../custom-drawer";
import PostSkeleton from "../ui/skeletons/post-skeleton";

const LazyDrafts = dynamic(() => import("./drafts"));

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
          <Suspense fallback={<PostSkeleton />}>
            <LazyDrafts userId={user.id} />
          </Suspense>
        </CustomDrawer>
      </div>

      <PostForm />
    </section>
  );
}
