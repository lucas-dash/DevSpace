import { Edit } from "lucide-react";
import UserAvatar from "@/components/ui/user-avatar";
import CustomDrawer from "@/components/custom-drawer";
import ProfileSettingForm from "./profile-setting-form";
import ChangeAvatar from "./change-avatar";

type ProfileSettingType = {
  userId: string;
  profile: Profile;
};

export default function ProfileSetting({
  userId,
  profile,
}: ProfileSettingType) {
  return (
    <article className="py-5 flex max-sm:flex-col max-sm:items-stretch justify-between gap-5 sm:gap-10">
      <ProfileSettingForm userId={userId} profile={profile} />

      <section className="flex justify-center">
        <div className="w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] relative">
          <UserAvatar
            className="w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] border-2 border-primary-dark dark:border-primary"
            textClassName="text-4xl"
          />
          <CustomDrawer
            title="Upload your avatar"
            description="Your image must have a maximum size of 5 MB."
            buttonChildren={<Edit />}
            buttonVariant={"outline"}
            buttonSize={"icon"}
            className="absolute -bottom-4 left-0 rounded-full"
            aria-label="Upload your avatar"
          >
            <ChangeAvatar prevAvatar={profile?.avatar_url} userId={userId} />
          </CustomDrawer>
        </div>
      </section>
    </article>
  );
}
