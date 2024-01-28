"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "../../../../../lib/supabase/server";

export async function createComment(
  content: string,
  post_id: string,
  path: string,
) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase
    .from("comments")
    .insert({ content, post_id })
    .single();

  revalidatePath(path);

  return result;
}

export async function deleteCommentById(commentId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase
    .from("comments")
    .delete()
    .eq("comment_id", commentId);

  return result;
}

export async function replyToComment(
  content: string,
  parentComment: string,
  path: string,
) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = supabase.from("comments").insert({
    content,
    post_id: null,
    parentCommentId: parentComment,
  });

  revalidatePath(path);

  return result;
}

export async function getPostCommentsNumber(post_id: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = supabase.from("comments").select().eq("post_id", post_id);
  return result;
}

export async function likeComment(commentId: string, userId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const result = await supabase
    .from("likes")
    .insert({ comment_id: commentId, user_id: userId });

  revalidatePath("/home");
  return result;
}

export async function unlikeComment(commentId: string, userId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase
    .from("likes")
    .delete()
    .eq("comment_id", commentId)
    .eq("user_id", userId);
  revalidatePath("/home");

  return result;
}

export async function checkLikedComment(commentId: string, userId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase
    .from("likes")
    .select()
    .eq("comment_id", commentId)
    .eq("user_id", userId)
    .single();

  return result;
}

export async function getLikesByCommentId(commentId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const result = await supabase
    .from("likes")
    .select()
    .eq("comment_id", commentId);

  return result;
}
