/**
 * Debug utilities for development
 * Access via browser console: window.debug
 */

import ManifestService from '../services/ManifestService';
import apiService from '../services/api';
import tokenManager from './TokenManager';

const debug = {
  // Clear all caches and refresh
  refresh: () => {
    console.log('🔄 Clearing all caches and refreshing...');
    
    // Clear manifest cache
    ManifestService.clearCache();
    
    // Clear auth cache if needed
    localStorage.removeItem('app_manifest');
    
    // Reload the page
    window.location.reload();
  },
  
  // Check API status
  checkAPI: async () => {
    try {
      console.log('🔍 Checking API status...');
      const response = await apiService.auth.user();
      console.log('✅ API is working:', response);
      return response;
    } catch (error) {
      console.error('❌ API error:', error);
      return error;
    }
  },
  
  // Clear only manifest cache
  clearManifest: () => {
    console.log('🗑️ Clearing manifest cache...');
    ManifestService.clearCache();
    console.log('✅ Manifest cache cleared');
  },
  
  // Refresh only manifest
  refreshManifest: async () => {
    console.log('🔄 Refreshing manifest...');
    const manifest = await ManifestService.refresh();
    console.log('✅ Manifest refreshed:', manifest);
    return manifest;
  },
  
  // Show current state
  showState: () => {
    console.log('📊 Current App State:');
    console.log('- Manifest:', ManifestService.manifest);
    console.log('- DB_TOKEN:', tokenManager.getToken() ? 'Present' : 'Missing');
    console.log('- TokenManager Debug:', tokenManager.getDebugInfo());
    console.log('- Cached Manifest:', localStorage.getItem('app_manifest') ? 'Present' : 'Missing');
  },
  
  // Test employee API
  testEmployeeAPI: async () => {
    try {
      console.log('🧪 Testing Employee API...');
      const EmployeeModel = (await import('../models/EmployeeModel')).default;
      const result = await EmployeeModel.getAll({ page: 1, per_page: 5 });
      console.log('✅ Employee API working:', result);
      return result;
    } catch (error) {
      console.error('❌ Employee API error:', error);
      return error;
    }
  }
};

// Make available globally in development
if (process.env.NODE_ENV === 'development') {
  window.debug = debug; 
}

export default debug;
