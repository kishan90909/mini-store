/*=======================================
    USED FOR DATBASE
==========================================*/

// import React, { useEffect, useState, useMemo } from 'react';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { useSearchParams } from 'react-router-dom';

// const Home = () => {
//     // --- 1. STATE ---
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
    
//     // Filter States
//     const [searchParams] = useSearchParams();
//     const searchQuery = searchParams.get('search') || '';
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [sortOption, setSortOption] = useState('default'); 

//     const { addToCart } = useCart();

//     // --- 2. DATA FETCHING ---
//     useEffect(() => {
//         setLoading(true);
//         axios.get('http://127.0.0.1:5000/api/products') 
//             .then(res => {
//                 setProducts(Array.isArray(res.data) ? res.data : []);
//                 setLoading(false);
//             })
//             .catch(err => setLoading(false));
//     }, []);

//     // --- 3. EXTRACT CATEGORIES ---
//     // Get unique categories from the product list automatically
//     const categories = useMemo(() => {
//         const cats = products.map(p => p.category).filter(Boolean);
//         return ['All', ...new Set(cats)];
//     }, [products]);

//     // --- 4. COMBINED FILTER LOGIC ---
//     const processedProducts = useMemo(() => {
//         let result = products;

//         // Step A: Search Filter
//         if (searchQuery) {
//             result = result.filter(p => 
//                 p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                 p.category?.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//         }

//         // Step B: Category Filter (Dropdown)
//         if (selectedCategory !== 'All') {
//             result = result.filter(p => p.category === selectedCategory);
//         }

//         // Step C: Price Sorting (Dropdown)
//         if (sortOption === 'price-asc') {
//             result = [...result].sort((a, b) => a.price - b.price);
//         } else if (sortOption === 'price-desc') {
//             result = [...result].sort((a, b) => b.price - a.price);
//         }

//         return result;
//     }, [products, searchQuery, selectedCategory, sortOption]);

//     if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div></div>;

//     return (
//         <div className="min-h-screen pb-20">
            
//             {/* --- HERO BANNER --- */}
//             {!searchQuery && selectedCategory === 'All' && (
//                 <div className="relative bg-slate-900 text-white py-20 px-6 mb-12 overflow-hidden">
//                     <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
//                     <div className="container mx-auto text-center relative z-10 animate-fade-in">
//                         <span className="text-blue-400 font-bold tracking-widest text-sm uppercase mb-4 block">New Collection 2026</span>
//                         <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
//                             Elevate Your <br/>
//                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Everyday Style.</span>
//                         </h1>
//                     </div>
//                 </div>
//             )}

//             <div id="shop" className="container mx-auto px-6">
                
//                 {/* --- FILTER BAR (DROPDOWNS) --- */}
//                 <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 animate-fade-in">
                    
//                     {/* Title & Count */}
//                     <div className="w-full md:w-auto">
//                         <h2 className="text-3xl font-bold text-slate-900">
//                             {searchQuery ? `Search: "${searchQuery}"` : 'Shop All'}
//                         </h2>
//                         <p className="text-slate-500 text-sm mt-1">{processedProducts.length} Products Found</p>
//                     </div>

//                     {/* Dropdowns Container */}
//                     <div className="flex flex-wrap gap-4 w-full md:w-auto">
                        
//                         {/* 1. Category Dropdown */}
//                         <div className="relative">
//                             <select 
//                                 value={selectedCategory}
//                                 onChange={(e) => setSelectedCategory(e.target.value)}
//                                 className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block pl-4 pr-10 py-3 outline-none cursor-pointer hover:border-slate-300 transition shadow-sm min-w-[180px]"
//                             >
//                                 <option value="All">All Categories</option>
//                                 {categories.filter(c => c !== 'All').map(cat => (
//                                     <option key={cat} value={cat}>{cat}</option>
//                                 ))}
//                             </select>
//                             {/* Custom Chevron Icon */}
//                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
//                                 <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
//                             </div>
//                         </div>

