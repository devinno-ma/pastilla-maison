-- Insert sample dishes
INSERT INTO public.dishes (name, description, price, image_url, ingredients, servings) VALUES
('Chicken Pastilla', 'Crispy phyllo pastry filled with tender chicken, almonds, and aromatic spices', 18.99, '/moroccan-chicken-pastilla-crispy-golden.jpg', ARRAY['Chicken', 'Phyllo pastry', 'Almonds', 'Cinnamon', 'Ginger', 'Saffron'], 2),
('Seafood Pastilla', 'Delicate pastilla with shrimp, fish, and fresh herbs', 22.99, '/seafood-pastilla-shrimp-fish-moroccan.jpg', ARRAY['Shrimp', 'Fish', 'Phyllo pastry', 'Herbs', 'Lemon', 'Saffron'], 2),
('Mini Pastillas', 'Bite-sized pastillas perfect for appetizers or sharing', 12.99, '/mini-pastillas-bite-sized-moroccan-appetizers.jpg', ARRAY['Chicken', 'Phyllo pastry', 'Almonds', 'Spices'], 4),
('Vegetarian Pastilla', 'Wholesome pastilla with seasonal vegetables and herbs', 16.99, '/vegetarian-pastilla-vegetables-herbs-moroccan.jpg', ARRAY['Vegetables', 'Phyllo pastry', 'Herbs', 'Spices', 'Olive oil'], 2)
ON CONFLICT DO NOTHING;
