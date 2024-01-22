import Link from 'next/link';
import PostActions from './post-actions';
import PostUser from './post-user';
import UserAvatar from '../ui/user-avatar';
import PostInteraction from './post-interaction';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function Post({
  id,
  content,
  created_by,
  created_at,
}: Post) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <article className="w-full bg-primary dark:bg-primary-dark rounded-2xl p-2.5">
      <div className="flex gap-3.5">
        <UserAvatar userId={created_by} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <PostUser createdBy={created_by} createdAt={created_at} />

            <PostActions postId={id} user={user} createdBy={created_by} />
          </div>

          <Link href={`/home/${id}`}>
            <p className="py-1">{content}</p>
          </Link>
        </div>
      </div>
      <PostInteraction userId={user?.id} postId={id} createdBy={created_by} />
    </article>
  );
}
