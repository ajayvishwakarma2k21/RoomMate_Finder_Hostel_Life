import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Profile = () => {
    const [user, setUser] = useState(null); // State to store user data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token'); // Get token from local storage
        
            if (!token) {
                navigate('/login'); // Redirect if no token found
                return;
            }
        
            try {
                const response = await axios.get('http://localhost:5000/api/users/me', { // Ensure API URL is correct
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data); // Set user data
            } catch (err) {
                console.error("Profile Fetch Error:", err.response?.data);
                setError(err.response?.data?.error || "Error fetching user data"); // Set error message
            } finally {
                setLoading(false); // Set loading to false
            }
        };
        
        fetchUserProfile();
    }, [navigate]);

    if (loading) return <p>Loading...</p>; // Display loading message
    if (error) return <p style={{ color: 'red' }}>{error}</p>; // Display error message

    return (
        <div>
            <Navbar />
       
        <div className="flex justify-center items-center min-h-screen border-y-indigo-700 w-screen">
            <div className="bg-white shadow-lg items-center rounded-lg p-6 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">User Profile</h1>
                {user ? (
                    <div className="space-y-3 text-center">
                        <p className="text-gray-700"><strong className="text-gray-900">Username:</strong> {user.username}</p>
                        <p className="text-gray-700"><strong className="text-gray-900">Email:</strong> {user.email}</p>
                        <p className="text-gray-700"><strong className="text-gray-900">Academics:</strong> {user.academics || "N/A"}</p>
                        <p className="text-gray-700"><strong className="text-gray-900">Hobbies:</strong> {user.hobbies || "N/A"}</p>
                        <p className="text-gray-700"><strong className="text-gray-900">Background:</strong> {user.background || "N/A"}</p>
                        <p className="text-gray-700"><strong className="text-gray-900">Native Language:</strong> {user.nativeLanguage || "N/A"}</p>
                        <button
                            className="mt-4 bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-700"
                            onClick={() => navigate('/profileComplete')}
                        >
                            Complete Profile
                        </button>
                    </div>
                ) : (
                    <p className="text-red-500 text-center">No user data found.</p>
                )}
            </div>
        </div>
        </div>
    );
};

export default Profile;
