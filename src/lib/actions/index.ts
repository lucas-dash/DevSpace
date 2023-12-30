'use server';

import { createSupabaseServerActionClient } from '../supabase/action';

export default async function readUserSession() {
  const supabase = await createSupabaseServerActionClient();

  return supabase.auth.getSession();
}
