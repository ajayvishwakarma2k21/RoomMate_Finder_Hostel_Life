import React from 'react';
import AuthForm from '../components/AuthForm';

const Register = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-orange-400">
            <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h1>
                <AuthForm isLogin={false} />
                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:text-blue-700">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;