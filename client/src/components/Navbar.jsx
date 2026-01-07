import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { cart } = useCart();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); // To watch URL changes

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Sync input with URL: If URL has ?search=shoes, fill input. If URL is empty, clear input.
    useEffect(() => {
        const query = searchParams.get('search');
        if (query) {
            setSearchTerm(query);
        } else {
            setSearchTerm('');
        }
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/?search=${searchTerm}`);
    };

    // New Function: Clears search and goes to Home
    const resetSearch = () => {
        setSearchTerm('');
        navigate('/');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-4">
                
                {/* 1. Logo (Clicking now resets search) */}
                <button onClick={resetSearch} className="text-2xl font-bold text-gray-900 tracking-tighter flex-shrink-0 focus:outline-none group">
                    Mini<span className="text-blue-600 group-hover:text-blue-500 transition">Store</span>.
                </button>

                {/* 2. SEARCH BAR */}
                <form onSubmit={handleSearch} className="flex-1 max-w-md relative hidden md:block group z-10 mx-4">
                    <div className="relative transition-all duration-300 group-focus-within:-translate-y-0.5 group-focus-within:shadow-lg group-focus-within:shadow-blue-500/10 rounded-full">
                        
                        {/* Input Field */}
                        <input 
                            type="text" 
                            placeholder="Search for essentials..." 
                            className="w-full bg-slate-100 border-2 border-transparent rounded-full py-2.5 px-6 pl-11 text-sm font-semibold text-slate-700 placeholder-slate-400 focus:bg-white focus:border-blue-500/20 focus:ring-0 transition-all duration-300 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        
                        {/* Search Icon (Animates color on focus) */}
                        <svg 
                            className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 transition-colors duration-300 group-focus-within:text-blue-500 pointer-events-none" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>

                        {/* Clear Button (Only shows when typing) */}
                        {searchTerm && (
                            <button 
                                type="button" 
                                onClick={resetSearch}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-300 hover:text-red-500 bg-white hover:bg-red-50 rounded-full p-1 transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        )}
                    </div>
                </form>

                {/* 3. Icons */}
                <div className="flex items-center space-x-6 flex-shrink-0">
                    {/* Shop Link */}
                    <button onClick={resetSearch} className="hover-underline text-gray-600 hover:text-blue-600 font-medium transition hidden sm:block focus:outline-none">Shop</button>

                    <Link to="/cart" className="relative group">
                        <span className="text-gray-600 group-hover:text-blue-600 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </span>
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                    
                    <Link to={user ? "/profile" : "/login"} className="text-gray-600 hover:text-blue-600 transition flex items-center gap-2">
                        {user ? (
                            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                    <polyline points="10 17 15 12 10 7"></polyline>
                                    <line x1="15" y1="12" x2="3" y2="12"></line>
                                </svg>
                            </div>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;