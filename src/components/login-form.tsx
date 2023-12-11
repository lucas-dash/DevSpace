import { Input } from './ui/input';

export default function LoginForm() {
  return (
    <section className="flex flex-col max-w-xs mx-auto gap-5 z-20">
      <Input placeholder="e-mail" type="email" />
      <Input placeholder="******" type="password" />
    </section>
  );
}
