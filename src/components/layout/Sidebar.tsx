import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  AppWindow,
  Grid2X2,
  Users,
  ReceiptText,
  Coins,
  User,
} from 'lucide-react';
import { cn } from '@/utils';

// Final NAVIGATION_ITEMS with your exact label
const NAVIGATION_ITEMS = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Slots', path: '/slots' },
  { name: 'Matrix', path: '/matrix' },
  { name: 'Referrals', path: '/referrals' },
  { name: 'Transactions', path: '/transactions' },
  { name: 'Magic Pool Income', path: '/pool' }, // ✅ Final name
  { name: 'Profile', path: '/profile' },
];

// Matching ICON_MAP
const ICON_MAP: Record<string, React.ElementType> = {
  Dashboard: LayoutDashboard,
  Slots: AppWindow,
  Matrix: Grid2X2,
  Referrals: Users,
  Transactions: ReceiptText,
  'Magic Pool Income': Coins, // ✅ corrected key
  Profile: User,
};

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-6 flex items-center space-x-3 border-b border-gray-200 dark:border-gray-800">
        <img src="/logo.svg" alt="Fortunity Logo" className="h-8 w-auto" />
        <span className="text-xl font-bold tracking-wide">Fortunity NXT</span>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.name];

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted dark:hover:bg-gray-800',
                  isActive ? 'bg-muted text-primary' : 'text-muted-foreground'
                )
              }
            >
              {Icon ? <Icon className="w-5 h-5 mr-3" /> : <div className="w-5 h-5 mr-3" />} {/* fallback spacing */}
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
// This component serves as the sidebar for the application, providing navigation links to different sections of the dashboard.
// It uses Lucide icons for visual representation and applies styles based on the current theme (light