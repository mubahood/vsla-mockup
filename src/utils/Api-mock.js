/**
 * MOCK API UTILITY - NO BACKEND CONNECTIONS
 * Replaces the original API utility with mock implementations
 * This file provides backward compatibility for existing code
 */

import { MOCK_MANIFEST } from '../data/mockData';

/**
 * Mock HTTP GET request utility
 * @param {string} endpoint - API endpoint (ignored in mock)
 * @param {object} params - Query parameters (ignored in mock)
 * @returns {Promise<Object>} Mock response data
 */
export const http_get = async (endpoint, params = {}) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));

  console.log(`[MOCK] GET ${endpoint}`, params);

  try {
    // Return mock responses based on endpoint
    switch (endpoint) {
      case 'users/me':
        const token = localStorage.getItem('DB_TOKEN') || localStorage.getItem('auth_token');
        if (token && token.startsWith('mock_token_')) {
          const tokenParts = token.split('_');
          const userId = tokenParts.length > 2 ? parseInt(tokenParts[2]) : 1;
          
          const users = JSON.parse(localStorage.getItem('hospital_mock_users') || '[]');
          const user = users.find(u => u.id === userId) || {
            id: 1,
            name: 'Mock User',
            email: 'user@hospital.com',
            role: 'admin'
          };

          return {
            code: 1,
            message: 'User retrieved successfully',
            data: user
          };
        } else {
          return {
            code: 0,
            message: 'Unauthenticated',
            data: null,
            status: 401
          };
        }

      case 'manifest':
        return {
          code: 1,
          message: 'Manifest retrieved successfully',
          data: MOCK_MANIFEST
        };

      default:
        return {
          code: 1,
          message: 'Request successful (Mock)',
          data: {
            message: `Mock response for GET ${endpoint}`,
            params: params
          }
        };
    }
  } catch (error) {
    return {
      code: 0,
      message: 'Mock request failed',
      data: null,
      error: error.message
    };
  }
};

/**
 * Mock HTTP POST request utility
 * @param {string} endpoint - API endpoint (ignored in mock)
 * @param {object} data - Request body data (used for mock logic)
 * @param {object} options - Additional options (ignored in mock)
 * @returns {Promise<Object>} Mock response data
 */
export const http_post = async (endpoint, data = {}, options = {}) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 300));

  console.log(`[MOCK] POST ${endpoint}`, data);

  try {
    // Return mock responses based on endpoint
    switch (endpoint) {
      case 'users/login':
        const users = JSON.parse(localStorage.getItem('hospital_mock_users') || '[]');
        const user = users.find(u => 
          (u.email === data.username || 
           u.username === data.username ||
           u.phone_number_1 === data.username) &&
          u.status === 1
        );

        if (user && data.password === 'password123') {
          const userWithToken = { ...user };
          userWithToken.token = `mock_token_${Date.now()}_${user.id}`;
          
          return {
            code: 1,
            message: 'Login successful',
            data: userWithToken
          };
        } else {
          return {
            code: 0,
            message: 'Invalid credentials',
            data: null
          };
        }

      case 'users/register':
        const existingUsers = JSON.parse(localStorage.getItem('hospital_mock_users') || '[]');
        const existingUser = existingUsers.find(u => u.email === data.email);

        if (existingUser) {
          return {
            code: 0,
            message: 'User already exists',
            data: null
          };
        }

        const newUser = {
          id: existingUsers.length + 1,
          name: data.name,
          email: data.email,
          role: 'doctor',
          status: 1,
          created_at: new Date().toISOString()
        };

        existingUsers.push(newUser);
        localStorage.setItem('hospital_mock_users', JSON.stringify(existingUsers));

        return {
          code: 1,
          message: 'Registration successful',
          data: newUser
        };

      case 'auth/logout':
        return {
          code: 1,
          message: 'Logout successful',
          data: null
        };

      case 'auth/password/email':
        return {
          code: 1,
          message: 'Password reset email sent (Mock)',
          data: null
        };

      case 'auth/password/reset':
        return {
          code: 1,
          message: 'Password reset successful (Mock)',
          data: null
        };

      case 'auth/email/verify':
        return {
          code: 1,
          message: 'Email verified successfully (Mock)',
          data: null
        };

      case 'auth/email/resend':
        return {
          code: 1,
          message: 'Verification email sent (Mock)',
          data: null
        };

      case 'auth/password/change':
        return {
          code: 1,
          message: 'Password changed successfully (Mock)',
          data: null
        };

      case 'auth/profile/update':
        return {
          code: 1,
          message: 'Profile updated successfully (Mock)',
          data: data
        };

      case 'auth/profile/avatar':
        return {
          code: 1,
          message: 'Avatar uploaded successfully (Mock)',
          data: {
            avatar: '/mock-avatar.jpg'
          }
        };

      case 'auth/refresh':
        return {
          code: 1,
          message: 'Token refreshed successfully (Mock)',
          data: {
            token: `mock_token_${Date.now()}_1`
          }
        };

      default:
        return {
          code: 1,
          message: 'Request successful (Mock)',
          data: {
            message: `Mock response for POST ${endpoint}`,
            received_data: data
          }
        };
    }
  } catch (error) {
    return {
      code: 0,
      message: 'Mock request failed',
      data: null,
      error: error.message
    };
  }
};

/**
 * Mock PUT request wrapper - converted to POST with _method parameter
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request data
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} Mock response data
 */
export const PUT = async (endpoint, data = {}, options = {}) => {
  console.log(`[MOCK] PUT ${endpoint}`, data);
  
  // Convert PUT to POST with _method parameter for compatibility
  const payload = {
    ...data,
    _method: 'PUT'
  };

  return await http_post(endpoint, payload, options);
};

/**
 * Mock DELETE request wrapper - converted to POST with _method parameter
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request data
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} Mock response data
 */
export const DELETE = async (endpoint, data = {}, options = {}) => {
  console.log(`[MOCK] DELETE ${endpoint}`, data);
  
  // Convert DELETE to POST with _method parameter for compatibility
  const payload = {
    ...data,
    _method: 'DELETE'
  };

  return await http_post(endpoint, payload, options);
};

/**
 * Mock file upload utility
 * @param {string} endpoint - Upload endpoint
 * @param {FormData} formData - Form data with files
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} Mock upload response
 */
export const uploadFile = async (endpoint, formData, options = {}) => {
  // Simulate file upload delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));

  console.log(`[MOCK] FILE UPLOAD ${endpoint}`, formData);

  return {
    code: 1,
    message: 'File uploaded successfully (Mock)',
    data: {
      file_url: '/mock-uploaded-file.jpg',
      file_name: 'mock-file.jpg',
      file_size: 1024
    }
  };
};

/**
 * Mock network connectivity check
 * @returns {boolean} Always returns true for mock
 */
export const isConnected = () => {
  return true; // Always connected in mock mode
};

/**
 * Mock API status check
 * @returns {Promise<Object>} Mock status response
 */
export const checkApiStatus = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    status: 'operational',
    version: '1.0.0-mock',
    timestamp: new Date().toISOString(),
    services: {
      database: 'operational',
      storage: 'operational',
      notifications: 'operational'
    }
  };
};

// Default export for backward compatibility
const ApiUtils = {
  http_get,
  http_post,
  PUT,
  DELETE,
  uploadFile,
  isConnected,
  checkApiStatus
};

export default ApiUtils;
