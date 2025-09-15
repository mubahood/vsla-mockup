import { useState, useEffect } from 'react';
import ManifestService from '../services/ManifestService';

/**
 * Hook for managing manifest data
 * @returns {Object} Manifest state and methods
 */
export const useManifest = () => {
  const [manifest, setManifest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeManifest();
  }, []);

  const initializeManifest = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const manifestData = await ManifestService.initialize();
      setManifest(manifestData);
    } catch (err) {
      setError('Failed to load application data');
    } finally {
      setLoading(false);
    }
  };

  const refreshManifest = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const manifestData = await ManifestService.refresh();
      setManifest(manifestData);
      return manifestData;
    } catch (err) {
      setError('Failed to refresh application data');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getNavigationMenu = () => {
    return ManifestService.getNavigationMenu();
  };

  const getAdminMenu = () => {
    return ManifestService.getAdminMenu();
  };

  const getPublicMenu = () => {
    return ManifestService.getPublicMenu();
  };

  const getDropdownOptions = (key) => {
    return ManifestService.getDropdownOptions(key);
  };

  const getGenderOptions = () => {
    return ManifestService.getGenderOptions();
  };

  const getBloodTypeOptions = () => {
    return ManifestService.getBloodTypeOptions();
  };

  const getMaritalStatusOptions = () => {
    return ManifestService.getMaritalStatusOptions();
  };

  const getDepartmentOptions = () => {
    return ManifestService.getDepartmentOptions();
  };

  const getSpecializationOptions = () => {
    return ManifestService.getSpecializationOptions();
  };

  const getCountryOptions = () => {
    return ManifestService.getCountryOptions();
  };

  const getAppointmentStatusOptions = () => {
    return ManifestService.getAppointmentStatusOptions();
  };

  const getUserRoleOptions = () => {
    return ManifestService.getUserRoleOptions();
  };

  const getAppSettings = () => {
    return ManifestService.getAppSettings();
  };

  const getSystemNotifications = () => {
    return ManifestService.getSystemNotifications();
  };

  const getUserPreferences = () => {
    return ManifestService.getUserPreferences();
  };

  return {
    manifest,
    loading,
    error,
    refreshManifest,
    getNavigationMenu,
    getAdminMenu,
    getPublicMenu,
    getDropdownOptions,
    getGenderOptions,
    getBloodTypeOptions,
    getMaritalStatusOptions,
    getDepartmentOptions,
    getSpecializationOptions,
    getCountryOptions,
    getAppointmentStatusOptions,
    getUserRoleOptions,
    getAppSettings,
    getSystemNotifications,
    getUserPreferences
  };
};
