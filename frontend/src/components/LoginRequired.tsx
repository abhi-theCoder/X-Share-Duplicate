import { motion } from 'framer-motion';
import { Lock, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

// 🔹 Reusable Login Required component
const LoginRequired = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center border border-blue-100"
      >
        <div className="flex justify-center mb-6">
          {/* Lock Icon Container - Updated to Blue/Indigo gradient */}
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <Lock className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Login Required</h2>
        <p className="text-gray-600 mb-8">
          You need to be logged in to view your profile and access this page.
        </p>
        {/* Login Button - Applied shared style */}
        <Link
          to="/login"
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-xl shadow-md
            hover:from-blue-700 hover:to-blue-500
            transform hover:scale-105 transition-all duration-300"
        >
          <LogIn className="w-5 h-5 mr-2" />
          Go to Login Page
        </Link>
      </motion.div>
    </div>
  );
};

export default LoginRequired;
