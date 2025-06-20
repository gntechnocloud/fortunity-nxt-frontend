import React from 'react';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const safeTitle = typeof title === 'string' && title.trim().length > 0
    ? title
    : 'Dashboard';

  return (
    <header className="w-full px-6 py-4 shadow bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white capitalize">
        {safeTitle}
      </h1>
    </header>
  );
};

export default Header;
// This component serves as the header for the application, displaying the current page title.
// It ensures that the title is always a valid string and defaults to "Dashboard" if not