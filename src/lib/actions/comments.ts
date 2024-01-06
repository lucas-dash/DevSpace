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

export async function replayToComment(
  parentComment: string,
  post_id: string,
  user_id: string,
  content: string
) {}

export async function deleteCommentById(commentId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase
    .from('comments')
    .delete()
    .eq('comment_id', commentId);

  return result;
}
