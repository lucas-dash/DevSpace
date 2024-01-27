import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Post from "@/components/post/post";
import EmptyState from "@/components/ui/state/empty-state";
import { readPosts } from "../../home/actions";

export default async function UserReposts({
  profileId,
}: {
  profileId: string;
}) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: reposts } = await supabase
    .from("reposts")
    .select()
    .eq("user_id", profileId)
    .order("created_at", { ascending: false });

  const { data: posts } = await readPosts();

  const repostPosts = reposts?.flatMap(
    (repost) => posts?.filter((post) => post.id === repost.post_id) || [],
  );

  return (
    <section className="flex flex-col gap-5">
      {repostPosts?.length === 0 || !repostPosts ? (
        <EmptyState title="No Reposts Yet!" image className="text-base" />
      ) : (
        repostPosts?.map((post) => <Post key={post.id} {...post} />)
      )}
    </section>
  );
}
