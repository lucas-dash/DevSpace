import PostUser from "@/components/post/post-user";
import UserAvatar from "@/components/ui/user-avatar";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { checkLikedComment, getLikesByCommentId } from "@/lib/actions/comments";
import CommentInteraction from "./comment-interaction";
import CommentActions from "./comment-actions";

type ChildCommentType = {
  comment: Comments;
  postId: string;
};

export default async function ChildComment({
  comment: { content, user_id, created_at, comment_id },
  postId,
}: ChildCommentType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: childComments } = await supabase
    .from("comments")
    .select()
    .eq("parentCommentId", comment_id)
    .order("created_at", { ascending: false });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: liked } = await checkLikedComment(comment_id, user_id);
  const { data: likes } = await getLikesByCommentId(comment_id);

  const commentDivider = childComments?.some(
    (comment) => comment.parentCommentId === comment_id,
  );

  return (
    <section
      className={`ml-7 border-l-2 border-slate-200 dark:border-slate-600 ${
        commentDivider && "border-b border-slate-200 dark:border-slate-600"
      }`}
    >
      <article
        className={`px-3 max-[380px]:px-1.5 py-2.5 flex gap-3.5 relative `}
      >
        {commentDivider && (
          <div className="border-l-2 border-slate-200 dark:border-slate-600 absolute top-1/2 left-7 h-20" />
        )}
        <UserAvatar userId={user_id} />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <PostUser createdAt={created_at} createdBy={user_id} />
            <CommentActions
              createdBy={user_id}
              commentId={comment_id}
              userId={user?.id}
            />
          </div>
          <p className="py-1">{content}</p>

          <CommentInteraction
            commentId={comment_id}
            comments={childComments?.length}
            createdBy={user_id}
            liked={liked}
            likes={likes?.length}
            userId={user?.id}
            postId={postId}
          />
        </div>
      </article>
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
