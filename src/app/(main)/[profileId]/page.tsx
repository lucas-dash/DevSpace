import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import UsersPosts from './components/users-posts';
import ProfileHeader from './components/profile-header';
import { cookies } from 'next/headers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserReposts from './components/user-reposts';

type ProfileIdType = {
  params: {
    profileId: string;
  };
};

export default async function ProfileId({
  params: { profileId },
}: ProfileIdType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: userData } = await supabase
    .from('profile')
    .select('*')
    .eq('username', profileId);

  if (profileId === String(undefined)) {
    redirect('/auth');
  }

  if (userData?.length === 0 || userData === null) {
    return (
      <section className="bg-primary dark:bg-primary-dark rounded-2xl h-full flex items-center justify-center">
        <h3>User not found</h3>
      </section>
    );
  }

  return (
    <section className="h-full">
      <ProfileHeader userData={userData[0]} profileId={profileId} />
      <Tabs defaultValue="posts" className="w-full mt-2.5">
        <TabsList className="grid w-full grid-cols-2 rounded-lg bg-transparent dark:bg-transparent">
          <TabsTrigger
            value="posts"
            className="dark:data-[state=active]:bg-accent-dark"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="reposts"
            className="dark:data-[state=active]:bg-accent-dark"
          >
            Reposts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <UsersPosts userId={userData[0].id} />
        </TabsContent>
        <TabsContent value="reposts">
          <UserReposts userId={userData[0].id} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
