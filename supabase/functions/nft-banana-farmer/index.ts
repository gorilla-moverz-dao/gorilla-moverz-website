// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import { createClient } from "jsr:@supabase/supabase-js@2";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BananaFarmer {
  id: number;
  nft_number: number;
  created_at: string;
  image: string;
}

interface BananaFarmerNFT {
  image: string;
  name: string;
  description: string;
  external_url: string;
  attributes: unknown[];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const path = req.url.split("/");
  const nft_number = path.pop() ?? "";
  const slug = path.pop() ?? "";

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  // Database queries will have RLS policies enforced
  const { data, error } = await supabaseClient.from("banana_farm_nfts").select(
    "*, banana_farm_collections!inner(slug)",
  )
    .eq("nft_number", nft_number)
    .eq("banana_farm_collections.slug", slug)
    .maybeSingle();

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }

  if (data === null) {
    return new Response("Not found", { status: 404 });
  }

  const farmer: BananaFarmer = data;
  const nft: BananaFarmerNFT = {
    name: "Farmer #" + farmer.id,
    description: "Farmer #" + farmer.id,
    image: "https://gorilla-moverz.xyz/nfts/" + slug + "/images/" +
      farmer.image,
    attributes: [],
    external_url: "https://gorilla-moverz.xyz/bananas/collections/" + slug +
      "/" + farmer.id,
  };

  return new Response(
    JSON.stringify(nft),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
