import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import Post from '@/components/post/post';
import SearchCommand from '@/components/search/search-command';

export default async function Bookmarks() {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <section className="bg-primary dark:bg-primary-dark h-full rounded-2xl flex flex-col items-center justify-center gap-5">
        <h1 className="text-lg md:text-xl font-semibold">
          You must be Logged In!
        </h1>
        <Button variant={'accent'} asChild>
          <Link href={'/auth'}>Log In</Link>
        </Button>
      </section>
    );
  }

  const { data: bookmarksData } = await supabase
    .from('bookmarks')
    .select()
    .eq('user_id', session.user.id);

  const bookmarkedPostIds = bookmarksData?.map((b) => b.post_id);

  if (bookmarkedPostIds) {
    const { data: postsData } = await supabase
      .from('posts')
      .select()
      .in('id', bookmarkedPostIds)
      .order('created_at', { ascending: false });

    return (
      <section className="flex flex-col gap-5">
        {postsData?.length === 0 || !postsData ? (
          <div className="flex items-center justify-center h-full bg-primary dark:bg-primary-dark rounded-2xl">
            <h3 className="font-semibold">No Bookmarks Yet!</h3>
          </div>
        ) : (
          postsData?.map((post) => <Post key={post.id} {...post} />)
        )}
      </section>
    );
  }
}
