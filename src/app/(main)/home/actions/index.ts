"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
// import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";

export async function createPost(content: string, draft: boolean) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const result = await supabase
    .from("posts")
    .insert({ content, private: draft })
    .single();
  revalidatePath("/home");

  return JSON.stringify(result);
}

export async function readPosts(userId?: string) {
  // noStore();
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  if (userId) {
    return supabase
      .from("posts")
      .select()
      .eq("created_by", userId)
      .eq("private", false)
      .order("created_at", { ascending: false });
  }
  return supabase
    .from("posts")
    .select("*")
    .eq("private", false)
    .order("created_at", { ascending: false });
}

export async function updatePostById(
  id: string,
  content: string,
  url: string,
  user: string,
) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase.from("posts").update({ content }).eq("id", id);

  revalidatePath(url);
  revalidatePath("/home");
  revalidatePath(`/${user}`);

  return JSON.stringify(result);
}

export async function deletePostById(id: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const result = await supabase.from("posts").delete().eq("id", id);
  revalidatePath("/home");
  return result;
}

// drafts

export async function readDrafts(userId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = supabase
    .from("posts")
    .select()
    .eq("created_by", userId)
    .eq("private", true)
    .order("created_at", { ascending: false });

  return result;
}

export async function postDraft(postId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = supabase
    .from("posts")
    .update({ private: false, created_at: new Date().toISOString() })
    .eq("id", postId)
    .single();

  revalidatePath("/home");

  return result;
}

// post actions

export async function likePost(postId: string, userId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase
    .from("likes")
    .insert({ post_id: postId, user_id: userId });

  return result;
}

export async function unlikePost(postId: string, userId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const result = await supabase
    .from("likes")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);

  return result;
}

export async function checkLikedPost(postId: string, userId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const result = await supabase
    .from("likes")
    .select()
    .eq("post_id", postId)
    .eq("user_id", userId)
    .single();

  return result;
}

export async function getLikesByPostId(postId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const result = await supabase.from("likes").select().eq("post_id", postId);

  return result;
}

// bookmarks

export async function bookmarkPost(postId: string, userId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const result = await supabase
    .from("bookmarks")
    .insert({ post_id: postId, user_id: userId });

  return result;
}

export async function unbookmarkPost(postId: string, userId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const result = await supabase
    .from("bookmarks")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);

  return result;
}

export async function checkBookmarkedPost(postId: string, userId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const result = await supabase
    .from("bookmarks")
    .select()
    .eq("post_id", postId)
    .eq("user_id", userId)
    .single();

  return result;
}

export async function getBookmarksByPostId(postId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const result = await supabase
    .from("bookmarks")
    .select()
    .eq("post_id", postId);

  return result;
}

// reposts

export async function repostPost(postId: string, userId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const result = await supabase
    .from("reposts")
    .insert({ post_id: postId, user_id: userId });

  return result;
}

export async function unrepostPost(postId: string, userId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const result = await supabase
    .from("reposts")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);

  return result;
}

export async function checkRepostedPost(postId: string, userId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const result = await supabase
    .from("reposts")
    .select()
    .eq("post_id", postId)
    .eq("user_id", userId)
    .single();

  return result;
}

export async function getRepostsByPostId(postId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const result = await supabase.from("reposts").select().eq("post_id", postId);

  return result;
}
