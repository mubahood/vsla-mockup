/**
 * TOKEN MANAGER SINGLETON
 * 
 * Centralized token management for the entire application.
 * All token operations MUST go through this class.
 * 
 * Key Features:
 * - Uses DB_TOKEN as the storage key (not auth_token)
 * - Automatically strips quotes from tokens
 * - Singleton pattern ensures consistency
 * - Validation and debugging capabilities
 */

class TokenManager {
  static instance = null;
  static TOKEN_KEY = 'DB_TOKEN'; // Official token storage key

  constructor() {
    if (TokenManager.instance) {
      return TokenManager.instance;
    }
    TokenManager.instance = this;
  }

  /**
   * Get singleton instance
   * @returns {TokenManager} TokenManager instance
   */
  static getInstance() {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  /**
   * Save token to localStorage
   * Automatically strips quotes and validates format
   * @param {string} token - JWT token
   * @returns {boolean} Success status
   */
  setToken(token) {
    try {
      if (!token) {
        console.warn('⚠️ TokenManager: Attempting to save empty token');
        this.removeToken();
        return false;
      }

      // Strip quotes if present - this is CRITICAL
      let cleanToken = token;
      if (typeof token === 'string') {
        // Remove surrounding quotes
        cleanToken = token.replace(/^["']|["']$/g, '');
        
        // Additional safety: remove any internal quotes that shouldn't be there
        cleanToken = cleanToken.trim();
      }

      // Validate token format (basic JWT structure check)
      if (!this.isValidTokenFormat(cleanToken)) {
        console.error('❌ TokenManager: Invalid token format:', {
          original: token,
          cleaned: cleanToken,
          length: cleanToken.length
        });
        return false;
      }

      // Store the clean token in both locations for compatibility
      localStorage.setItem(TokenManager.TOKEN_KEY, cleanToken);
      localStorage.setItem('auth_token', cleanToken); // Backward compatibility
      
      console.log('✅ TokenManager: Token saved successfully', {
        key: TokenManager.TOKEN_KEY,
        tokenLength: cleanToken.length,
        tokenPreview: cleanToken.substring(0, 20) + '...',
        hasQuotes: token !== cleanToken ? 'Quotes removed' : 'Clean'
      });

      return true;
    } catch (error) {
      console.error('❌ TokenManager: Error saving token:', error);
      return false;
    }
  }

  /**
   * Get token from localStorage
   * Returns clean token without quotes
   * Checks both DB_TOKEN and auth_token for backward compatibility
   * @returns {string|null} Clean JWT token or null
   */
  getToken() {
    try {
      // First check DB_TOKEN (primary storage for mock tokens)
      let token = localStorage.getItem(TokenManager.TOKEN_KEY);
      
      // Fallback to auth_token for backward compatibility
      if (!token) {
        token = localStorage.getItem('auth_token');
      }
      
      if (!token) {
        return null;
      }

      // Strip quotes if somehow they got stored
      let cleanToken = token.replace(/^["']|["']$/g, '').trim();
      
      // Validate token
      if (!this.isValidTokenFormat(cleanToken)) {
        console.warn('⚠️ TokenManager: Invalid token found in storage, removing');
        this.removeToken();
        return null;
      }

      return cleanToken;
    } catch (error) {
      console.error('❌ TokenManager: Error retrieving token:', error);
      return null;
    }
  }

    /**
   * Remove token from localStorage
   * Clears both DB_TOKEN and auth_token
   * @returns {boolean} Success status
   */
  removeToken() {
    try {
      localStorage.removeItem(TokenManager.TOKEN_KEY);
      localStorage.removeItem('auth_token'); // Backward compatibility
      
      console.log('✅ TokenManager: Token removed successfully');
      return true;
    } catch (error) {
      console.error('❌ TokenManager: Error removing token:', error);
      return false;
    }
  }

  /**
   * Check if user has a valid token
   * @returns {boolean} True if valid token exists
   */
  hasValidToken() {
    const token = this.getToken();
    return !!(token && this.isValidTokenFormat(token) && !this.isTokenExpired(token));
  }

  /**
   * Get token for Authorization header
   * @returns {string} Bearer token or empty string
   */
  getBearerToken() {
    const token = this.getToken();
    return token ? `Bearer ${token}` : '';
  }

  /**
   * Validate basic JWT token format
   * @param {string} token - Token to validate
   * @returns {boolean} True if valid format
   */
  isValidTokenFormat(token) {
    if (!token || typeof token !== 'string') {
      return false;
    }

    // Basic JWT format: xxx.yyy.zzz
    const parts = token.split('.');
    return parts.length === 3 && parts.every(part => part.length > 0);
  }

  /**
   * Check if token is expired (basic check)
   * @param {string} token - JWT token
   * @returns {boolean} True if expired
   */
  isTokenExpired(token) {
    try {
      if (!token) return true;

      // Decode JWT payload (basic)
      const parts = token.split('.');
      if (parts.length !== 3) return true;

      const payload = JSON.parse(atob(parts[1]));
      const now = Date.now() / 1000;
      
      return payload.exp && payload.exp < now;
    } catch (error) {
      console.warn('⚠️ TokenManager: Could not decode token for expiry check');
      return false; // Assume valid if we can't decode
    }
  }

  /**
   * Migrate from old token storage keys
   * Call this once on app startup
   */
  migrateFromLegacyStorage() {
    try {
      // Check for legacy tokens and migrate
      const legacyKeys = ['auth_token', 'token', 'jwt_token'];
      
      for (const key of legacyKeys) {
        const legacyToken = localStorage.getItem(key);
        if (legacyToken && !this.getToken()) {
          console.log(`🔄 TokenManager: Migrating token from ${key}`);
          this.setToken(legacyToken);
          localStorage.removeItem(key);
          break;
        }
      }
    } catch (error) {
      console.error('❌ TokenManager: Migration error:', error);
    }
  }

  /**
   * Debug information about current token state
   * @returns {Object} Debug information
   */
  getDebugInfo() {
    const token = this.getToken();
    return {
      hasToken: !!token,
      tokenKey: TokenManager.TOKEN_KEY,
      tokenLength: token ? token.length : 0,
      tokenPreview: token ? token.substring(0, 20) + '...' : null,
      isValidFormat: token ? this.isValidTokenFormat(token) : false,
      isExpired: token ? this.isTokenExpired(token) : null,
      storageContents: {
        [TokenManager.TOKEN_KEY]: localStorage.getItem(TokenManager.TOKEN_KEY),
        'auth_token': localStorage.getItem('auth_token'),
        'token': localStorage.getItem('token')
      }
    };
  }
}

// Create and export singleton instance
const tokenManager = TokenManager.getInstance();

// Auto-migrate on first load
tokenManager.migrateFromLegacyStorage();

// Make available globally in development
if (process.env.NODE_ENV === 'development') {
  window.tokenManager = tokenManager; 
}

export default tokenManager;
