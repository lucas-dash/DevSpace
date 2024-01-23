import { getUserDataById } from '@/app/(main)/[profileId]/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { HTMLAttributes } from 'react';

type UserAvatarType = {
  userId?: string;
  className?: string;
  textClassName?: string;
} & HTMLAttributes<HTMLSpanElement>;

export default async function UserAvatar({
  userId,
  textClassName,
  className,
  ...props
}: UserAvatarType) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  let effectiveUserId = userId;
  if (!effectiveUserId) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    effectiveUserId = user?.id;
  }

  if (!effectiveUserId) return null;

  const userData = await getUserDataById(effectiveUserId);

  if (!userData) return null;

  const nameFallback = userData?.display_name[0].toUpperCase();

  return (
    <Avatar className={className} {...props}>
      <AvatarImage
        src={userData?.avatar_url || ''}
        alt={`${userData?.username} profile image`}
      />
      <AvatarFallback className={`${textClassName} bg-slate-300`}>
        {nameFallback}
      </AvatarFallback>
    </Avatar>
  );
}
