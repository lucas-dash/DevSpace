import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export default async function UserAvatar({ userId }: { userId: string }) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const { data: user } = await supabase
    .from('profile')
    .select()
    .eq('id', userId)
    .single();

  if (user) {
    const nameFallback = user?.display_name.slice()[0].toUpperCase();
    const userImage = user?.avatar_url ? user?.avatar_url : '';

    return (
      <Avatar>
        <AvatarImage src={userImage} />
        <AvatarFallback className="bg-slate-300">{nameFallback}</AvatarFallback>
      </Avatar>
    );
  }
}
