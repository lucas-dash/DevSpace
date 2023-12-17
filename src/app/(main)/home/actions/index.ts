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
  return await supabase.from('posts').select('*');
}

export async function updatePostById(id: string, content: string) {
  const supabase = await createSupabaseServerClient();

  await supabase.from('posts').update({ content }).eq('id', id);

  revalidatePath('/home');
  // i need revalidate profile or post page
}

// export async function deletePostById(id: string) {
//   const supabase = await createSupabaseServerClient();

//   await supabase.from('posts').delete().eq('id', id);

//   revalidatePath('/home');
// }

export async function deletePostById(id: string) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from('posts').delete().eq('id', id);
  revalidatePath('/home');
  return JSON.stringify(result);
}
