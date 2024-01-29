import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import UserInfo from "@/components/post/user-info";
import UserAvatar from "@/components/ui/user-avatar";
import ReadButton from "./read-button";

export default async function Notify({
  created_at,
  notify_id,
  event_id,
  event_type,
  is_read,
  sender_user_id,
}: Notify) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  let linkToPost: string = "";

  const { data: post } = await supabase
    .from("posts")
    .select()
    .eq("id", event_id)
    .single();

  if (post) {
    linkToPost = `/home/${post?.id}`;
  }

  if (event_type === "follows") {
    linkToPost = "";
  }

  return (
    <article
      className={`p-2 relative ${
        !is_read
          ? "bg-slate-200 dark:bg-gray-900 rounded-xl"
          : "last:border-0 border-b border-slate-200 dark:border-slate-500"
      } `}
    >
      <div className="flex items-center gap-2 ">
        <UserAvatar userId={sender_user_id} />
        <UserInfo
          createdBy={sender_user_id}
          createdAt={created_at}
          eventType={event_type}
          linkToPost={linkToPost}
        />
      </div>
      {!is_read && <ReadButton notifyId={notify_id} />}
    </article>
  );
}
