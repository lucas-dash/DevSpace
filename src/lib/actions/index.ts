'use server';

import { useId } from 'react';
import createSupabaseServerClient from '../supabase/server';

export default async function readUserSession() {
  const supabase = await createSupabaseServerClient();

  return supabase.auth.getSession();
}
