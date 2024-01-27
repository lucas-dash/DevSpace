import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import EmptyState from "@/components/ui/state/empty-state";
import Post from "@/components/post/post";

export default async function Bookmarks() {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <EmptyState
        title="You must be Logged in!"
        linkTitle="Log In"
        linkTo="auth"
      />
    );
  }

  const { data: bookmarksData } = await supabase
    .from("bookmarks")
    .select()
    .eq("user_id", session.user.id);

  const bookmarkedPostIds = bookmarksData?.map((b) => b.post_id);

  if (bookmarkedPostIds) {
    const { data: postsData } = await supabase
      .from("posts")
      .select()
      .in("id", bookmarkedPostIds)
      .order("created_at", { ascending: false });

    return (
      <section className="flex flex-col gap-5 h-max">
        {postsData?.length === 0 || !postsData ? (
          <EmptyState
            title="No Bookmarks yet!"
            linkTitle="Go Home"
            linkTo="home"
          />
        ) : (
          postsData?.map((post) => <Post key={post.id} {...post} />)
        )}
      </section>
    );
  }
}
