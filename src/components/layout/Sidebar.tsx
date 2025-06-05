import React from 'react';
import { FiMenu, FiUser } from 'react-icons/fi';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItem {
  name: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', icon: <FiMenu />, href: '/dashboard' },
  { name: 'Matrix', icon: <FiUser />, href: '/matrix' },
  { name: 'Referrals', icon: <FiUser />, href: '/referrals' },
  { name: 'Slots', icon: <FiUser />, href: '/slots' },
  { name: 'Transactions', icon: <FiUser />, href: '/transactions' },
  { name: 'Profile', icon: <FiUser />, href: '/profile' },
];

const Sidebar: React.FC<Omit<SidebarProps, 'toggleSidebar'>> = ({ isOpen }) => {
  return (
    <aside
      className="fixed top-0 left-0 h-full w-64 bg-primary-dark dark:bg-primary-900 text-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out"
      style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
    >
      <div className="flex items-center justify-center h-16 border-b border-primary-700 dark:border-primary-800">
        <img
          src="/logo.png"
          alt="Fortunity NXT"
          className="h-10 w-auto"
        />
      </div>
      <nav className="mt-6">
        {navItems.map(({ name, icon, href }) => (
          <a
            key={name}
            href={href}
            className="flex items-center px-6 py-3 hover:bg-primary-700 dark:hover:bg-primary-800 transition-colors"
          >
            <span className="text-lg mr-4">{icon}</span>
            <span className="font-semibold text-lg">{name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;