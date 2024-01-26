import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import ProfileSetting from './components/profile-setting';
import AccountSetting from './components/account-setting';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { redirect } from 'next/navigation';

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
    <section className="rounded-2xl bg-primary dark:bg-primary-dark h-max p-3.5 sm:py-2 sm:px-5">
      <Tabs defaultValue="profile" className="w-full mt-2.5">
        <TabsList className="grid w-full grid-cols-2 rounded-lg bg-transparent dark:bg-transparent ">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-accent dark:data-[state=active]:bg-accent-dark data-[state=active]:text-primary sm:text-base"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-accent dark:data-[state=active]:bg-accent-dark data-[state=active]:text-primary sm:text-base"
          >
            Account
          </TabsTrigger>
        </TabsList>
        <hr className="mt-2" />
        <TabsContent value="profile">
          {userData && <ProfileSetting profile={userData} userId={user.id} />}
        </TabsContent>
        <TabsContent value="account">
          <AccountSetting userId={user.id} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
