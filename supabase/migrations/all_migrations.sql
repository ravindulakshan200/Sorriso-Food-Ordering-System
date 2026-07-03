-- Schema Creation

CREATE TABLE IF NOT EXISTS menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    items_json JSONB NOT NULL,
    subtotal NUMERIC NOT NULL,
    delivery_fee NUMERIC DEFAULT 0,
    total NUMERIC NOT NULL,
    payment_status TEXT DEFAULT 'pending',
    order_type TEXT DEFAULT 'delivery',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    date DATE NOT NULL,
    time TIME NOT NULL,
    guests INTEGER NOT NULL,
    special_requests TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Seed Data for menu_items

INSERT INTO menu_items (id, name, description, price, category, image_url, is_available, is_featured) VALUES
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f1', 'Wagyu Beef Tartare', 'Hand-cut A5 Wagyu, quail egg yolk, truffle aioli, crispy shallots, sourdough chips.', 3800, 'Starters', 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop', TRUE, FALSE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f2', 'Lobster Bisque', 'Classic French style bisque, butter-poached Maine lobster claw, chervil oil.', 2800, 'Starters', 'https://images.unsplash.com/photo-1548943487-a2e4143fa9ce?q=80&w=600&auto=format&fit=crop', TRUE, TRUE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f3', 'Sri Lankan Crab Cakes', 'Negombo lagoon crab, spiced mango chutney, coconut foam, micro coriander.', 3200, 'Starters', 'https://images.unsplash.com/photo-1559841644-08984562005a?q=80&w=600&auto=format&fit=crop', TRUE, FALSE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f4', 'Burrata & Heirloom Tomato', 'Imported Italian creamy burrata, basil pesto, balsamic reduction, pine nuts.', 4500, 'Starters', 'https://images.unsplash.com/photo-1608897013039-b2bf59af1cb0?q=80&w=600&auto=format&fit=crop', TRUE, FALSE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f5', 'Truffle Lobster Risotto', 'Creamy arborio rice, fresh Maine lobster, shaved black truffle, aged parmesan.', 6500, 'Mains', 'https://images.unsplash.com/photo-1626203004838-8e658e38ee05?q=80&w=600&auto=format&fit=crop', TRUE, TRUE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f6', 'Wagyu Beef Wellington', 'Premium A5 Wagyu wrapped in mushroom duxelles and crisp puff pastry.', 12500, 'Mains', 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=600&auto=format&fit=crop', TRUE, TRUE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f7', 'Black Cod Miso', 'Den miso glazed Chilean sea bass, pickled ginger sprout, yuzu beurre blanc.', 8500, 'Mains', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop', TRUE, FALSE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f8', 'Ceylon Spiced Duck Breast', 'Pan-seared duck, sweet potato purÃ©e, roasted baby carrots, dark cherry jus.', 7200, 'Mains', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop', TRUE, FALSE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f9', 'Gold Leaf Chocolate Tart', 'Valrhona dark chocolate ganache, hazelnut praline, 24k edible gold.', 2500, 'Desserts', 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=600&auto=format&fit=crop', TRUE, TRUE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1fa', 'Deconstructed Pavlova', 'Crispy meringue, passionfruit curd, fresh seasonal berries, vanilla chantilly.', 1800, 'Desserts', 'https://images.unsplash.com/photo-1549488344-c18ec517e0b5?q=80&w=600&auto=format&fit=crop', TRUE, FALSE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1fb', 'Watalappan Mille-Feuille', 'Sri Lankan palm treacle custard layered between crisp puff pastry, cashew brittle.', 2000, 'Desserts', 'https://images.unsplash.com/photo-1563805041-76846175b9f7?q=80&w=600&auto=format&fit=crop', TRUE, FALSE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1fc', 'Matcha Tiramisu', 'Ceremonial grade matcha ladyfingers, mascarpone cream, white chocolate dust.', 2200, 'Desserts', 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=600&auto=format&fit=crop', TRUE, FALSE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1fd', 'Sorriso Food Signature Cocktail', 'Arrack, pressed pineapple, cardamom syrup, lime, smoked cinnamon fog.', 2500, 'Drinks', 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop', TRUE, TRUE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1fe', 'Vintage Dom Perignon', 'Glass of 2012 Vintage Champagne. Complex, brilliant, and floral.', 18000, 'Drinks', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600&auto=format&fit=crop', TRUE, FALSE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1ff', 'Artisan Kombucha', 'House-fermented hibiscus and ginger craft kombucha.', 1200, 'Drinks', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop', TRUE, FALSE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f0', 'Single Origin Ceylon Tea', 'Hand-plucked Nuwara Eliya silver tips, brewed table-side.', 900, 'Drinks', 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop', TRUE, FALSE)
ON CONFLICT DO NOTHING;
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
-- ============================================================
-- Migration: Remove fake demo data, keep only Sorriso menu
-- Run this AFTER 20240102_add_sizes_and_new_items.sql
-- ============================================================

-- Delete the old fine-dining demo seed items
DELETE FROM menu_items
WHERE id IN (
  'b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f1',  -- Wagyu Beef Tartare
  'b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f2',  -- Lobster Bisque
  'b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f3',  -- Sri Lankan Crab Cakes
  'b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f4',  -- Burrata & Heirloom Tomato
  'b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f5',  -- Truffle Lobster Risotto
  'b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f6',  -- Wagyu Beef Wellington
  'b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f7',  -- Black Cod Miso
  'b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f8',  -- Ceylon Spiced Duck Breast
  'b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f9',  -- Gold Leaf Chocolate Tart
  'b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1fa',  -- Deconstructed Pavlova
  'b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1fb',  -- Watalappan Mille-Feuille
  'b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1fc',  -- Matcha Tiramisu
  'b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1fd',  -- Sorriso Food Signature Cocktail
  'b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1fe',  -- Vintage Dom Perignon
  'b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1ff',  -- Artisan Kombucha
  'b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f0'   -- Single Origin Ceylon Tea
);

-- Also remove any items not in the two real categories
DELETE FROM menu_items
WHERE category NOT IN ('Rice (Basmathi)', 'Bite');

-- Verify what remains
SELECT id, name, category, price_medium, price_large
FROM menu_items
ORDER BY category, name;
-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Order fulfillment tracking (separate from payment_status)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_status TEXT DEFAULT 'pending';

-- Mark contact messages as read
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;

-- Public menu image storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-images', 'menu-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies (authenticated admin uploads, public reads)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Public read menu images'
  ) THEN
    CREATE POLICY "Public read menu images"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'menu-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated upload menu images'
  ) THEN
    CREATE POLICY "Authenticated upload menu images"
      ON storage.objects FOR INSERT
      WITH CHECK (bucket_id = 'menu-images' AND auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated delete menu images'
  ) THEN
    CREATE POLICY "Authenticated delete menu images"
      ON storage.objects FOR DELETE
      USING (bucket_id = 'menu-images' AND auth.role() = 'authenticated');
  END IF;
END $$;
