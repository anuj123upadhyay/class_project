
// components/SignUp.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight, FiCheck } from 'react-icons/fi';
import { authService } from '../../services/authService.js';

function SignUp({ switchToSignIn }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
    
    // Clear error when user types
    if (error) setError('');
  };
  
  const calculatePasswordStrength = (password) => {
    // Your existing password strength calculation
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };
  
  // Your existing password strength text function
  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
        return { text: 'Weak', color: 'bg-red-500' };
      case 1:
        return { text: 'Fair', color: 'bg-orange-500' };
      case 2:
        return { text: 'Good', color: 'bg-yellow-500' };
      case 3:
        return { text: 'Strong', color: 'bg-green-500' };
      case 4:
        return { text: 'Very Strong', color: 'bg-emerald-500' };
      default:
        return { text: 'Weak', color: 'bg-red-500' };
    }
  };
  
  const handleNextStep = () => {
    if (formData.fullName.length >= 3 && isValidEmail(formData.email)) {
      setStep(2);
    }
  };
  
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Call the signup service that connects to your backend
      await authService.signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });
      
      setLoading(false);
      setFormSubmitted(true);
      
    } catch (error) {
      setLoading(false);
      
      // Handle error based on your backend response format
      if (error.response && error.response.data) {
        setError(error.response.data.error || error.response.data.message || 'Registration failed');
      } else {
        setError('Registration failed. Please try again later.');
      }
      
      console.error('Signup error:', error);
    }
  };




  if (formSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6"
      >
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <FiCheck className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Success!</h1>
            <p className="text-gray-600 mb-6">
              Your account has been created successfully. Please check your email for verification.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={switchToSignIn}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700"
            >
              Sign In Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen bg-gray-50"
    >
      {/* Left Column - Form */}
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
            <h1 className="text-3xl font-bold text-gray-900">Join WorkSync</h1>
            <p className="text-gray-600 mt-2">Create your account and start managing tasks</p>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1 mb-10">
            <motion.div 
              initial={{ width: '50%' }}
              animate={{ width: step === 1 ? '50%' : '100%' }}
              className="h-1 rounded-full bg-indigo-600"
            ></motion.div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Basic Info</h2>
                
                {/* Full Name */}
                <div className="mb-5">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="fullName">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                
                {/* Email */}
                <div className="mb-6">
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
                
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 flex items-center"
                    disabled={!formData.fullName || !formData.email || !isValidEmail(formData.email)}
                  >
                    Next <FiArrowRight className="ml-2" />
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Set Your Password</h2>
                
                {/* Password */}
                <div className="mb-5">
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
                      minLength={8}
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
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getPasswordStrengthText().color}`} 
                          style={{ width: `${passwordStrength * 25}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Password Strength: {getPasswordStrengthText().text}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Confirm Password */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FiEye className="text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password Match Indicator */}
                  {formData.confirmPassword && (
                    <p className={`text-xs mt-1 ${
                      formData.password === formData.confirmPassword 
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }`}>
                      {formData.password === formData.confirmPassword 
                        ? 'Passwords match' 
                        : 'Passwords don\'t match'}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Back
                  </button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
                    disabled={
                      !formData.password || 
                      !formData.confirmPassword || 
                      formData.password !== formData.confirmPassword ||
                      loading
                    }
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      'Sign Up'
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account? {' '}
              <button 
                onClick={switchToSignIn}
                className="text-indigo-600 font-medium hover:text-indigo-800"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
      
      {/* Right Column - Image/Illustration */}
      <div className="hidden md:block md:w-1/2 bg-indigo-600">
        <div className="h-full flex items-center justify-center p-12">
          <div className="max-w-md text-white">
            <h2 className="text-3xl font-bold mb-6">Streamline Your Workflow with WorkSync</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Effortlessly manage tasks and projects in one place</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Set reminders and never miss deadlines</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Collaborate with team members seamlessly</p>
              </li>
            </ul>
            <div className="mt-10">
              <img 
                src="https://cdn.pixabay.com/photo/2022/01/11/21/48/space-6931983_960_720.png" 
                alt="WorkSync Illustration" 
                className="max-w-full h-auto rounded-lg opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SignUp;