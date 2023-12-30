'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/action';

export async function signUpWithEmailAndPassword(data: {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const supabase = await createSupabaseServerActionClient();

  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: 'https://localhost:3000/auth/callback',
      data: {
        username: data.username,
        display_name: data.name,
      },
    },
  });

  return JSON.stringify(result);
}

export async function signInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerActionClient();

  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  return JSON.stringify(result);
}

export async function singOut() {
  const supabase = await createSupabaseServerActionClient();
  const result = await supabase.auth.signOut();
  return result;
}
