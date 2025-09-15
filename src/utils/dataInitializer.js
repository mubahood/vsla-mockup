/**
 * Data Initialization Utility
 * Ensures seed data is loaded into localStorage for all MIS modules
 */

import { 
  GROUPS_DATA, 
  TRAINING_SESSIONS, 
  MARKETPLACE_LISTINGS, 
  VSLA_TRANSACTIONS, 
  ADVISORY_CONTENT, 
  MONITORING_DATA 
} from '../data/seedData';
import { saveData, getData } from './storage';

/**
 * Initialize all required data for MIS modules
 */
export const initializeAppData = () => {
  console.log('🔄 Initializing FOSTER Project MIS data...');
  
  // Initialize groups data for Digital Registry
  if (!getData('groups') || getData('groups').length === 0) {
    console.log('📋 Initializing groups data...');
    saveData('groups', GROUPS_DATA);
  }
  
  // Initialize training sessions
  if (!getData('trainingSessions') || getData('trainingSessions').length === 0) {
    console.log('🎓 Initializing training sessions data...');
    saveData('trainingSessions', TRAINING_SESSIONS);
  }
  
  // Initialize marketplace listings
  if (!getData('marketplaceListings') || getData('marketplaceListings').length === 0) {
    console.log('🏪 Initializing marketplace data...');
    saveData('marketplaceListings', MARKETPLACE_LISTINGS);
  }
  
  // Initialize VSLA transactions
  if (!getData('vslaTransactions') || getData('vslaTransactions').length === 0) {
    console.log('💰 Initializing VSLA transactions data...');
    saveData('vslaTransactions', VSLA_TRANSACTIONS);
  }
  
  // Initialize advisory content
  if (!getData('advisoryContent') || getData('advisoryContent').length === 0) {
    console.log('📚 Initializing advisory content data...');
    saveData('advisoryContent', ADVISORY_CONTENT);
  }
  
  // Initialize monitoring data
  if (!getData('monitoringData')) {
    console.log('📊 Initializing monitoring data...');
    saveData('monitoringData', MONITORING_DATA);
  }
  
  // Initialize complete dataset for dashboard
  const fosterMISData = {
    groups: GROUPS_DATA,
    trainingSessions: TRAINING_SESSIONS,
    marketplaceListings: MARKETPLACE_LISTINGS,
    vslaTransactions: VSLA_TRANSACTIONS,
    advisoryContent: ADVISORY_CONTENT,
    monitoringData: MONITORING_DATA,
    lastUpdated: new Date().toISOString()
  };
  
  if (!getData('fosterMISData')) {
    console.log('🎯 Initializing complete MIS dataset...');
    saveData('fosterMISData', fosterMISData);
  }
  
  console.log('✅ FOSTER Project MIS data initialization complete!');
  console.log(`📈 ${GROUPS_DATA.length} groups loaded`);
  console.log(`🎓 ${TRAINING_SESSIONS.length} training sessions loaded`);
  console.log(`🏪 ${MARKETPLACE_LISTINGS.length} marketplace listings loaded`);
  console.log(`💰 ${VSLA_TRANSACTIONS.length} VSLA transactions loaded`);
  
  return fosterMISData;
};

/**
 * Check if data is properly initialized
 */
export const isDataInitialized = () => {
  return (
    getData('groups') && getData('groups').length > 0 &&
    getData('fosterMISData') && 
    getData('trainingSessions') && getData('trainingSessions').length > 0
  );
};

/**
 * Reset all data (useful for testing)
 */
export const resetAllData = () => {
  localStorage.removeItem('groups');
  localStorage.removeItem('trainingSessions');
  localStorage.removeItem('marketplaceListings');
  localStorage.removeItem('vslaTransactions');
  localStorage.removeItem('advisoryContent');
  localStorage.removeItem('monitoringData');
  localStorage.removeItem('fosterMISData');
  console.log('🗑️ All FOSTER Project MIS data cleared');
};
