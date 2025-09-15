/**
 * Local Storage Utility Helper for FOSTER Project MIS
 * Provides consistent data persistence across the application
 */

const STORAGE_PREFIX = 'foster_mis_';

/**
 * Save data to local storage with error handling
 * @param {string} key - Storage key
 * @param {any} data - Data to store
 * @returns {boolean} - Success status
 */
export const saveData = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(STORAGE_PREFIX + key, serializedData);
    return true;
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
    return false;
  }
};

/**
 * Get data from local storage with error handling
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} - Retrieved data or default value
 */
export const getData = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error('Error reading data from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Remove data from local storage
 * @param {string} key - Storage key
 * @returns {boolean} - Success status
 */
export const removeData = (key) => {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
    return true;
  } catch (error) {
    console.error('Error removing data from localStorage:', error);
    return false;
  }
};

/**
 * Clear all FOSTER MIS data from local storage
 * @returns {boolean} - Success status
 */
export const clearAllData = () => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    return true;
  } catch (error) {
    console.error('Error clearing data from localStorage:', error);
    return false;
  }
};

/**
 * Check if data exists in local storage
 * @param {string} key - Storage key
 * @returns {boolean} - Whether key exists
 */
export const hasData = (key) => {
  return localStorage.getItem(STORAGE_PREFIX + key) !== null;
};

/**
 * Get all FOSTER MIS keys from local storage
 * @returns {string[]} - Array of keys
 */
export const getAllKeys = () => {
  const keys = Object.keys(localStorage);
  return keys
    .filter(key => key.startsWith(STORAGE_PREFIX))
    .map(key => key.replace(STORAGE_PREFIX, ''));
};

/**
 * Get storage statistics
 * @returns {object} - Storage usage info
 */
export const getStorageInfo = () => {
  const keys = getAllKeys();
  let totalSize = 0;
  
  keys.forEach(key => {
    const data = localStorage.getItem(STORAGE_PREFIX + key);
    if (data) {
      totalSize += data.length;
    }
  });
  
  return {
    keysCount: keys.length,
    totalSize: totalSize,
    totalSizeKB: Math.round(totalSize / 1024 * 100) / 100
  };
};

// Storage keys constants for consistency
export const STORAGE_KEYS = {
  FFS_GROUPS: 'ffs_groups',
  FBS_GROUPS: 'fbs_groups',
  VSLA_GROUPS: 'vsla_groups',
  TRAINING_SESSIONS: 'training_sessions',
  VSLA_TRANSACTIONS: 'vsla_transactions',
  ADVISORY_ARTICLES: 'advisory_articles',
  MARKET_LISTINGS: 'market_listings',
  DASHBOARD_STATS: 'dashboard_stats',
  USER_PREFERENCES: 'user_preferences'
};

export default {
  saveData,
  getData,
  removeData,
  clearAllData,
  hasData,
  getAllKeys,
  getStorageInfo,
  STORAGE_KEYS
};
