'use client';

import { Button } from '@/components/ui/button';
import createSupabaseBrowserClient from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function DeleteAvatar() {
  const supabase = createSupabaseBrowserClient();
  const [userId, setUserId] = useState<string | null>();

  const handleDeleteAvatar = async () => {
    if (userId) {
      const { error } = await supabase.storage
        .from('avatars')
        .remove([`${userId}/${userId}`]);

      if (error?.message) {
        toast.error('Something get wrong. Try it again!');
      } else {
        const { error: profileError } = await supabase
          .from('profile')
          .update({
            avatar_url: null,
          })
          .eq('id', userId);

        if (profileError?.message) {
          toast.error('Something get wrong. Try it again!');
        }

        toast.success('Avatar updated!');
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
    <Button variant={'destructive'} onClick={handleDeleteAvatar}>
      Delete Avatar
    </Button>
  );
}
