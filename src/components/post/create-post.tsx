import { Inbox } from 'lucide-react';
import UserAvatar from '../ui/user-avatar';
import PostForm from './post-form';
import { Button } from '../ui/button';
import { Drawer, DrawerTrigger } from '../ui/drawer';
import DrawerContents from '../drawer-content';
import Drafts from './drafts';

export default function CreatePost({ userId }: { userId: string }) {
  return (
    <section className="bg-primary dark:bg-primary-dark rounded-2xl w-full flex gap-3.5 p-2.5">
      <div className="flex flex-col items-center gap-3">
        <UserAvatar />
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <Inbox />
            </Button>
          </DrawerTrigger>
          <DrawerContents title="Your Drafts">
            <Drafts userId={userId} />
          </DrawerContents>
        </Drawer>
      </div>
      <PostForm />
    </section>
  );
}
