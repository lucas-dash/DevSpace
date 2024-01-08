import UserAvatar from '../ui/user-avatar';
import PostForm from './post-form';

export default function CreatePost({ modalPost }: { modalPost?: boolean }) {
  return (
    <section className="bg-primary dark:bg-primary-dark rounded-2xl w-full flex gap-3.5 p-2.5">
      <UserAvatar />
      <PostForm modalPost={modalPost} />
    </section>
  );
}
