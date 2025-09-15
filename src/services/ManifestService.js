/**
 * MOCK MANIFEST SERVICE - NO BACKEND CONNECTIONS
 * Provides system configuration and manifest data from mock sources
 */

import Utils from "../utils/Utils";
import { MOCK_MANIFEST } from "../data/mockData";
import { DB_MANIFEST } from "../constants/Constants";

class ManifestService {
  static instance = null;
  static manifest = null;

  constructor() {
    if (ManifestService.instance) {
      return ManifestService.instance;
    }
    ManifestService.instance = this;
  }

  /**
   * Get singleton instance
   */
  static getInstance() {
    if (!ManifestService.instance) {
      ManifestService.instance = new ManifestService();
    }
    return ManifestService.instance;
  }

  /**
   * Get system manifest/configuration (mock implementation)
   * @returns {Promise<Object>} Manifest data
   */
  static async getManifest() {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Check if manifest is cached in memory
      if (ManifestService.manifest) {
        return ManifestService.manifest;
      }

      // Try to load from localStorage first
      let manifest = Utils.loadFromDatabase(DB_MANIFEST);
      
      if (!manifest) {
        // Use default mock manifest
        manifest = { ...MOCK_MANIFEST };
        
        // Add some dynamic data
        manifest.last_updated = new Date().toISOString();
        manifest.system_status = 'operational';
        manifest.total_users = 25;
        manifest.total_patients = 100;
        
        // Save to localStorage
        Utils.saveToDatabase(DB_MANIFEST, manifest);
      }

      // Cache in memory
      ManifestService.manifest = manifest;

      return manifest;
    } catch (error) {
      console.error('Error getting manifest:', error);
      
      // Return default manifest on error
      const defaultManifest = { ...MOCK_MANIFEST };
      ManifestService.manifest = defaultManifest;
      return defaultManifest;
    }
  }

  /**
   * Get hospital basic information
   * @returns {Promise<Object>} Hospital info
   */
  static async getHospitalInfo() {
    const manifest = await ManifestService.getManifest();
    
    return {
      name: manifest.hospital_name || 'General Hospital',
      address: manifest.hospital_address || '123 Healthcare Street, Kampala, Uganda',
      phone: manifest.hospital_phone || '256700000000',
      email: manifest.hospital_email || 'info@generalhospital.com',
      logo: manifest.logo || '/logo192.png',
      theme_color: manifest.theme_color || '#2563eb',
      currency: manifest.currency || 'UGX',
      timezone: manifest.timezone || 'Africa/Kampala'
    };
  }

  /**
   * Get system features configuration
   * @returns {Promise<Object>} Features config
   */
  static async getFeatures() {
    const manifest = await ManifestService.getManifest();
    
    return manifest.features || {
      appointments: true,
      billing: true,
      laboratory: true,
      pharmacy: true,
      emergency: true,
      telemedicine: false,
      mobile_app: false
    };
  }

  /**
   * Check if a feature is enabled
   * @param {string} featureName - Name of the feature
   * @returns {Promise<boolean>} Is feature enabled
   */
  static async isFeatureEnabled(featureName) {
    const features = await ManifestService.getFeatures();
    return features[featureName] === true;
  }

  /**
   * Update manifest data (mock implementation)
   * @param {Object} updates - Updates to apply
   * @returns {Promise<Object>} Updated manifest
   */
  static async updateManifest(updates) {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const currentManifest = await ManifestService.getManifest();
      const updatedManifest = {
        ...currentManifest,
        ...updates,
        last_updated: new Date().toISOString()
      };

      // Save to localStorage
      Utils.saveToDatabase(DB_MANIFEST, updatedManifest);
      
      // Update memory cache
      ManifestService.manifest = updatedManifest;

      return updatedManifest;
    } catch (error) {
      console.error('Error updating manifest:', error);
      throw new Error('Failed to update system configuration');
    }
  }

  /**
   * Get system version info
   * @returns {Promise<Object>} Version info
   */
  static async getVersionInfo() {
    const manifest = await ManifestService.getManifest();
    
    return {
      version: manifest.version || '1.0.0',
      build: manifest.build || 'mock-build-001',
      release_date: manifest.release_date || '2024-03-01',
      environment: 'development-mock'
    };
  }

  /**
   * Get system statistics
   * @returns {Promise<Object>} System stats
   */
  static async getSystemStats() {
    const manifest = await ManifestService.getManifest();
    
    // Calculate some mock statistics
    const stats = {
      total_users: manifest.total_users || 25,
      total_patients: manifest.total_patients || 100,
      active_sessions: Math.floor(Math.random() * 10) + 1,
      system_uptime: '99.9%',
      last_backup: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      storage_used: '2.5 GB',
      storage_available: '47.5 GB'
    };

    return stats;
  }

  /**
   * Get supported languages
   * @returns {Promise<Array>} Supported languages
   */
  static async getSupportedLanguages() {
    return [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
      { code: 'lg', name: 'Luganda', flag: '🇺🇬' }
    ];
  }

  /**
   * Get system notifications/announcements
   * @returns {Promise<Array>} System notifications
   */
  static async getSystemNotifications() {
    return [
      {
        id: 1,
        type: 'info',
        title: 'System Running in Demo Mode',
        message: 'This is a demonstration version with mock data only.',
        created_at: new Date().toISOString(),
        is_read: false
      },
      {
        id: 2,
        type: 'success',
        title: 'Mock Data Initialized',
        message: 'Sample patients, staff, and appointments have been loaded.',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        is_read: false
      }
    ];
  }

  /**
   * Reset manifest to defaults
   * @returns {Promise<Object>} Reset manifest
   */
  static async resetToDefaults() {
    try {
      // Remove from localStorage
      Utils.deleteFromDatabase(DB_MANIFEST);
      
      // Clear memory cache
      ManifestService.manifest = null;
      
      // Get fresh manifest (will use defaults)
      const manifest = await ManifestService.getManifest();
      
      return manifest;
    } catch (error) {
      console.error('Error resetting manifest:', error);
      throw new Error('Failed to reset system configuration');
    }
  }

  /**
   * Export manifest data
   * @returns {Promise<string>} JSON string of manifest
   */
  static async exportManifest() {
    const manifest = await ManifestService.getManifest();
    return JSON.stringify(manifest, null, 2);
  }

  /**
   * Import manifest data
   * @param {string} manifestJson - JSON string of manifest
   * @returns {Promise<Object>} Imported manifest
   */
  static async importManifest(manifestJson) {
    try {
      const manifest = JSON.parse(manifestJson);
      
      // Validate basic structure
      if (!manifest || typeof manifest !== 'object') {
        throw new Error('Invalid manifest format');
      }

      // Apply import
      return await ManifestService.updateManifest(manifest);
    } catch (error) {
      console.error('Error importing manifest:', error);
      throw new Error('Failed to import system configuration');
    }
  }
}

export default ManifestService;
