import { updateUserEmail } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormEvent } from 'react';
import EmailUpdateForm from './email-update-form';

type AccountSettingType = {
  userId: string;
};

export default async function AccountSetting({ userId }: AccountSettingType) {
  return (
    <article className="flex flex-col gap-5 py-2">
      <section className="flex gap-3 flex-col">
        <h3 className="text-lg font-medium">Update E-mail</h3>
        <hr className="border-primary-dark dark:border-primary" />
        <EmailUpdateForm />
      </section>

      <section>
        <h3 className="text-lg font-medium">Change Password</h3>
        <hr className="border-primary-dark dark:border-primary" />
      </section>

      <section>
        <h3 className="text-lg font-semibold text-red-500 dark:text-red-700">
          Danger Section
        </h3>
        <hr className="border-primary-dark dark:border-primary" />
        <p className="tex-xs py-1">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <Button variant={'destructive'}>Delete your account?</Button>
      </section>
    </article>
  );
}
