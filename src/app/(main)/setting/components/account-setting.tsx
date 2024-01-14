import EmailUpdateForm from './email-update-form';
import PasswordUpdateForm from './password-update-form';
import DeleteAccount from './delete-account';

export default function AccountSetting({ userId }: { userId: string }) {
  return (
    <section className="flex flex-col gap-5 py-2">
      <EmailUpdateForm />
      <PasswordUpdateForm />
      <DeleteAccount userId={userId} />
    </section>
  );
}
