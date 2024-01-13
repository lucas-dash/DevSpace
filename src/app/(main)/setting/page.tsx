import { redirect } from 'next/navigation';
import UserProfileSet from './components/user-profle-sett';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export default async function Setting() {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  const { data: userData } = await supabase
    .from('profile')
    .select()
    .eq('id', user?.id)
    .single();

  return (
    <section className="rounded-2xl bg-primary dark:bg-primary-dark h-full p-6">
      <div className="flex items-center max-w-max gap-5 pb-1">
        <h3 className="text-lg font-medium">Profile</h3>
        <h3 className="text-lg font-medium">Account</h3>
      </div>
      <hr />

      {userData && <UserProfileSet profile={userData} userId={user.id} />}
    </section>
  );
}
