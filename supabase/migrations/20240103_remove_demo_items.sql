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
