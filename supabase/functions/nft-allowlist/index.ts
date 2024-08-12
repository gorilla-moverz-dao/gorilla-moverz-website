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
import { verifySignature } from "./discord-functions.ts";
import { addAllowlistAddresses } from "./aptos-functions.ts";

const DISCORD_API_BASE_URL = "https://discord.com/api/v10";

const supabaseClient = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

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
  "/nft-allowlist": home,
});

async function home(request: Request) {
  console.log(request);
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

  try {
    const u = new URL(request.url);
    const collectionId = u.searchParams.get("collectionId") ?? "";
    const address = u.searchParams.get("address") ?? "";

    const transactionResult = await addAllowlistAddresses(
      address,
      collectionId,
    );

    let content = "";
    if (transactionResult.success) {
      await supabaseClient.from("banana_farm_allowlist").insert({
        discord_user_id: post.member.user.id,
        discord_user_name: post.member.user.id,
        wallet_address: address,
        guild_id: post.guild_id,
      });

      content = "Added to allowlist";
    } else {
      content = "Failed";
    }

    const followUpResponse = await fetch(
      `${DISCORD_API_BASE_URL}/webhooks/${post.application_id}/${post.token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
      },
    );

    if (!followUpResponse.ok) {
      console.error(
        "Failed to send follow-up message:",
        await followUpResponse.text(),
      );
    }

    // Send a follow-up message
  } catch (ex) {
    console.error(ex);
  }

  return json({
    content: "OK",
  });
}