//                         {/* 2. Sort/Price Dropdown */}
//                         <div className="relative">
//                             <select 
//                                 value={sortOption}
//                                 onChange={(e) => setSortOption(e.target.value)}
//                                 className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block pl-4 pr-10 py-3 outline-none cursor-pointer hover:border-slate-300 transition shadow-sm min-w-[200px]"
//                             >
//                                 <option value="default">Sort by: Recommended</option>
//                                 <option value="price-asc">Price: Low to High</option>
//                                 <option value="price-desc">Price: High to Low</option>
//                             </select>
//                             {/* Custom Chevron Icon */}
//                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
//                                 <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- PRODUCT GRID --- */}
//                 {processedProducts.length === 0 ? (
//                     <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 animate-fade-in">
//                         <p className="text-xl text-slate-400 mb-4">No products found.</p>
//                         <button onClick={() => { setSelectedCategory('All'); setSortOption('default'); }} className="text-blue-600 font-bold hover:underline">Clear Filters</button>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 group-focus">
//                         {processedProducts.map((product, index) => (
//                             <div 
//                                 key={product.id} 
//                                 className="product-card group bg-white rounded-3xl p-4 border border-slate-100 animate-fade-in flex flex-col" 
//                                 style={{ animationDelay: `${index * 50}ms` }}
//                             >
//                                 {/* Image Area */}
//                                 <div className="h-64 rounded-2xl overflow-hidden bg-slate-100 relative mb-4">
//                                     <img 
//                                         src={product.image_url} 
//                                         alt={product.name} 
//                                         className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" 
//                                     />
//                                     {/* Add to Cart Button */}
//                                     <button 
//                                         onClick={(e) => { e.stopPropagation(); addToCart(product); }} 
//                                         className="btn-glow absolute bottom-4 right-4 bg-white text-slate-900 p-3 rounded-full shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 hover:bg-blue-600 hover:text-white"
//                                     >
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
//                                     </button>
//                                 </div>

//                                 {/* Text Details */}
//                                 <div className="flex flex-col flex-grow">
//                                     <div className="flex justify-between items-start mb-2">
//                                         <div>
//                                             <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">{product.category}</p>
//                                             <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition">{product.name}</h3>
//                                         </div>
//                                         <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg text-sm">${product.price}</span>
//                                     </div>
//                                     <p className="text-slate-500 text-sm line-clamp-2 mt-2 leading-relaxed">{product.description}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
// export default Home;








/*=======================================
    USED FOR LIVE WEBSITE
==========================================*/


