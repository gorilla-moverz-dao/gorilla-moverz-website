alter table "public"."banana_farm_collections" enable row level security;

create policy "Collections read access"
on "public"."banana_farm_collections"
as permissive
for select
to public
using (true);
