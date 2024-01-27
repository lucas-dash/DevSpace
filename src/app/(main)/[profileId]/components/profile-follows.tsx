import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

type ProfileFollowType = {
  userId: string;
};
export default async function ProfileFollows({ userId }: ProfileFollowType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: followers } = await supabase
    .from("follows")
    .select()
    .eq("following_id", userId);

  const { data: following } = await supabase
    .from("follows")
    .select()
    .eq("follower_id", userId);

  return (
    <section className="flex items-center gap-3">
      <p>
        <span className="font-semibold">{followers?.length}</span> followers
      </p>
      <p>
        <span className="font-semibold">{following?.length}</span> following
      </p>
    </section>
  );
}
