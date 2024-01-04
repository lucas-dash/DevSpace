import Post from '@/components/post/post';
import { Button } from '@/components/ui/button';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';

type PostType = {
  params: {
    postId: string;
  };
};

export default async function PostId({ params: { postId } }: PostType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();

  if (!post) {
    return (
      <div className="h-full flex flex-col gap-2 items-center justify-center">
        <h3 className="font-medium text-lg">Post doesn&apos;t exists.</h3>
        <Button asChild variant={'accent'}>
          <Link href={'/home'}>Back to home</Link>
        </Button>
      </div>
    );
  }
  return (
    <section className="h-full flex flex-col gap-5 bg-primary dark:bg-primary-dark rounded-2xl">
      <Post {...post} />
      <hr />
      {/* comment form */}
      <hr />
      {/* //todo comments */}
    </section>
  );
}
