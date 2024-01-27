import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '../supabase/server';

export default async function readUserSession() {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase.auth.getSession();
  return result;
}

export async function getUserDataById(userId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase
    .from('profile')
    .select()
    .eq('id', userId)
    .single();

  return result;
}

export async function getUser() {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase.auth.getUser();

  return result;
}
