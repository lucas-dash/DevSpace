'use server';

import createSupabaseServerClient from '@/lib/supabase/server';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';

export async function createPost(content: string) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from('posts').insert({ content }).single();
  revalidatePath('/home');

  return JSON.stringify(result);
}

export async function readPosts() {
  noStore();
  const supabase = await createSupabaseServerClient();
  return await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
}

export async function updatePostById(
  id: string,
  content: string,
  url: string,
  user: string
) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.from('posts').update({ content }).eq('id', id);

  revalidatePath(url);
  revalidatePath('/home');
  revalidatePath(`/${user}`);

  return JSON.stringify(result);
}

export async function deletePostById(id: string) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from('posts').delete().eq('id', id);
  revalidatePath('/home');
  return JSON.stringify(result);
}

export async function likePostByUserId(postId: string, userId: string) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase
    .from('likes')
    .insert({ post_id: postId, user_id: userId });
  revalidatePath('/home');

  return result;
}

export async function unlikePostByUserId(postId: string, userId: string) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase
    .from('likes')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', userId);
  revalidatePath('/home');

  return result;
}

export async function checkForAlreadyLikedPost(postId: string, userId: string) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase
    .from('likes')
    .select()
    .eq('post_id', postId)
    .eq('user_id', userId)
    .single();

  return result;
}

export async function getAllLikesByPostId(postId: string) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from('likes').select().eq('post_id', postId);

  return result;
}
