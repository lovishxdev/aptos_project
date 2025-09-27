#!/bin/bash

# ChainJournal Development Setup Script
# This script sets up the development environment for ChainJournal

echo "🔧 Setting up ChainJournal development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies."
    exit 1
fi

echo "✅ Dependencies installed successfully!"

# Check if Aptos CLI is installed
if ! command -v aptos &> /dev/null; then
    echo "⚠️  Aptos CLI is not installed."
    echo "📝 To install Aptos CLI, run:"
    echo "   curl -fsSL https://aptos.dev/install.sh | bash"
    echo "   source ~/.bashrc"
    echo ""
    echo "🔗 Or visit: https://aptos.dev/cli-tools/aptos-cli-tool/install-aptos-cli"
    echo ""
    echo "⚠️  You can still run the frontend, but smart contract deployment will require Aptos CLI."
else
    echo "✅ Aptos CLI is installed: $(aptos --version)"
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# ChainJournal Environment Variables
VITE_APTOS_NETWORK=testnet
VITE_CONTRACT_ADDRESS=0x123
VITE_APP_NAME=ChainJournal
EOF
    echo "✅ .env file created!"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Start the development server: npm run dev"
echo "2. Open http://localhost:3000 in your browser"
echo "3. Connect your Aptos wallet (Petra, Martian, etc.)"
echo "4. Start writing your immutable diary entries!"
echo ""
echo "🚀 To deploy the smart contract:"
echo "   ./scripts/deploy.sh"
echo ""
echo "📚 For more information, see README.md"
