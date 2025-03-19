module GorillaMoverz::banana_farm {
    use aptos_framework::fungible_asset::{Self, FungibleStore};
    use aptos_framework::primary_fungible_store;
    use aptos_framework::object::{Self, Object, ExtendRef};
    use aptos_framework::timestamp;
    use aptos_std::table::{Self, Table};
    use std::option::{Self, Option};
    use std::signer;
    use std::vector;
    use aptos_token_objects::token::{Self, Token};

    use GorillaMoverz::banana;
    use GorillaMoverz::launchpad;

    const ENOT_ELAPSED: u64 = 1;
    const EONLY_ADMIN_CAN_UPDATE: u64 = 2;
    const ENOT_AUTHORIZED: u64 = 3;
    const ENOT_OWNED_NFT: u64 = 4;
    const EWRONG_COLLECTION: u64 = 5;
    const EDUPLICATE_COLLECTION: u64 = 6;
    const EFUNDS_FROZEN: u64 = 7;
    const EFUNDS_NOT_FROZEN: u64 = 8;

    struct BananaTreasury has key {
        coins: Object<FungibleStore>,
        store_extend_ref: ExtendRef,
        last_farmed: Table<address, u64>,
        is_closed: bool,
        timeout_in_seconds: u64,
        collection_address: Option<address>
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
                collection_address: option::none()
            }
        );
    }

    public entry fun deposit(user: &signer, amount: u64) acquires BananaTreasury {
        let asset = banana::get_metadata();
        let in = primary_fungible_store::withdraw(user, asset, amount);

        let treasury = borrow_global_mut<BananaTreasury>(@GorillaMoverz);
        fungible_asset::deposit(treasury.coins, in);
    }

    public entry fun farm(sender: &signer, nft: Object<Token>, partner_nfts: vector<Object<Token>>) acquires BananaTreasury {
        let account = signer::address_of(sender);

        assert!(object::owner(nft) == account, ENOT_OWNED_NFT);

        let is_launchpad_collection = launchpad::verify_collection(nft);
        assert!(is_launchpad_collection, EWRONG_COLLECTION);

        // Verify partner NFTs
        let collection_addresses = vector::empty<address>();

        let collection_address = get_collection_address(nft);
        vector::push_back(&mut collection_addresses, collection_address);

        let partner_nfts_len = vector::length(&partner_nfts);
        for (i in 0..partner_nfts_len) {
            let partner_nft = *vector::borrow(&partner_nfts, i);
            assert!(object::owner(partner_nft) == account, ENOT_OWNED_NFT);

            let is_launchpad_collection = launchpad::verify_collection(partner_nft);
            assert!(is_launchpad_collection, EWRONG_COLLECTION);

            let collection_address_partner = get_collection_address(partner_nft);
            let duplicate = vector::contains(&collection_addresses, &collection_address_partner);
            assert!(!duplicate, EDUPLICATE_COLLECTION);
            vector::push_back(&mut collection_addresses, collection_address_partner);
        };

        let treasury = borrow_global_mut<BananaTreasury>(@GorillaMoverz);
        assert!(
            option::some(collection_address) == treasury.collection_address,
            EWRONG_COLLECTION
        );

        let timeout = treasury.timeout_in_seconds;

        let asset = banana::get_metadata();
        let store = primary_fungible_store::ensure_primary_store_exists(account, asset);

        let amount = 10_000_000_000;
        if (table::contains(&treasury.last_farmed, account)) {
            let last_farmed = table::borrow(&treasury.last_farmed, account);
            let now = timestamp::now_seconds();
            let diff = now - *last_farmed;
            assert!(diff > timeout, ENOT_ELAPSED);

            if (diff < timeout * 2) {
                amount = 40_000_000_000;
            } else if (diff < timeout * 3) {
                amount = 30_000_000_000;
            } else if (diff < timeout * 4) {
                amount = 20_000_000_000;
            };
        };

        // Increase amount based on partner NFTs (10% per NFT)
        if (partner_nfts_len > 0) {
            amount = amount + (amount / 10 * partner_nfts_len);
        };

        let now = timestamp::now_seconds();
        table::upsert(&mut treasury.last_farmed, account, now);

        let store_signer = &object::generate_signer_for_extending(&treasury.store_extend_ref);

        GorillaMoverz::banana::withdraw_to(store_signer, amount, treasury.coins, account);

        // Make sure the account is frozen
        if (!fungible_asset::is_frozen(store)) {
            GorillaMoverz::banana::freeze_own_account(sender);
        }
    }

    public entry fun set_timeout_in_seconds(sender: &signer, timeout_in_seconds: u64) acquires BananaTreasury {
        assert!(is_admin(signer::address_of(sender)), EONLY_ADMIN_CAN_UPDATE);

        let treasury = borrow_global_mut<BananaTreasury>(@GorillaMoverz);
        treasury.timeout_in_seconds = timeout_in_seconds;
    }

    public entry fun set_collection_address(sender: &signer, collection_address: address) acquires BananaTreasury {
        assert!(is_admin(signer::address_of(sender)), EONLY_ADMIN_CAN_UPDATE);

        let treasury = borrow_global_mut<BananaTreasury>(@GorillaMoverz);
        treasury.collection_address = option::some(collection_address);
    }

    fun is_admin(sender: address): bool {
        if (sender == @GorillaMoverz) { true }
        else { false }
    }

    fun get_collection_address(nft: Object<Token>): address {
        object::object_address(&token::collection_object(nft))
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
    public fun collection_address(): Option<address> acquires BananaTreasury {
        let treasury = borrow_global_mut<BananaTreasury>(@GorillaMoverz);
        treasury.collection_address
    }

    #[view]
    public fun get_treasury_timeout(): u64 acquires BananaTreasury {
        let treasury = borrow_global_mut<BananaTreasury>(@GorillaMoverz);
        treasury.timeout_in_seconds
    }

    #[test_only]
    public fun test_init(creator: &signer) {
        init_module(creator);
    }
}

