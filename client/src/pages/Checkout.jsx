import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // <--- 1. Import Auth
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth(); // <--- 2. Get User Info
    const navigate = useNavigate();
    
    // Initial State
    const [formData, setFormData] = useState({ name: '', email: '', address: '' });
    const [loading, setLoading] = useState(false);

    // <--- 3. NEW: Autofill Form when User loads
    useEffect(() => {
        if (user) {
            setFormData(prevData => ({
                ...prevData,
                name: user.username || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!user || !user.id) {
            alert("Please log in to place an order!");
            navigate('/login');
            return;
        }

        try {
            await axios.post('http://127.0.0.1:5000/api/orders', {
                userId: user.id,
                cartItems: cart,
                totalAmount: cartTotal
            });

            setTimeout(() => {
                alert('Order placed successfully! 🚀');
                clearCart();
                navigate('/');
            }, 1000);

        } catch (err) {
            console.error(err);
            console.log("Server Error:", err.response?.data);
            alert('Error placing order. Check console.');
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                
                {/* Form Section */}
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">Checkout</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input 
                                type="text" 
                                required 
                                value={formData.name} // <--- Controlled Input
                                onChange={e => setFormData({...formData, name: e.target.value})} 
                                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                required 
                                value={formData.email} // <--- Controlled Input
                                onChange={e => setFormData({...formData, email: e.target.value})} 
                                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
                            <textarea 
                                required 
                                rows="4"
                                value={formData.address}
                                onChange={e => setFormData({...formData, address: e.target.value})} 
                                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 disabled:bg-blue-400"
                        >
                            {loading ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
                        </button>
                    </form>
                </div>

                {/* Summary Section */}
                <div className="bg-gray-50 p-8 rounded-2xl h-fit">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Your Order</h3>
                    <div className="space-y-4 mb-6">
                        {cart.map(item => (
                            <div key={item.id} className="flex items-center gap-4">
                                <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-bold text-gray-900 text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="font-bold text-2xl text-blue-600">${cartTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;