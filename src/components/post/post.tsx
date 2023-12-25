import Link from 'next/link';
import PostActions from './post-actions';
import readUserSession from '@/lib/actions';
import PostUserActions from './post-user-actions';
import PostUser from './post-user';
import UserAvatar from '../ui/user-avatar';

export default async function Post({
  content,
  created_by,
  created_at,
  likes,
  bookmarks,
  reposts,
  id,
}: Post) {
  const { data: session } = await readUserSession();

  return (
    <article className="w-full bg-primary dark:bg-primary-dark rounded-2xl p-2.5 flex gap-3.5">
      <UserAvatar id={created_by} />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <PostUser createdBy={created_by} createdAt={created_at} />

          <PostActions
            id={id}
            content={content}
            createdBy={created_by}
            session={session?.session}
          />
        </div>

        <Link href={`home/${id}`}>
          <p className="py-1">{content}</p>
        </Link>

        <PostUserActions
          bookmarks={bookmarks}
          likes={likes}
          reposts={reposts}
        />
      </div>
    </article>
  );
}
