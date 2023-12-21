import { redirect } from 'next/navigation';
import UserProfileSet from './components/user-profle-sett';
import createSupabaseServerClient from '@/lib/supabase/server';

export default async function Setting() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  const { data: userData } = await supabase
    .from('profile')
    .select()
    .eq('id', user?.id);

  return (
    <section className="rounded-2xl bg-primary dark:bg-primary-dark h-full p-6">
      <div className="flex items-center max-w-max gap-5 pb-1">
        <h3 className="text-lg font-medium">Profile</h3>
        <h3 className="text-lg font-medium">Account</h3>
      </div>
      <hr />

      {userData && <UserProfileSet {...userData[0]} />}
    </section>
  );
}
