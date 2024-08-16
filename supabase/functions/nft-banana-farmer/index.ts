import { supabaseClient } from "../_shared/supabase-client.ts";
import { corsHeaders } from "../_shared/webserver-functions.ts";
import { ConnInfo, PathParams, json, serve } from "https://deno.land/x/sift@0.6.0/mod.ts";

interface BananaFarmerNFTMetadata {
  image: string;
  name: string;
  description: string;
  external_url: string;
  attributes: unknown[];
}

serve({
  "/nft-banana-farmer/:slug/:nft_number": nft,
});

async function nft(req: Request, _connInfo: ConnInfo, params: PathParams) {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const nft_number = params?.nft_number ?? "";
  const slug = params?.slug ?? "";

  const { data, error } = await supabaseClient
    .from("banana_farm_nfts")
    .select("*, banana_farm_collections!inner(slug)")
    .eq("nft_number", nft_number)
    .eq("banana_farm_collections.slug", slug)
    .maybeSingle();

  if (error) {
    return json(
      { error: error.message },
      {
        headers: corsHeaders,
        status: 500,
      },
    );
  }

  if (data === null) {
    return new Response("Not found", { status: 404 });
  }

  const nft: BananaFarmerNFTMetadata = {
    name: "Farmer #" + data.id,
    description: "Farmer #" + data.id,
    image: `https://gorilla-moverz.xyz/nfts/${slug}/images/${data.image}`,
    attributes: [],
    external_url: `https://gorilla-moverz.xyz/bananas/collections/${slug}/${data.id}`,
  };

  return json(nft, {
    headers: corsHeaders,
  });
}
