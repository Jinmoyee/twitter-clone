import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-red-100">
            <div className="text-center p-6 bg-white shadow-md rounded-lg border-2 border-red-300">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
                <p className="text-lg text-gray-700 mb-4">Something went wrong with your payment. Please try again later.</p>
                <p className="text-md text-gray-500 mb-6">If the issue persists, contact support for assistance.</p>
                <Link to="/" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default Error;
