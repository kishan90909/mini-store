import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import Auth

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();
    const { login } = useAuth(); // Get login function

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        const url = `http://127.0.0.1:5000${endpoint}`;

        try {
            const res = await axios.post(url, formData);
            
            if (isLogin) {
                // Use the Context Login function
                login(res.data.user, res.data.token);
                alert(`Welcome back, ${res.data.user.username}!`);
                navigate('/profile'); // Redirect to Profile instead of Home
            } else {
                alert('Account created! Please log in.');
                setIsLogin(true);
            }
        } catch (err) {
            alert(err.response?.data?.error || 'Authentication failed');
        }
    };
    
    // ... (Keep the rest of the JSX return statement exactly as it was) ...
    // Note: I am omitting the JSX here to save space, just copy the JSX from your previous Login.jsx
    // BUT ensure you use the logic above for handleSubmit.
    
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-gray-500 mt-2">
                        {isLogin ? 'Please sign in to continue' : 'Join us today!'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                            <input type="text" required className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setFormData({...formData, username: e.target.value})} />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" required className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input type="password" required className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setFormData({...formData, password: e.target.value})} />
                    </div>
                    <button className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition">{isLogin ? 'Sign In' : 'Sign Up'}</button>
                </form>
                <p className="text-center mt-6 text-gray-600">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 font-bold hover:underline">{isLogin ? 'Sign Up' : 'Log In'}</button>
                </p>
            </div>
        </div>
    );
};

export default Login;