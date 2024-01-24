import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import DrawerContents from '@/components/drawer-content';
import ChangeAvatar from './change-avatar';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import ProfileSettingForm from './profile-setting-form';
import UserAvatar from '@/components/ui/user-avatar';

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
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                className="absolute -bottom-4 left-0 rounded-full"
                size={'icon'}
              >
                <Edit />
              </Button>
            </DrawerTrigger>
            <DrawerContents
              title="Upload your avatar"
              description="Your image must have a maximum size of 5 MB."
            >
              <ChangeAvatar prevAvatar={profile?.avatar_url} userId={userId} />
            </DrawerContents>
          </Drawer>
        </div>
      </section>
    </article>
  );
}
