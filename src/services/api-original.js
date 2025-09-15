import axios from 'axios';
import tokenManager from '../utils/TokenManager';

/**
 * CENTRALIZED API SERVICE - SINGLE SOURCE OF TRUTH
 * 
 * This is the ONLY API service file that should be used for HTTP requests.
 * All requests use only 2 methods: GET and POST
 * 
 * CRITICAL: Every request automatically includes ALL required headers:
 * - Authorization: Bearer {token}
 * - Token: Bearer {token}
 * - token: Bearer {token}
 * - Tok: Bearer {token}  
 * - tok: Bearer {token}
 * - Accept: application/json
 * - Content-Type: application/json
 * - X-Requested-With: XMLHttpRequest
 * - Cache-Control: no-cache
 * 
 * TOKEN MANAGEMENT: Uses TokenManager singleton with DB_TOKEN key
 * For dynamic Laravel routes, model names must include 'api/' prefix
 * Example: api.get('api/User') → /api/api/User
 */

// API Base URL - point to your Laravel backend
const API_BASE_URL = 'http://localhost:8888/hospital/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to ALL requests
api.interceptors.request.use(
  (config) => {
    // Get the auth token using TokenManager
    const token = tokenManager.getToken();
    
    // Ensure ALL requests have the required headers for JSON-only responses
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Cache-Control': 'no-cache',
    };
    
    // Add token in ALL required formats - always set these headers
    // If no token, the backend can still identify the request structure
    const bearerToken = token ? `Bearer ${token}` : '';

    // Set ALL possible token header variations
    config.headers.Authorization = bearerToken;
    config.headers.Token = bearerToken;
    config.headers.token = bearerToken;  // Added lowercase 'token'
    config.headers.Tok = bearerToken;
    config.headers.tok = bearerToken;
    
  
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, remove using TokenManager and redirect to login
      tokenManager.removeToken();
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// **********************************************
// UNIVERSAL API METHODS - Only GET and POST
// **********************************************

/**
 * Universal GET method for all read operations
 * Handles: list, show, search, filter, paginate
 * ALWAYS includes token, tok, Tok headers via axios interceptor
 */
export const GET = async (endpoint, params = {}) => {
  try {
    // Get token for debugging using TokenManager
    const token = tokenManager.getToken();
  
    const response = await api.get(endpoint, { params });
    
    
    return response.data;
  } catch (error) {
    console.error('GET Error:', {
      endpoint,
      status: error.response?.status,
      message: error.message,
      responseData: error.response?.data
    });
    throw error;
  }
};

/**
 * Universal POST method for all write operations
 * Handles: create, update, delete, and any custom actions
 * ALWAYS includes token, tok, Tok headers via axios interceptor
 */
export const POST = async (endpoint, data = {}, action = 'create') => {
  try {
    let payload;
    
    // Handle FormData (for file uploads) differently
    if (data instanceof FormData) {
      payload = data;
      // Add action and method to FormData
      payload.append('_action', action);
      payload.append('_method', action === 'delete' ? 'DELETE' : (action === 'update' ? 'PUT' : 'POST'));
    } else {
      // Regular object data
      payload = {
        ...data,
        _action: action, // Backend can use this to determine operation type
        _method: action === 'delete' ? 'DELETE' : (action === 'update' ? 'PUT' : 'POST')
      };
    }
    
    const response = await api.post(endpoint, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// **********************************************
// AUTHENTICATION API ENDPOINTS
// **********************************************
const authAPI = {
  login: (credentials) => POST('/login', credentials),
  register: (userData) => POST('/register', userData),
  user: () => GET('/me'),
};

// **********************************************
// EMPLOYEES API ENDPOINTS  
// **********************************************
const employeesAPI = {
  getAll: (params = {}) => GET('/api/User', params), // Correct endpoint for employees
  getById: (id) => GET(`/api/User/${id}`),
  create: (data) => POST('/api/User', data),
  update: (id, data) => POST(`/api/User/${id}`, { ...data, _method: 'PUT' }),
  delete: (id) => POST(`/api/User/${id}`, { _method: 'DELETE' })
};

// Export the universal methods as default
export default {
  GET,
  POST,
  // Keep only auth API
  auth: authAPI,
  // Add employees API
  employees: employeesAPI,
  // Direct access to axios instance if needed
  api
};
