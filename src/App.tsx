//src/App.tsx
// This file is part of the React application that sets up routing and handles wallet connection.
// It uses React Router for navigation and includes a protected route component to ensure certain pages are only
// accessible when the user is connected to a wallet.
// The useEffect hook initializes the theme and attempts to auto-connect the wallet based on local storage
// values. The Layout component wraps the main content and provides a consistent layout across all pages.
// Each page is wrapped in a ProtectedRoute to enforce wallet connection requirements for certain functionalities

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { useAppStore } from '@/stores/appStore';
import { useWalletStore } from '@/stores/walletStore';
import { storage, STORAGE_KEYS } from '@/utils';
import DashboardPage from '@/pages/DashboardPage';
import SlotsPage from '@/pages/SlotsPage';
import MatrixPage  from '@/pages/MatrixPage';
import ReferralsPage from '@/pages/ReferralsPage';
import TransactionsPage from '@/pages/TransactionsPage';
import PoolPage from '@/pages/PoolPage';
import ProfilePage from '@/pages/ProfilePage';
// Import all pages from the pages directory
// This allows for easier management and future scalability of the application
// If you add more pages, just import them here and they will be available in the routing
// For example, if you create a new page called 'SettingsPage', just import it here
// import SettingsPage from '@/pages/SettingsPage';
// import { SettingsPage } from '@/pages/SettingsPage'; // Example of importing a new page

// This is the main entry point of the application
// It sets up the routing and handles the initial application state
// The App component initializes the theme and wallet connection state
// It uses React Router for navigation and includes a protected route component to ensure certain pages are only accessible when the user is connected to a wallet
// The Layout component wraps the main content and provides a consistent layout across all pages
// Each page is wrapped in a ProtectedRoute to enforce wallet connection
// requirements for certain functionalities like slots, matrix, referrals, transactions, pool income, and profile
// management.

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isConnected } = useWalletStore();

  if (!isConnected) {
    return <Navigate to="/dashboard"/>;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const { setTheme } = useAppStore();
  const { connectWallet } = useWalletStore();

  useEffect(() => {
    // Set theme based on local storage
    const savedTheme = storage.get(STORAGE_KEYS.theme());
    const theme: 'light' | 'dark' = savedTheme === 'light' ? 'light' : 'dark';
    setTheme(theme);

    // Auto-connect wallet if previously connected
    const wasConnected = storage.get(STORAGE_KEYS.walletConnection());
    if (wasConnected) {
      connectWallet().catch(console.error);
    }
  }, [setTheme, connectWallet]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route
            path="slots"
            element={
              <ProtectedRoute>
                <SlotsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="matrix"
            element={
              <ProtectedRoute>
                <MatrixPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="referrals"
            element={
              <ProtectedRoute>
                <ReferralsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="transactions"
            element={
              <ProtectedRoute>
                <TransactionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="pool"
            element={
              <ProtectedRoute>
                <PoolPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
// This is the main application component that sets up routing and handles wallet connection.
// It uses React Router for navigation and includes a protected route component to ensure certain pages are only accessible when the user is connected to a wallet.
// The useEffect hook initializes the theme and attempts to auto-connect the wallet based on local storage values.
// The Layout component wraps the main content and provides a consistent layout across all pages.
// Each page is wrapped in a ProtectedRoute to enforce wallet connection requirements for certain functionalities like slots, matrix, referrals, transactions, pool income, and profile management.
// The app