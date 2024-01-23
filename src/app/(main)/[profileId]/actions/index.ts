'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { ProfileSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

export async function getUserDataById(userId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: userData } = await supabase
    .from('profile')
    .select()
    .eq('id', userId)
    .single();

  return userData;
}

export async function updateProfileById(
  id: string,
  data: z.infer<typeof ProfileSchema>
) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { bio, username, name, company, hireEmail, link1, link2, link3, url } =
    data;

  await supabase.auth.updateUser({
    data: { username: username, display_name: name },
  });

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

  return result;
}

export async function updateTechStackArray(
  userId: string,
  techStack: string[]
) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const updatedArray = techStack || [];

  const result = await supabase
    .from('profile')
    .update({ tech_stack: updatedArray })
    .eq('id', userId)
    .single();

  return result;
}

export async function followUser(userId: string, followId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase
    .from('follows')
    .insert({ follower_id: userId, following_id: followId });

  return result;
}

export async function unfollowUser(userId: string, followId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', userId)
    .eq('following_id', followId);

  revalidatePath('/');

  return result;
}

export async function checkForFollowedUser(userId: string, followId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase
    .from('follows')
    .select()
    .eq('follower_id', userId)
    .eq('following_id', followId);

  return result;
}
