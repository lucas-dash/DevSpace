import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import ChildComment from "./child-comment";
import Comment from "./comment";

type CommentsType = {
  comment: Comments;
  postId: string;
};

export default async function Comments({
  comment: { content, user_id, created_at, comment_id },
  postId,
}: CommentsType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: childComments } = await supabase
    .from("comments")
    .select()
    .eq("parentCommentId", comment_id)
    .order("created_at", { ascending: false });

  const commentDivider = childComments?.some(
    (comment) => comment.parentCommentId === comment_id,
  );

  return (
    <section className="border-t border-slate-200 dark:border-slate-600 py-2.5">
      <Comment
        createdBy={user_id}
        createdAt={created_at}
        commentDivider={commentDivider}
        content={content}
        commentId={comment_id}
        postId={postId}
        comments={childComments?.length}
      />

      {childComments?.length !== 0 &&
        childComments?.map((comment) => (
          <ChildComment
            key={comment.comment_id}
            comment={comment}
            postId={postId}
          />
        ))}
    </section>
  );
}
