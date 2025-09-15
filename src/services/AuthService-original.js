import Utils from '../utils/Utils';
import { http_get, http_post } from '../utils/Api';
import { DB_TOKEN, DB_LOGGED_IN_PROFILE, API_ENDPOINTS } from '../constants/Constants';
import ProfileModel from '../models/ProfileModel';

class AuthService {
  /**
   * Login user with email and password
   * @param {string} email - User email/username
   * @param {string} password - User password
   * @returns {Promise<Object>} Login result
   */
  static async login(email, password) {
    try {
      const response = await http_post(API_ENDPOINTS.LOGIN, {
        username: email, // Backend expects 'username' field
        password
      });

      // Check if response is successful (code === 1)
      if (response && response.code === 1) {
        // Save token (backend returns it in data.token field)
        if (response.data && response.data.token) {
          Utils.saveToDatabase(DB_TOKEN, response.data.token);
        }

        // Save user profile (the entire response.data is the user object)
        const userProfile = new ProfileModel(response.data);
        Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, userProfile.toJson());

        return {
          success: true,
          message: response.message || 'Login successful',
          data: response.data
        };
      } else {
        // code === 0 means failure, show the message from response
        return {
          success: false,
          message: response?.message || 'Login failed',
          errors: {}
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please try again.',
        errors: {}
      };
    }
  }

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Registration result
   */
  static async register(userData) {
    try {
      const response = await http_post(API_ENDPOINTS.REGISTER, userData);

      if (response && response.code === 1) {
        // Save token if provided (backend returns it in data.token field)
        if (response.data.token) {
          Utils.saveToDatabase(DB_TOKEN, response.data.token);
        }

        // Save user profile (the entire response.data is the user object)
        const userProfile = new ProfileModel(response.data);
        Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, userProfile.toJson());

        return {
          success: true,
          message: response.message || 'Registration successful',
          data: response.data
        };
      } else {
        return {
          success: false,
          message: response?.message || 'Registration failed',
          errors: response?.errors || {}
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please try again.',
        errors: {}
      };
    }
  }

  /**
   * Logout user
   * @returns {Promise<Object>} Logout result
   */
  static async logout() {
    try {
      // Call logout endpoint
      await http_post('auth/logout', {});
    } catch (error) {
      // Continue with local logout even if API call fails
    }

    // Clear local storage
    Utils.deleteFromDatabase(DB_TOKEN);
    Utils.deleteFromDatabase(DB_LOGGED_IN_PROFILE);

    return {
      success: true,
      message: 'Logged out successfully'
    };
  }

  /**
   * Get current user profile
   * @returns {Promise<ProfileModel|null>} User profile
   */
  static async getCurrentUser() {
    try {
      
      // Check if token is likely expired before making API call
      if (AuthService.isTokenLikelyExpired()) {
        // Clear expired token
        Utils.deleteFromDatabase(DB_TOKEN);
        Utils.deleteFromDatabase(DB_LOGGED_IN_PROFILE);
        return null;
      }

      // First check localStorage
      const localUser = await Utils.get_logged_in_user();
      if (localUser) {
        // Return local user, but also try to refresh in background
        setTimeout(() => {
          Utils.update_logged_in_user().catch(error => {
          });
        }, 100);
        
        return new ProfileModel(localUser);
      }

      // If no local user, try to fetch from server (only if we have a token)
      if (AuthService.getToken()) {
        const updatedUser = await Utils.update_logged_in_user();
        if (updatedUser) {
          return new ProfileModel(updatedUser);
        }
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} Is authenticated
   */
  static isAuthenticated() {
    const token = Utils.loadFromDatabase(DB_TOKEN);
    const user = Utils.loadFromDatabase(DB_LOGGED_IN_PROFILE);
    
    // Basic token validation - check if token exists and is not empty
    if (!token || typeof token !== 'string' || token.trim().length === 0) {
      return false;
    }
    
    // Check if user profile exists
    if (!user || typeof user !== 'object') {
      return false;
    }
    
    return true;
  }

  /**
   * Check if token is likely expired (basic check)
   * @returns {boolean} Token appears to be expired
   */
  static isTokenLikelyExpired() {
    const token = Utils.loadFromDatabase(DB_TOKEN);
    
    if (!token) return true;
    
    try {
      // Basic JWT token structure check
      const parts = token.split('.');
      if (parts.length !== 3) return true;
      
      // Try to decode payload (second part)
      const payload = JSON.parse(atob(parts[1]));
      
      // Check expiration if 'exp' field exists
      if (payload.exp) {
        const now = Math.floor(Date.now() / 1000);
        return payload.exp < now;
      }
      
      return false;
    } catch (error) {
      // If we can't parse the token, consider it expired
      return true;
    }
  }

  /**
   * Get authentication token
   * @returns {string|null} Auth token
   */
  static getToken() {
    return Utils.loadFromDatabase(DB_TOKEN);
  }

  /**
   * Refresh user profile from server
   * @returns {Promise<ProfileModel|null>} Updated user profile
   */
  static async refreshUserProfile() {
    try {
      const updatedUser = await Utils.update_logged_in_user();
      if (updatedUser) {
        return new ProfileModel(updatedUser);
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise<Object>} Reset result
   */
  static async requestPasswordReset(email) {
    try {
      const response = await http_post('auth/password/email', { email });

      return {
        success: response && response.code === 1,
        message: response?.message || 'Password reset request processed',
        errors: response?.errors || {}
      };
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please try again.',
        errors: {}
      };
    }
  }

  /**
   * Reset password with token
   * @param {Object} resetData - Reset password data
   * @returns {Promise<Object>} Reset result
   */
  static async resetPassword(resetData) {
    try {
      const response = await http_post('auth/password/reset', resetData);

      return {
        success: response && response.code === 1,
        message: response?.message || 'Password reset successful',
        errors: response?.errors || {}
      };
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please try again.',
        errors: {}
      };
    }
  }

  /**
   * Verify email with token
   * @param {string} token - Verification token
   * @returns {Promise<Object>} Verification result
   */
  static async verifyEmail(token) {
    try {
      const response = await http_post('auth/email/verify', { token });

      if (response && response.code === 1) {
        // Update user profile if verification successful
        await AuthService.refreshUserProfile();
      }

      return {
        success: response && response.code === 1,
        message: response?.message || 'Email verification processed',
        errors: response?.errors || {}
      };
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please try again.',
        errors: {}
      };
    }
  }

  /**
   * Resend email verification
   * @returns {Promise<Object>} Resend result
   */
  static async resendEmailVerification() {
    try {
      const response = await http_post('auth/email/resend', {});

      return {
        success: response && response.code === 1,
        message: response?.message || 'Verification email sent',
        errors: response?.errors || {}
      };
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please try again.',
        errors: {}
      };
    }
  }

