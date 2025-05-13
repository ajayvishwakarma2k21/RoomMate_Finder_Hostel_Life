import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Base URL for the API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Home = () => {
    const [users, setUsers] = useState([]); // State to store user data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state

    useEffect(() => {
        let isMounted = true; // Prevent memory leaks

        // Function to fetch users from the API
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/users`);
                if (isMounted) setUsers(response.data); // Set users if component is mounted
            } catch (err) {
                if (isMounted) setError(err.response?.data?.message || err.message); // Set error if component is mounted
            } finally {
                if (isMounted) setLoading(false); // Set loading to false if component is mounted
            }
        };

        fetchUsers();
        return () => { isMounted = false; }; // Cleanup function to prevent memory leaks
    }, []);

    // Function to handle connect button click
    const handleConnect = async (userId) => {
        try {
            await axios.post(`${API_BASE_URL}/api/connect`, { userId });
            alert(`Connect request sent to user ID: ${userId}`);
        } catch (error) {
            alert(`Error sending request: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar component */}
            <Navbar />
            <main className="flex-1 bg-gray-100 p-6">
                <h1 className="text-3xl font-bold text-center mb-6">User Profiles</h1>
                
                {/* Display loading message */}
                {loading && <p className="text-center">Loading users...</p>}
                {/* Display error message */}
                {error && <p className="text-center text-red-500">Error: {error}</p>}
                {/* Display message if no users are found */}
                {users.length === 0 && !loading && !error && <p className="text-center">No users found.</p>}
                
                {/* Display user profiles in a responsive grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map(user => (
                        <div key={user._id} className="bg-pink-400 shadow-lg rounded-lg p-6 text-center">
                            <h2 className="text-xl font-semibold">Name: {user.username}</h2>
                            <p className="text-gray-600">Email: {user.email}</p>
                            <p className="text-gray-500">Academics: {user.academics || 'No academic info'}</p>
                            <p className="text-gray-500">Hobbies: {user.hobbies || 'N/A'}</p>
                            <button
                                className="mt-4 bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-700"
                                onClick={() => handleConnect(user._id)}
                            >
                                Connect
                            </button>
                        </div>
                    ))}
                </div>
            </main>
            {/* Footer component */}
            <Footer />
        </div>
    );
};

export default Home;
