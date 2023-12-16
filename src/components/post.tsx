import Link from 'next/link';
import PostActions from './post-actions';
import readUserSession from '@/lib/actions';
import PostUserActions from './post-user-actions';
import createSupabaseServerClient from '@/lib/supabase/server';

export default async function Post({
  content,
  created_by,
  likes,
  bookmarks,
  reposts,
  id,
}: Post) {
  const { data: session } = await readUserSession();
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  return (
    <article className="w-full bg-primary dark:bg-primary-dark rounded-2xl p-2.5 flex gap-3.5">
      <div className="h-[40px] w-[40px] bg-slate-400 flex items-center justify-center rounded-full flex-shrink-0">
        L
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">Lou</h4>
            <p className="text-fadeText dark:text-fadeText-dark">@spacecode_</p>
          </div>

          <PostActions
            id={id}
            content={content}
            createdBy={created_by}
            session={session?.session}
            userId={data.user?.id}
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
