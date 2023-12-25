import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import createSupabaseServerClient from '@/lib/supabase/server';

export default async function UserAvatar({ id }: { id: string }) {
  const supabase = await createSupabaseServerClient();
  const { data: user } = await supabase.from('profile').select().eq('id', id);

  if (user) {
    const nameFallback = user[0]?.display_name.slice()[0].toUpperCase();
    const userImage = user[0]?.avatar_url ? user[0]?.avatar_url : '';

    return (
      <Avatar>
        <AvatarImage src={userImage} />
        <AvatarFallback className="bg-slate-300">{nameFallback}</AvatarFallback>
      </Avatar>
    );
  }
}
