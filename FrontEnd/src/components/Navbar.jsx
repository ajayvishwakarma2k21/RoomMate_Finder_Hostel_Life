import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Handle logout by removing the token and navigating to the login page
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Toggle the mobile menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-blue-600 shadow-lg w-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-white">FindMyRoomie</h1>
                    </div>
                    <div className="hidden md:flex space-x-4 items-center">
                        <Link to="/Home" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300">Home</Link>
                        <Link to="/about" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300">About</Link>
                        <Link to="/profile" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300">Profile</Link>
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-black px-4 py-2 rounded-md text-sm font-medium transition duration-300">Logout</button>
                    </div>
                    <div className="flex items-center md:hidden">
                        <button onClick={toggleMenu} className="text-white hover:text-gray-300 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-blue-600">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/Home" className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition duration-300">Home</Link>
                        <Link to="/about" className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition duration-300">About</Link>
                        <Link to="/profile" className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition duration-300">Profile</Link>
                        <button onClick={handleLogout} className="block w-full text-left bg-red-500 hover:bg-red-600 text-black px-4 py-2 rounded-md text-base font-medium transition duration-300">Logout</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;