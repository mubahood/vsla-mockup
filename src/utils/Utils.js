/**
 * MOCK UTILS - NO BACKEND CONNECTIONS
 * Utility functions for mock data management
 */

import { DB_TOKEN, DB_LOGGED_IN_PROFILE, DB_MANIFEST } from '../constants/Constants';
import { MOCK_MANIFEST, MOCK_USERS } from '../data/mockData';

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
    // Silent fallback for mock mode
    console.log(`[MOCK TOAST ${type.toUpperCase()}]: ${message}`);
  }

  /**
   * Save data to localStorage
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   */
  static saveToDatabase(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Load data from localStorage
   * @param {string} key - Storage key
   * @returns {*} Stored value or null
   */
  static loadFromDatabase(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  }

  /**
   * Delete data from localStorage
   * @param {string} key - Storage key
   */
  static deleteFromDatabase(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error deleting from localStorage:', error);
    }
  }

  /**
   * Get logged in user from storage (mock implementation)
   * @returns {Promise<Object|null>} User object or null
   */
  static async get_logged_in_user() {
    try {
      // Simulate small delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const user = Utils.loadFromDatabase(DB_LOGGED_IN_PROFILE);
      return user;
    } catch (error) {
      console.error('Error getting logged in user:', error);
      return null;
    }
  }

  /**
   * Mock update logged in user (no backend call)
   * @returns {Promise<Object|null>} Updated user or null
   */
  static async update_logged_in_user() {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const token = Utils.loadFromDatabase(DB_TOKEN);
      if (!token || !token.startsWith('mock_token_')) {
        return null;
      }

      // Extract user ID from token
      const tokenParts = token.split('_');
      if (tokenParts.length > 2) {
        const userId = parseInt(tokenParts[2]);
        const users = Utils.loadFromDatabase('hospital_mock_users') || MOCK_USERS;
        const user = users.find(u => u.id === userId);
        
        if (user) {
          Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, user);
          return user;
        }
      }

      return null;
    } catch (error) {
      console.error('Error updating logged in user:', error);
      return null;
    }
  }

  /**
   * Mock get manifest (no backend call)
   * @returns {Promise<Object>} Manifest data
   */
  static async get_manifest() {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      let manifest = Utils.loadFromDatabase(DB_MANIFEST);
      if (!manifest) {
        manifest = MOCK_MANIFEST;
        Utils.saveToDatabase(DB_MANIFEST, manifest);
      }
      
      return manifest;
    } catch (error) {
      console.error('Error getting manifest:', error);
      return MOCK_MANIFEST;
    }
  }

  /**
   * Format currency value
   * @param {number} amount - Amount to format
   * @param {string} currency - Currency code
   * @returns {string} Formatted currency
   */
  static formatCurrency(amount, currency = 'UGX') {
    try {
      if (currency === 'UGX') {
        return `UGX ${amount.toLocaleString()}`;
      }
      return `${currency} ${amount.toLocaleString()}`;
    } catch (error) {
      return `${currency} ${amount}`;
    }
  }

  /**
   * Format date
   * @param {string|Date} date - Date to format
   * @param {string} format - Format string
   * @returns {string} Formatted date
   */
  static formatDate(date, format = 'YYYY-MM-DD') {
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return date;
      }

      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');

      switch (format) {
        case 'YYYY-MM-DD':
          return `${year}-${month}-${day}`;
        case 'DD/MM/YYYY':
          return `${day}/${month}/${year}`;
        case 'MM/DD/YYYY':
          return `${month}/${day}/${year}`;
        default:
          return dateObj.toLocaleDateString();
      }
    } catch (error) {
      return date;
    }
  }

  /**
   * Request notification permission
   */
  static async requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  }

  /**
   * Generate unique ID
   * @returns {string} Unique ID
   */
  static generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Check if object contains files (for form uploads)
   * @param {Object} obj - Object to check
   * @returns {boolean} Contains files
   */
  static containsFiles(obj) {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    for (const value of Object.values(obj)) {
      if (value instanceof File || value instanceof FileList) {
        return true;
      }
      if (Array.isArray(value) && value.some(item => item instanceof File)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Convert file to base64
   * @param {File} file - File to convert
   * @returns {Promise<string>} Base64 string
   */
  static fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  /**
   * Debounce function
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in ms
   * @returns {Function} Debounced function
   */
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Deep clone object
   * @param {*} obj - Object to clone
   * @returns {*} Cloned object
   */
  static deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }

    if (obj instanceof Array) {
      return obj.map(item => Utils.deepClone(item));
    }

    if (typeof obj === 'object') {
      const clonedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = Utils.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }

    return obj;
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
   * Validate phone number format
   * @param {string} phone - Phone number to validate
   * @returns {boolean} Is valid phone
   */
  static isValidPhone(phone) {
    const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/;
    return phoneRegex.test(phone);
  }

  /**
   * Truncate text
   * @param {string} text - Text to truncate
   * @param {number} length - Max length
   * @returns {string} Truncated text
   */
  static truncateText(text, length = 100) {
    if (!text || text.length <= length) {
      return text;
    }
    return text.substring(0, length) + '...';
  }

  /**
   * Capitalize first letter
   * @param {string} text - Text to capitalize
   * @returns {string} Capitalized text
   */
  static capitalize(text) {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  /**
   * Generate random color
   * @returns {string} Random hex color
   */
  static randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  /**
   * Convert to slug
   * @param {string} text - Text to convert
   * @returns {string} Slug
   */
  static toSlug(text) {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }

  /**
   * Calculate age from date of birth
   * @param {string} dob - Date of birth
   * @returns {number} Age in years
   */
  static calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * Get initials from name
   * @param {string} name - Full name
   * @returns {string} Initials
   */
  static getInitials(name) {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }

  /**
   * Check if user is online
   * @returns {boolean} Is online
   */
  static isOnline() {
    return navigator.onLine;
  }

  /**
   * Mock network status (always returns true for demo)
   * @returns {boolean} Network status
   */
  static isConnected() {
    return true; // Always connected for mock
  }
}

export default Utils;
