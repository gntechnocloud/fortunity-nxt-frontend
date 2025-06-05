import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { useAppStore } from '@/stores/appStore';
import { useWalletStore } from '@/stores/walletStore';
import { storage, STORAGE_KEYS } from '@/utils';
import {
  DashboardPage,
  SlotsPage,
  MatrixPage,
  ReferralsPage,
  TransactionsPage,
  PoolPage,
  ProfilePage
} from '@/pages';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isConnected } = useWalletStore();

  if (!isConnected) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { setTheme } = useAppStore();
  const { connectWallet } = useWalletStore();

  useEffect(() => {
    // Initialize theme
    const savedTheme = storage.get(STORAGE_KEYS.theme());
    const theme: 'dark' | 'light' = savedTheme === 'light' ? 'light' : 'dark';
    setTheme(theme);

    // Auto-connect wallet if previously connected
    const wasConnected = storage.get(STORAGE_KEYS.walletConnection());
    if (wasConnected) {
      connectWallet().catch(console.error);
    }
  }, [setTheme, connectWallet]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <React.Fragment>
                  <Routes>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="slots" element={
                      <ProtectedRoute>
                        <SlotsPage />
                      </ProtectedRoute>
                    } />
                    <Route path="matrix" element={
                      <ProtectedRoute>
                        <MatrixPage />
                      </ProtectedRoute>
                    } />
                    <Route path="referrals" element={
                      <ProtectedRoute>
                        <ReferralsPage />
                      </ProtectedRoute>
                    } />
                    <Route path="transactions" element={
                      <ProtectedRoute>
                        <TransactionsPage />
                      </ProtectedRoute>
                    } />
                    <Route path="pool" element={
                      <ProtectedRoute>
                        <PoolPage />
                      </ProtectedRoute>
                    } />
                    <Route path="profile" element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </React.Fragment>
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;