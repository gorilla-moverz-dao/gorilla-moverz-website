/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetLeaderboard($asset_type: String, $exclude: [String!]) {\n    current_fungible_asset_balances(\n      where: { asset_type: { _eq: $asset_type }, _and: { owner_address: { _nin: $exclude } } }\n      order_by: { amount: desc }\n      limit: 100\n    ) {\n      asset_type\n      owner_address\n      amount\n    }\n  }\n": types.GetLeaderboardDocument,
    "\n  query GetAccountNfts($address: String, $collectionIds: [String!]) {\n    current_token_ownerships_v2(\n      where: {\n        owner_address: { _eq: $address }\n        amount: { _gt: \"0\" }\n        current_token_data: { current_collection: { collection_id: { _in: $collectionIds } } }\n      }\n    ) {\n      current_token_data {\n        collection_id\n        largest_property_version_v1\n        current_collection {\n          collection_id\n          collection_name\n          description\n          creator_address\n          uri\n          __typename\n        }\n        description\n        token_name\n        token_data_id\n        token_standard\n        token_uri\n        cdn_asset_uris {\n          cdn_image_uri\n          asset_uri\n          raw_image_uri\n        }\n        __typename\n      }\n      owner_address\n      amount\n      __typename\n    }\n  }\n": types.GetAccountNftsDocument,
    "\n  query GetCollectionNfts($collectionId: String!, $offset: Int!, $filter: jsonb_comparison_exp) {\n    current_token_datas_v2(\n      where: { collection_id: { _eq: $collectionId }, token_properties: $filter }\n      limit: 100\n      offset: $offset\n    ) {\n      description\n      token_name\n      token_data_id\n      token_uri\n      cdn_asset_uris {\n        cdn_image_uri\n        asset_uri\n        raw_image_uri\n      }\n      decimals\n    }\n  }\n": types.GetCollectionNftsDocument,
    "\n  query GetTokenData($collection_id: String) {\n    current_collections_v2(where: { collection_id: { _eq: $collection_id } }, limit: 1) {\n      creator_address\n      collection_id\n      collection_name\n      current_supply\n      max_supply\n      uri\n      description\n      cdn_asset_uris {\n        cdn_animation_uri\n        cdn_image_uri\n      }\n    }\n    current_collection_ownership_v2_view(\n      where: { collection_id: { _eq: $collection_id } }\n      order_by: { last_transaction_version: desc }\n    ) {\n      owner_address\n    }\n    current_collection_ownership_v2_view_aggregate(where: { collection_id: { _eq: $collection_id } }) {\n      aggregate {\n        count(distinct: true, columns: owner_address)\n      }\n    }\n  }\n": types.GetTokenDataDocument,
    "\n  query GetNft($id: String) {\n    current_token_ownerships_v2(where: { amount: { _gt: \"0\" }, current_token_data: { token_data_id: { _eq: $id } } }) {\n      current_token_data {\n        collection_id\n        largest_property_version_v1\n        current_collection {\n          collection_id\n          collection_name\n          description\n          uri\n        }\n        description\n        token_name\n        token_data_id\n        token_uri\n        cdn_asset_uris {\n          cdn_image_uri\n          asset_uri\n          raw_image_uri\n        }\n      }\n      owner_address\n      amount\n    }\n  }\n": types.GetNftDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLeaderboard($asset_type: String, $exclude: [String!]) {\n    current_fungible_asset_balances(\n      where: { asset_type: { _eq: $asset_type }, _and: { owner_address: { _nin: $exclude } } }\n      order_by: { amount: desc }\n      limit: 100\n    ) {\n      asset_type\n      owner_address\n      amount\n    }\n  }\n"): (typeof documents)["\n  query GetLeaderboard($asset_type: String, $exclude: [String!]) {\n    current_fungible_asset_balances(\n      where: { asset_type: { _eq: $asset_type }, _and: { owner_address: { _nin: $exclude } } }\n      order_by: { amount: desc }\n      limit: 100\n    ) {\n      asset_type\n      owner_address\n      amount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAccountNfts($address: String, $collectionIds: [String!]) {\n    current_token_ownerships_v2(\n      where: {\n        owner_address: { _eq: $address }\n        amount: { _gt: \"0\" }\n        current_token_data: { current_collection: { collection_id: { _in: $collectionIds } } }\n      }\n    ) {\n      current_token_data {\n        collection_id\n        largest_property_version_v1\n        current_collection {\n          collection_id\n          collection_name\n          description\n          creator_address\n          uri\n          __typename\n        }\n        description\n        token_name\n        token_data_id\n        token_standard\n        token_uri\n        cdn_asset_uris {\n          cdn_image_uri\n          asset_uri\n          raw_image_uri\n        }\n        __typename\n      }\n      owner_address\n      amount\n      __typename\n    }\n  }\n"): (typeof documents)["\n  query GetAccountNfts($address: String, $collectionIds: [String!]) {\n    current_token_ownerships_v2(\n      where: {\n        owner_address: { _eq: $address }\n        amount: { _gt: \"0\" }\n        current_token_data: { current_collection: { collection_id: { _in: $collectionIds } } }\n      }\n    ) {\n      current_token_data {\n        collection_id\n        largest_property_version_v1\n        current_collection {\n          collection_id\n          collection_name\n          description\n          creator_address\n          uri\n          __typename\n        }\n        description\n        token_name\n        token_data_id\n        token_standard\n        token_uri\n        cdn_asset_uris {\n          cdn_image_uri\n          asset_uri\n          raw_image_uri\n        }\n        __typename\n      }\n      owner_address\n      amount\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCollectionNfts($collectionId: String!, $offset: Int!, $filter: jsonb_comparison_exp) {\n    current_token_datas_v2(\n      where: { collection_id: { _eq: $collectionId }, token_properties: $filter }\n      limit: 100\n      offset: $offset\n    ) {\n      description\n      token_name\n      token_data_id\n      token_uri\n      cdn_asset_uris {\n        cdn_image_uri\n        asset_uri\n        raw_image_uri\n      }\n      decimals\n    }\n  }\n"): (typeof documents)["\n  query GetCollectionNfts($collectionId: String!, $offset: Int!, $filter: jsonb_comparison_exp) {\n    current_token_datas_v2(\n      where: { collection_id: { _eq: $collectionId }, token_properties: $filter }\n      limit: 100\n      offset: $offset\n    ) {\n      description\n      token_name\n      token_data_id\n      token_uri\n      cdn_asset_uris {\n        cdn_image_uri\n        asset_uri\n        raw_image_uri\n      }\n      decimals\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTokenData($collection_id: String) {\n    current_collections_v2(where: { collection_id: { _eq: $collection_id } }, limit: 1) {\n      creator_address\n      collection_id\n      collection_name\n      current_supply\n      max_supply\n      uri\n      description\n      cdn_asset_uris {\n        cdn_animation_uri\n        cdn_image_uri\n      }\n    }\n    current_collection_ownership_v2_view(\n      where: { collection_id: { _eq: $collection_id } }\n      order_by: { last_transaction_version: desc }\n    ) {\n      owner_address\n    }\n    current_collection_ownership_v2_view_aggregate(where: { collection_id: { _eq: $collection_id } }) {\n      aggregate {\n        count(distinct: true, columns: owner_address)\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTokenData($collection_id: String) {\n    current_collections_v2(where: { collection_id: { _eq: $collection_id } }, limit: 1) {\n      creator_address\n      collection_id\n      collection_name\n      current_supply\n      max_supply\n      uri\n      description\n      cdn_asset_uris {\n        cdn_animation_uri\n        cdn_image_uri\n      }\n    }\n    current_collection_ownership_v2_view(\n      where: { collection_id: { _eq: $collection_id } }\n      order_by: { last_transaction_version: desc }\n    ) {\n      owner_address\n    }\n    current_collection_ownership_v2_view_aggregate(where: { collection_id: { _eq: $collection_id } }) {\n      aggregate {\n        count(distinct: true, columns: owner_address)\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetNft($id: String) {\n    current_token_ownerships_v2(where: { amount: { _gt: \"0\" }, current_token_data: { token_data_id: { _eq: $id } } }) {\n      current_token_data {\n        collection_id\n        largest_property_version_v1\n        current_collection {\n          collection_id\n          collection_name\n          description\n          uri\n        }\n        description\n        token_name\n        token_data_id\n        token_uri\n        cdn_asset_uris {\n          cdn_image_uri\n          asset_uri\n          raw_image_uri\n        }\n      }\n      owner_address\n      amount\n    }\n  }\n"): (typeof documents)["\n  query GetNft($id: String) {\n    current_token_ownerships_v2(where: { amount: { _gt: \"0\" }, current_token_data: { token_data_id: { _eq: $id } } }) {\n      current_token_data {\n        collection_id\n        largest_property_version_v1\n        current_collection {\n          collection_id\n          collection_name\n          description\n          uri\n        }\n        description\n        token_name\n        token_data_id\n        token_uri\n        cdn_asset_uris {\n          cdn_image_uri\n          asset_uri\n          raw_image_uri\n        }\n      }\n      owner_address\n      amount\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;