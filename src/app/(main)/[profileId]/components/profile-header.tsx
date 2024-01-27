import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ProfileActions from './profile-actions';
import { Badge } from '@/components/ui/badge';
import UserAvatar from '@/components/ui/user-avatar';
import ProfileFollows from './profile-follows';
import UrlLink from '@/components/ui/url-link';

export default async function ProfileHeader({
  bio,
  id,
  username,
  display_name,
  social_link_one,
  social_link_two,
  social_link_three,
  url,
  company,
  tech_stack,
  hire_email,
}: Profile) {
  const socialLinks = [social_link_one, social_link_two, social_link_three];

  return (
    <section className="h-max bg-primary dark:bg-primary-dark rounded-2xl p-5 flex flex-col gap-2">
      <div className="flex justify-between gap-5">
        <UserAvatar
          userId={id}
          className="w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] border-2 border-primary-dark dark:border-primary"
          textClassName="text-4xl"
        />

        <ProfileActions
          profileId={id}
          username={username}
          hireEmail={hire_email}
        />
      </div>

      <div>
        <div>
          <h2 className="text-xl font-bold">{display_name}</h2>
          <p className="text-fadeText dark:text-fadeText-dark text-sm">
            @{username}
          </p>
        </div>
        <p className={`pt-3 text-sm font-medium ${!bio && 'hidden'}`}>{bio}</p>

        {url && (
          <UrlLink
            url={url}
            className="p-0 text-xs sm:text-sm text-foreground dark:text-foreground-dark"
          />
        )}
      </div>

      <Suspense fallback={<Skeleton className="w-14 h-5" />}>
        <ProfileFollows userId={id} />
      </Suspense>

      <div className="flex flex-wrap items-start gap-2">
        {socialLinks?.map((link, i) => {
          if (link) {
            return (
              <UrlLink
                key={i}
                url={link}
                variant={'default'}
                size={'sm'}
                icon
                className="rounded-full h-7"
              />
            );
          }
        })}
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {company && (
          <div>
            <h4 className="font-semibold pb-1">Company</h4>
            <Badge variant={'secondary'} className="text-base font-medium">
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
      </div>
    </section>
  );
}
