'use server';

import createSupabaseServerClient from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function followUser(userId: string, followId: string) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from('follows')
    .insert({ follower_id: userId, following_id: followId });

  return result;
}

export async function unfollowUser(userId: string, followId: string) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', userId)
    .eq('following_id', followId);

  revalidatePath('/');

  return result;
}

export async function checkForFollowedUser(userId: string, followId: string) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from('follows')
    .select()
    .eq('follower_id', userId)
    .eq('following_id', followId);

  return result;
}
