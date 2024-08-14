drop trigger if exists "discord-webhook" on "public"."partner";

alter table "public"."banana_farmer" enable row level security;

alter table "public"."partner" enable row level security;

create policy "Submit form"
on "public"."partner"
as permissive
for insert
to public
with check (true);


CREATE TRIGGER "Discord urslee" AFTER INSERT ON public.partner FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://pinphweythafvrejqfgm.supabase.co/functions/v1/discord-webhook', 'POST', '{"Content-type":"application/json","Authorization":"Bearer ***"}', '{}', '5000');


