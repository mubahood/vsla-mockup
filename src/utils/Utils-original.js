import { BASE_URL, DB_LOGGED_IN_PROFILE, DB_TOKEN, DB_MANIFEST } from '../constants/Constants';
import { http_get } from './Api';
import tokenManager from './TokenManager';

// Global reference to toast functions (will be set from ToastContext)
let globalToast = null;

class Utils {
  /**
   * Set global toast reference for notifications
   * @param {Object} toastFunctions - Toast context functions
   */
  static setToast(toastFunctions) {
    globalToast = toastFunctions;
  }

  /**
   * Show notification toast
   * @param {string} message - Notification message
   * @param {string} type - Notification type (success, error, warning, info)
   * @param {number} duration - Display duration in ms
   */
  static notify(message, type = 'info', duration = 5000) {
    if (globalToast && globalToast[type]) {
      return globalToast[type](message, duration);
    }
    // Silent fallback - no console logging
  }
  /**
   * Get logged in user from localStorage
   * @returns {Object|null} User profile object or null
   */
  static async get_logged_in_user() {
    const localUserData = Utils.loadFromDatabase(DB_LOGGED_IN_PROFILE);

    if (
      localUserData === null ||
      localUserData === undefined ||
      localUserData === 'undefined' ||
      localUserData === ''
    ) {
      return null;
    }
    
    return localUserData;
  }

  /**
   * Update logged in user profile from server
   * @returns {Object|null} Updated user profile or null
   */
  static async update_logged_in_user() {
    let resp = null;

    try {
      // Use centralized HTTP request from utils/Api.js
      resp = await http_get('users/me');
    } catch (error) {
      return null;
    }

    if (!resp || resp.code !== 1 || !resp.data) {
      // Only logout if the error is definitely an auth issue
      if (resp && resp.status === 401) {
        // Token expired - clear session
        Utils.saveToDatabase(DB_TOKEN, null);
        Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, null);
      }
      return null;
    }

