# Create the .env file with the actual deployed contract addresses
env_content = """# Fortunity NXT Environment Configuration

# Smart Contract Configuration (Hardhat Local Network)
VITE_CONTRACT_ADDRESS=0x0165878A594ca255338adfa4d48449f69242Eb8F
VITE_DIAMOND_ADDRESS=0x0165878A594ca255338adfa4d48449f69242Eb8F

# Facet Addresses (for direct interaction if needed)
VITE_ADMIN_FACET=0x5FbDB2315678afecb367f032d93F642f64180aa3
VITE_REGISTRATION_FACET=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
VITE_PURCHASE_FACET=0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
VITE_MATRIX_FACET=0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
VITE_LEVEL_INCOME_FACET=0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
VITE_POOL_INCOME_FACET=0x5FC8d32690cc91D4c39d9d3abcBD16989F875707

# Network Configuration (Hardhat Local)
VITE_CHAIN_ID=31337
VITE_NETWORK_NAME=hardhat
VITE_RPC_URL=http://127.0.0.1:8545
VITE_BLOCK_EXPLORER_URL=http://localhost:8545

# Treasury/Admin Address
VITE_TREASURY_ADDRESS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
VITE_ADMIN_ADDRESS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

# WalletConnect Configuration (Get from https://cloud.walletconnect.com/)
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here

# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000

# Application Configuration
VITE_APP_NAME=Fortunity NXT
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Crypto-based Semi-DAPP MLM Platform

# Development Configuration
VITE_DEBUG=true
VITE_LOG_LEVEL=debug

# Slot Configuration (matches your deployment)
VITE_SLOT_PRICES=0.01,0.02,0.04,0.08,0.16,0.32,0.64,1.28,2.56,5.12,10.24,20.48
VITE_MAX_SLOTS=12

# Pool Distribution Days
VITE_POOL_DISTRIBUTION_DAYS=5,15,25

# System Constants
VITE_ADMIN_FEE_PERCENT=3
VITE_MATRIX_INCOME_PERCENT=75
VITE_LEVEL_INCOME_PERCENT=25
VITE_POOL_EXTRA_PERCENT=25
VITE_MAX_PAYOUT_PERCENT=200
VITE_MAX_PAYOUT_TIME_DAYS=90

# Feature Flags
VITE_ENABLE_POOL_DISTRIBUTION=true
VITE_ENABLE_MATRIX_VISUALIZATION=true
VITE_ENABLE_REAL_TIME_UPDATES=true
VITE_ENABLE_NOTIFICATIONS=true

# Security
VITE_ENABLE_SIGNATURE_VERIFICATION=true
VITE_SESSION_TIMEOUT=3600000

# UI Configuration
VITE_THEME=dark
VITE_CURRENCY_SYMBOL=ETH
VITE_DECIMAL_PLACES=4

# Production Overrides (uncomment for production deployment)
# VITE_CHAIN_ID=1
# VITE_NETWORK_NAME=mainnet
# VITE_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
# VITE_BLOCK_EXPLORER_URL=https://etherscan.io
# VITE_DEBUG=false
# VITE_LOG_LEVEL=error
"""

# Write the .env file
with open('.env', 'w') as f:
f.write(env_content)

print("✅ .env file created successfully!")
print("\n📋 Configuration Summary:")
print("- Diamond Contract: 0x0165878A594ca255338adfa4d48449f69242Eb8F")
print("- Network: Hardhat Local (Chain ID: 31337)")
print("- RPC URL: http://127.0.0.1:8545")
print("- Treasury: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
print("- Slots: 12 slots configured (0.01 ETH to 20.48 ETH)")
print("\n⚠️  Important Notes:")
print("1. Update VITE_WALLETCONNECT_PROJECT_ID with your actual project ID")
print("2. This is configured for Hardhat local network")
print("3. For production, uncomment and update the production overrides")
print("4. Make sure your Hardhat node is running on http://127.0.0.1:8545")