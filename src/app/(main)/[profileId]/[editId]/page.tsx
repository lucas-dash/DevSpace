import EmptyState from '@/components/empty-state';
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

  const { data: post } = await supabase
    .from('posts')
    .select()
    .eq('id', editId)
    .single();

  if (!post) {
    return (
      <EmptyState
        title="Post not found!"
        linkTitle="Back to home"
        linkTo="/home"
        icon
      />
    );
  }

  if (!session || session.user.id !== post.created_by) {
    redirect('/home');
  }

  return (
    <section className="bg-primary dark:bg-primary-dark rounded-2xl p-5">
      <PostEdit post={post} user={session.user.user_metadata.username} />
    </section>
  );
}
