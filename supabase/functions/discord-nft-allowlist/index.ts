// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Sift is a small routing library that abstracts away details like starting a
// listener on a port, and provides a simple function (serve) that has an API
// to invoke a function for a specific path.
import {
  json,
  serve,
  validateRequest,
} from "https://deno.land/x/sift@0.6.0/mod.ts";
// TweetNaCl is a cryptography library that we use to verify requests
// from Discord.

import { createClient } from "jsr:@supabase/supabase-js@2";
import { DiscordCommandType, verifySignature } from "./discord-functions.ts";

const supabaseClient = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

const guildToCollection = new Map([
  [
    "1248584514494529657",
    "0xba47e8a4111d53d81773e920b55c4152976a47ea4b002777cd81e8eb6ed9e4e2",
  ],
]);

interface PostData {
  application_id: string;
  token: string;
  type: number;
  data: {
    options: { name: string; value: string }[];
  };
  guild_id: string;
  member: {
    user: {
      id: string;
      username: string;
    };
  };
}

serve({
  "/discord-nft-allowlist": home,
});

async function home(request: Request) {
  // validateRequest() ensures that a request is of POST method and
  // has the following headers.
  const { error } = await validateRequest(request, {
    POST: {
      headers: ["X-Signature-Ed25519", "X-Signature-Timestamp"],
    },
  });
  if (error) {
    return json({ error: error.message }, { status: error.status });
  }

  // verifySignature() verifies if the request is coming from Discord.
  // When the request's signature is not valid, we return a 401 and this is
  // important as Discord sends invalid requests to test our verification.
  const { valid, body } = await verifySignature(request);
  if (!valid) {
    return json(
      { error: "Invalid request" },
      {
        status: 401,
      },
    );
  }

  const post: PostData = JSON.parse(body);
  const { type = 0, data = { options: [] } } = post;
  if (type === DiscordCommandType.Ping) {
    return json({
      type: 1, // Type 1 in a response is a Pong interaction response type.
    });
  }

  // Type 2 in a request is an ApplicationCommand interaction.
  // It implies that a user has issued a command.
  if (type === DiscordCommandType.ApplicationCommand) {
    const collectionId = guildToCollection.get(post.guild_id);
    if (collectionId === undefined) {
      return json({
        type: 4,
        data: {
          content: "This server is not allowed to interact with this bot.",
        },
      });
    }

    const address = data.options.find(
      (option) => option.name === "address",
    )?.value;

    try {
      if (!address) throw new Error("Address not provided");

      await blockMultipleEntries(
        post.guild_id,
        "discord_user_id",
        post.member.user.id,
      );
      await blockMultipleEntries(post.guild_id, "wallet_address", address);

      // Forward request for delayed update of message because response needs to be sent within 3 secs
      fetch(
        request.url.replace("/discord-nft-allowlist", "/nft-allowlist") +
          `?collectionId=${collectionId}&address=${address}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Signature-Ed25519": request.headers.get("X-Signature-Ed25519") ??
              "",
            "X-Signature-Timestamp":
              request.headers.get("X-Signature-Timestamp") ?? "",
          },
          body: body,
        },
      );

      // Respond to the initial interaction
      const initialResponse = json({
        type: 5, // Type 5 is a deferred response
      });

      return initialResponse;
    } catch (ex) {
      console.log(ex);
      return json({
        // Type 4 responds with the below message retaining the user's
        // input at the top.
        type: 4,
        data: {
          content: ex.message,
        },
      });
    }
  }

  // We will return a bad request error as a valid Discord request
  // shouldn't reach here.
  return json({ error: "bad request" }, { status: 400 });
}

async function blockMultipleEntries(
  guild_id: string,
  column: "discord_user_id" | "wallet_address",
  value: string,
) {
  const { data, error } = await supabaseClient.from("banana_farm_allowlist")
    .select("*").eq("guild_id", guild_id).eq(column, value)
    .maybeSingle();
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    throw new Error(
      column === "discord_user_id"
        ? "User already submitted a wallet address"
        : "Wallet address already submitted",
    );
  }
}
