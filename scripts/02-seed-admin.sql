-- Insert test admin account
-- Email: admin@pastillamaison.com
-- Password: Admin123! (hashed with bcrypt)
INSERT INTO admin_users (email, password_hash, name)
VALUES (
  'admin@pastillamaison.com',
  '$2b$10$YourHashedPasswordHere',
  'Admin User'
) ON CONFLICT (email) DO NOTHING;

-- Seed menu items
INSERT INTO menu_items (name, description, price, category, image_url)
VALUES
  (
    'Pastilla au Poulet',
    'Crispy pastry filled with tender chicken, almonds, and warm spices. A classic Moroccan favorite.',
    12.00,
    'Pastillas',
    '/moroccan-chicken-pastilla-crispy-golden.jpg'
  ),
  (
    'Pastilla aux Fruits de Mer',
    'Delicate seafood pastilla with shrimp, fish, and aromatic herbs. A taste of the Mediterranean.',
    15.00,
    'Pastillas',
    '/seafood-pastilla-shrimp-fish-moroccan.jpg'
  ),
  (
    'Mini Pastillas',
    'Perfect for events and celebrations. Bite-sized pastillas with your choice of filling.',
    8.00,
    'Pastillas',
    '/mini-pastillas-bite-sized-moroccan-appetizers.jpg'
  ),
  (
    'Vegetarian Pastilla',
    'A delightful blend of vegetables, herbs, and cheese wrapped in crispy phyllo dough.',
    10.00,
    'Pastillas',
    '/vegetarian-pastilla-vegetables-herbs-moroccan.jpg'
  )
ON CONFLICT DO NOTHING;
