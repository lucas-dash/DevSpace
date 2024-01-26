import { linkUrlChecker } from '@/lib/helperFunc';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Facebook, Instagram, LinkIcon, TwitterIcon } from 'lucide-react';
import ProfileActions from './profile-actions';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { Badge } from '@/components/ui/badge';
import UserAvatar from '@/components/ui/user-avatar';

type ProfileHeaderType = {
  userData: Profile;
  profileId: string;
};

export default async function ProfileHeader({
  profileId,
  userData: {
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
    hire_email,
  },
}: ProfileHeaderType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: followers } = await supabase
    .from('follows')
    .select()
    .eq('following_id', id);

  const { data: following } = await supabase
    .from('follows')
    .select()
    .eq('follower_id', id);

  const socialLinks = [social_link_one, social_link_two, social_link_three];

  const urlIcon = (url: string) => {
    if (url.includes('twitter.com')) {
      return <TwitterIcon size={20} className="mr-1" />;
    } else if (url.includes('facebook.com')) {
      return <Facebook size={20} className="mr-1" />;
    } else if (url.includes('instagram.com')) {
      return <Instagram size={20} className="mr-1" />;
    } else {
      return <LinkIcon size={20} className="mr-1" />;
    }
  };

  return (
    <article className="h-max bg-primary dark:bg-primary-dark rounded-2xl p-5 flex flex-col gap-2">
      <section className="flex justify-between gap-5">
        <UserAvatar
          userId={id}
          className="w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] border-2 border-primary-dark dark:border-primary"
          textClassName="text-4xl"
        />

        <ProfileActions
          currentUser={user}
          profileId={profileId}
          userId={id}
          username={username}
          hireEmail={hire_email}
        />
      </section>

      <section>
        <div>
          <h2 className="text-xl font-bold">{display_name}</h2>
          <p className="text-fadeText dark:text-fadeText-dark text-sm">
            @{username}
          </p>
        </div>
        <p className={`pt-3 text-sm ${!bio && 'hidden'}`}>{bio}</p>

        {url && (
          <Button
            variant={'link'}
            asChild
            className="p-0 text-xs sm:text-sm font-medium text-foreground dark:text-foreground-dark"
          >
            <Link href={linkUrlChecker(url)} rel="noreferrer" target="_blank">
              {url}
            </Link>
          </Button>
        )}
      </section>

      <section className="flex items-center gap-3">
        <p>
          <span className="font-semibold">{followers?.length}</span> followers
        </p>
        <p>
          <span className="font-semibold">{following?.length}</span> following
        </p>
      </section>

      <div className="flex flex-wrap items-start gap-2">
        {socialLinks?.map((link, i) => {
          if (link) {
            return (
              <Button asChild size={'sm'} className="rounded-full h-7" key={i}>
                <Link
                  href={linkUrlChecker(link)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {urlIcon(link)}
                  {link}
                </Link>
              </Button>
            );
          }
        })}
      </div>

      <section className="flex flex-col gap-2 mt-2">
        {company && (
          <div>
            <h4 className="font-semibold pb-1">Company</h4>
            <Badge variant={'default'} className="text-base font-medium">
              {company}
            </Badge>
          </div>
        )}

        {tech_stack && (
          <div>
            <h4 className="font-semibold pb-1">Tech stack</h4>
            <div className="flex items-center flex-wrap gap-2">
              {tech_stack.map((tech, i) => (
                <Badge key={i}>{tech}</Badge>
              ))}
            </div>
          </div>
        )}
      </section>
    </article>
  );
}
