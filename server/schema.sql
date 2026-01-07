CREATE DATABASE Mini_Store;
USE Mini_Store;

-- 2. CREATE TABLES

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500), -- Increased length to be safe
    stock INT DEFAULT 0,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items Table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 3. INSERT PRODUCTS (All Images Tested & Working)

INSERT INTO products (name, description, price, image_url, stock, category) VALUES 
-- 🎧 Electronics

('Wireless Headphones', 'Premium noise-cancelling over-ear headphones in black.', 99.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 50, 'Electronics'),
('Smart Watch', 'Fitness tracker with heart rate monitor and GPS.', 129.50, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', 30, 'Electronics'),
('Gaming Mouse', 'High precision wireless gaming mouse with ergonomic design.', 45.50, 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80', 80, 'Electronics'),
('4K Action Camera', 'Waterproof action camera with image stabilization.', 299.00, 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80', 20, 'Electronics'),
('Bluetooth Speaker', 'Portable waterproof speaker with deep bass.', 65.00, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80', 75, 'Electronics'),

-- 👟 Footwear & Fashion
('Running Shoes', 'Lightweight red sneakers for daily running.', 59.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', 100, 'Footwear'),
('Leather Backpack', 'Genuine brown leather backpack, perfect for travel.', 149.99, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', 30, 'Fashion'),
('Classic Sunglasses', 'UV protection aviator sunglasses with gold frames.', 120.00, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80', 60, 'Fashion'),
('Denim Jacket', 'Vintage style blue denim jacket for casual wear.', 79.99, 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80', 40, 'Fashion'),
('Graphic Hoodie', 'Oversized grey cotton hoodie with minimal design.', 55.00, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80', 60, 'Fashion'),
('High-Top Sneakers', 'Retro style basketball sneakers in red and white.', 135.00, 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80', 12, 'Footwear'),

-- 🏠 Home & Lifestyle
('Ceramic Coffee Mug', 'Handcrafted ceramic mug, dishwasher safe.', 18.50, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80', 100, 'Home'),
('Succulent Pot Set', 'Set of 3 mini succulent plants in white pots.', 24.99, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80', 25, 'Home'),

-- 🧘 Fitness
('Yoga Mat', 'Non-slip pink exercise mat with carrying strap.', 25.99, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80', 100, 'Fitness'),
('Adjustable Dumbbells', 'Set of 2 dumbbells with adjustable weight settings.', 89.50, 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=800&q=80', 20, 'Fitness'),

-- 🍳 Kitchen
('Chef Knife Set', '5-piece stainless steel knife set with wooden block.', 75.00, 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80', 40, 'Kitchen'),

-- 💄 Beauty & Skincare
('Vitamin C Face Serum', 'Brightening serum with hyaluronic acid for daily use.', 28.50, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80', 60, 'Beauty'),

-- 🐶 Pets
('Orthopedic Dog Bed', 'Memory foam bed for medium to large dogs.', 55.00, 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=800&q=80', 15, 'Pets'),
('Interactive Cat Toy', 'Automatic laser toy to keep cats entertained.', 22.99, 'https://images.unsplash.com/photo-1615266895738-11f1371cd7e5?w=800&q=80', 50, 'Pets'),
('Leather Dog Leash', 'Durable 6ft leather leash with brass hardware.', 29.99, 'https://images.unsplash.com/photo-1551730459-92db2a308d6a?w=800&q=80', 35, 'Pets'),

-- 📚 Books & Stationery
('Leather Notebook', 'Handbound leather journal with premium paper.', 34.00, 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80', 70, 'Books'),
('Sci-Fi Best Seller', 'The latest space opera novel everyone is talking about.', 14.99, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80', 120, 'Books'),
('Minimalist Pen Set', 'Set of 3 fine-point gel pens in black ink.', 9.50, 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800&q=80', 200, 'Books'),

-- 🧸 Toys & Hobbies
('Watercolor Paint Set', 'Professional grade 24-color watercolor pan set.', 32.00, 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80', 40, 'Toys'),

-- 🌿 Gardening & Plants
('Ceramic Plant Pot', 'Minimalist white ceramic pot with wooden stand.', 22.50, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80', 40, 'Gardening'),

-- ⛺ Outdoor & Camping
('2-Person Camping Tent', 'Waterproof lightweight tent for hiking trips.', 149.00, 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80', 15, 'Outdoor'),

-- 💍 Jewelry
('Silver Pendant Necklace', 'Sterling silver chain with a simple circle pendant.', 45.00, 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80', 40, 'Jewelry'),
('Beaded Bracelet Set', 'Handmade gemstone beaded bracelets (Set of 3).', 24.50, 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80', 70, 'Jewelry'),

-- 👶 Baby Essentials
('Smart Baby Monitor', 'WiFi enabled video monitor with night vision.', 129.99, 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80', 20, 'Baby'),

-- 🎨 Art & Craft
('Artist Canvas Set', 'Pack of 3 stretched white canvases (16x20).', 29.99, 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80', 50, 'Art'),
('Acrylic Paint Set', '24 vibrant colors for professional painting.', 19.50, 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=800&q=80', 75, 'Art'),

-- 🎵 Music Instruments
('Soprano Ukulele', 'Mahogany wood ukulele with carrying bag.', 55.00, 'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?w=800&q=80', 30, 'Music'),
('Guitar Stand', 'Foldable metal stand for acoustic and electric guitars.', 15.99, 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&q=80', 60, 'Music'),
('Digital Metronome', 'Clip-on tuner and metronome for all instruments.', 12.50, 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80', 100, 'Music'),

-- 🚗 Automotive Accessories
('Car Vacuum Cleaner', 'High-power portable handheld vacuum for cars.', 39.99, 'https://images.unsplash.com/photo-1552975084-6e027cd345c2?w=800&q=80', 40, 'Automotive'),
('Phone Car Mount', 'Universal dashboard magnetic phone holder.', 14.99, 'https://images.unsplash.com/photo-1506469717960-433cebe3f181?w=800&q=80', 120, 'Automotive'),
('Car Cleaning Kit', 'Microfiber towels, wax, and sponge set.', 25.00, 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80', 35, 'Automotive'),

-- 🍫 Gourmet Food
('Premium Coffee Beans', '1lb bag of dark roast Arabica coffee beans.', 18.00, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80', 80, 'Food'),
('Dark Chocolate Box', 'Assorted handcrafted dark chocolate truffles.', 22.00, 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80', 50, 'Food');


-- Add a User 
INSERT INTO users (id, username, email, password) 
VALUES (1, 'Test User', 'test@example.com', 'password123');

-- Show all users, sorting by the newest ones first
SELECT * FROM users ORDER BY id DESC;

-- Show all order, sorting by the newest ones first
SELECT * FROM orders ORDER BY id DESC;

-- Show all products, sorting by the newest ones first
SELECT * FROM products ORDER BY id DESC;

-- Show all order_items, sorting by the newest ones first
SELECT * FROM order_items ORDER BY id DESC;
