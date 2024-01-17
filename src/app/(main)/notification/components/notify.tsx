import { formatRelativeTime, notifyTypeCheck } from '@/lib/helperFunc';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ReadButton from './read-button';

export default async function Notify({
  created_at,
  notify_id,
  event_id,
  event_type,
  is_read,
  sender_user_id,
}: Notify) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: userData } = await supabase
    .from('profile')
    .select('*')
    .eq('id', sender_user_id)
    .single();

  const nameFallback = userData?.display_name[0].toUpperCase();

  const { data: post } = await supabase
    .from('posts')
    .select()
    .eq('id', event_id)
    .single();

  return (
    <article
      className={`p-2 relative ${
        !is_read
          ? 'bg-slate-200 dark:bg-gray-900 rounded-xl'
          : 'border-b border-slate-200 dark:border-slate-50'
      } `}
    >
      <div className="flex items-center gap-2 ">
        <Avatar>
          <AvatarImage src={userData?.avatar_url || ''} />
          <AvatarFallback className="bg-slate-300">
            {nameFallback}
          </AvatarFallback>
        </Avatar>

        <div>
          <Link
            href={`/${userData?.username}`}
            className="hover:underline font-semibold text-lg"
          >
            {userData?.display_name}
          </Link>
          <Link href={`/home/${post?.id}`} className="hover:underline">
            <p className="inline px-1">{notifyTypeCheck(event_type)}</p>
          </Link>
          <p className="text-sm max-[420px]:text-sm font-medium inline-block">
            <span className="mr-1">&#x2022;</span>
            {formatRelativeTime(created_at)}
          </p>
        </div>
      </div>
      {!is_read && <ReadButton notifyId={notify_id} />}
    </article>
  );
}
