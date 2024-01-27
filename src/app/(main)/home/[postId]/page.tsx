import Post from "@/components/post/post";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import readUserSession from "@/lib/actions";
import EmptyState from "@/components/ui/state/empty-state";
import CreateComment from "./components/create-comment";
import PostComments from "./components/post-comments";

type PostType = {
  params: {
    postId: string;
  };
};

export default async function PostId({ params: { postId } }: PostType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const {
    data: { session },
  } = await readUserSession();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (!post) {
    return (
      <EmptyState
        title="Post doesn't exists."
        linkTitle="Back to home"
        linkTo="home"
        icon
      />
    );
  }
  return (
    <section className="flex flex-col gap-5 bg-primary dark:bg-primary-dark rounded-2xl py-2 px-1.5">
      <Post {...post} />
      {session && (
        <>
          <hr className="border-slate-200 dark:border-slate-600" />
          <CreateComment postId={postId} createBy={post.created_by} />
        </>
      )}
      <PostComments postId={postId} />
    </section>
  );
}
