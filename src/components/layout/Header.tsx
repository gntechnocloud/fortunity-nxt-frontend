import React from 'react';

import { FiMenu, FiSun, FiMoon, FiUser } from 'react-icons/fi';
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react';
// If '../../hooks/useTheme' does not exist, use a fallback:
let useTheme: any;
try {
  // @ts-ignore
  useTheme = require('../../hooks/useTheme').useTheme;
} catch {
  useTheme = () => ({
    theme: 'light',
    toggleTheme: () => {},
  });
}

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-neutral-dark shadow-md flex items-center justify-between px-4 md:px-8 z-30">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-primary-600 dark:text-primary-300 md:hidden focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
          aria-label="Toggle sidebar"
        >
          <FiMenu size={24} />
        </button>
        <img
          src="/logo.png"
          alt="Fortunity NXT"
          className="h-8 w-auto hidden md:block"
        />
      </div>

      <div className="flex items-center space-x-6">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="text-primary-600 dark:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
        >
          {theme === 'dark' ? <FiSun size={24} /> : <FiMoon size={24} />}
        </button>
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded">
            <FiUser size={24} className="text-primary-600 dark:text-primary-300" />
            <span className="hidden md:block font-semibold text-primary-700 dark:text-primary-300">
              John Doe
            </span>
          </MenuButton>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <MenuItems className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <MenuItem>
                {({ focus }) => (
                  <a
                    href="/profile"
                    className={`block px-4 py-2 text-sm ${
                      focus ? 'bg-primary-100 dark:bg-primary-700' : ''
                    } text-primary-700 dark:text-primary-200`}
                  >
                    Profile
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <a
                    href="/logout"
                    className={`block px-4 py-2 text-sm ${
                      focus ? 'bg-primary-100 dark:bg-primary-700' : ''
                    } text-primary-700 dark:text-primary-200`}
                  >
                    Logout
                  </a>
                )}
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

export default Header;