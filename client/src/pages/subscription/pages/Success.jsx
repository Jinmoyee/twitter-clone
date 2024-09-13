import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100">
            <div className="text-center p-6 bg-white shadow-md rounded-lg border-2 border-green-300">
                <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
                <p className="text-lg text-gray-700 mb-4">Thank you for your subscription. Your payment was processed successfully.</p>
                <p className="text-md text-gray-500 mb-6">You can now enjoy the features of your chosen plan.</p>
                <Link to="/" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default Success;
