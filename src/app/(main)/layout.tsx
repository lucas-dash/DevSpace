import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import NotificationPanel from "@/components/notification-panel";
import URLModal from "@/components/url-modal";

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
          <URLModal />
        </main>
        <NotificationPanel />
      </div>
    </div>
  );
}
