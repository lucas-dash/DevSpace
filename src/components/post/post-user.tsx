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
    <div className="flex items-center gap-1.5">
      <h4 className="font-semibold">{userData && userData.display_name}</h4>
      <Link
        href={`/${userData && userData.username}`}
        className="text-fadeText dark:text-fadeText-dark hover:underline"
      >
        {userData && `@${userData.username}`}
      </Link>
      <span className="max-[380px]:hidden">&#x2022;</span>
      <p className="text-sm max-[380px]:hidden max-[420px]:text-xs">
        {formatRelativeTime(createdAt)}
      </p>
    </div>
  );
}
