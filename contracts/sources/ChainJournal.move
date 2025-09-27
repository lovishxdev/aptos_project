module ChainJournal::diary {
    use std::signer;
    use std::string::String;
    use std::vector;
    use aptos_framework::account;
    use aptos_framework::event;
    use aptos_framework::timestamp;

    // Error codes
    const E_NOT_INITIALIZED: u64 = 1;
    const E_ALREADY_INITIALIZED: u64 = 2;
    const E_UNAUTHORIZED: u64 = 3;
    const E_ENTRY_NOT_FOUND: u64 = 4;

    // Struct to represent a diary entry
    struct DiaryEntry has store, copy, drop {
        id: u64,
        content: String,
        timestamp: u64,
        author: address,
    }

    // Struct to store user's diary entries
    struct UserDiary has key {
        entries: vector<DiaryEntry>,
        entry_count: u64,
    }

    // Events
    struct EntryCreatedEvent has store, drop {
        author: address,
        entry_id: u64,
        content: String,
        timestamp: u64,
    }

    struct EntryDeletedEvent has store, drop {
        author: address,
        entry_id: u64,
    }

    // Initialize user's diary
    public entry fun initialize_diary(account: &signer) {
        let account_addr = signer::address_of(account);
        
        // Check if diary is already initialized
        assert!(!exists<UserDiary>(account_addr), E_ALREADY_INITIALIZED);
        
        // Create and store the UserDiary resource
        move_to(account, UserDiary {
            entries: vector::empty<DiaryEntry>(),
            entry_count: 0,
        });
    }

    // Add a new diary entry
    public entry fun add_entry(account: &signer, content: String) {
        let account_addr = signer::address_of(account);
        
        // Ensure diary is initialized
        assert!(exists<UserDiary>(account_addr), E_NOT_INITIALIZED);
        
        let diary = borrow_global_mut<UserDiary>(account_addr);
        let current_time = timestamp::now_seconds();
        let entry_id = diary.entry_count;
        
        // Create new diary entry
        let new_entry = DiaryEntry {
            id: entry_id,
            content,
            timestamp: current_time,
            author: account_addr,
        };
        
        // Add entry to the vector
        vector::push_back(&mut diary.entries, new_entry);
        diary.entry_count = diary.entry_count + 1;
        
        // Emit event
        let event = EntryCreatedEvent {
            author: account_addr,
            entry_id,
            content: copy content,
            timestamp: current_time,
        };
        event::emit(event);
    }

    // Get the number of entries for a user
    public fun get_entry_count(user_addr: address): u64 acquires UserDiary {
        assert!(exists<UserDiary>(user_addr), E_NOT_INITIALIZED);
        let diary = borrow_global<UserDiary>(user_addr);
        diary.entry_count
    }

    // Get a specific entry by ID
    public fun get_entry(user_addr: address, entry_id: u64): (u64, String, u64, address) acquires UserDiary {
        assert!(exists<UserDiary>(user_addr), E_NOT_INITIALIZED);
        let diary = borrow_global<UserDiary>(user_addr);
        
        let i = 0;
        let len = vector::length(&diary.entries);
        while (i < len) {
            let entry = vector::borrow(&diary.entries, i);
            if (entry.id == entry_id) {
                return (entry.id, entry.content, entry.timestamp, entry.author);
            };
            i = i + 1;
        };
        
        // Entry not found
        abort E_ENTRY_NOT_FOUND
    }

    // Get all entries for a user (returns entry count)
    public fun get_all_entries(user_addr: address): vector<DiaryEntry> acquires UserDiary {
        assert!(exists<UserDiary>(user_addr), E_NOT_INITIALIZED);
        let diary = borrow_global<UserDiary>(user_addr);
        diary.entries
    }

    // Get the latest entry
    public fun get_latest_entry(user_addr: address): (u64, String, u64, address) acquires UserDiary {
        assert!(exists<UserDiary>(user_addr), E_NOT_INITIALIZED);
        let diary = borrow_global<UserDiary>(user_addr);
        
        let len = vector::length(&diary.entries);
        assert!(len > 0, E_ENTRY_NOT_FOUND);
        
        let latest_entry = vector::borrow(&diary.entries, len - 1);
        (latest_entry.id, latest_entry.content, latest_entry.timestamp, latest_entry.author)
    }

    // Check if user has initialized their diary
    public fun is_initialized(user_addr: address): bool {
        exists<UserDiary>(user_addr)
    }

    // Test functions for development
    #[test_only]
    public fun create_test_entry(): DiaryEntry {
        DiaryEntry {
            id: 0,
            content: string::utf8(b"Test diary entry"),
            timestamp: 1234567890,
            author: @0x1,
        }
    }

    #[test_only]
    public fun create_test_diary(): UserDiary {
        UserDiary {
            entries: vector::empty<DiaryEntry>(),
            entry_count: 0,
        }
    }
}
