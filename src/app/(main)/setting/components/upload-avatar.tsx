'use client';

import { Input } from '@/components/ui/input';
import { ChangeEvent, useEffect, useState } from 'react';
import createSupabaseBrowserClient from '@/lib/supabase/client';
import { toast } from 'sonner';

export default function UploadAvatar() {
  const supabase = createSupabaseBrowserClient();
  const [userId, setUserId] = useState<string | null>();

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (file && userId) {
        const { error } = await supabase.storage
          .from('avatars')
          .update(`${userId}/${userId}`, file);

        if (!error?.message) {
          const { error: profileError } = await supabase
            .from('profile')
            .update({
              avatar_url: `https://duncazsaiuxemkuxyfpm.supabase.co/storage/v1/object/public/avatars/${userId}/${userId}`,
            })
            .eq('id', userId);

          if (profileError?.message) {
            toast.error('Something get wrong. Try it again!');
          }

          toast.success('Avatar updated!');
        } else {
          toast.error(error?.message);
        }
      }
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id);
    };
    getUser();
  }, [supabase]);

  return (
    <form>
      <Input
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => uploadImage(e)}
      />
    </form>
  );
}
