'use server';

import createSupabaseServerClient from '@/lib/supabase/server';
import { ProfileSchema } from '@/lib/validations';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { z } from 'zod';

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

export async function updateProfileById(
  id: string,
  data: z.infer<typeof ProfileSchema>
) {
  const { bio, username, name, company, hireEmail, link1, link2, link3, url } =
    data;

  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from('profile')
    .update({
      username: username,
      display_name: name,
      bio: bio,
      company: company,
      hire_email: hireEmail,
      social_link_one: link1,
      social_link_two: link2,
      social_link_three: link3,
      url: url,
    })
    .eq('id', id);

  return JSON.stringify(result);
}
