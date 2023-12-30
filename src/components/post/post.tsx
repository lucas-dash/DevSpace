import Link from 'next/link';
import PostActions from './post-actions';
import readUserSession from '@/lib/actions';
import PostUser from './post-user';
import UserAvatar from '../ui/user-avatar';
import PostInteraction from './post-interaction';

export default async function Post({
  content,
  created_by,
  created_at,
  likes,
  bookmarks,
  reposts,
  id,
}: Post) {
  const {
    data: { session },
  } = await readUserSession();

  return (
    <article className="w-full bg-primary dark:bg-primary-dark rounded-2xl p-2.5 flex gap-3.5">
      <UserAvatar id={created_by} />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <PostUser createdBy={created_by} createdAt={created_at} />

          <PostActions postId={id} session={session} createdById={created_by} />
        </div>

        <Link href={`home/${id}`}>
          <p className="py-1">{content}</p>
        </Link>
        <PostInteraction userId={session?.user.id} postId={id} />
      </div>
    </article>
  );
}
