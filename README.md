# ChainJournal - Immutable Daily Diary

A full-stack application that allows users to create immutable diary entries on the Aptos blockchain. Once written, diary entries cannot be modified or deleted, ensuring permanent record-keeping.

## Features

- 🔐 **Immutable Entries**: Once written, diary entries are permanently stored on the blockchain
- 💼 **Wallet Integration**: Connect with Aptos wallets to authenticate and sign transactions
- 📝 **Rich Text Editor**: Write detailed diary entries with character limits and validation
- 🔍 **Entry History**: View all your diary entries in chronological order
- ⛓️ **Blockchain Transparency**: Each entry includes transaction hash for verification
- 🎨 **Modern UI**: Beautiful, responsive interface built with React and Ant Design

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Ant Design** for UI components
- **React Router** for navigation
- **Aptos SDK** for blockchain integration

### Backend
- **Aptos Move** smart contracts
- **Aptos Testnet** for development
- **Aptos CLI** for contract deployment

## Project Structure

```
ChainJournal/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   └── main.tsx           # Application entry point
├── contracts/             # Aptos Move smart contracts
│   ├── sources/           # Move source files
│   └── Move.toml          # Move package configuration
├── package.json           # Node.js dependencies
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Aptos CLI installed and configured
- A compatible Aptos wallet (Petra, Martian, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ChainJournal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Smart Contract Development

1. **Navigate to contracts directory**
   ```bash
   cd contracts
   ```

2. **Compile the contract**
   ```bash
   aptos move compile
   ```

3. **Test the contract**
   ```bash
   aptos move test
   ```

4. **Deploy to testnet**
   ```bash
   aptos move publish --profile testnet
   ```

## Usage

1. **Connect Wallet**: Click "Connect Wallet" to authenticate with your Aptos wallet
2. **Write Entry**: Use the form to write your diary entry (minimum 10 characters)
3. **Submit**: Click "Add Entry" to submit your entry to the blockchain
4. **View Entries**: All your entries will be displayed below, showing timestamp and transaction hash

## Smart Contract Functions

### Core Functions
- `initialize_diary()`: Initialize a user's diary (one-time setup)
- `add_entry(content)`: Add a new immutable diary entry
- `get_entry_count()`: Get the number of entries for a user
- `get_entry(entry_id)`: Retrieve a specific entry by ID
- `get_all_entries()`: Get all entries for a user
- `get_latest_entry()`: Get the most recent entry

### Events
- `EntryCreatedEvent`: Emitted when a new entry is created
- `EntryDeletedEvent`: Emitted when an entry is deleted (if implemented)

## Development Notes

- The application currently uses mock wallet functionality for development
- Smart contracts are designed for the Aptos testnet
- All diary entries are stored immutably on the blockchain
- Transaction hashes are displayed for transparency and verification

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.
