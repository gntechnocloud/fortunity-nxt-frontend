import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';

const Layout: React.FC = () => {
  const location = useLocation();
  const pathname = location?.pathname ?? '/dashboard';

  let pageTitle = 'Dashboard';

  try {
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments.at(-1);

    if (typeof lastSegment === 'string' && lastSegment.length > 0) {
      pageTitle = lastSegment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }
  } catch (error) {
    console.error('💥 Error generating page title:', error);
    pageTitle = 'Dashboard';
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title={pageTitle} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;