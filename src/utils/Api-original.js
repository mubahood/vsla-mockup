import axios from 'axios';
import { API_URL, TIMEOUT, DB_TOKEN, DB_LOGGED_IN_PROFILE, HTTP_STATUS } from '../constants/Constants';
import Utils from './Utils';

/**
 * ⚠️  DEPRECATED API UTILITY ⚠️
 * 
 * This file is DEPRECATED and should NOT be used for new development.
 * Use /src/services/api.js instead which provides:
 * - Only 2 HTTP methods (GET, POST)
 * - Automatic token headers (Authorization, token, tok, Tok)
 * - Centralized error handling
 * - Consistent response format
 * 
 * This file is kept only for legacy compatibility and will be removed.
 */

// Network connectivity check - simplified and more reliable
const isConnected = () => {
  // For web applications, we rely on navigator.onLine and don't ping the server unnecessarily
  // This prevents 404 errors from non-existent ping endpoints
  return navigator.onLine !== false; // Returns true if online or unknown
};

// Track logout notifications to prevent duplicates
let logoutNotificationShown = false;
let logoutTimeout = null;

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token and logging
api.interceptors.request.use(
  async (config) => {
    try {
      // Check network connectivity (simplified check)
      const connected = isConnected();
      if (!connected) {
        throw new Error('No internet connection');
      }

      // Get and add authentication token in ALL required formats
      const token = Utils.loadFromDatabase(DB_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.Token = `Bearer ${token}`;  // Add Token with Bearer prefix
        config.headers.token = `Bearer ${token}`;  // Add token with Bearer prefix
        config.headers.Tok = `Bearer ${token}`;    // Add Tok with Bearer prefix  
        config.headers.tok = `Bearer ${token}`;    // Add tok with Bearer prefix
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and logging
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle different HTTP status codes
    if (error.response) {
      switch (error.response.status) {
        case HTTP_STATUS.UNAUTHORIZED:
          // Only handle unauthorized if not already retried and has token
          if (!originalRequest._retry && !logoutNotificationShown) {
            originalRequest._retry = true;
            
            const token = Utils.loadFromDatabase(DB_TOKEN);
            
            // Only logout if we actually had a token (user was logged in)
            if (token) {
              logoutNotificationShown = true;
              
              Utils.saveToDatabase(DB_TOKEN, null);
              Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, null);
              
              // Show notification if Utils.notify exists
              if (Utils.notify) {
                Utils.notify('Session expired. Please login again.', 'error');
              }
              
              // Clear the notification flag after some time
              if (logoutTimeout) clearTimeout(logoutTimeout);
              logoutTimeout = setTimeout(() => {
                logoutNotificationShown = false;
              }, 5000);
              
              // Only redirect if not already on login page
              const currentPath = window.location.pathname;
              if (!currentPath.includes('/auth/login') && !currentPath.includes('/auth/register')) {
                setTimeout(() => {
                  window.location.href = '/auth/login';
                }, 1500);
              }
            }
          }
          break;

        case HTTP_STATUS.FORBIDDEN:
          if (Utils.notify) {
            Utils.notify('Access denied. You do not have permission.', 'error');
          }
          break;

        case HTTP_STATUS.NOT_FOUND:
          if (Utils.notify) {
            Utils.notify('Resource not found.', 'error');
          }
          break;

        case HTTP_STATUS.TOO_MANY_REQUESTS:
          if (Utils.notify) {
            Utils.notify('Too many requests. Please try again later.', 'warning');
          }
          break;

        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        case HTTP_STATUS.BAD_GATEWAY:
        case HTTP_STATUS.SERVICE_UNAVAILABLE:
          if (Utils.notify) {
            Utils.notify('Server error. Please try again later.', 'error');
          }
          break;

        default:
          if (error.response.data?.message && Utils.notify) {
            Utils.notify(error.response.data.message, 'error');
          } else if (Utils.notify) {
            Utils.notify('An unexpected error occurred.', 'error');
          }
      }
    } else if (error.request) {
      // Network error
      if (Utils.notify) {
        Utils.notify('Network error. Please check your connection.', 'error');
      }
    } else {
      // Other errors
      if (Utils.notify) {
        Utils.notify('An error occurred. Please try again.', 'error');
      }
    }
    
    return Promise.reject(error);
  }
);

/**
 * HTTP GET request utility
 * @param {string} endpoint - API endpoint
 * @param {object} params - Query parameters
 * @returns {Promise} Response data
 */
export const http_get = async (endpoint, params = {}) => {
  try {
    // Check connectivity first (simplified check)
    const connected = isConnected();
    if (!connected) {
      return {
        code: 0,
        message: 'You are not connected to internet.',
        data: null,
        status: 0,
      };
    }

    const response = await api.get(endpoint, { params });
    
    // Return the actual response data (which contains the backend's code/message/data structure)
    return response.data;
  } catch (error) {
    // Handle specific error cases similar to mobile app
    if (error.response?.data && typeof error.response.data === 'object') {
      // If backend returns structured error response, use it directly
      return error.response.data;
    }
    
    return {
      code: 0,
      message: error.response?.data?.message || error.message || 'Request failed',
      data: null,
      status: error.response?.status || 500,
      error: error.response?.data || error,
    };
  }
};

/**
 * HTTP POST request utility
 * @param {string} endpoint - API endpoint
 * @param {object} data - Request body data
 * @param {object} options - Additional options (headers, etc.)
 * @returns {Promise} Response data
 */
export const http_post = async (endpoint, data = {}, options = {}) => {
  try {
    // Check connectivity first (simplified check)
    const connected = isConnected();
    if (!connected) {
      return {
        code: 0,
        message: 'You are not connected to internet.',
        data: null,
        status: 0,
      };
    }

    // Handle different content types
    let requestData = data;
    let requestHeaders = { ...options.headers };

    // If data contains File objects, use FormData
    if (Utils.containsFiles && Utils.containsFiles(data)) {
      requestData = new FormData();
      Object.keys(data).forEach(key => {
        if (Array.isArray(data[key])) {
          data[key].forEach((item, index) => {
            requestData.append(`${key}[${index}]`, item);
          });
        } else {
          requestData.append(key, data[key]);
        }
      });
      // Remove Content-Type header to let browser set it with boundary
      delete requestHeaders['Content-Type'];
    }

    const response = await api.post(endpoint, requestData, {
      ...options,
      headers: requestHeaders
    });
    
    // Return the actual response data (which contains the backend's code/message/data structure)
    return response.data;
  } catch (error) {
    // Handle specific error cases similar to mobile app
    if (error.response?.data && typeof error.response.data === 'object') {
      // If backend returns structured error response, use it directly
      return error.response.data;
    }
    
    return {
      code: 0,
      message: error.response?.data?.message || error.message || 'Request failed',
      data: null,
      status: error.response?.status || 500,
      error: error.response?.data || error,
    };
  }
};

/**
 * PUT request wrapper - converted to POST with _method parameter
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request data
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} Response data
 */
export const PUT = async (endpoint, data = {}, options = {}) => {
  try {
    if (!isConnected()) {
      return {
        code: 0,
        message: 'You are not connected to internet.',
        data: null,
        status: 0,
      };
    }

    // Convert PUT to POST with _method parameter for Laravel
    const payload = {
      ...data,
      _method: 'PUT'
    };

    const response = await api.post(endpoint, payload, options);
    
    // Return the actual response data (which contains the backend's code/message/data structure)
    return response.data;
  } catch (error) {
    // Handle specific error cases similar to mobile app
    if (error.response?.data && typeof error.response.data === 'object') {
      // If backend returns structured error response, use it directly
      return error.response.data;
    }
    
    return {
      code: 0,
      message: error.response?.data?.message || error.message || 'Request failed',
      data: null,
      status: error.response?.status || 500,
      error: error.response?.data || error,
    };
  }
};

/**
 * HTTP DELETE request utility - converted to POST with _method parameter
 * @param {string} endpoint - API endpoint
 * @param {object} options - Additional options
 * @returns {Promise} Response data
 */
export const http_delete = async (endpoint, options = {}) => {
  try {
    // Check connectivity first (simplified check)
    const connected = isConnected();
    if (!connected) {
      return {
        code: 0,
        message: 'You are not connected to internet.',
        data: null,
        status: 0,
      };
    }

    // Convert DELETE to POST with _method parameter for Laravel
    const payload = {
      _method: 'DELETE'
    };

    const response = await api.post(endpoint, payload, options);
    
    // Return the actual response data (which contains the backend's code/message/data structure)
    return response.data;
  } catch (error) {
    // Handle specific error cases similar to mobile app
    if (error.response?.data && typeof error.response.data === 'object') {
      // If backend returns structured error response, use it directly
      return error.response.data;
    }
    
    return {
      code: 0,
      message: error.response?.data?.message || error.message || 'Request failed',
      data: null,
      status: error.response?.status || 500,
      error: error.response?.data || error,
    };
  }
};

/**
 * File upload utility
 * @param {string} endpoint - API endpoint
 * @param {FormData} formData - Form data with files
 * @param {function} onProgress - Progress callback
 * @returns {Promise} Response data
 */
export const http_upload = async (endpoint, formData, onProgress = null) => {
  try {
    // Check connectivity first
    const connected = await isConnected();
    if (!connected) {
      return {
        code: 0,
        message: 'You are not connected to internet.',
        data: null,
        status: 0,
      };
    }

    const response = await api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
    
    return {
      code: 1,
      message: response.data?.message || 'Upload successful',
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    return {
      code: 0,
      message: error.response?.data?.message || error.message || 'Upload failed',
      data: null,
      status: error.response?.status || 500,
      error: error.response?.data || error,
    };
  }
};

// Export connectivity check function for external use
export { isConnected };

export default api;
