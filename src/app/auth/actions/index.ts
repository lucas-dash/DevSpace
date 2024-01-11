'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function signUpWithEmailAndPassword(data: {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

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

  return result;
}

export async function logInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  return result;
}
