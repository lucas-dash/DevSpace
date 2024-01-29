import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUser, getUserDataById } from "@/lib/actions";
import { HTMLAttributes } from "react";

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
  let effectiveUserId = userId;
  if (!effectiveUserId) {
    const {
      data: { user },
    } = await getUser();
    effectiveUserId = user?.id;
  }

  if (!effectiveUserId) return null;

  const { data: userData } = await getUserDataById(effectiveUserId);

  if (!userData) return null;

  const nameFallback = userData?.display_name[0].toUpperCase() || "U";

  return (
    <Avatar className={className} {...props}>
      <AvatarImage
        src={userData?.avatar_url || ""}
        alt={`${userData?.username} profile image`}
      />
      <AvatarFallback className={`${textClassName} bg-slate-300`}>
        {nameFallback}
      </AvatarFallback>
    </Avatar>
  );
}