    try {
      Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, resp.data);
      return resp.data;
    } catch (error) {
      return null;
    }
  }

  /**
   * Load manifest data (menus, options, etc.)
   * @returns {Object|null} Manifest data or null
   */
  static async load_manifest() {
    let resp = null;

    try {
      // Use centralized HTTP request from utils/Api.js
      resp = await http_get('manifest');
    } catch (error) {
      // Don't return null immediately, let the response check handle it
      // This way we can distinguish between network errors and API errors
    }

    // Check if response is valid and successful
    if (!resp || (resp.code !== undefined && resp.code !== 1)) {
      return null;
    }

    // Check if we have valid data
    if (!resp.data && !resp.menu) {
      return null;
    }

    try {
      // Save successful manifest to database
      const manifestData = resp.data || resp;
      Utils.saveToDatabase(DB_MANIFEST, manifestData);
      return manifestData;
    } catch (error) {
      // Still return the data even if saving failed
      return resp.data || resp;
    }
  }

  /**
   * Get cached manifest data
   * @returns {Object|null} Cached manifest data or null
   */
  static get_cached_manifest() {
    return Utils.loadFromDatabase(DB_MANIFEST);
  }

  /**
   * Format datetime string for display
   * @param {string} dateTimeString - ISO datetime string
   * @returns {string} Formatted datetime
   */
  static formatDateTime(dateTimeString) {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  }

  /**
   * Format date string for display
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  static formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  /**
   * Get initials from a name
   * @param {string} name - Full name
   * @returns {string} Initials
   */
  static initials(name) {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    } else if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
    }
    return '';
  }

  /**
   * Convert object to JSON string
   * @param {*} obj - Object to convert
   * @returns {string} JSON string
   */
  static toJson(obj) {
    return JSON.stringify(obj);
  }

  /**
   * Delay execution for specified seconds
   * @param {number} seconds - Seconds to delay
   * @returns {Promise} Promise that resolves after delay
   */
  static delay = (seconds) =>
    new Promise((resolve) => setTimeout(resolve, seconds * 1000));

  /**
   * Convert JSON string to object
   * @param {string} jsonStr - JSON string
   * @param {Function} Model - Model constructor (optional)
   * @returns {*} Parsed object
   */
  static fromJson(jsonStr, Model = null) {
    try {
      const obj = JSON.parse(jsonStr);
      return Model ? new Model(obj) : obj;
    } catch (error) {
      return null;
    }
  }

  /**
   * Convert list of objects to JSON string
   * @param {Array} objList - Array of objects
   * @returns {string} JSON string
   */
  static toJsonList(objList) {
    return JSON.stringify(objList);
  }

  /**
   * Delete data from localStorage
   * @param {string} localPath - Storage key
   */
  static deleteFromDatabase(localPath) {
    localStorage.removeItem(localPath);
  }

  /**
   * Save data to localStorage
   * Special handling for DB_TOKEN to avoid quotes
   * @param {string} localPath - Storage key
   * @param {*} obj - Data to save
   */
  static saveToDatabase(localPath, obj) {
    if (obj === null || obj === undefined || obj === 'undefined') {
      // Special handling for token removal
      if (localPath === DB_TOKEN) {
        tokenManager.removeToken();
      } else {
        localStorage.removeItem(localPath);
      }
      return;
    }
    
    // Special handling for DB_TOKEN to ensure no quotes
    if (localPath === DB_TOKEN) {
      tokenManager.setToken(obj);
      return;
    }
    
    try {
      localStorage.setItem(localPath, JSON.stringify(obj));
    } catch (error) {
    }
  }

  /**
   * Load data from localStorage
   * Special handling for DB_TOKEN to avoid quotes
   * @param {string} dbPath - Storage key
   * @returns {*} Loaded data or null
   */
  static loadFromDatabase(dbPath = '') {
    // Special handling for DB_TOKEN
    if (dbPath === DB_TOKEN) {
      return tokenManager.getToken();
    }
    
    const data = localStorage.getItem(dbPath);
    
    if (data === null || data === undefined || data === 'undefined' || data === '') {
      return null;
    }
    
    try {
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  /**
   * Generate unique identifier
   * @returns {string} Unique ID
   */
  static generateUniqueId() {
    return '_' + Math.random().toString(36).substring(2, 11);
  }

  /**
   * Get image URL with fallback
   * @param {string} url - Image URL or filename
   * @returns {string} Full image URL
   */
  static img(url) {
    const defaultImg = `${BASE_URL}/storage/images/default.png`;
    
    if (!url || url === 'null' || url === 'undefined' || url.length < 4) {
      return defaultImg;
    }

    let lastSegment = '';
    try {
      lastSegment = url.split('/').pop() || '';
    } catch (error) {
      return defaultImg;
    }

    if (
      lastSegment === 'undefined' ||
      lastSegment === 'null' ||
      lastSegment === '' ||
      lastSegment === 'default-company.png'
    ) {
      return defaultImg;
    }

    // Return full URL if it's already a complete URL
    if (url.startsWith('http')) {
      return url;
    }

    return `${BASE_URL}/storage/images/${lastSegment}`;
  }

  /**
   * Get file URL
   * @param {string} url - File URL or filename
   * @returns {string} Full file URL
   */
  static file(url) {
    const defaultFile = `${BASE_URL}/storage/files/default.pdf`;
    
    if (!url || url === 'null' || url === 'undefined' || url.length < 4) {
      return defaultFile;
    }

    let lastSegment = '';
    try {
      lastSegment = url.split('/').pop() || '';
    } catch (error) {
      return defaultFile;
    }

    if (
      lastSegment === 'undefined' ||
      lastSegment === 'null' ||
      lastSegment === ''
    ) {
      return defaultFile;
    }

    // Return full URL if it's already a complete URL
    if (url.startsWith('http')) {
      return url;
    }

    return `${BASE_URL}/storage/files/${lastSegment}`;
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} Is valid email
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone format
   * @param {string} phone - Phone to validate
   * @returns {boolean} Is valid phone
   */
  static isValidPhone(phone) {
    const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
    return phoneRegex.test(phone);
  }

  /**
   * Capitalize first letter of string
   * @param {string} str - String to capitalize
   * @returns {string} Capitalized string
   */
  static capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  /**
   * Truncate string to specified length
   * @param {string} str - String to truncate
   * @param {number} length - Maximum length
   * @returns {string} Truncated string
   */
  static truncate(str, length = 50) {
    if (!str) return '';
    return str.length > length ? str.substring(0, length) + '...' : str;
  }

  /**
   * Format currency
   * @param {number} amount - Amount to format
   * @param {string} currency - Currency code
   * @returns {string} Formatted currency
   */
  static formatCurrency(amount, currency = 'USD') {
    if (typeof amount !== 'number') return '0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  /**
   * Format number with commas
   * @param {number} num - Number to format
   * @returns {string} Formatted number
   */
  static formatNumber(num) {
    if (typeof num !== 'number') return '0';
    return num.toLocaleString();
  }

  /**
   * Check if user has specific role
   * @param {string} role - Role to check
   * @returns {boolean} Has role
   */
  static hasRole(role) {
    const user = Utils.get_logged_in_user();
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  }

  /**
   * Check if user has any of the specified roles
   * @param {Array} roles - Roles to check
   * @returns {boolean} Has any role
   */
  static hasAnyRole(roles) {
    const user = Utils.get_logged_in_user();
    if (!user || !user.roles) return false;
    return roles.some(role => user.roles.includes(role));
  }

  /**
   * Logout user by clearing stored data
   */
  static logout() {
    Utils.deleteFromDatabase(DB_TOKEN);
    Utils.deleteFromDatabase(DB_LOGGED_IN_PROFILE);
    Utils.deleteFromDatabase(DB_MANIFEST);
    
    // Redirect to login page
    window.location.href = '/auth/login';
  }

  /**
   * Handle API response with notifications
   * @param {Object} response - API response
   * @param {string} successMessage - Success message to show
   * @returns {boolean} Success status
   */
  static handleApiResponse(response, successMessage = 'Operation successful') {
    if (response && response.code === 1) {
      Utils.notify(successMessage, 'success');
      return true;
    } else {
      const errorMessage = response?.message || 'An error occurred';
      Utils.notify(errorMessage, 'error');
      return false;
    }
  }

  /**
   * Check if an object contains File objects (for form data detection)
   * @param {Object} obj - Object to check for File instances
   * @returns {boolean} True if object contains File objects
   */
  static containsFiles(obj) {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    const checkValue = (value) => {
      if (value instanceof File || value instanceof Blob) {
        return true;
      }
      
      if (Array.isArray(value)) {
        return value.some(item => checkValue(item));
      }
      
      if (value && typeof value === 'object') {
        return Object.values(value).some(val => checkValue(val));
      }
      
      return false;
    };

    return Object.values(obj).some(value => checkValue(value));
  }
}

export default Utils;
