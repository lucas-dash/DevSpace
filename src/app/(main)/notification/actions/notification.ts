"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function sendNotification(
  recipient_user_id: string,
  event_type:
    | "likes"
    | "follows"
    | "reposts"
    | "bookmarks"
    | "comments"
    | "replyComment",
  event_id: string,
) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = supabase
    .from("notification")
    .insert({ recipient_user_id, event_type, event_id });

  return result;
}

export async function selectUserNotification(userId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = await supabase
    .from("notification")
    .select()
    .eq("recipient_user_id", userId)
    .order("created_at", { ascending: false });

  return result;
}

export async function readNotification(notifyId: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const result = supabase
    .from("notification")
    .update({ is_read: true })
    .eq("notify_id", notifyId)
    .single();

  return result;
}
