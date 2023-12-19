import createSupabaseServerClient from '@/lib/supabase/server';
import Link from 'next/link';

type PostUserType = {
  createdBy: string;
  createdAt: string;
};

export default async function PostUser({ createdBy, createdAt }: PostUserType) {
  const supabase = await createSupabaseServerClient();

  // todo time function

  const { data: userData } = await supabase
    .from('profile')
    .select('*')
    .eq('id', createdBy);

  return (
    <div className="flex items-center gap-1.5">
      <h4 className="font-semibold">{userData && userData[0].display_name}</h4>
      <Link
        href={`/${userData && userData[0].username}`}
        className="text-fadeText dark:text-fadeText-dark hover:underline"
      >
        {userData && `@${userData[0].username}`}
      </Link>
      <p className="text-sm max-[370px]:hidden">&#x2022; 15m ago</p>
    </div>
  );
}
