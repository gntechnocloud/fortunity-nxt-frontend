# Fortunity NXT Frontend

A modern, production-ready frontend application for the Fortunity NXT MLM Semi-DAPP platform built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Web3 Integration**: Ethers.js for blockchain interactions
- **State Management**: Zustand for efficient state management
- **Responsive Design**: Mobile-first approach with dark/light theme support
- **Professional UI**: Custom component library with accessibility features
- **Real-time Updates**: Auto-refresh functionality for live data
- **Security**: Best practices for Web3 security and user protection

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask or compatible Web3 wallet

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fortunity-nxt-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_CONTRACT_ADDRESS=0x...
   VITE_FNXT_TOKEN_ADDRESS=0x...
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Input, etc.)
│   ├── layout/         # Layout components (Header, Sidebar)
│   ├── dashboard/      # Dashboard-specific components
│   ├── wallet/         # Wallet connection components
│   └── ...
├── pages/              # Page components
├── stores/             # Zustand state stores
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── constants/          # App constants and configuration
└── assets/             # Static assets
```

## 🎨 UI Components

The application includes a comprehensive UI component library:

- **Button**: Multiple variants with loading states
- **Input**: Form inputs with validation support
- **Card**: Container components with consistent styling
- **Modal**: Accessible modal dialogs
- **Table**: Sortable data tables with pagination
- **Badge**: Status indicators and labels
- **Tabs**: Tabbed navigation components
- **Toast**: Notification system
- **StatCard**: Dashboard statistics display

## 🔗 Web3 Integration

### Wallet Connection
- MetaMask integration
- Core Blockchain network support
- Automatic network switching
- Balance tracking (CORE & FNXT tokens)

### Smart Contract Interaction
- Slot purchasing
- Matrix position tracking
- Earnings calculation
- Transaction monitoring

## 📱 Features Overview

### Dashboard
- Earnings overview with charts
- Slot management grid
- Recent activity feed
- Referral statistics
- Real-time balance updates

### Slots Management
- Visual slot grid interface
- Purchase confirmation modals
- Earnings tracking per slot
- Rebirth status indicators

### Matrix Network
- 2x2 matrix visualization
- Position tracking
- Genealogy tree view
- Completion status

### Referral System
- Referral link generation
- QR code sharing
- Team member tracking
- Multi-level statistics

### Transactions
- Complete transaction history
- Status tracking
- Blockchain explorer links
- Export functionality

### Pool Income
- Distribution schedule
- Historical earnings
- Participant statistics
- Upcoming distributions

## 🎯 State Management

The application uses Zustand for state management with three main stores:

### WalletStore
- Wallet connection status
- Network information
- Balance tracking
- Transaction signing

### UserStore
- User profile data
- Earnings information
- Slot ownership
- Referral statistics

### AppStore
- Theme preferences
- Application settings
- Notification management
- UI state

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for React and TypeScript
- **Prettier**: Code formatting (recommended)
- **Tailwind CSS**: Utility-first styling

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Environment Variables

Required environment variables for production:

```env
VITE_API_BASE_URL=https://api.fortunity-nxt.com
VITE_CONTRACT_ADDRESS=0x...
VITE_FNXT_TOKEN_ADDRESS=0x...
VITE_NETWORK_CHAIN_ID=1116
```

## 🔒 Security Considerations

- **Private Key Safety**: Never expose private keys in frontend code
- **Input Validation**: All user inputs are validated
- **XSS Protection**: Sanitized data rendering
- **HTTPS Only**: Enforce secure connections in production
- **Wallet Verification**: Always verify wallet signatures

## 🎨 Theming

The application supports both light and dark themes with:

- Automatic system preference detection
- Manual theme switching
- Persistent theme storage
- Consistent color schemes across components

## 📊 Performance

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Optimized Builds**: Vite's fast build system
- **Tree Shaking**: Unused code elimination

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Updates

Stay updated with the latest changes:

- Watch the repository for releases
- Follow the changelog
- Subscribe to notifications

---

**Built with ❤️ for the Fortunity NXT community**