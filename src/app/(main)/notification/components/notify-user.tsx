import { formatRelativeTime, notifyTypeCheck } from '@/lib/helperFunc';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type NotifyUserType = {
  createdBy: string;
  createdAt: string;
  event_type:
    | 'likes'
    | 'follows'
    | 'reposts'
    | 'bookmarks'
    | 'comments'
    | string;
};

export default async function NotifyUser({
  createdBy,
  createdAt,
  event_type,
}: NotifyUserType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: userData } = await supabase
    .from('profile')
    .select('*')
    .eq('id', createdBy)
    .single();

  const nameFallback = userData?.display_name[0].toUpperCase();

  return (
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Avatar>
        <AvatarImage src={userData?.avatar_url || ''} />
        <AvatarFallback className="bg-slate-300">{nameFallback}</AvatarFallback>
      </Avatar>
      <div className="text-center">
        <Link
          href={`/${userData?.username}`}
          className="hover:underline font-semibold text-lg"
        >
          {userData?.display_name}
        </Link>
        <p className="inline px-1">{notifyTypeCheck(event_type)}</p>
        <p className="text-sm max-[420px]:text-sm font-medium inline">
          <span className="mr-1">&#x2022;</span>
          {formatRelativeTime(createdAt)}
        </p>
      </div>
    </div>
  );
}
