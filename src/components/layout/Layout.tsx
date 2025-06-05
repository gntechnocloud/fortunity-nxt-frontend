import React, { useState, ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
// Update the import path below to where your ThemeProvider is actually defined
// Update the import path below to where your ThemeProvider is actually defined
// import { ThemeProvider } from '../theme/ThemeProvider';
// import { ThemeProvider } from '../../theme/ThemeProvider'; // <-- Adjust this path as needed
// Please update the path below to the actual location of your ThemeProvider file:
import { ThemeProvider } from '../theme/ThemeProvider'; // Example: adjust this path as needed

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-neutral-light dark:bg-neutral-dark text-neutral-dark dark:text-neutral-light">
        <Sidebar isOpen={sidebarOpen} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-y-auto pt-16 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;