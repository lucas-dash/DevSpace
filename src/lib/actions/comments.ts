'use server';

import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '../supabase/server';
import { revalidatePath } from 'next/cache';

export async function createComment(
  content: string,
  post_id: string,
  user_id: string,
  path: string
) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase
    .from('comments')
    .insert({ content, post_id, user_id })
    .single();

  revalidatePath(path);

  return result;
}

export async function deleteCommentById(commentId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase
    .from('comments')
    .delete()
    .eq('comment_id', commentId);

  return result;
}

export async function replayToComment(
  content: string,
  parentComment: string,
  user_id: string,
  path: string
) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = supabase.from('comments').insert({
    content,
    user_id,
    post_id: null,
    parentCommentId: parentComment,
  });

  revalidatePath(path);

  return result;
}

export async function getPostCommentsNumber(post_id: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = supabase.from('comments').select().eq('post_id', post_id);
  return result;
}

export async function likeComment() {}
