import { formatRelativeTime } from '@/lib/helperFunc';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';

type PostUserType = {
  createdBy: string;
  createdAt: string;
};

export default async function PostUser({ createdBy, createdAt }: PostUserType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: userData } = await supabase
    .from('profile')
    .select('*')
    .eq('id', createdBy)
    .single();

  return (
    <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
      <h4 className="font-semibold">{userData && userData.display_name}</h4>
      <Link
        href={`/${userData && userData.username}`}
        className="text-fadeText dark:text-fadeText-dark hover:underline max-[380px]:text-sm"
      >
        {userData && `@${userData.username}`}
      </Link>
      <p
        className="text-sm max-[370px]:hidden max-[420px]:text-xs"
        aria-label="created at"
      >
        <span className="mr-1">&#x2022;</span>
        {formatRelativeTime(createdAt)}
      </p>
    </div>
  );
}
