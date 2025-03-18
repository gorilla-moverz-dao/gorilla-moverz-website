export const ABI = {
  address: "0xef88d140bd12edaa47736bb34f7af91c7a6cbb0f5853a0c334e04e451f416522",
  name: "banana_farm",
  friends: [],
  exposed_functions: [
    {
      name: "collection_address",
      visibility: "public",
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: [],
      return: ["0x1::option::Option<address>"],
    },
    {
      name: "deposit",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "u64"],
      return: [],
    },
    {
      name: "farm",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "0x1::object::Object<0x4::token::Token>", "vector<0x1::object::Object<0x4::token::Token>>"],
      return: [],
    },
    {
      name: "get_treasury_timeout",
      visibility: "public",
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: [],
      return: ["u64"],
    },
    {
      name: "last_farmed",
      visibility: "public",
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: ["address"],
      return: ["u64"],
    },
    {
      name: "set_collection_address",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "address"],
      return: [],
    },
    {
      name: "set_timeout_in_seconds",
      visibility: "public",
      is_entry: true,
      is_view: false,
      generic_type_params: [],
      params: ["&signer", "u64"],
      return: [],
    },
    {
      name: "treasury_balance",
      visibility: "public",
      is_entry: false,
      is_view: true,
      generic_type_params: [],
      params: [],
      return: ["u64"],
    },
  ],
  structs: [
    {
      name: "BananaTreasury",
      is_native: false,
      abilities: ["key"],
      generic_type_params: [],
      fields: [
        { name: "coins", type: "0x1::object::Object<0x1::fungible_asset::FungibleStore>" },
        { name: "store_extend_ref", type: "0x1::object::ExtendRef" },
        { name: "last_farmed", type: "0x1::table::Table<address, u64>" },
        { name: "is_closed", type: "bool" },
        { name: "timeout_in_seconds", type: "u64" },
        { name: "collection_address", type: "0x1::option::Option<address>" },
      ],
    },
  ],
} as const;
