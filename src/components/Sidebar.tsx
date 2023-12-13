import {
  Bookmark,
  CircleUserRound,
  Layout,
  Search,
  Settings2,
  UsersRound,
} from 'lucide-react';
import NavLink from './navlink';
import SidebarState from './sidebar-state';

const sidebarLinks = [
  {
    title: 'Home',
    path: '/home',
    icon: <Layout />,
  },
  {
    title: 'Explore',
    path: '/search',
    icon: <Search />,
  },
  {
    title: 'Bookmarks',
    path: '/bookmarks',
    icon: <Bookmark />,
  },
  {
    title: 'Communities',
    path: '/communities',
    icon: <UsersRound />,
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <CircleUserRound />,
  },
  {
    title: 'Setting',
    path: '/setting',
    icon: <Settings2 />,
  },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-[calc(60px+20px)] h-[calc(100vh-100px)] z-50 bg-primary dark:bg-primary-dark rounded-2xl min-w-[216px] max-w-[290px] 2xl:max-w-[320px] max-md:hidden flex-grow flex flex-col justify-between items-center px-5 py-7">
      <nav className="flex flex-col items-start gap-6 mx-auto w-full ">
        {sidebarLinks.map(({ title, path, icon }) => {
          return <NavLink key={path} href={path} title={title} icon={icon} />;
        })}
      </nav>

      <SidebarState />
    </aside>
  );
}
