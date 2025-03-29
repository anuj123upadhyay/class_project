// // // components/auth/SignIn.jsx
// // import { useState } from 'react';
// // import { motion } from 'framer-motion';
// // import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';

// // function SignIn({ onSignIn, switchToSignUp }) {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
    
// //     if (!email || !password) {
// //       setError('Please fill in all fields');
// //       return;
// //     }
    
// //     setIsLoading(true);
    
// //     try {
// //       // Mock authentication - Replace with actual auth logic
// //       setTimeout(() => {
// //         onSignIn({ email, name: 'John Doe' });
// //         setIsLoading(false);
// //       }, 1000);
// //     } catch (err) {
// //       setError('Invalid credentials. Please try again.');
// //       setIsLoading(false);
// //     }
// //   };




// // components/SignIn.jsx
// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
// import { authService } from '../../services/authService';

// function SignIn({ switchToSignUp, onLoginSuccess }) {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
  
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
    
//     // Clear error when user types
//     if (error) setError('');
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.email || !formData.password) {
//       setError('Please provide both email and password');
//       return;
//     }
    
//     setLoading(true);
//     setError('');
    
//     try {
//       const response = await authService.login({
//         email: formData.email,
//         password: formData.password
//       });
      
//       setLoading(false);
      
//       // If you have a callback to handle successful login
//       if (onLoginSuccess) {
//         onLoginSuccess(response);
//       } else {
//         // Default behavior - redirect to dashboard
//         window.location.href = '/dashboard';
//       }
      
//     } catch (error) {
//       setLoading(false);
      
//       if (error.response && error.response.data) {
//         setError(error.response.data.message || 'Invalid credentials');
//       } else {
//         setError('Login failed. Please try again.');
//       }
      
//       console.error('Login error:', error);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
//     >
//       <div className="w-full max-w-md">
//         <div className="text-center">
//           <motion.div 
//             className="mx-auto h-12 w-12 rounded-lg bg-indigo-600 flex items-center justify-center"
//             whileHover={{ scale: 1.05 }}
//           >
//             <svg 
//               width="24" 
//               height="24" 
//               viewBox="0 0 24 24" 
//               fill="none" 
//               xmlns="http://www.w3.org/2000/svg" 
//               className="text-white"
//             >
//               <path 
//                 d="M4 12H20M12 4V20" 
//                 stroke="currentColor" 
//                 strokeWidth="2.5" 
//                 strokeLinecap="round" 
//               />
//             </svg>
//           </motion.div>
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//             Sign in to WorkSync
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Manage your tasks and stay productive
//           </p>
//         </div>
        
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="mt-8 bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10"
//         >
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm"
//             >
//               {error}
//             </motion.div>
//           )}
          
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiMail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="name@example.com"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiLock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 >
//                   {showPassword ? (
//                     <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                   ) : (
//                     <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember_me"
//                   name="remember_me"
//                   type="checkbox"
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                   Forgot password?
//                 </a>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
//                   isLoading ? 'opacity-70 cursor-not-allowed' : ''
//                 }`}
//               >
//                 <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                   {isLoading ? (
//                     <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
//                   ) : (
//                     <FiArrowRight className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
//                   )}
//                 </span>
//                 {isLoading ? 'Signing in...' : 'Sign in'}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">Or continue with</span>
//               </div>
//             </div>

//             <div className="mt-6 grid grid-cols-2 gap-3">
//               <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
//                 <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
//                   <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
//                   <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
//                   <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
//                   <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
//                 </svg>
//               </button>

//               <button className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
//                 <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 1a9 9 0 100 18 9 9 0 000-18zM5.9 9.5h8.2c.2 0 .3.2.3.5 0 2.5-2 4.5-4.5 4.5S5.5 12.5 5.5 10c0-.3.1-.5.4-.5z" clipRule="evenodd" />
//                 </svg>
//               </button>
//             </div>
//           </div>
          
//           <div className="mt-6 text-center text-sm">
//             <p className="text-gray-600">
//               Don't have an account?{' '}
//               <button 
//                 onClick={switchToSignUp}
//                 className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
//               >
//                 Sign up now
//               </button>
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }

// export default SignIn;








// components/auth/SignIn.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth ,AuthProvider} from '../../contexts/AuthContext';

function SignIn({ switchToSignUp }) {
  const { login, authError, setAuthError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear any errors when user types
    if (authError) {
      setAuthError(null);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setAuthError('Please provide both email and password');
      return;
    }
    
    setLoading(true);
    
    try {
      // Use the email and password from formData
      await login(formData);
      // Login successful - AuthContext will update currentUser
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
      // Error is handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen bg-gray-50"
    >
      {/* Left Column - Image/Illustration */}
      <div className="hidden md:block md:w-1/2 bg-indigo-600">
        <div className="h-full flex items-center justify-center p-12">
          <div className="max-w-md text-white">
            <h2 className="text-3xl font-bold mb-6">Welcome Back to WorkSync</h2>
            <p className="text-indigo-100 mb-8">
              Sign in to access your tasks, reminders and productivity tools. Stay organized and on top of your workflow.
            </p>
            <img 
              src="https://cdn.pixabay.com/photo/2020/01/21/18/39/todo-4783955_960_720.png" 
              alt="WorkSync Illustration" 
              className="max-w-full h-auto rounded-lg opacity-90"
            />
          </div>
        </div>
      </div>
      
      {/* Right Column - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 mb-4">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="text-indigo-600"
              >
                <path 
                  d="M4 12H20M12 4V20" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Sign In to WorkSync</h1>
            <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
          </div>
          
          {/* Error Message */}
          {authError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-l-4 border-red-500 p-4 mb-6"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {authError}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-5">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
            </div>
            
            {/* Password */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FiEye className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">
                Forgot password?
              </a>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:bg-indigo-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account? {' '}
              <button 
                onClick={switchToSignUp}
                className="text-indigo-600 font-medium hover:text-indigo-800"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SignIn;