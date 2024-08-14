alter table "public"."banana_farm_allowlist" drop constraint "banana_farm_allowlist_discord_user_id_key";

alter table "public"."banana_farm_allowlist" drop constraint "banana_farm_allowlist_wallet_address_key";

drop index if exists "public"."banana_farm_allowlist_discord_user_id_key";

drop index if exists "public"."banana_farm_allowlist_wallet_address_key";

alter table "public"."banana_farm_allowlist" add column "guild_id" text not null;

alter table "public"."banana_farm_allowlist" alter column "discord_user_id" set not null;

alter table "public"."banana_farm_allowlist" alter column "discord_user_name" set not null;

alter table "public"."banana_farm_allowlist" alter column "wallet_address" set not null;
