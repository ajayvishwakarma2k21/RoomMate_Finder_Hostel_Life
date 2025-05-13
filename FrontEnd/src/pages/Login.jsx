import React from 'react';
import Footer from '../components/Footer';
import AuthForm from '../components/AuthForm';
import backgroundImage from '../assets/background.jpg'; // Ensure you have a background image in the assets folder

const Login = () => {
    return (
        <div 
            className=" flex flex-col bg-cover bg-center" 
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="flex-grow flex items-center justify-center bg-gray-100 bg-opacity-75 ">
                <div className="bg-black p-8 rounded shadow-md w-96">
                    <h1 className="text-2xl font-bold mb-4 text-amber-700">Login</h1>
                    <AuthForm isLogin={true} />
                    <p className="mt-4 text-center">
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-500 hover:text-blue-700 transition-colors ">
                            Register
                        </a>
                    </p>
                    <p className="mt-2 text-center">
                        <a href="/forgot-password" className="text-gray-500 hover:text-gray-700 transition-colors">
                            Forgot Password?
                        </a>
                    </p>
                </div>
            </div>
           
        </div>
    );
};

export default Login;