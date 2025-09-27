#!/bin/bash

# ChainJournal Smart Contract Deployment Script
# This script deploys the ChainJournal smart contract to Aptos testnet

echo "🚀 Deploying ChainJournal to Aptos Testnet..."

# Navigate to contracts directory
cd contracts

# Check if Aptos CLI is installed
if ! command -v aptos &> /dev/null; then
    echo "❌ Aptos CLI is not installed. Please install it first."
    echo "Visit: https://aptos.dev/cli-tools/aptos-cli-tool/install-aptos-cli"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "Move.toml" ]; then
    echo "❌ Move.toml not found. Please run this script from the project root."
    exit 1
fi

# Compile the contract
echo "📦 Compiling smart contract..."
aptos move compile

if [ $? -ne 0 ]; then
    echo "❌ Compilation failed. Please check your Move code."
    exit 1
fi

echo "✅ Compilation successful!"

# Run tests
echo "🧪 Running tests..."
aptos move test

if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Please fix the issues before deploying."
    exit 1
fi

echo "✅ All tests passed!"

# Deploy to testnet
echo "🌐 Deploying to Aptos Testnet..."
aptos move publish --profile testnet

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed. Please check your configuration."
    exit 1
fi

echo "✅ Contract deployed successfully!"
echo "📝 Update the contract address in your frontend code."
echo "🔗 Check your transaction on Aptos Explorer: https://explorer.aptoslabs.com/"

# Return to project root
cd ..