  /**
   * Change user password
   * @param {Object} passwordData - Password change data
   * @returns {Promise<Object>} Change result
   */
  static async changePassword(passwordData) {
    try {
      const response = await http_post('auth/password/change', passwordData);

      return {
        success: response && response.code === 1,
        message: response?.message || 'Password changed successfully',
        errors: response?.errors || {}
      };
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please try again.',
        errors: {}
      };
    }
  }

  /**
   * Update user profile
   * @param {Object} profileData - Profile update data
   * @returns {Promise<Object>} Update result
   */
  static async updateProfile(profileData) {
    try {
      const response = await http_post('auth/profile/update', profileData);

      if (response && response.code === 1) {
        // Update local profile data
        if (response.data.user) {
          const userProfile = new ProfileModel(response.data.user);
          Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, userProfile.toJson());
        }
      }

      return {
        success: response && response.code === 1,
        message: response?.message || 'Profile updated successfully',
        data: response?.data,
        errors: response?.errors || {}
      };
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please try again.',
        errors: {}
      };
    }
  }

  /**
   * Check user permissions
   * @param {string} permission - Permission to check
   * @returns {Promise<boolean>} Has permission
   */
  static async hasPermission(permission) {
    const user = await AuthService.getCurrentUser();
    return user ? user.hasPermission(permission) : false;
  }

  /**
   * Check user role
   * @param {string} role - Role to check
   * @returns {Promise<boolean>} Has role
   */
  static async hasRole(role) {
    const user = await AuthService.getCurrentUser();
    return user ? user.hasRole(role) : false;
  }

  /**
   * Check if user has any of the specified roles
   * @param {Array} roles - Roles to check
   * @returns {Promise<boolean>} Has any role
   */
  static async hasAnyRole(roles) {
    const user = await AuthService.getCurrentUser();
    return user ? user.hasAnyRole(roles) : false;
  }

  /**
   * Upload profile avatar
   * @param {File} file - Avatar file
   * @returns {Promise<Object>} Upload result
   */
  static async uploadAvatar(file) {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await http_post('auth/profile/avatar', formData);

      if (response && response.code === 1) {
        // Update local profile data
        await AuthService.refreshUserProfile();
      }

      return {
        success: response && response.code === 1,
        message: response?.message || 'Avatar updated successfully',
        data: response?.data,
        errors: response?.errors || {}
      };
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please try again.',
        errors: {}
      };
    }
  }

  /**
   * Refresh authentication token
   * @returns {Promise<Object>} Refresh result
   */
  static async refreshToken() {
    try {
      const response = await http_post('auth/refresh', {});

      if (response && response.code === 1 && response.data.token) {
        Utils.saveToDatabase(DB_TOKEN, response.data.token);
        return {
          success: true,
          message: 'Token refreshed successfully',
          data: response.data
        };
      }

      return {
        success: false,
        message: 'Failed to refresh token'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  }

  /**
   * Setup automatic token refresh
   * @returns {void}
   */
  static setupTokenRefresh() {
    const refreshInterval = 15 * 60 * 1000; // 15 minutes
    
    setInterval(async () => {
      if (AuthService.isAuthenticated() && !AuthService.isTokenLikelyExpired()) {
        await AuthService.refreshToken().catch(error => {
        });
      }
    }, refreshInterval);
  }
}

export default AuthService;
