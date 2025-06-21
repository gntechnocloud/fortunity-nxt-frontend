//src/main.tsx
// This is the entry point of the React application, where the main App component is rendered.
// It wraps the App component with WagmiConfig to provide Ethereum wallet connectivity.
// It also imports global styles and the Wagmi configuration for managing Ethereum connections.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from './config/wagmiClient';
/* 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
); */


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);