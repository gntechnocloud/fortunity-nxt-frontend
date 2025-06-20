import React from 'react';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import { NAVIGATION_ITEMS } from '@/utils';
import { cn } from '../utils/cn'; // optional helper for conditional classes

export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col p-4">
        <div className="text-xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Fortunity NXT
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          {NAVIGATION_ITEMS.map((item) => (
            <NavLink
              key={item.name}
              to={item.href.replace('./pages', '')}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                )
              }
            >
              <span className="material-icons">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto">
          <WalletConnect />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-grow overflow-hidden">
        <header className="h-16 bg-white dark:bg-gray-800 shadow-md flex items-center px-6 justify-between">
          <h1 className="text-lg font-semibold capitalize">
            {location.pathname.replace('/', '') || 'dashboard'}
          </h1>
        </header>

        <main className="flex-grow overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
