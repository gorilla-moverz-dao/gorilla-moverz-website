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
    "\n  query GetAccountNfts($address: String, $collectionIds: [String!]) {\n    current_token_ownerships_v2(\n      where: {\n        owner_address: { _eq: $address }\n        amount: { _gt: \"0\" }\n        current_token_data: { current_collection: { collection_id: { _in: $collectionIds } } }\n      }\n    ) {\n      current_token_data {\n        collection_id\n        largest_property_version_v1\n        current_collection {\n          collection_id\n          collection_name\n          description\n          creator_address\n          uri\n          __typename\n        }\n        description\n        token_name\n        token_data_id\n        token_standard\n        token_uri\n        __typename\n      }\n      owner_address\n      amount\n      __typename\n    }\n  }\n": types.GetAccountNftsDocument,
    "\n  query GetCollectionNfts($limit: Int!, $offset: Int!, $filter: current_token_datas_v2_bool_exp) {\n    current_token_datas_v2(where: $filter, limit: $limit, offset: $offset, order_by: [{ token_name: asc }]) {\n      description\n      token_name\n      token_data_id\n      token_uri\n      decimals\n    }\n  }\n": types.GetCollectionNftsDocument,
    "\n  query GetTokenData($collection_id: String) {\n    current_collections_v2(where: { collection_id: { _eq: $collection_id } }, limit: 1) {\n      creator_address\n      collection_id\n      collection_name\n      current_supply\n      max_supply\n      uri\n      description\n    }\n    current_collection_ownership_v2_view(\n      where: { collection_id: { _eq: $collection_id } }\n      order_by: { last_transaction_version: desc }\n    ) {\n      owner_address\n    }\n    current_collection_ownership_v2_view_aggregate(where: { collection_id: { _eq: $collection_id } }) {\n      aggregate {\n        count(distinct: true, columns: owner_address)\n      }\n    }\n  }\n": types.GetTokenDataDocument,
    "\n  query GetNft($id: String, $collectionId: String!) {\n    current_token_ownerships_v2(\n      where: {\n        amount: { _gt: \"0\" }\n        current_token_data: { collection_id: { _eq: $collectionId }, token_name: { _eq: $id } }\n      }\n    ) {\n      current_token_data {\n        collection_id\n        largest_property_version_v1\n        current_collection {\n          collection_id\n          collection_name\n          description\n          uri\n        }\n        description\n        token_name\n        token_data_id\n        token_uri\n        token_properties\n      }\n      owner_address\n      amount\n    }\n  }\n": types.GetNftDocument,
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
export function graphql(source: "\n  query GetAccountNfts($address: String, $collectionIds: [String!]) {\n    current_token_ownerships_v2(\n      where: {\n        owner_address: { _eq: $address }\n        amount: { _gt: \"0\" }\n        current_token_data: { current_collection: { collection_id: { _in: $collectionIds } } }\n      }\n    ) {\n      current_token_data {\n        collection_id\n        largest_property_version_v1\n        current_collection {\n          collection_id\n          collection_name\n          description\n          creator_address\n          uri\n          __typename\n        }\n        description\n        token_name\n        token_data_id\n        token_standard\n        token_uri\n        __typename\n      }\n      owner_address\n      amount\n      __typename\n    }\n  }\n"): (typeof documents)["\n  query GetAccountNfts($address: String, $collectionIds: [String!]) {\n    current_token_ownerships_v2(\n      where: {\n        owner_address: { _eq: $address }\n        amount: { _gt: \"0\" }\n        current_token_data: { current_collection: { collection_id: { _in: $collectionIds } } }\n      }\n    ) {\n      current_token_data {\n        collection_id\n        largest_property_version_v1\n        current_collection {\n          collection_id\n          collection_name\n          description\n          creator_address\n          uri\n          __typename\n        }\n        description\n        token_name\n        token_data_id\n        token_standard\n        token_uri\n        __typename\n      }\n      owner_address\n      amount\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCollectionNfts($limit: Int!, $offset: Int!, $filter: current_token_datas_v2_bool_exp) {\n    current_token_datas_v2(where: $filter, limit: $limit, offset: $offset, order_by: [{ token_name: asc }]) {\n      description\n      token_name\n      token_data_id\n      token_uri\n      decimals\n    }\n  }\n"): (typeof documents)["\n  query GetCollectionNfts($limit: Int!, $offset: Int!, $filter: current_token_datas_v2_bool_exp) {\n    current_token_datas_v2(where: $filter, limit: $limit, offset: $offset, order_by: [{ token_name: asc }]) {\n      description\n      token_name\n      token_data_id\n      token_uri\n      decimals\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTokenData($collection_id: String) {\n    current_collections_v2(where: { collection_id: { _eq: $collection_id } }, limit: 1) {\n      creator_address\n      collection_id\n      collection_name\n      current_supply\n      max_supply\n      uri\n      description\n    }\n    current_collection_ownership_v2_view(\n      where: { collection_id: { _eq: $collection_id } }\n      order_by: { last_transaction_version: desc }\n    ) {\n      owner_address\n    }\n    current_collection_ownership_v2_view_aggregate(where: { collection_id: { _eq: $collection_id } }) {\n      aggregate {\n        count(distinct: true, columns: owner_address)\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTokenData($collection_id: String) {\n    current_collections_v2(where: { collection_id: { _eq: $collection_id } }, limit: 1) {\n      creator_address\n      collection_id\n      collection_name\n      current_supply\n      max_supply\n      uri\n      description\n    }\n    current_collection_ownership_v2_view(\n      where: { collection_id: { _eq: $collection_id } }\n      order_by: { last_transaction_version: desc }\n    ) {\n      owner_address\n    }\n    current_collection_ownership_v2_view_aggregate(where: { collection_id: { _eq: $collection_id } }) {\n      aggregate {\n        count(distinct: true, columns: owner_address)\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetNft($id: String, $collectionId: String!) {\n    current_token_ownerships_v2(\n      where: {\n        amount: { _gt: \"0\" }\n        current_token_data: { collection_id: { _eq: $collectionId }, token_name: { _eq: $id } }\n      }\n    ) {\n      current_token_data {\n        collection_id\n        largest_property_version_v1\n        current_collection {\n          collection_id\n          collection_name\n          description\n          uri\n        }\n        description\n        token_name\n        token_data_id\n        token_uri\n        token_properties\n      }\n      owner_address\n      amount\n    }\n  }\n"): (typeof documents)["\n  query GetNft($id: String, $collectionId: String!) {\n    current_token_ownerships_v2(\n      where: {\n        amount: { _gt: \"0\" }\n        current_token_data: { collection_id: { _eq: $collectionId }, token_name: { _eq: $id } }\n      }\n    ) {\n      current_token_data {\n        collection_id\n        largest_property_version_v1\n        current_collection {\n          collection_id\n          collection_name\n          description\n          uri\n        }\n        description\n        token_name\n        token_data_id\n        token_uri\n        token_properties\n      }\n      owner_address\n      amount\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;