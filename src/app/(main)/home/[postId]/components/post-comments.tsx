import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Comments from "@/components/comments/comments";

type PostCommentsType = {
  postId: string;
};

export default async function PostComments({ postId }: PostCommentsType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: comments } = await supabase
    .from("comments")
    .select()
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  return (
    <section className="flex flex-col gap-2">
      {comments?.map((comment) => (
        <Comments key={comment.comment_id} comment={comment} postId={postId} />
      ))}
    </section>
  );
}
