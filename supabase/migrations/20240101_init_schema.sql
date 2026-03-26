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
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f8', 'Ceylon Spiced Duck Breast', 'Pan-seared duck, sweet potato purée, roasted baby carrots, dark cherry jus.', 7200, 'Mains', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop', TRUE, FALSE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f9', 'Gold Leaf Chocolate Tart', 'Valrhona dark chocolate ganache, hazelnut praline, 24k edible gold.', 2500, 'Desserts', 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=600&auto=format&fit=crop', TRUE, TRUE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1fa', 'Deconstructed Pavlova', 'Crispy meringue, passionfruit curd, fresh seasonal berries, vanilla chantilly.', 1800, 'Desserts', 'https://images.unsplash.com/photo-1549488344-c18ec517e0b5?q=80&w=600&auto=format&fit=crop', TRUE, FALSE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1fb', 'Watalappan Mille-Feuille', 'Sri Lankan palm treacle custard layered between crisp puff pastry, cashew brittle.', 2000, 'Desserts', 'https://images.unsplash.com/photo-1563805041-76846175b9f7?q=80&w=600&auto=format&fit=crop', TRUE, FALSE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1fc', 'Matcha Tiramisu', 'Ceremonial grade matcha ladyfingers, mascarpone cream, white chocolate dust.', 2200, 'Desserts', 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=600&auto=format&fit=crop', TRUE, FALSE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1fd', 'Sorriso Food Signature Cocktail', 'Arrack, pressed pineapple, cardamom syrup, lime, smoked cinnamon fog.', 2500, 'Drinks', 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop', TRUE, TRUE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1fe', 'Vintage Dom Perignon', 'Glass of 2012 Vintage Champagne. Complex, brilliant, and floral.', 18000, 'Drinks', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600&auto=format&fit=crop', TRUE, FALSE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1ff', 'Artisan Kombucha', 'House-fermented hibiscus and ginger craft kombucha.', 1200, 'Drinks', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop', TRUE, FALSE),
('b19d5c41-86f3-4e4c-9f68-7c8d9e6eb1f0', 'Single Origin Ceylon Tea', 'Hand-plucked Nuwara Eliya silver tips, brewed table-side.', 900, 'Drinks', 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop', TRUE, FALSE)
ON CONFLICT DO NOTHING;
