'use server';

import createSupabaseServerClient from '@/lib/supabase/server';

export async function signUpWithEmailAndPassword(data: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: 'https://localhost:3000/auth/callback',
    },
  });

  return JSON.stringify(result);
}

export async function signInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  return JSON.stringify(result);
}
