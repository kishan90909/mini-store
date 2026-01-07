import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        axios.get(`http://127.0.0.1:5000/api/orders/user/${user.id}`)
            .then(res => setOrders(res.data))
            .catch(err => console.error("Failed to fetch orders", err));
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            {/* User Info Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-6">
                    {/* User Avatar */}
                    <div className="w-20 h-20 bg-blue-600 text-white text-3xl font-bold rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    
                    {/* User Details */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
                        <div className="flex items-center gap-2 text-gray-500 mt-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            <span>{user.email}</span> {/* <--- Displays Email Here */}
                        </div>
                    </div>
                </div>

                <button 
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-semibold hover:bg-red-100 transition border border-red-100"
                >
                    Logout
                </button>
            </div>

            {/* Order History */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
            
            {orders.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-500">No orders found.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                            <div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order #{order.id}</span>
                                <p className="text-gray-900 font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                    {order.status}
                                </span>
                                <p className="font-bold text-lg mt-1">${Number(order.total_amount).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;