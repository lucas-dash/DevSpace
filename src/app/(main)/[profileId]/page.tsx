import createSupabaseServerClient from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TwitterIcon } from 'lucide-react';

type ProfileIdType = {
  params: {
    profileId: string;
  };
};

export default async function ProfileId({
  params: { profileId },
}: ProfileIdType) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    <section className="h-full bg-primary dark:bg-primary-dark rounded-2xl p-5">
      <div className="flex justify-between gap-5">
        <div className="w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] rounded-full flex items-center justify-center border-2 border-primary-dark dark:border-primary">
          {userData[0]?.avatar_url ? (
            <div className="max-w-[120px] max-h-[120px]">
              <Image
                src={userData[0]?.avatar_url}
                alt={`${userData[0].username} profile picture`}
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>
          ) : (
            <p className="text-3xl">{userData[0]?.display_name?.slice()[0]}</p>
          )}
        </div>

        <div className="flex gap-2.5 max-sm:flex-col">
          {user?.user_metadata.username === profileId ? (
            <Button asChild variant={'outline'}>
              <Link href="/setting">Edit Profile</Link>
            </Button>
          ) : (
            <>
              <Button variant={'outline'}>Get in touch</Button>
              <Button variant={'accent'}>Follow</Button>
            </>
          )}
        </div>
      </div>

      <div className="w-full py-5">
        <div>
          <h2 className="text-xl font-bold">{userData[0]?.display_name}</h2>
          <p className="text-fadeText dark:text-fadeText-dark text-sm">
            @{userData[0]?.username}
          </p>
        </div>
        <p className={`pt-3.5 text-sm ${!userData[0].bio && 'hidden'}`}>
          {userData[0].bio}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <p>
          <span className="font-bold">90k</span> followers
        </p>
        <p>
          <span className="font-bold">73</span> following
        </p>
      </div>

      <div className="py-5">
        <Button asChild size={'sm'} className="rounded-full">
          <Link href={''}>
            <TwitterIcon size={20} className="mr-1" />
            twitter.com
          </Link>
        </Button>
      </div>

      <div className="pb-5">
        <div>
          <h4 className="font-bold">Career</h4>
        </div>

        <div>
          <h4 className="font-bold">Tech stack</h4>
        </div>
      </div>
    </section>
  );
}
