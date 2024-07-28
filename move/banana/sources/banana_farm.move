module GorillaMoverz::banana_farm_one {
    use aptos_framework::fungible_asset::{Self, FungibleStore };
    use aptos_framework::primary_fungible_store;
    use aptos_framework::object::{Self, Object, ExtendRef};
    use aptos_framework::timestamp;
    use aptos_std::table::{Self, Table};
    use std::string::{Self, String};
    use std::signer;
    use aptos_token_objects::token::{Self, Token};
    use aptos_token_objects::collection::{Self, Collection};
 
    use GorillaMoverz::banana;

    const ENOT_ELAPSED: u64 = 1;
    const EONLY_ADMIN_CAN_UPDATE: u64 = 2;
    const E_NOT_AUTHORIZED: u64 = 3;

    struct BananaTreasury has key {
        coins: Object<FungibleStore>,
        store_extend_ref: ExtendRef,
        last_farmed: Table<address, u64>,
        is_closed: bool,
        timeout_in_seconds: u64,
        collection_id: String,
    }

    fun init_module(deployer: &signer) {
        let metadata = banana::get_metadata();

        let rewards_pool_constructor_ref = &object::create_object(@GorillaMoverz);
        let rewards_pool_signer = &object::generate_signer(rewards_pool_constructor_ref);
        let rewards_pool_addr = signer::address_of(rewards_pool_signer);
        let store_constructor_ref = &object::create_object(rewards_pool_addr);
        
        move_to(
            deployer,
            BananaTreasury {
                coins: fungible_asset::create_store(store_constructor_ref, metadata),
                store_extend_ref: object::generate_extend_ref(store_constructor_ref),
                last_farmed: table::new(),
                is_closed: false,
                timeout_in_seconds: 2 * 60,
                collection_id: string::utf8(b""),
            }
        );
    }

    public entry fun deposit(user: &signer, amount: u64) acquires BananaTreasury {
        let asset = banana::get_metadata();
        let in = primary_fungible_store::withdraw(user, asset, amount);

        let treasury = borrow_global_mut<BananaTreasury>(@GorillaMoverz);
        fungible_asset::deposit(treasury.coins, in);
    }

    public entry fun withdraw(sender: &signer, nft: Object<Token>) acquires BananaTreasury {
        let account = signer::address_of(sender);

        assert!(object::owner(nft) == account, E_NOT_AUTHORIZED);

        /* TODO: Check if the nft is of a specific collection
        let col = token::collection_object(nft);
        let collection_creator = collection::creator(col);
        assert!(collection_creator == @GorillaMoverz, E_NOT_AUTHORIZED);
        */
        
        let treasury = borrow_global_mut<BananaTreasury>(@GorillaMoverz);
        let timeout = treasury.timeout_in_seconds;

        let asset = banana::get_metadata();
        primary_fungible_store::ensure_primary_store_exists(account, asset);

        let amount = 1_000_000_000;
        if(table::contains(&treasury.last_farmed, account)) {
            let last_farmed = table::borrow(&treasury.last_farmed, account);
            let now = timestamp::now_seconds();
            let diff = now - *last_farmed;
            assert!(diff > timeout, ENOT_ELAPSED);

            if (diff < timeout * 2) {
                amount = 4_000_000_000;
            } else if (diff < timeout * 3) {
                amount = 3_000_000_000;
            } else if (diff < timeout * 4) {
                amount = 2_000_000_000;
            }
        };

        let now = timestamp::now_seconds();
        table::upsert(&mut treasury.last_farmed, account, now);

        let store_signer = &object::generate_signer_for_extending(&treasury.store_extend_ref);
        let coins = fungible_asset::withdraw(store_signer, treasury.coins, amount);
        primary_fungible_store::deposit(account, coins);
    }

    public entry fun set_timeout_in_seconds(sender: &signer, timeout_in_seconds: u64) acquires BananaTreasury {
        assert!(is_admin(signer::address_of(sender)), EONLY_ADMIN_CAN_UPDATE);

        let treasury = borrow_global_mut<BananaTreasury>(@GorillaMoverz);
        treasury.timeout_in_seconds = timeout_in_seconds;
    }

    public entry fun set_collection_id(sender: &signer, collection_id: String) acquires BananaTreasury {
        assert!(is_admin(signer::address_of(sender)), EONLY_ADMIN_CAN_UPDATE);

        let treasury = borrow_global_mut<BananaTreasury>(@GorillaMoverz);
        treasury.collection_id = collection_id;
    }

    fun is_admin(sender: address): bool {
        if (sender == @GorillaMoverz) {
            true
        } else {
            false
        }
    }

    #[view]
    public fun get_collection_from_token(t: Object<Token>): String {
        let col = token::collection_object(t);
        collection::name(col)
    }

    #[view]
    public fun get_collection_object_from_token(t: Object<Token>): Object<Collection> {
        let col = token::collection_object(t);
        col
    }

    #[view]
    public fun get_collection_creator(nft: Object<Token>): address {
        let col = token::collection_object(nft);
        let collection_creator = collection::creator(col);

        collection_creator
    }

    #[view]
    public fun treasury_balance(): u64 acquires BananaTreasury {
        let treasury = borrow_global_mut<BananaTreasury>(@GorillaMoverz);
        fungible_asset::balance(treasury.coins)
    }

    #[view]
    public fun last_farmed(account: address): u64 acquires BananaTreasury {
        let treasury = borrow_global_mut<BananaTreasury>(@GorillaMoverz);

        let default = 0;
        let last_farmed = table::borrow_with_default(&treasury.last_farmed, account, &default);
        *last_farmed
    }

    #[view]
    public fun get_treasury_timeout(): u64 acquires BananaTreasury {
        let treasury = borrow_global_mut<BananaTreasury>(@GorillaMoverz);
        treasury.timeout_in_seconds
    }

    #[test_only]
    use aptos_framework::account;
    #[test_only]
    use GorillaMoverz::launchpad;


    #[test(creator = @GorillaMoverz, user1 = @0x200)]
    fun test_basic_flow(
        creator: &signer,
        user1: &signer,
    ) acquires BananaTreasury {
        let creator_address = signer::address_of(creator);
        account::create_account_for_test(creator_address);

        let user1_address = signer::address_of(user1);
        account::create_account_for_test(user1_address);

        banana::test_init(creator);
        banana::mint(creator, creator_address, 100);

        init_module(creator);
        let asset = banana::get_metadata();

        deposit(creator, 100);

        launchpad::test_init(creator);
        // TODO: Create a collection and verify that the nft is from that collection using with withdraw function
    }
}