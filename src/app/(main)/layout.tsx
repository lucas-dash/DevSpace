import Modal from '@/components/Modal';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import CreatePost from '@/components/post/create-post';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background dark:bg-background-dark min-h-screen">
      <Navbar />

      <div className="flex gap-2.5 lg:gap-5 w-full min-h-[calc(100vh-60px)] px-1.5 sm:px-2.5 py-5 2xl:container">
        <Sidebar />

        <main className="flex-1 lg:max-w-[600px]">
          {children}
          <Modal />
        </main>
        <section className="max-lg:hidden sticky top-[calc(60px+20px)] rounded-2xl bg-primary dark:bg-primary-dark min-w-[250px] max-w-[260px] xl:max-w-[420px] h-max p-3">
          <h3 className="font-semibold">Activity</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, nisi
            excepturi iure enim porro molestiae qui voluptatibus doloremque
            maiores aliquam cumque blanditiis ab! Fugiat totam rerum natus enim
            maxime nobis!
          </p>
        </section>
      </div>
    </div>
  );
}
