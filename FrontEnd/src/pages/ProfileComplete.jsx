import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileComplete = () => {
    const [academics, setAcademics] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [background, setBackground] = useState('');
    const [nativeLanguage, setNativeLanguage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('/api/users/profile', { academics, hobbies, background, nativeLanguage }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Profile completed successfully!');
            navigate('/profile'); // Redirect to login page
        } catch (error) {
            alert('Failed to complete profile');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Academics" value={academics} onChange={(e) => setAcademics(e.target.value)} className="w-full p-2 border rounded" required />
                    <input type="text" placeholder="Hobbies" value={hobbies} onChange={(e) => setHobbies(e.target.value)} className="w-full p-2 border rounded" required />
                    <input type="text" placeholder="Background" value={background} onChange={(e) => setBackground(e.target.value)} className="w-full p-2 border rounded" required />
                    <input type="text" placeholder="Native Language" value={nativeLanguage} onChange={(e) => setNativeLanguage(e.target.value)} className="w-full p-2 border rounded" required />
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Save Profile</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileComplete;
