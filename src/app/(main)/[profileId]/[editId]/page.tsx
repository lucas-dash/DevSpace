import PostEdit from '@/components/post/post-edit';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type EditIdType = {
  params: {
    editId: string;
  };
};

export default async function EditId({ params: { editId } }: EditIdType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: post } = await supabase.from('posts').select().eq('id', editId);

  if (!post) {
    return (
      <div>
        <h1>Post not found</h1>
      </div>
    );
  }

  if (!session || session.user.id !== post[0].created_by) {
    redirect('/home');
  }

  return (
    <section className="bg-primary dark:bg-primary-dark rounded-2xl p-5">
      <PostEdit post={post[0]} user={session.user.user_metadata.username} />
    </section>
  );
}
