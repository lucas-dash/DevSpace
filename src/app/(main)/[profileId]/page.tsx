import createSupabaseServerClient from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import UsersPosts from './components/usersPosts';
import ProfileHeader from './components/profile-header';

type ProfileIdType = {
  params: {
    profileId: string;
  };
};

export default async function ProfileId({
  params: { profileId },
}: ProfileIdType) {
  const supabase = await createSupabaseServerClient();

  const { data: userData } = await supabase
    .from('profile')
    .select('*')
    .eq('username', profileId);

  if (profileId === String(undefined)) {
    redirect('/auth');
  }

  if (userData?.length === 0 || userData === null) {
    return (
      <section>
        <h3>User not found</h3>
      </section>
    );
  }

  return (
    <section className="h-full">
      <ProfileHeader userData={userData[0]} profileId={profileId} />
      <UsersPosts userId={userData[0].id} />
    </section>
  );
}
