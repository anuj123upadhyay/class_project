// components/Logout.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLogOut, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

function Logout({ cancelLogout, onCompleteLogout }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutComplete, setLogoutComplete] = useState(false);
  const [countdown, setCountdown] = useState(3);
  
  // Handle logout process
  const handleLogout = () => {
    setIsLoggingOut(true);
    
    // Simulate logout API call
    setTimeout(() => {
      setLogoutComplete(true);
      
      // Start countdown before redirect
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Redirect to login page
            if (onCompleteLogout) {
              onCompleteLogout();
            } else {
              window.location.href = '/login';
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }, 1500);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full"
      >
        {logoutComplete ? (
          <div className="p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <FiCheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="mt-5 text-xl font-medium text-gray-900">Logout Successful!</h3>
            <p className="mt-2 text-sm text-gray-500">
              You have been successfully logged out of your WorkSync account.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Redirecting to login page in <span className="font-medium text-indigo-600">{countdown}</span> seconds...
            </p>
            <div className="mt-5">
              <button
                type="button"
                onClick={onCompleteLogout || (() => window.location.href = '/login')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Go to Login Now
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Sign Out</h3>
              <div className="bg-red-100 rounded-full p-1.5">
                <FiLogOut className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600">
                Are you sure you want to sign out of your WorkSync account? You'll need to sign in again to access your tasks and projects.
              </p>
              
              <div className="mt-6 flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={cancelLogout}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  <FiArrowLeft className="mr-2 h-4 w-4" />
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLogout}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <FiLogOut className="mr-2 h-4 w-4" />
                  )}
                  {isLoggingOut ? 'Signing out...' : 'Sign Out'}
                </motion.button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Logout;