// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />
import { post } from "https://deno.land/x/dishooks@v1.1.0/mod.ts";

const DISCORD_WEBHOOK_URL = Deno.env.get("DISCORD_WEBHOOK_URL")!;
const ALPHA_GROUP = "<@&1232381385151479978>";

interface Partner {
  id: number;
  created_at: string;
  name: string;
  socials: string;
  contact_discord: string;
  description: string;
  benefits_gorillaz: string;
  benefits_partner: string;
  comments: string;
}

Deno.serve(async (req) => {
  const data: Partner = (await req.json()).record;

  const message = `Hey ${ALPHA_GROUP}! New partner request.
Project:
${data.name}

Social contact:
${data.socials}

Discord:
${data.contact_discord}

Description:
${data.description}

Benefits gorillaz:
${data.benefits_gorillaz}

Benefits partner:
${data.benefits_partner}

Comments:
${data.comments}
`;

  await post(
    DISCORD_WEBHOOK_URL,
    {
      content: message,
    },
  );

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  );
});
