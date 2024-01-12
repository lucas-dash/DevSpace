import { getUserDataById } from '@/app/(main)/[profileId]/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

type UserAvatarType = {
  userId?: string;
};

export default async function UserAvatar({ userId }: UserAvatarType) {
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
    <Avatar>
      <AvatarImage src={userData?.avatar_url || ''} />
      <AvatarFallback className="bg-slate-300">{nameFallback}</AvatarFallback>
    </Avatar>
  );
}
