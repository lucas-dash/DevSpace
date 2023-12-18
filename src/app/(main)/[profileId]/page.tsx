import createSupabaseServerClient from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

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

  if (userData?.length === 0) {
    return (
      <div>
        <h3>User not found</h3>
      </div>
    );
  }

  return (
    <div>
      <h1>{userData && userData[0]?.username}</h1>
    </div>
  );
}
