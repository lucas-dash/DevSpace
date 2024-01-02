import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './login-form';
import SignUpForm from './signUp-form';

export default function AuthForm() {
  return (
    <div className="w-[90%] mx-auto max-w-sm mt-5 md:mt-10 bg-slate-50/90 p-2.5 rounded-xl dark:bg-slate-950/80 backdrop-blur-sm">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-lg">
          <TabsTrigger value="login" className="rounded-lg ">
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" className="rounded-lg">
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
