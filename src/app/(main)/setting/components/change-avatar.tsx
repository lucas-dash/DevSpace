"use client";

import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { validFileType, validFileSize } from "@/lib/helperFunc";
import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";

type ChangeAvatarProps = {
  prevAvatar: string | null;
  userId: string;
};

export default function ChangeAvatar({
  prevAvatar,
  userId,
}: ChangeAvatarProps) {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

  const removePrevAvatar = async () => {
    if (userId && prevAvatar) {
      const parts = prevAvatar.split("/");
      const avatarId = parts[parts.length - 1];

      const { error } = await supabase.storage
        .from("avatars")
        .remove([`${userId}/${avatarId}`]);

      if (error?.message) {
        toast.error("Failed to remove avatar.");
      }
    }
  };

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!validFileType(file) || !validFileSize(file, MAX_SIZE)) {
        toast.error("Invalid file type or size.");
        return;
      }

      if (file && userId) {
        removePrevAvatar();

        const imageId = Date.now();

        const { error } = await supabase.storage
          .from("avatars")
          .upload(`${userId}/${imageId}`, file, { upsert: true });

        if (!error?.message) {
          const avatarUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${userId}/${imageId}`;
          const { error: profileError } = await supabase
            .from("profile")
            .update({
              avatar_url: avatarUrl,
            })
            .eq("id", userId);

          if (profileError?.message) {
            toast.error("Something get wrong. Try it again!");
          } else {
            toast.success("Avatar updated!");
            router.refresh();
          }
        } else {
          toast.error(error?.message);
        }
      }
    }
  };

  const deleteAvatar = async () => {
    if (userId && prevAvatar) {
      removePrevAvatar();

      const { error: profileError } = await supabase
        .from("profile")
        .update({
          avatar_url: null,
        })
        .eq("id", userId);

      if (profileError?.message) {
        toast.error("Something get wrong. Try it again!");
      }

      toast.success("Avatar deleted!");
      router.refresh();
    }
  };

  return (
    <section className="h-full w-full flex items-center justify-center">
      <div className="py-5 flex flex-col gap-5">
        <Input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => uploadImage(e)}
        />

        {prevAvatar && (
          <DrawerClose asChild>
            <Button
              variant={"destructive"}
              onClick={deleteAvatar}
              className="w-full"
            >
              Delete Avatar
            </Button>
          </DrawerClose>
        )}
      </div>
    </section>
  );
}
