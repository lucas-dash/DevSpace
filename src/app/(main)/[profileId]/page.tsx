import { redirect } from 'next/navigation';
import UsersPosts from './components/users-posts';
import ProfileHeader from './components/profile-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserReposts from './components/user-reposts';
import EmptyState from '@/components/ui/state/empty-state';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

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
  const { data: userData, error } = await supabase
    .from('profile')
    .select()
    .eq('username', profileId)
    .single();

  if (profileId === String(undefined)) {
    redirect('/auth');
  }

  if (!userData || error) {
    return (
      <EmptyState
        title="User not found!"
        linkTo="home"
        linkTitle="Back to home"
        icon
      />
    );
  }

  return (
    <section className="h-full">
      <ProfileHeader {...userData} />
      <Tabs defaultValue="posts" className="w-full mt-2.5">
        <TabsList className="grid w-full grid-cols-2 rounded-lg bg-transparent dark:bg-transparent">
          <TabsTrigger
            value="posts"
            className="data-[state=active]:bg-accent dark:data-[state=active]:bg-accent-dark data-[state=active]:text-primary"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="reposts"
            className="data-[state=active]:bg-accent dark:data-[state=active]:bg-accent-dark data-[state=active]:text-primary"
          >
            Reposts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <UsersPosts profileId={userData.id} />
        </TabsContent>
        <TabsContent value="reposts">
          <UserReposts profileId={userData.id} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
