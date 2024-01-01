import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '../supabase/server';

export default async function readUserSession() {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  return await supabase.auth.getSession();
}
