create table
  public.banana_farmer (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    image text null,
    constraint banana_farmer_pkey primary key (id)
  ) tablespace pg_default;