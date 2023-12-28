import { linkUrlChecker } from '@/lib/helperFunc';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Facebook, LinkIcon, TwitterIcon } from 'lucide-react';
import readUserSession from '@/lib/actions';
import ProfileActions from './profile-actions';
import createSupabaseServerClient from '@/lib/supabase/server';

type ProfileHeaderType = {
  userData: Profile;
  profileId: string;
};

export default async function ProfileHeader({
  profileId,
  userData: {
    avatar_url,
    bio,
    id,
    username,
    display_name,
    social_link_one,
    social_link_three,
    social_link_two,
    url,
    company,
    tech_stack,
  },
}: ProfileHeaderType) {
  const {
    data: { session },
  } = await readUserSession();

  const supabase = await createSupabaseServerClient();
  const { data: followers } = await supabase
    .from('follows')
    .select()
    .eq('following_id', id);

  const { data: following } = await supabase
    .from('follows')
    .select()
    .eq('follower_id', id);

  const urlIcon = (url: string) => {
    if (url.includes('twitter.com')) {
      return <TwitterIcon size={20} className="mr-1" />;
    } else if (url.includes('facebook.com')) {
      return <Facebook size={20} className="mr-1" />;
    } else {
      return <LinkIcon size={20} className="mr-1" />;
    }
  };

  return (
    <article className="h-max bg-primary dark:bg-primary-dark rounded-2xl p-5">
      <div className="flex justify-between gap-5">
        <div className="w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] rounded-full flex items-center justify-center border-2 border-primary-dark dark:border-primary">
          {avatar_url ? (
            <div className="max-w-[120px] max-h-[120px]">
              <Image
                src={avatar_url}
                alt={`${username} profile picture`}
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>
          ) : (
            <p className="text-3xl">{display_name?.slice()[0].toUpperCase()}</p>
          )}
        </div>

        <ProfileActions session={session} profileId={profileId} id={id} />
      </div>

      <div className="w-full py-5">
        <div>
          <h2 className="text-xl font-bold">{display_name}</h2>
          <p className="text-fadeText dark:text-fadeText-dark text-sm">
            @{username}
          </p>
        </div>
        <p className={`pt-3.5 text-sm ${!bio && 'hidden'}`}>{bio}</p>
      </div>

      <div className="flex items-center gap-3">
        <p>
          <span className="font-semibold">{followers?.length}</span> followers
        </p>
        <p>
          <span className="font-semibold">{following?.length}</span> following
        </p>
      </div>

      <div className="py-5 flex flex-wrap items-start gap-2">
        {social_link_one && (
          <Button asChild size={'sm'} className="rounded-full">
            <Link
              href={linkUrlChecker(social_link_one)}
              target="_blank"
              rel="noferrer"
            >
              {urlIcon(social_link_one)}
              {social_link_one}
            </Link>
          </Button>
        )}
        {social_link_two && (
          <Button asChild size={'sm'} className="rounded-full">
            <Link
              href={linkUrlChecker(social_link_two)}
              target="_blank"
              rel="noferrer"
            >
              {urlIcon(social_link_two)}
              {social_link_two}
            </Link>
          </Button>
        )}
        {social_link_three && (
          <Button asChild size={'sm'} className="rounded-full">
            <Link
              href={linkUrlChecker(social_link_three)}
              target="_blank"
              rel="noferrer"
            >
              {urlIcon(social_link_three)}
              {social_link_three}
            </Link>
          </Button>
        )}
      </div>

      <div>
        {company && (
          <div>
            <h4 className="font-bold">Company</h4>
            <p>{company}</p>
          </div>
        )}

        {tech_stack && (
          <div>
            <h4 className="font-bold">Tech stack</h4>
            <div className="flex items-center border border-secondary dark:border-secondary-dark w-max rounded-full p-1">
              Nextjs
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
