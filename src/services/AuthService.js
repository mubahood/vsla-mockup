/**
 * MOCK AUTH SERVICE - NO BACKEND CONNECTIONS
 * Complete dummy implementation for authentication
 */

import Utils from '../utils/Utils';
import { DB_TOKEN, DB_LOGGED_IN_PROFILE } from '../constants/Constants';
import ProfileModel from '../models/ProfileModel';
import { MOCK_USERS, generateMockStaff } from '../data/mockData';

class AuthService {
  /**
   * Get all users (for demo purposes)
   */
  static getMockUsers() {
    const savedUsers = Utils.loadFromDatabase('hospital_mock_users');
    return savedUsers || generateMockStaff(25);
  }

  /**
   * Login user with email and password
   * @param {string} email - User email/username
   * @param {string} password - User password
   * @returns {Promise<Object>} Login result
   */
  static async login(email, password) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const users = AuthService.getMockUsers();
      let user = users.find(u => 
        (u.email === email || 
         u.username === email ||
         u.phone_number_1 === email ||
         u.id.toString() === email) &&
        u.status === 1
      );

      // If no user found, create a default user for demo purposes
      if (!user) {
        user = {
          id: 999,
          name: email.includes('@') ? email.split('@')[0] : email,
          first_name: email.includes('@') ? email.split('@')[0] : email,
          last_name: 'Demo User',
          email: email,
          username: email,
          phone_number_1: '+256700000000',
          role: 'admin',
          department: 'FOSTER Project',
          status: 1,
          avatar: null,
          address: 'Karamoja, Uganda',
          date_of_birth: '1985-01-01',
          gender: 'male',
          nationality: 'Ugandan',
          created_at: new Date().toISOString()
        };
      }

      // Check credentials - Accept any password for demo mode
      if (user && password && password.length > 0) {
        // Generate mock token
        const token = `mock_token_${Date.now()}_${user.id}`;
        
        // Save token
        Utils.saveToDatabase(DB_TOKEN, token);

        // Create user profile with token
        const userWithToken = { ...user, token, remember_token: token };
        const userProfile = new ProfileModel(userWithToken);
        Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, userProfile.toJson());

