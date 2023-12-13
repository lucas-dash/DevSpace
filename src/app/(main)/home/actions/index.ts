'use server';

import createSupabaseServerClient from '@/lib/supabase/server';

export async function createPost(content: string) {
  const supabase = await createSupabaseServerClient();
  // supabase.from("post")
}

export async function readPosts() {}

export async function deletePost(id: string) {}

export async function updatePostById(id: string) {}
