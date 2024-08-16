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
    .select("*, banana_farm_collections!inner(id, slug, name)")
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

  console.log(data);

  const nft: BananaFarmerNFTMetadata = {
    name: `${data.banana_farm_collections.name} | #${data.nft_number}`,
    description: `${data.banana_farm_collections.name} | #${data.nft_number}`,
    image: `https://gorilla-moverz.xyz/nfts/${slug}/images/${data.image}`,
    attributes: [],
    external_url: `https://gorilla-moverz.xyz/bananas`,
  };

  return json(nft, {
    headers: corsHeaders,
  });
}
