// // contexts/AuthContext.jsx
// import { createContext, useState, useContext, useEffect } from 'react';
// import { authService } from '../services/authService';
// import Logout from '../components/auth/Logout';
// import api from '../services/api';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [authError, setAuthError] = useState(null);
//   // Check if user is logged in on initial load
//    // Check authentication status on initial load
//    useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem('authToken');
      
//       if (!token) {
//         setLoading(false);
//         return;
//       }
      
//       try {
//         // Get current user data with the stored token
//         const response = await api.get('/auth/profile');
//         setCurrentUser(response.data.data?.user || response.data.data);
//       } catch (error) {
//         console.error('Auth check failed:', error);
//         localStorage.removeItem('authToken');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     checkAuth();
//   }, []);

//   // Sign in function
//   const login = async (credentials) => {
//     try {
//       setAuthError(null);
//       const response = await api.post('/auth/login', credentials);
      
//       if (response.data.token) {
//         localStorage.setItem('authToken', response.data.token);
        
//         // Extract basic user info from token
//         try {
//           const payload = JSON.parse(atob(response.data.token.split('.')[1]));
//           setCurrentUser({
//             id: payload.id,
//             // Other extractable fields
//           });
//         } catch (err) {
//           console.error('Error decoding token', err);
//         }
        
//         // Don't redirect here - let the component handle navigation
//         return response.data;
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setAuthError(error.response?.data?.message || 'Invalid credentials');
//       throw error;
//     }
//   };


//   // Sign up function
//   const signup = async (userData) => {
//     try {
//       setAuthError(null);
//       const response = await api.post('/auth/register', {
//         name: userData.fullName,
//         email: userData.email,
//         password: userData.password
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Signup error:', error);
//       setAuthError(error.response?.data?.message || 'Failed to sign up');
//       throw error;
//     }
//   };

//   // Logout function - shows modal first
//   const logout = () => {
//     setShowLogoutModal(true);
//   };
  
//    // Complete logout process
//    const completeLogout = async () => {
//     try {
//       await api.post('/auth/logout');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
    
//     localStorage.removeItem('authToken');
//     setCurrentUser(null);
//     setShowLogoutModal(false);
//   };
  
//   // Cancel logout
//   const cancelLogout = () => {
//     setShowLogoutModal(false);
//   };

  
//   // Update user profile
//   const updateProfile = async (userData) => {
//     try {
//       const response = await api.patch('/users/profile', userData);
//       setCurrentUser(response.data.data?.user || response.data.data);
//       return response.data;
//     } catch (error) {
//       console.error('Profile update error:', error);
//       throw error;
//     }
//   };

//   // Change password
//   const changePassword = async (passwordData) => {
//     try {
//       const response = await api.patch('/users/change-password', passwordData);
      
//       // Update token if new one is returned
//       if (response.data.token) {
//         localStorage.setItem('authToken', response.data.token);
//       }
      
//       return response.data;
//     } catch (error) {
//       console.error('Password change error:', error);
//       throw error;
//     }
//   };
  
//   // Context value
//   const value = {
//     currentUser,
//     login,
//     signup,
//     logout,
//     updateProfile,
//     changePassword,
//     completeLogout,
//     cancelLogout,
//     showLogoutModal,
//     authError,
//     setAuthError,
//     isAuthenticated: !!currentUser
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }













// contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

// Create auth context
const AuthContext = createContext();

// AuthProvider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Check auth status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        // Try to decode basic info from token
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUser({
          id: payload.id,
          name: payload.name || 'User', // Default name if not in token
          email: payload.email || '',
          // Add any other fields you can extract from token
        });
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setAuthError(null);
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        
        // Extract basic user info from token
        try {
          const payload = JSON.parse(atob(response.data.token.split('.')[1]));
          setCurrentUser({
            id: payload.id,
            name: payload.name || 'User',
            email: credentials.email, // Use the email from credentials since it might not be in the token
            // Other extractable fields
          });
        } catch (err) {
          console.error('Error decoding token', err);
        }
        
        return response.data;
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError(error.response?.data?.message || 'Invalid credentials');
      throw error;
    }
  };

  // Sign up function
  const signup = async (userData) => {
    try {
      setAuthError(null);
      const response = await api.post('/users/register', {
        name: userData.fullName,
        email: userData.email,
        password: userData.password
      });
      
      // Don't automatically log in after registration
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      
      // Handle different types of errors
      if (error.response) {
        // The request was made and server responded with an error status
        if (error.response.status === 400) {
          setAuthError(error.response.data.error || 'Invalid registration data');
        } else if (error.response.status === 409) {
          setAuthError('Email already in use');
        } else {
          setAuthError(error.response.data.message || 'Registration failed');
        }
      } else if (error.request) {
        // The request was made but no response was received
        setAuthError('No response from server. Please try again.');
      } else {
        // Something happened in setting up the request
        setAuthError('An error occurred. Please try again.');
      }
      
      throw error;
    }
  };

  // Show logout confirmation
  const logout = () => {
    setShowLogoutModal(true);
  };
  
  // Complete logout process
  const completeLogout = async () => {
    try {
      // Try to call logout endpoint if your API requires it
      // Wrap in try/catch to handle offline scenarios
      try {
        await api.post('/users/logout');
      } catch (error) {
        console.log('Logout endpoint error (continuing):', error);
      }
    } finally {
      // Always clear local state even if API call fails
      localStorage.removeItem('authToken');
      setCurrentUser(null);
      setShowLogoutModal(false);
    }
  };
  
  // Cancel logout
  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const response = await api.patch('/users/profile', userData);
      
      // Update local user state with new data
      setCurrentUser(prevUser => ({
        ...prevUser,
        ...userData
      }));
      
      return response.data;
    } catch (error) {
      console.error('Profile update error:', error);
      
      const errorMessage = error.response?.data?.message || 'Failed to update profile';
      setAuthError(errorMessage);
      
      throw error;
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    try {
      const response = await api.patch('/users/change-password', passwordData);
      
      // Update token if a new one is returned
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Password change error:', error);
      
      const errorMessage = error.response?.data?.message || 'Failed to change password';
      setAuthError(errorMessage);
      
      throw error;
    }
  };
  
  // Reset password request
  const requestPasswordReset = async (email) => {
    try {
      const response = await api.post('/users/forgot-password', { email });
      return response.data;
    } catch (error) {
      console.error('Password reset request error:', error);
      setAuthError(error.response?.data?.message || 'Failed to request password reset');
      throw error;
    }
  };
  
  // Clear authentication errors
  const clearErrors = () => {
    setAuthError(null);
  };

  // Check if user has specific role (if your app uses roles)
  const hasRole = (role) => {
    return currentUser?.roles?.includes(role) || false;
  };

  // Context value
  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    changePassword,
    requestPasswordReset,
    completeLogout,
    cancelLogout,
    showLogoutModal,
    authError,
    setAuthError,
    clearErrors,
    
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {loading && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

// Custom hook as a separate named export 
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}