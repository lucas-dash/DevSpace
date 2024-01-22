'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function signUpWithEmailAndPassword(data: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `http://localhost:3000/auth/callback`,
      data: {
        username: data.username,
        display_name: data.name,
      },
    },
  });

  return JSON.stringify(result);
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

  return JSON.stringify(result);
}

export async function updateUserEmail(newEmail: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = supabase.auth.updateUser({ email: newEmail });
  return JSON.stringify(result);
}

export async function updateUserPassword(newPassword: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = supabase.auth.updateUser({ password: newPassword });
  return JSON.stringify(result);
}

export async function verifyCurrentPassword(currentPassword: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const result = await supabase.auth.signInWithPassword({
    email: user?.email!,
    password: currentPassword,
  });
  return JSON.stringify(result);
}

export async function deleteUserAccount(userId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase.auth.admin.deleteUser(userId);

  return JSON.stringify(result);
}
