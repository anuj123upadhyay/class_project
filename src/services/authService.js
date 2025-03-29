// services/authService.js
import api from './api';

export const authService = {
  // Register a new user - matches your registerUser controller
  signup: async (userData) => {
    const response = await api.post('/auth/register', {
      name: userData.fullName, // Match your backend expected field
      email: userData.email,
      password: userData.password
    });
    return response.data;
  },
  
  // Login user - matches your loginUser controller
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },
  
  // Logout user - matches your logoutUser controller
  logout: async () => {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('authToken');
    return response.data;
  },
  
  // Get current user profile
  getCurrentUser: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
  
  // Update user profile - matches your updateProfile controller
  updateProfile: async (userData) => {
    const response = await api.patch('/auth/profile', userData);
    return response.data;
  },
  
  // Change password - matches your changePassword controller
  changePassword: async (passwordData) => {
    const response = await api.patch('/auth/change-password', passwordData);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  }
};