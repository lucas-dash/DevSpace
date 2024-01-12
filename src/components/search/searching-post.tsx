import { formatRelativeTime } from '@/lib/helperFunc';
import createSupabaseBrowserClient from '@/lib/supabase/client';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type SearchingPostType = {
  post: Post;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SearchingPost({
  post: { created_by, created_at, content, id },
  setOpen,
}: SearchingPostType) {
  const [user, setUser] = useState<Profile | null>(null);
  const supabase = createSupabaseBrowserClient();

  const nameFallback = user?.display_name[0].toUpperCase() || 'username';

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase
        .from('profile')
        .select()
        .eq('id', created_by)
        .single();
      setUser(data);
    };
    getUser();
  }, [created_by, supabase]);

  return (
    <article className="w-full bg-slate-200 dark:bg-gray-900 rounded-2xl p-2.5">
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src={user?.avatar_url || ''} />
          <AvatarFallback className="bg-slate-300">
            {nameFallback}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
              <h4 className="font-semibold">{user && user.display_name}</h4>
              <Link
                href={`/${user?.username}`}
                onClick={() => setOpen(false)}
                className="text-fadeText dark:text-fadeText-dark hover:underline max-[380px]:text-sm"
              >
                {`@${user?.username}`}
              </Link>
              <p
                className="text-sm max-[340px]:hidden max-[420px]:text-xs"
                aria-label="created at"
              >
                <span className="mr-1">&#x2022;</span>
                {formatRelativeTime(created_at)}
              </p>
            </div>
          </div>
          <Link href={`/home/${id}`} onClick={() => setOpen(false)}>
            <p className="py-1">{content}</p>
          </Link>
        </div>
      </div>
    </article>
  );
}
