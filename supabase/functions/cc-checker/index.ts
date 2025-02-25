import { supabaseClient } from "../_shared/supabase-client.ts";
import { corsHeaders } from "../_shared/webserver-functions.ts";
import { ConnInfo, PathParams, json, serve } from "https://deno.land/x/sift@0.6.0/mod.ts";

interface CCAllowlistMetadata {
  spots: number | null;
  wallet: string | null;
}

serve({
  "/cc-checker/:address": ccChecker,
});

async function ccChecker(req: Request, _connInfo: ConnInfo, params: PathParams) {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const address = params?.address ?? "";

  const { data, error } = await supabaseClient
    .from("community_collection_allowlist")
    .select("*")
    .eq("wallet", address)
    .maybeSingle();

  if (error) {
    console.error(error);
    return json(
      { error: error.message },
      {
        headers: corsHeaders,
        status: 500,
      },
    );
  }

  if (data === null) {
    return json({ wallet: address, spots: null }, { headers: corsHeaders });
  }

  const cc: CCAllowlistMetadata = {
    spots: data.spots,
    wallet: data.wallet,
  };

  return json(cc, {
    headers: corsHeaders,
  });
}
