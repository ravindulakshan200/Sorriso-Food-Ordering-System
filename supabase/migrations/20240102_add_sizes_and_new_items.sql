-- ============================================================
-- Migration: Add size-based pricing + new Rice & Bite items
-- ============================================================

-- 1. Extend menu_items with size columns
ALTER TABLE menu_items
  ADD COLUMN IF NOT EXISTS has_sizes BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS price_medium NUMERIC,
  ADD COLUMN IF NOT EXISTS price_large NUMERIC;

-- 2. Seed: Rice (Basmathi) Category
INSERT INTO menu_items (id, name, description, price, price_medium, price_large, has_sizes, category, image_url, is_available, is_featured) VALUES

(gen_random_uuid(),
 'Fried Rice (Egg, Vege.)',
 'Aromatic basmathi fried rice tossed with fresh eggs and garden vegetables, seasoned with house spices.',
 750, 750, 950, TRUE,
 'Rice (Basmathi)',
 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600&auto=format&fit=crop',
 TRUE, FALSE),

(gen_random_uuid(),
 'Crispy Chicken Fried Rice',
 'Basmathi rice stir-fried with golden crispy chicken pieces, scallions and our signature soy blend.',
 1000, 1000, 1500, TRUE,
 'Rice (Basmathi)',
 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600&auto=format&fit=crop',
 TRUE, TRUE),

(gen_random_uuid(),
 'Nasi Gurang',
 'Indonesian-inspired basmathi rice cooked with sambal, kecap manis, prawn and chicken.',
 1100, 1100, 1550, TRUE,
 'Rice (Basmathi)',
 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600&auto=format&fit=crop',
 TRUE, FALSE),

(gen_random_uuid(),
 'Mongolian Rice',
 'Silky basmathi tossed in rich Mongolian sauce with julienned vegetables and tender meat strips.',
 1250, 1250, 1750, TRUE,
 'Rice (Basmathi)',
 'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=600&auto=format&fit=crop',
 TRUE, FALSE),

(gen_random_uuid(),
 'Thai Rice',
 'Thai basil fried rice with fish sauce, oyster sauce, fresh chillies and your choice of protein.',
 1200, 1200, 1700, TRUE,
 'Rice (Basmathi)',
 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?q=80&w=600&auto=format&fit=crop',
 TRUE, FALSE),

(gen_random_uuid(),
 'Chilli Fried Rice',
 'Fiery wok-tossed basmathi with house chilli paste, crispy shallots and a hint of lime.',
 1100, 1100, 1550, TRUE,
 'Rice (Basmathi)',
 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=600&auto=format&fit=crop',
 TRUE, FALSE),

(gen_random_uuid(),
 'Chopsuey Rice',
 'Classic chopsuey-style basmathi with mixed vegetables, meat and a savory gravy drizzle.',
 1050, 1050, 1500, TRUE,
 'Rice (Basmathi)',
 'https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=600&auto=format&fit=crop',
 TRUE, FALSE),

(gen_random_uuid(),
 'Chicken Fried Rice',
 'Classic basmathi fried rice with tender marinated chicken, egg and spring onions.',
 950, 950, 1450, TRUE,
 'Rice (Basmathi)',
 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=600&auto=format&fit=crop',
 TRUE, FALSE),

(gen_random_uuid(),
 'Mix Meat Fried Rice',
 'Premium basmathi stir-fried with chicken, beef and pork, house sauce, wok hei finish.',
 1350, 1350, 1900, TRUE,
 'Rice (Basmathi)',
 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop',
 TRUE, TRUE),

(gen_random_uuid(),
 'Mix Meat Sea Food Fried Rice',
 'Indulgent basmathi loaded with prawn, squid, fish fillet and mixed meats in XO-style sauce.',
 1500, 1500, 2100, TRUE,
 'Rice (Basmathi)',
 'https://images.unsplash.com/photo-1562802378-063ec186a863?q=80&w=600&auto=format&fit=crop',
 TRUE, TRUE),

-- 3. Seed: Bite Category

(gen_random_uuid(),
 'Chili Pork',
 'Wok-seared tender pork slices tossed in a bold house chilli sauce with capsicum and onion.',
 1250, 1250, 1850, TRUE,
 'Bite',
 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop',
 TRUE, TRUE),

(gen_random_uuid(),
 'Hot Butter Cuttle Fish',
 'Flash-fried cuttle fish rings glazed in a rich buttery chilli sauce â€” crispy and addictive.',
 1350, 1350, 2000, TRUE,
 'Bite',
 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?q=80&w=600&auto=format&fit=crop',
 TRUE, TRUE),

(gen_random_uuid(),
 'Hadello',
 'Sri Lankan-style sautÃ©ed bite with aromatic spices, curry leaves and a caramelised onion base.',
 1000, 1000, 1400, TRUE,
 'Bite',
 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop',
 TRUE, FALSE),

(gen_random_uuid(),
 'Chilli Chicken',
 'Juicy fried chicken tossed in our signature chilli-ginger glaze with spring onions.',
 1000, 1000, 1500, TRUE,
 'Bite',
 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=600&auto=format&fit=crop',
 TRUE, FALSE),

(gen_random_uuid(),
 'Pork Deviled',
 'Slow-cooked pork tossed in a tangy-spicy deviled sauce with tomato, capsicum and green chilli.',
 1200, 1200, 1700, TRUE,
 'Bite',
 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
 TRUE, FALSE),

(gen_random_uuid(),
 'Chicken Deviled',
 'Tender chicken pieces in a classic deviled sauce â€” sweet, sour and perfectly spiced.',
 1100, 1100, 1600, TRUE,
 'Bite',
 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=600&auto=format&fit=crop',
 TRUE, FALSE)

ON CONFLICT (id) DO NOTHING;