import React, { useEffect, useState, useMemo } from 'react';
// import axios from 'axios'; // <--- Commented out for Live Demo
import { useCart } from '../context/CartContext';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
    // --- 1. STATE ---
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filter States
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOption, setSortOption] = useState('default'); 

    const { addToCart } = useCart();

    // --- 2. DATA FETCHING (STATIC MOCK DATA FOR LIVE DEMO) ---
    useEffect(() => {
        // We use static data here so the live demo works without a backend server.
        setProducts([
            {
                id: 1,
                name: 'Wireless Headphones',
                description: 'Premium noise-cancelling over-ear headphones in black.',
                price: 99.99,
                image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
                stock: 50,
                category: 'Electronics'
            },
            {
                id: 2,
                name: 'Smart Watch',
                description: 'Fitness tracker with heart rate monitor and GPS.',
                price: 129.50,
                image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
                stock: 30,
                category: 'Electronics'
            },
            {
                id: 3,
                name: 'Gaming Mouse',
                description: 'High precision wireless gaming mouse with ergonomic design.',
                price: 45.50,
                image_url: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80',
                stock: 80,
                category: 'Electronics'
            },
            {
                id: 4,
                name: '4K Action Camera',
                description: 'Waterproof action camera with image stabilization.',
                price: 299.00,
                image_url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
                stock: 20,
                category: 'Electronics'
            },
            {
                id: 5,
                name: 'Bluetooth Speaker',
                description: 'Portable waterproof speaker with deep bass.',
                price: 65.00,
                image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
                stock: 75,
                category: 'Electronics'
            },
            {
                id: 6,
                name: 'Running Shoes',
                description: 'Lightweight red sneakers for daily running.',
                price: 59.99,
                image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
                stock: 100,
                category: 'Footwear'
            },
            {
                id: 7,
                name: 'Leather Backpack',
                description: 'Genuine brown leather backpack, perfect for travel.',
                price: 149.99,
                image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
                stock: 30,
                category: 'Fashion'
            },
            {
                id: 8,
                name: 'Classic Sunglasses',
                description: 'UV protection aviator sunglasses with gold frames.',
                price: 120.00,
                image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
                stock: 60,
                category: 'Fashion'
            },
            {
                id: 9,
                name: 'Denim Jacket',
                description: 'Vintage style blue denim jacket for casual wear.',
                price: 79.99,
                image_url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
                stock: 40,
                category: 'Fashion'
            },
            {
                id: 10,
                name: 'Graphic Hoodie',
                description: 'Oversized grey cotton hoodie with minimal design.',
                price: 55.00,
                image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
                stock: 60,
                category: 'Fashion'
            },
            {
                id: 11,
                name: 'High-Top Sneakers',
                description: 'Retro style basketball sneakers in red and white.',
                price: 135.00,
                image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
                stock: 12,
                category: 'Footwear'
            },
            {
                id: 12,
                name: 'Ceramic Coffee Mug',
                description: 'Handcrafted ceramic mug, dishwasher safe.',
                price: 18.50,
                image_url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80',
                stock: 100,
                category: 'Home'
            },
            {
                id: 13,
                name: 'Succulent Pot Set',
                description: 'Set of 3 mini succulent plants in white pots.',
                price: 24.99,
                image_url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80',
                stock: 25,
                category: 'Home'
            },
            {
                id: 14,
                name: 'Yoga Mat',
                description: 'Non-slip pink exercise mat with carrying strap.',
                price: 25.99,
                image_url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
                stock: 100,
                category: 'Fitness'
            },
            {
                id: 15,
                name: 'Adjustable Dumbbells',
                description: 'Set of 2 dumbbells with adjustable weight settings.',
                price: 89.50,
                image_url: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=800&q=80',
                stock: 20,
                category: 'Fitness'
            },
            {
                id: 16,
                name: 'Chef Knife Set',
                description: '5-piece stainless steel knife set with wooden block.',
                price: 75.00,
                image_url: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80',
                stock: 40,
                category: 'Kitchen'
            },
            {
                id: 17,
                name: 'Vitamin C Face Serum',
                description: 'Brightening serum with hyaluronic acid for daily use.',
                price: 28.50,
                image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
                stock: 60,
                category: 'Beauty'
            },
            {
                id: 18,
                name: 'Orthopedic Dog Bed',
                description: 'Memory foam bed for medium to large dogs.',
                price: 55.00,
                image_url: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=800&q=80',
                stock: 15,
                category: 'Pets'
            },
            {
                id: 19,
                name: 'Interactive Cat Toy',
                description: 'Automatic laser toy to keep cats entertained.',
                price: 22.99,
                image_url: 'https://images.unsplash.com/photo-1615266895738-11f1371cd7e5?w=800&q=80',
                stock: 50,
                category: 'Pets'
            },
            {
                id: 20,
                name: 'Leather Dog Leash',
                description: 'Durable 6ft leather leash with brass hardware.',
                price: 29.99,
                image_url: 'https://images.unsplash.com/photo-1551730459-92db2a308d6a?w=800&q=80',
                stock: 35,
                category: 'Pets'
            },
            {
                id: 21,
                name: 'Leather Notebook',
                description: 'Handbound leather journal with premium paper.',
                price: 34.00,
                image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
                stock: 70,
                category: 'Books'
            },
            {
                id: 22,
                name: 'Sci-Fi Best Seller',
                description: 'The latest space opera novel everyone is talking about.',
                price: 14.99,
                image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
                stock: 120,
                category: 'Books'
            },
            {
                id: 23,
                name: 'Minimalist Pen Set',
                description: 'Set of 3 fine-point gel pens in black ink.',
                price: 9.50,
                image_url: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800&q=80',
                stock: 200,
                category: 'Books'
            },
            {
                id: 24,
                name: 'Watercolor Paint Set',
                description: 'Professional grade 24-color watercolor pan set.',
                price: 32.00,
                image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
                stock: 40,
                category: 'Toys'
            },
            {
                id: 25,
                name: 'Ceramic Plant Pot',
                description: 'Minimalist white ceramic pot with wooden stand.',
                price: 22.50,
                image_url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80',
                stock: 40,
                category: 'Gardening'
            },
            {
                id: 26,
                name: '2-Person Camping Tent',
                description: 'Waterproof lightweight tent for hiking trips.',
                price: 149.00,
                image_url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
                stock: 15,
                category: 'Outdoor'
            },
            {
                id: 27,
                name: 'Silver Pendant Necklace',
                description: 'Sterling silver chain with a simple circle pendant.',
                price: 45.00,
                image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
                stock: 40,
                category: 'Jewelry'
            },
            {
                id: 28,
                name: 'Beaded Bracelet Set',
                description: 'Handmade gemstone beaded bracelets (Set of 3).',
                price: 24.50,
                image_url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
                stock: 70,
                category: 'Jewelry'
            },
            {
                id: 29,
                name: 'Smart Baby Monitor',
                description: 'WiFi enabled video monitor with night vision.',
                price: 129.99,
                image_url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80',
                stock: 20,
                category: 'Baby'
            },
            {
                id: 30,
                name: 'Artist Canvas Set',
                description: 'Pack of 3 stretched white canvases (16x20).',
                price: 29.99,
                image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
                stock: 50,
                category: 'Art'
            },
            {
                id: 31,
                name: 'Acrylic Paint Set',
                description: '24 vibrant colors for professional painting.',
                price: 19.50,
                image_url: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=800&q=80',
                stock: 75,
                category: 'Art'
            },
            {
                id: 32,
                name: 'Soprano Ukulele',
                description: 'Mahogany wood ukulele with carrying bag.',
                price: 55.00,
                image_url: 'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?w=800&q=80',
                stock: 30,
                category: 'Music'
            },
            {
                id: 33,
                name: 'Guitar Stand',
                description: 'Foldable metal stand for acoustic and electric guitars.',
                price: 15.99,
                image_url: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&q=80',
                stock: 60,
                category: 'Music'
            },
            {
                id: 34,
                name: 'Digital Metronome',
                description: 'Clip-on tuner and metronome for all instruments.',
                price: 12.50,
                image_url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
                stock: 100,
                category: 'Music'
            },
            {
                id: 35,
                name: 'Car Vacuum Cleaner',
                description: 'High-power portable handheld vacuum for cars.',
                price: 39.99,
                image_url: 'https://images.unsplash.com/photo-1552975084-6e027cd345c2?w=800&q=80',
                stock: 40,
                category: 'Automotive'
            },
            {
                id: 36,
                name: 'Phone Car Mount',
                description: 'Universal dashboard magnetic phone holder.',
                price: 14.99,
                image_url: 'https://images.unsplash.com/photo-1506469717960-433cebe3f181?w=800&q=80',
                stock: 120,
                category: 'Automotive'
            },
            {
                id: 37,
                name: 'Car Cleaning Kit',
                description: 'Microfiber towels, wax, and sponge set.',
                price: 25.00,
                image_url: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80',
                stock: 35,
                category: 'Automotive'
            },
            {
                id: 38,
                name: 'Premium Coffee Beans',
                description: '1lb bag of dark roast Arabica coffee beans.',
                price: 18.00,
                image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80',
                stock: 80,
                category: 'Food'
            },
            {
                id: 39,
                name: 'Dark Chocolate Box',
                description: 'Assorted handcrafted dark chocolate truffles.',
                price: 22.00,
                image_url: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80',
                stock: 50,
                category: 'Food'
            }
        ]);
        setLoading(false);
    }, []);

    // --- 3. EXTRACT CATEGORIES ---
    const categories = useMemo(() => {
        const cats = products.map(p => p.category).filter(Boolean);
        return ['All', ...new Set(cats)];
    }, [products]);

    // --- 4. COMBINED FILTER LOGIC ---
    const processedProducts = useMemo(() => {
        let result = products;

        // Step A: Search Filter
        if (searchQuery) {
            result = result.filter(p => 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                p.category?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Step B: Category Filter
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Step C: Price Sorting
        if (sortOption === 'price-asc') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-desc') {
            result = [...result].sort((a, b) => b.price - a.price);
        }

        return result;
    }, [products, searchQuery, selectedCategory, sortOption]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen pb-20">
            
            {/* --- HERO BANNER --- */}
            {!searchQuery && selectedCategory === 'All' && (
                <div className="relative bg-slate-900 text-white py-20 px-6 mb-12 overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    <div className="container mx-auto text-center relative z-10 animate-fade-in">
                        <span className="text-blue-400 font-bold tracking-widest text-sm uppercase mb-4 block">New Collection 2026</span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                            Elevate Your <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Everyday Style.</span>
                        </h1>
                    </div>
                </div>
            )}

            <div id="shop" className="container mx-auto px-6">
                
                {/* --- FILTER BAR (DROPDOWNS) --- */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 animate-fade-in">
                    
                    {/* Title & Count */}
                    <div className="w-full md:w-auto">
                        <h2 className="text-3xl font-bold text-slate-900">
                            {searchQuery ? `Search: "${searchQuery}"` : 'Shop All'}
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">{processedProducts.length} Products Found</p>
                    </div>

                    {/* Dropdowns Container */}
                    <div className="flex flex-wrap gap-4 w-full md:w-auto">
                        
                        {/* 1. Category Dropdown */}
                        <div className="relative">
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block pl-4 pr-10 py-3 outline-none cursor-pointer hover:border-slate-300 transition shadow-sm min-w-[180px]"
                            >
                                <option value="All">All Categories</option>
                                {categories.filter(c => c !== 'All').map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            {/* Custom Chevron Icon */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>

                        {/* 2. Sort/Price Dropdown */}
                        <div className="relative">
                            <select 
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block pl-4 pr-10 py-3 outline-none cursor-pointer hover:border-slate-300 transition shadow-sm min-w-[200px]"
                            >
                                <option value="default">Sort by: Recommended</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                            {/* Custom Chevron Icon */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- PRODUCT GRID --- */}
                {processedProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 animate-fade-in">
                        <p className="text-xl text-slate-400 mb-4">No products found.</p>
                        <button onClick={() => { setSelectedCategory('All'); setSortOption('default'); }} className="text-blue-600 font-bold hover:underline">Clear Filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 group-focus">
                        {processedProducts.map((product, index) => (
                            <div 
                                key={product.id} 
                                className="product-card group bg-white rounded-3xl p-4 border border-slate-100 animate-fade-in flex flex-col" 
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Image Area */}
                                <div className="h-64 rounded-2xl overflow-hidden bg-slate-100 relative mb-4">
                                    <img 
                                        src={product.image_url} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" 
                                    />
                                    {/* Add to Cart Button */}
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); addToCart(product); }} 
                                        className="btn-glow absolute bottom-4 right-4 bg-white text-slate-900 p-3 rounded-full shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 hover:bg-blue-600 hover:text-white"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    </button>
                                </div>

                                {/* Text Details */}
                                <div className="flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">{product.category}</p>
                                            <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition">{product.name}</h3>
                                        </div>
                                        <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg text-sm">${product.price}</span>
                                    </div>
                                    <p className="text-slate-500 text-sm line-clamp-2 mt-2 leading-relaxed">{product.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;