insert into
public.banana_farmer (image)
SELECT 'farmer-' || (random() * 27 + 1)::int || '.png' AS image
FROM generate_series(1, 5000);