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
import nacl from "https://cdn.skypack.dev/tweetnacl@v1.0.3?dts";
import {
  Account,
  Aptos,
  AptosConfig,
  Ed25519PrivateKey,
  Network,
} from "npm:@aptos-labs/ts-sdk@^1.18.1";

const guildToCollection = new Map([
  [
    "1248584514494529657",
    "0x2f52fd6a933b6a23fab521ab4e53f2f62c1ca893a72106e2b737b25e25b8d4cc",
  ],
]);

interface PostData {
  type: number;
  data: {
    options: { name: string; value: string }[];
  };
  guild_id: string;
  member: {
    user: {
      id: string;
    };
  };
}

enum DiscordCommandType {
  Ping = 1,
  ApplicationCommand = 2,
}

// For all requests to "/" endpoint, we want to invoke home() handler.
serve({
  "/discord-nft-allowlist": home,
});

// The main logic of the Discord Slash Command is defined in this function.
async function home(request: Request) {
  const aptosConfig = new AptosConfig({
    network: Network.TESTNET,
  });
  const aptos = new Aptos(aptosConfig);
  const privateKey = new Ed25519PrivateKey(Deno.env.get("APTOS_PK")!);
  const admin = Account.fromPrivateKey({
    privateKey,
  });

  console.log(admin.accountAddress.toString());

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
  // Discord performs Ping interactions to test our application.
  // Type 1 in a request implies a Ping interaction.
  if (type === DiscordCommandType.Ping) {
    return json({
      type: 1, // Type 1 in a response is a Pong interaction response type.
    });
  }

  if (!guildToCollection.has(post.guild_id)) {
    return json({
      type: 4,
      data: {
        content: "This server is not allowed to interact with this bot.",
      },
    });
  }

  // Type 2 in a request is an ApplicationCommand interaction.
  // It implies that a user has issued a command.
  if (type === DiscordCommandType.ApplicationCommand) {
    const value = data.options.find(
      (option) => option.name === "name",
    )?.value;

    try {
      const addr = Deno.env.get("ACCOUNT_ADDRESS")!;
      const transaction = await aptos.transaction.build.simple({
        sender: admin.accountAddress,
        data: {
          function: `${addr}::banana::transfer`,
          functionArguments: [addr, value, 1_000_000_000],
        },
      });

      const res = await aptos.signAndSubmitTransaction({
        signer: admin,
        transaction,
      });
      console.log(res);
    } catch (ex) {
      return json({
        // Type 4 responds with the below message retaining the user's
        // input at the top.
        type: 4,
        data: {
          content: ex.message,
        },
      });
    }

    return json({
      // Type 4 responds with the below message retaining the user's
      // input at the top.
      type: 4,
      data: {
        content: `Hello, ${value}!`,
      },
    });
  }

  // We will return a bad request error as a valid Discord request
  // shouldn't reach here.
  return json({ error: "bad request" }, { status: 400 });
}

/** Verify whether the request is coming from Discord. */
async function verifySignature(
  request: Request,
): Promise<{ valid: boolean; body: string }> {
  const PUBLIC_KEY = Deno.env.get("DISCORD_PUBLIC_KEY")!;
  // Discord sends these headers with every request.
  const signature = request.headers.get("X-Signature-Ed25519")!;
  const timestamp = request.headers.get("X-Signature-Timestamp")!;
  const body = await request.text();
  const valid = nacl.sign.detached.verify(
    new TextEncoder().encode(timestamp + body),
    hexToUint8Array(signature),
    hexToUint8Array(PUBLIC_KEY),
  );

  return { valid, body };
}

/** Converts a hexadecimal string to Uint8Array. */
function hexToUint8Array(hex: string) {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((val) => parseInt(val, 16)));
}