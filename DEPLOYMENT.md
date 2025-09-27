# ChainJournal Deployment Guide

## Overview
This guide covers the complete deployment process for ChainJournal, an immutable daily diary application on the Aptos blockchain.

## Prerequisites

### Required Software
- **Node.js 18+** - For frontend development
- **Aptos CLI** - For smart contract deployment
- **Git** - For version control

### Required Accounts
- **Aptos Testnet Account** - For smart contract deployment
- **Aptos Wallet** - For testing (Petra, Martian, etc.)

## Quick Start

### 1. Setup Development Environment
```bash
# Run the setup script
./scripts/setup.sh

# Or manually install dependencies
npm install
```

### 2. Start Development Server
```bash
# Start the frontend development server
npm run dev

# The application will be available at http://localhost:3000
```

### 3. Deploy Smart Contract
```bash
# Deploy the smart contract to Aptos testnet
./scripts/deploy.sh
```

## Detailed Deployment Steps

### Frontend Deployment

#### Development
1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

#### Production Deployment
1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Deploy to Hosting Service**
   - **Vercel**: Connect your GitHub repository to Vercel
   - **Netlify**: Deploy the `dist` folder
   - **AWS S3**: Upload the `dist` folder to an S3 bucket

### Smart Contract Deployment

#### 1. Install Aptos CLI
```bash
# Install Aptos CLI
curl -fsSL https://aptos.dev/install.sh | bash
source ~/.bashrc

# Verify installation
aptos --version
```

#### 2. Configure Aptos CLI
```bash
# Initialize Aptos CLI
aptos init

# Create a testnet profile
aptos account create --profile testnet
```

#### 3. Deploy Contract
```bash
# Navigate to contracts directory
cd contracts

# Compile the contract
aptos move compile

# Run tests
aptos move test

# Deploy to testnet
aptos move publish --profile testnet
```

#### 4. Update Contract Address
After deployment, update the contract address in your frontend code:
```typescript
// In src/hooks/useDiary.ts
const CONTRACT_ADDRESS = "0x[YOUR_DEPLOYED_ADDRESS]"
```

## Configuration

### Environment Variables
Create a `.env` file in the project root:
```env
VITE_APTOS_NETWORK=testnet
VITE_CONTRACT_ADDRESS=0x[YOUR_CONTRACT_ADDRESS]
VITE_APP_NAME=ChainJournal
```

### Smart Contract Configuration
Update the contract address in `contracts/Move.toml`:
```toml
[addresses]
ChainJournal = "0x[YOUR_DEPLOYED_ADDRESS]"
```

## Testing

### Frontend Testing
1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test Wallet Connection**
   - Connect with Petra, Martian, or other Aptos wallets
   - Verify wallet address display

3. **Test Diary Functionality**
   - Initialize diary
   - Add diary entries
   - View entry history

### Smart Contract Testing
1. **Run Unit Tests**
   ```bash
   cd contracts
   aptos move test
   ```

2. **Test on Testnet**
   - Deploy to testnet
   - Test all contract functions
   - Verify events are emitted

## Troubleshooting

### Common Issues

#### 1. Wallet Connection Issues
- **Problem**: Wallet not connecting
- **Solution**: Ensure wallet extension is installed and unlocked

#### 2. Contract Deployment Issues
- **Problem**: Deployment fails
- **Solution**: Check Aptos CLI configuration and account balance

#### 3. Transaction Failures
- **Problem**: Transactions not going through
- **Solution**: Check network status and gas fees

### Debug Mode
Enable debug mode by setting:
```env
VITE_DEBUG=true
```

## Production Considerations

### Security
- Use environment variables for sensitive data
- Implement proper error handling
- Validate all user inputs

### Performance
- Optimize bundle size
- Implement lazy loading
- Use CDN for static assets

### Monitoring
- Set up error tracking (Sentry, etc.)
- Monitor transaction success rates
- Track user engagement

## Maintenance

### Regular Updates
- Keep dependencies updated
- Monitor Aptos network updates
- Update smart contract if needed

### Backup Strategy
- Backup smart contract code
- Export user data if needed
- Maintain version control

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review Aptos documentation
3. Open an issue in the repository
4. Contact the development team

## Resources

- [Aptos Documentation](https://aptos.dev/)
- [Aptos CLI Guide](https://aptos.dev/cli-tools/aptos-cli-tool/)
- [Move Language Guide](https://aptos.dev/move/)
- [React Documentation](https://react.dev/)
- [Ant Design Components](https://ant.design/)
