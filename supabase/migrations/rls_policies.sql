-- Enable RLS on all tables (in case it's not already enabled)
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 1. Policies for menu_items
-- Anyone can view the menu
CREATE POLICY "Public can view menu items" ON menu_items FOR SELECT USING (true);
-- Only authenticated users (admins) can insert/update/delete menu items
CREATE POLICY "Admins can manage menu items" ON menu_items FOR ALL USING (auth.role() = 'authenticated');

-- 2. Policies for orders
-- Customers can place an order
CREATE POLICY "Public can insert orders" ON orders FOR INSERT WITH CHECK (true);
-- Customers can view their own order (or we allow public read for order tracking)
CREATE POLICY "Public can view orders" ON orders FOR SELECT USING (true);
-- Only admins can update/delete orders
CREATE POLICY "Admins can manage orders" ON orders FOR ALL USING (auth.role() = 'authenticated');

-- 3. Policies for bookings
-- Customers can submit a booking
CREATE POLICY "Public can insert bookings" ON bookings FOR INSERT WITH CHECK (true);
-- Only admins can view and manage bookings
CREATE POLICY "Admins can manage bookings" ON bookings FOR ALL USING (auth.role() = 'authenticated');

-- 4. Policies for contact_messages
-- Customers can submit a contact message
CREATE POLICY "Public can insert contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
-- Only admins can view and manage messages
CREATE POLICY "Admins can manage contact messages" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');

-- If you are uploading images, ensure the storage bucket exists and is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('menu-images', 'menu-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for menu-images bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'menu-images');
CREATE POLICY "Auth Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'menu-images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE USING (bucket_id = 'menu-images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE USING (bucket_id = 'menu-images' AND auth.role() = 'authenticated');
