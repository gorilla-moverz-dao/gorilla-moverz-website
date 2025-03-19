#[test_only]
module GorillaMoverz::banana_farm_e2e {
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use aptos_std::debug;
    use aptos_token_objects::collection::{Self, Collection};
    use std::option;
    use aptos_framework::object::{Self, Object};
    use std::signer;
    use aptos_framework::fungible_asset;
    use aptos_framework::primary_fungible_store;

    use GorillaMoverz::banana;
    use GorillaMoverz::banana_farm;
    use GorillaMoverz::launchpad;

    const EFUNDS_FROZEN: u64 = 7;
    const EFUNDS_NOT_FROZEN: u64 = 8;

    #[test(
        aptos_framework = @0x1, creator = @GorillaMoverz, allowlist_manager = @0x200, user1 = @0x300, user2 = @0x400
    )]
    #[expected_failure(abort_code = 327681, location = GorillaMoverz::banana)]
    fun test_basic_flow(
        aptos_framework: &signer,
        creator: &signer,
        allowlist_manager: &signer,
        user1: &signer,
        user2: &signer
    ) {
        let user1_address = signer::address_of(user1);
        let user2_address = signer::address_of(user2);

        let (main_collection, partner_collection) = test_setup_farm(aptos_framework, creator, allowlist_manager, user1);
        let nft = launchpad::test_mint_nft(user1_address, main_collection);

        debug::print(&main_collection);
        debug::print(&collection::creator(main_collection));
        debug::print(&collection::name(main_collection));
        debug::print(&collection::name(partner_collection));

        banana_farm::farm(user1, nft, vector[]);

        // Add user to allowlist and try to withdraw
        assert!(launchpad::is_allowlisted(user2_address, main_collection) == false, 1);
        launchpad::add_allowlist_addresses(allowlist_manager, vector[user2_address], main_collection);
        assert!(launchpad::is_allowlisted(user2_address, main_collection) == true, 2);
        let nft_user2 = launchpad::test_mint_nft(user2_address, main_collection);
        banana_farm::farm(user2, nft_user2, vector[]);

        // Transfer via banana module is disabled because user1 is not creator/owner
        GorillaMoverz::banana::transfer(user1, user1_address, user2_address, 1_000_000);
    }

    #[test(
        aptos_framework = @0x1, creator = @GorillaMoverz, allowlist_manager = @0x200, user1 = @0x300
    )]
    fun test_partner_boost(
        aptos_framework: &signer,
        creator: &signer,
        allowlist_manager: &signer,
        user1: &signer
    ) {
        let user1_address = signer::address_of(user1);

        let (main_collection, partner_collection) = test_setup_farm(aptos_framework, creator, allowlist_manager, user1);
        let nft = launchpad::test_mint_nft(user1_address, main_collection);
        let partner_nft = launchpad::test_mint_nft(user1_address, partner_collection);

        banana_farm::farm(user1, nft, vector[partner_nft]);

        let asset = banana::get_metadata();
        assert!(primary_fungible_store::balance(user1_address, asset) == 11_000_000_000, 6);
    }

    #[test(
        aptos_framework = @0x1, creator = @GorillaMoverz, allowlist_manager = @0x200, user1 = @0x300
    )]
    #[expected_failure(abort_code = banana_farm::EDUPLICATE_COLLECTION, location = banana_farm)]
    fun test_prevent_same_collection(
        aptos_framework: &signer,
        creator: &signer,
        allowlist_manager: &signer,
        user1: &signer
    ) {
        let user1_address = signer::address_of(user1);

        let (main_collection, partner_collection) = test_setup_farm(aptos_framework, creator, allowlist_manager, user1);
        let nft = launchpad::test_mint_nft(user1_address, main_collection);
        let partner_nft = launchpad::test_mint_nft(user1_address, partner_collection);

        banana_farm::farm(user1, nft, vector[nft, partner_nft]);
    }

    #[test(
        aptos_framework = @0x1, creator = @GorillaMoverz, allowlist_manager = @0x200, user1 = @0x300, user2 = @0x400
    )]
    #[expected_failure(abort_code = 327681, location = GorillaMoverz::banana)]
    fun test_frozen_banana_transfer_disabled(
        aptos_framework: &signer,
        creator: &signer,
        allowlist_manager: &signer,
        user1: &signer,
        user2: &signer
    ) {
        let user1_address = signer::address_of(user1);
        let user2_address = signer::address_of(user2);

        let (main_collection, _partner_collection) = test_setup_farm(aptos_framework, creator, allowlist_manager, user1);
        let nft = launchpad::test_mint_nft(user1_address, main_collection);
        let asset = GorillaMoverz::banana::get_metadata();

        assert!(!primary_fungible_store::is_frozen(user1_address, asset), EFUNDS_FROZEN);
        banana_farm::farm(user1, nft, vector[]); // Should work for frozen account
        assert!(primary_fungible_store::is_frozen(user1_address, asset), EFUNDS_NOT_FROZEN);

        let balance = primary_fungible_store::balance(user1_address, asset);
        debug::print(&balance);
        assert!(primary_fungible_store::balance(user1_address, asset) == 10_000_000_000, 6);

        // Withdraw again, should work even though funds are frozen.
        timestamp::update_global_time_for_test_secs(650);
        banana_farm::farm(user1, nft, vector[]);
        // Transfer via banana module is disabled because user1 is not creator/owner
        GorillaMoverz::banana::transfer(user1, user1_address, user2_address, 1_000_000);
    }

    #[test(
        aptos_framework = @0x1, creator = @GorillaMoverz, allowlist_manager = @0x200, user1 = @0x300, user2 = @0x400
    )]
    #[expected_failure(abort_code = 327683, location = aptos_framework::fungible_asset)]
    fun test_frozen_fa_transfer_disabled(
        aptos_framework: &signer,
        creator: &signer,
        allowlist_manager: &signer,
        user1: &signer,
        user2: &signer
    ) {
        let user1_address = signer::address_of(user1);
        let user2_address = signer::address_of(user2);

        let (main_collection, _partner_collection) = test_setup_farm(aptos_framework, creator, allowlist_manager, user1);
        let nft = launchpad::test_mint_nft(user1_address, main_collection);
        let asset = GorillaMoverz::banana::get_metadata();

        assert!(!primary_fungible_store::is_frozen(user1_address, asset), EFUNDS_FROZEN);
        banana_farm::farm(user1, nft, vector[]); // Should work for frozen account
        assert!(primary_fungible_store::is_frozen(user1_address, asset), EFUNDS_NOT_FROZEN);

        let balance = primary_fungible_store::balance(user1_address, asset);
        debug::print(&balance);
        assert!(primary_fungible_store::balance(user1_address, asset) == 10_000_000_000, 6);

        // Transfer via fungible_asset is disabled due to freeze
        let user1_wallet = primary_fungible_store::primary_store(user1_address, asset);
        let user2_wallet = primary_fungible_store::ensure_primary_store_exists(user2_address, asset);
        fungible_asset::transfer(user1, user1_wallet, user2_wallet, 1_000_000);
    }

    #[test(
        aptos_framework = @0x1, creator = @GorillaMoverz, allowlist_manager = @0x200, user1 = @0x300
    )]
    #[expected_failure(abort_code = banana_farm::EWRONG_COLLECTION, location = banana_farm)]
    fun test_wrong_main_nft(
        aptos_framework: &signer,
        creator: &signer,
        allowlist_manager: &signer,
        user1: &signer
    ) {
        let user1_address = signer::address_of(user1);

        let (_main_collection, partner_collection) = test_setup_farm(aptos_framework, creator, allowlist_manager, user1);
        let partner_nft = launchpad::test_mint_nft(user1_address, partner_collection);

        banana_farm::farm(user1, partner_nft, vector[]);
    }

    #[test_only]
    fun test_setup_farm(
        aptos_framework: &signer,
        creator: &signer,
        allowlist_manager: &signer,
        user1: &signer
    ): (Object<Collection>, Object<Collection>) {
        let creator_address = signer::address_of(creator);
        account::create_account_for_test(creator_address);

        let user1_address = signer::address_of(user1);
        account::create_account_for_test(user1_address);

        let allowlist_manager_address = signer::address_of(allowlist_manager);

        banana::test_init(creator);

        banana::mint(creator, creator_address, 20_000_000_000);

        banana_farm::test_init(creator);

        banana_farm::deposit(creator, 20_000_000_000);

        launchpad::test_init(creator);
        let (main_collection, partner_collection) =
            launchpad::test_setup_banana_farmer(
                aptos_framework,
                creator,
                allowlist_manager_address,
                option::some(vector[user1_address])
            );

        let collection_address = object::object_address(&main_collection);
        banana_farm::set_collection_address(creator, collection_address);

        (main_collection, partner_collection)
    }
}

