# Fortunity NXT Frontend

## 📖 Project Introduction

Fortunity NXT is a modern, modular, and production-ready frontend application for the Fortunity NXT MLM Semi-DAPP platform. It is designed to interact with a Diamond Standard (EIP-2535) smart contract system, providing users with a seamless dashboard experience for managing slots, earnings, referrals, and more. The platform leverages blockchain technology to ensure transparency, security, and scalability in a 2x2 Forced Matrix MLM structure.

---

## 📋 Project Details

- **Purpose:** Deliver a robust, user-friendly interface for interacting with Fortunity NXT smart contracts, enabling slot purchases, earnings tracking, matrix visualization, and referral management.
- **Architecture:** The frontend communicates directly with the Diamond proxy contract and its facets, and is designed to integrate with an off-chain backend for enhanced features (such as transaction history and analytics).
- **Key Features:**
  - Wallet connection (MetaMask, WalletConnect)
  - Slot management and purchasing
  - Matrix network visualization
  - Real-time earnings and referral statistics
  - Pool income tracking
  - Responsive, accessible UI with theming support

---

## 🛠️ Technologies & Frameworks Used

- **React 18** – UI library for building component-based interfaces
- **TypeScript** – Type safety and modern JavaScript features
- **Vite** – Fast build tool and development server
- **Tailwind CSS** – Utility-first CSS framework for rapid UI development
- **Zustand** – Lightweight state management
- **Ethers.js** – Ethereum blockchain interaction
- **WalletConnect** – Multi-wallet support
- **Jest/Testing Library** – (Planned) for unit and integration testing

---

## 🗂️ Folder Structure

```
fortunity-nxt-frontend/
├── .env                  # Environment variables for local/dev
├── contracts.ts          # Auto-generated contract config (addresses, selectors, etc.)
├── createenv.ps1         # Script to generate .env from deployment output
├── Docs/                 # Documentation, diagrams, and presentations
├── public/               # Static assets (favicon, images, etc.)
├── src/
│   ├── assets/           # Static assets (SVGs, images, etc.)
│   ├── components/       # Reusable UI and layout components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Sidebar.tsx
│   │   └── ...           # Other UI components
│   ├── constants/        # App-wide constants and configuration
│   │   └── index.ts
│   ├── hooks/            # Custom React hooks
│   │   └── useWallet.ts
│   ├── pages/            # Main page components (Dashboard, Slots, etc.)
│   │   ├── DashboardPage.tsx
│   │   ├── SlotsPage.tsx
│   │   └── ...           # Other pages
│   ├── stores/           # Zustand state stores (wallet, user, etc.)
│   │   ├── walletStore.ts
│   │   └── userStore.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/            # Utility functions (API, formatting, etc.)
│   │   └── format.ts
│   └── main.tsx          # App entry point
├── package.json          # Project dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
```

---

## 🗝️ Key Files and Their Behaviour

- **.env**  
  Holds environment-specific variables such as contract addresses, network IDs, and API endpoints.

- **contracts.ts**  
  Auto-generated file containing contract addresses, facet addresses, slot prices, and function selectors for direct contract interaction.

- **createenv.ps1**  
  PowerShell script to generate a `.env` file based on deployment output, ensuring contract addresses and selectors are up to date.

- **Docs/**  
  Contains merged PDFs, diagrams, and presentations for internal documentation and reference.

- **src/components/**  
  Houses all reusable UI components (e.g., Button, Card, Sidebar, DashboardOverview, EarningsChart, SlotGrid) and layout elements.

- **src/pages/**  
  Contains main page components such as DashboardPage (loads user profile, slots, earnings, matrix, and pool income), SlotsPage, and others.

- **src/stores/walletStore.ts**  
  Zustand store for wallet connection state. Handles MetaMask connection, network switching, balance loading, and disconnect logic.

- **src/stores/userStore.ts**  
  Zustand store for user data. Loads user profile, slots, earnings, referrals, matrix nodes, and pool income directly from the smart contract.

- **src/types/index.ts**  
  Centralized TypeScript interfaces for User, Slot, Earnings, Referrals, Transaction, MatrixPosition, PoolIncome, WalletState, UserState, and more.

- **src/utils/**  
  Utility functions for formatting, API calls, and other helpers.

- **public/**  
  Static assets such as favicon, images, and manifest.

---

## 📈 Current Status

- **Core Functionality:**

  - Wallet connection and network switching: **Complete**
  - On-chain user profile, slot, and earnings loading: **Complete**
  - Slot purchasing (on-chain): **Complete**
  - Matrix and pool income visualization: **Complete**
  - Responsive UI and theming: **Complete**
  - Backend integration for transactions/history: **Planned**

- **Environment:**

  - Configured for Hardhat local network by default (`.env` and `contracts.ts`).
  - Facet addresses and contract addresses are auto-populated from deployment scripts.

- **Testing:**

  - No automated tests yet; planned for future versions.

- **Documentation:**
  - This README provides a comprehensive overview.
  - Additional documentation and diagrams are available in the `Docs/` folder.

---

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Configure environment**

   - Copy `.env.example` to `.env` and update as needed, or use `createenv.ps1` to auto-generate.

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📝 Notes

- The frontend is currently designed to work directly with the deployed Diamond contract and its facets. Backend API integration is planned for transaction history and advanced analytics.
- Slot prices, contract addresses, and selectors are auto-generated and must match the deployed contracts.
- For production deployment, update the `.env` file with mainnet addresses and endpoints.

---

## 📬 Support

For issues, questions, or contributions, please open an issue in the repository or contact the project maintainers.

---

// filepath:
