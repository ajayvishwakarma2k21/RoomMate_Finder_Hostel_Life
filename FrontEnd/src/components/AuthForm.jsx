import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isLogin }) => {
    const [username, setUsername] = useState(''); // State to store username
    const [email, setEmail] = useState(''); // State to store email
    const [password, setPassword] = useState(''); // State to store password
    const [confirmPassword, setConfirmPassword] = useState(''); // State to store password confirmation
    const [error, setError] = useState(''); // State to manage error state
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate password confirmation during registration
        if (!isLogin && password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            if (!isLogin) {
                // Registration flow
                const response = await axios.post('/api/users/register', { username, email, password });
                localStorage.setItem('token', response.data.token);
                alert('Registration successful. Please complete your profile.');
                navigate('/login'); // Redirect to Profile Completion Page
            } else {
                // Login flow
                const response = await axios.post('/api/users/login', { email, password });
                localStorage.setItem('token', response.data.token);
                alert('Login successful');
                navigate('/Home'); // Redirect to Home Page
            }
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-500">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {!isLogin && (
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="w-full p-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition duration-300">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