        return {
          success: true,
          message: 'Login successful',
          data: userWithToken
        };
      } else {
        return {
          success: false,
          message: 'Please enter both username/email and password.',
          errors: {}
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Login failed. Please try again.',
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
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const users = AuthService.getMockUsers();
      const existingUser = users.find(u => u.email === userData.email);

      if (existingUser) {
        return {
          success: false,
          message: 'User with this email already exists',
          errors: { email: ['Email already taken'] }
        };
      }

      // Create new user
      const newUser = {
        id: users.length + 1,
        name: userData.name,
        first_name: userData.name.split(' ')[0],
        last_name: userData.name.split(' ').slice(1).join(' '),
        email: userData.email,
        username: userData.email.split('@')[0],
        phone_number_1: userData.phone || '',
        role: 'doctor',
        department: 'General',
        status: 1,
        avatar: null,
        created_at: new Date().toISOString()
      };

      // Add to users list and save
      users.push(newUser);
      Utils.saveToDatabase('hospital_mock_users', users);

      // Generate token
      const token = `mock_token_${Date.now()}_${newUser.id}`;
      newUser.token = token;
      newUser.remember_token = token;

      // Save token and profile
      Utils.saveToDatabase(DB_TOKEN, token);
      const userProfile = new ProfileModel(newUser);
      Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, userProfile.toJson());

      return {
        success: true,
        message: 'Registration successful',
        data: newUser
      };
    } catch (error) {
      return {
        success: false,
        message: 'Registration failed. Please try again.',
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
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 200));

      // Clear local storage
      Utils.deleteFromDatabase(DB_TOKEN);
      Utils.deleteFromDatabase(DB_LOGGED_IN_PROFILE);

      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      // Clear storage even if there's an error
      Utils.deleteFromDatabase(DB_TOKEN);
      Utils.deleteFromDatabase(DB_LOGGED_IN_PROFILE);

      return {
        success: true,
        message: 'Logged out successfully'
      };
    }
  }

  /**
   * Get current user profile
   * @returns {Promise<ProfileModel|null>} User profile
   */
  static async getCurrentUser() {
    try {
      // Check if token exists and is valid
      const token = Utils.loadFromDatabase(DB_TOKEN);
      if (!token || !token.startsWith('mock_token_')) {
        return null;
      }

      // Get user from local storage first
      const localUser = Utils.loadFromDatabase(DB_LOGGED_IN_PROFILE);
      if (localUser) {
        return new ProfileModel(localUser);
      }

      // If no local user, extract from token
      const tokenParts = token.split('_');
      if (tokenParts.length > 2) {
        const userId = parseInt(tokenParts[2]);
        const users = AuthService.getMockUsers();
        const user = users.find(u => u.id === userId);
        
        if (user) {
          const userProfile = new ProfileModel(user);
          Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, userProfile.toJson());
          return userProfile;
        }
      }

      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
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
    
    // Basic token validation - check if token exists and is mock token
    if (!token || typeof token !== 'string' || !token.startsWith('mock_token_')) {
      return false;
    }
    
    // Check if user profile exists
    if (!user || typeof user !== 'object') {
      return false;
    }
    
    return true;
  }

  /**
   * Get token from storage
   * @returns {string|null} Current token
   */
  static getToken() {
    return Utils.loadFromDatabase(DB_TOKEN);
  }

  /**
   * Validate token format (mock tokens always valid)
   * @returns {boolean} Token is valid
   */
  static isTokenLikelyExpired() {
    const token = Utils.loadFromDatabase(DB_TOKEN);
    
    if (!token || !token.startsWith('mock_token_')) {
      return true;
    }
    
    // Mock tokens never expire for demo purposes
    return false;
  }

  /**
   * Mock forgot password
   * @param {string} email - User email
   * @returns {Promise<Object>} Result
   */
  static async forgotPassword(email) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const users = AuthService.getMockUsers();
      const user = users.find(u => u.email === email);

      if (user) {
        return {
          success: true,
          message: 'Password reset instructions sent to your email (Mock)'
        };
      } else {
        return {
          success: false,
          message: 'No user found with this email address'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send reset email. Please try again.'
      };
    }
  }

  /**
   * Mock reset password
   * @param {Object} resetData - Reset password data
   * @returns {Promise<Object>} Result
   */
  static async resetPassword(resetData) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        success: true,
        message: 'Password reset successfully (Mock)'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to reset password. Please try again.'
      };
    }
  }

  /**
   * Mock verify email
   * @param {string} token - Verification token
   * @returns {Promise<Object>} Result
   */
  static async verifyEmail(token) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        success: true,
        message: 'Email verified successfully (Mock)'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to verify email. Please try again.'
      };
    }
  }

  /**
   * Mock resend verification email
   * @returns {Promise<Object>} Result
   */
  static async resendVerificationEmail() {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        success: true,
        message: 'Verification email sent successfully (Mock)'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send verification email. Please try again.'
      };
    }
  }

  /**
   * Mock change password
   * @param {Object} passwordData - Password change data
   * @returns {Promise<Object>} Result
   */
  static async changePassword(passwordData) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        success: true,
        message: 'Password changed successfully (Mock)'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to change password. Please try again.'
      };
    }
  }

  /**
   * Mock update profile
   * @param {Object} profileData - Profile update data
   * @returns {Promise<Object>} Result
   */
  static async updateProfile(profileData) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const currentUser = Utils.loadFromDatabase(DB_LOGGED_IN_PROFILE);
      if (currentUser) {
        const updatedUser = { ...currentUser, ...profileData };
        Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, updatedUser);

        return {
          success: true,
          message: 'Profile updated successfully',
          data: updatedUser
        };
      }

      return {
        success: false,
        message: 'User not found'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update profile. Please try again.'
      };
    }
  }

  /**
   * Mock upload avatar
   * @param {File} file - Avatar file
   * @returns {Promise<Object>} Result
   */
  static async uploadAvatar(file) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create mock avatar URL
      const mockAvatarUrl = URL.createObjectURL(file);

      const currentUser = Utils.loadFromDatabase(DB_LOGGED_IN_PROFILE);
      if (currentUser) {
        currentUser.avatar = mockAvatarUrl;
        Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, currentUser);

        return {
          success: true,
          message: 'Avatar uploaded successfully',
          data: { avatar: mockAvatarUrl }
        };
      }

      return {
        success: false,
        message: 'User not found'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to upload avatar. Please try again.'
      };
    }
  }

  /**
   * Mock refresh token
   * @returns {Promise<Object>} Result
   */
  static async refreshToken() {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      const currentUser = Utils.loadFromDatabase(DB_LOGGED_IN_PROFILE);
      if (currentUser) {
        // Generate new token
        const newToken = `mock_token_${Date.now()}_${currentUser.id}`;
        Utils.saveToDatabase(DB_TOKEN, newToken);

        return {
          success: true,
          message: 'Token refreshed successfully',
          data: { token: newToken }
        };
      }

      return {
        success: false,
        message: 'User not found'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to refresh token. Please try again.'
      };
    }
  }
}

export default AuthService;
