import { http_get } from "../utils/Api";
import tokenManager from "../utils/TokenManager";

class ManifestService {
  static _manifest = null;
  static _isLoading = false;

  /**
   * Initialize man        id: "farmer_members",
        title: "Farmer Members",
        icon: "users",
        uri: "farmer-members",
        react_path: "/admin/farmer-members",
        react_component: "FarmerMembers",data from the new Laravel API
   * @returns {Promise<Object|null>} Manifest data
   */
  static async initialize() {
    // Prevent multiple simultaneous requests
    if (ManifestService._isLoading) {
      return ManifestService._manifest;
    }

    try {
      ManifestService._isLoading = true;

      // Try to load from cache first
      let manifest = ManifestService.getCachedManifest();

      if (!manifest || ManifestService.isCacheExpired(manifest)) {
        // Load fresh data from new Laravel API
        manifest = await ManifestService.loadFromAPI();

        if (manifest) {
          ManifestService.setCachedManifest(manifest);
        }
      }

      // If still no manifest, use default empty manifest to prevent errors
      if (!manifest) {
        manifest = ManifestService.getDefaultManifest();
      }

      ManifestService._manifest = manifest;
      return manifest;
    } catch (error) {
      // Return default manifest to prevent application crashes
      ManifestService._manifest = ManifestService.getDefaultManifest();
      return ManifestService._manifest;
    } finally {
      ManifestService._isLoading = false;
    }
  }

  /**
   * Load manifest from Laravel API
   * @returns {Promise<Object|null>} Manifest data
   */
  static async loadFromAPI() {
    try {
      // Check if user is authenticated using TokenManager
      const token = tokenManager.getToken();

      // Load manifest using centralized HTTP request
      const response = await http_get("manifest");

      if (response && response.code === 1) {
        return response.data;
      } else {
        console.log("ManifestService: Invalid response format");
        return null;
      }
    } catch (error) {
      console.error("ManifestService: API error:", error);
      return null;
    }
  }

  /**
   * Get cached manifest from localStorage
   * @returns {Object|null} Cached manifest or null
   */
  static getCachedManifest() {
    try {
      const cached = localStorage.getItem("app_manifest");
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Set cached manifest in localStorage
   * @param {Object} manifest - Manifest to cache
   */
  static setCachedManifest(manifest) {
    try {
      manifest.cached_at = new Date().toISOString();
      localStorage.setItem("app_manifest", JSON.stringify(manifest));
    } catch (error) {
      // Silently fail if caching fails
    }
  }

  /**
   * Check if cached manifest is expired (older than 5 minutes)
   * @param {Object} manifest - Cached manifest
   * @returns {boolean} True if expired
   */
  static isCacheExpired(manifest) {
    if (!manifest.cached_at) return true;

    const cachedTime = new Date(manifest.cached_at);
    const now = new Date();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

    return now - cachedTime > fiveMinutes;
  }

  /**
   * Clear cached manifest
   */
  static clearCache() {
    localStorage.removeItem("app_manifest");
    ManifestService._manifest = null;
  }

  /**
   * Refresh manifest from API
   * @returns {Promise<Object|null>} Fresh manifest data
   */
  static async refresh() {
    ManifestService.clearCache();
    return await ManifestService.initialize();
  }

  /**
   * Get default empty manifest to prevent application crashes
   * @returns {Object} Default manifest structure
   */
  static getDefaultManifest() {
    return {
      app: {
        name: "FOSTER Project Agricultural MIS",
        company: {
          name: "FOSTER Project",
          tagline: "Agricultural Development and Resilience Building",
        },
      },
      navigation: {
        main_menu: [],
        admin_menu: ManifestService.getDefaultAdminMenu(),
        public_menu: ManifestService.getDefaultPublicMenu(),
        user_menu: [],
        footer_menu: {},
      },
      permissions: {
        role: "guest",
        permissions: [],
        is_admin: false,
        is_agricultural_specialist: false,
        is_field_officer: false,
        is_staff: false,
      },
      options: ManifestService.getDefaultOptions(),
      ui: ManifestService.getDefaultUIConstants(),
      meta: {
        loaded: false,
        source: "default",
      },
      version: {
        api_version: "1.0.0",
        frontend_version: "1.0.0",
      },
      generated_at: new Date().toISOString(),
      user_context: null,
    };
  }

  /**
   * Get default admin menu for fallback
   * @returns {Array} Default admin menu items
   */
  static getDefaultAdminMenu() {
    return [
      {
        id: "dashboard",
        title: "Dashboard",
        icon: "BarChart3",
        uri: "dashboard",
        react_path: "/admin/dashboard",
        react_component: "Dashboard",
        order: 1,
      },
      {
        id: "employees",
        title: "Employees",
        icon: "Users",
        uri: "employees",
        react_path: "/admin/employees",
        react_component: "EmployeesList",
        order: 2,
      },
      {
        id: "patients",
        title: "Patients",
        icon: "Users",
        uri: "patients",
        react_path: "/admin/patients",
        react_component: "Patients",
        order: 3,
      },
      {
        id: "consultations",
        title: "Consultations",
        icon: "Calendar",
        uri: "consultations",
        react_path: "/admin/consultations",
        react_component: "Consultations",
        order: 4,
      },
    ];
  }

  /**
   * Get default public menu for fallback
   * @returns {Array} Default public menu items
   */
  static getDefaultPublicMenu() {
    return [
      { id: "home", title: "Home", path: "/", order: 1 },
      { id: "about", title: "About", path: "/about", order: 2 },
      { id: "services", title: "Services", path: "/services", order: 3 },
      { id: "contact", title: "Contact", path: "/contact", order: 4 },
    ];
  }

  /**
   * Get default dropdown options
   * @returns {Object} Default options
   */
  static getDefaultOptions() {
    return {
      genders: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
      blood_types: [
        { value: "A+", label: "A+" },
        { value: "O+", label: "O+" },
      ],
      departments: [
        { value: "general", label: "General Medicine" },
        { value: "emergency", label: "Emergency" },
      ],
    };
  }

  /**
   * Get default UI constants
   * @returns {Object} Default UI constants
   */
  static getDefaultUIConstants() {
    return {
      pagination: {
        default_per_page: 20,
        options: [10, 20, 50],
      },
      theme: {
        primary_color: "#0a1e34",
        secondary_color: "#f59e0b",
      },
      messages: {
        loading: "Loading...",
        no_data: "No data available",
        error: "An error occurred",
      },
    };
  }

  /**
   * Get current manifest data
   * @returns {Object|null} Manifest data
   */
  static get manifest() {
    return ManifestService._manifest;
  }

  /**
   * Get navigation menu items
   * @returns {Array} Menu items
   */
  static getNavigationMenu() {
    const manifest = ManifestService.manifest;
    return manifest?.navigation?.main_menu || [];
  }

  /**
   * Get admin menu items
   * @returns {Array} Admin menu items
   */
  static getAdminMenu() {
    const manifest = ManifestService.manifest;
    return (
      manifest?.navigation?.admin_menu || ManifestService.getDefaultAdminMenu()
    );
  }

  /**
   * Get public menu items
   * @returns {Array} Public menu items
   */
  static getPublicMenu() {
    const manifest = ManifestService.manifest;
    return (
      manifest?.navigation?.public_menu ||
      ManifestService.getDefaultPublicMenu()
    );
  }

  /**
   * Get dropdown options for a specific key
   * @param {string} key - Option key
   * @returns {Array} Options array
   */
  static getDropdownOptions(key) {
    const manifest = ManifestService.manifest;
    return manifest?.options?.[key] || [];
  }

  /**
   * Get gender options
   * @returns {Array} Gender options
   */
  static getGenderOptions() {
    return ManifestService.getDropdownOptions("genders");
  }

  /**
   * Get blood type options
   * @returns {Array} Blood type options
   */
  static getBloodTypeOptions() {
    return ManifestService.getDropdownOptions("blood_types");
  }

  /**
   * Get marital status options
   * @returns {Array} Marital status options
   */
  static getMaritalStatusOptions() {
    return ManifestService.getDropdownOptions("marital_status");
  }

  /**
   * Get department options
   * @returns {Array} Department options
   */
  static getDepartmentOptions() {
    return ManifestService.getDropdownOptions("departments");
  }

  /**
   * Get specialization options
   * @returns {Array} Specialization options
   */
  static getSpecializationOptions() {
    return ManifestService.getDropdownOptions("specializations");
  }

  /**
   * Get country options
   * @returns {Array} Country options
   */
  static getCountryOptions() {
    return ManifestService.getDropdownOptions("countries");
  }

  /**
   * Get user permissions
   * @returns {Object} User permissions
   */
  static getUserPermissions() {
    const manifest = ManifestService.manifest;
    return manifest?.permissions || {};
  }

  /**
   * Check if user has specific permission
   * @param {string} permission - Permission to check
   * @returns {boolean} True if user has permission
   */
  static hasPermission(permission) {
    const permissions = ManifestService.getUserPermissions();

    // Super admin has all permissions
    if (permissions.permissions?.includes("*")) {
      return true;
    }

    return permissions.permissions?.includes(permission) || false;
  }

  /**
   * Get appointment status options
   * @returns {Array} Appointment status options
   */
  static getAppointmentStatusOptions() {
    const manifest = ManifestService.manifest;
    return [];
  }

  /**
   * Get user role options
   * @returns {Array} User role options
   */
  static getUserRoleOptions() {
    const manifest = ManifestService.manifest;
    return (
      manifest?.dropdown_options?.user_roles || [
        { value: "admin", label: "Administrator" },
        { value: "agricultural_specialist", label: "Agricultural Specialist" },
        { value: "field_officer", label: "Field Officer" },
        { value: "ffs_facilitator", label: "FFS Facilitator" },
        { value: "farmer_member", label: "Farmer Member" },
      ]
    );
  }

  /**
   * Get app settings
   * @returns {Object} App settings
   */
  static getAppSettings() {
    const manifest = ManifestService.manifest;
    return (
      manifest?.app_settings || {
        hospital_name: "Hospital Management System",
        hospital_address: "",
        hospital_phone: "",
        hospital_email: "",
        timezone: "UTC",
        date_format: "Y-m-d",
        time_format: "24h",
        currency: "USD",
        language: "en",
      }
    );
  }

  /**
   * Get system notifications
   * @returns {Array} System notifications
   */
  static getSystemNotifications() {
    const manifest = ManifestService.manifest;
    return manifest?.system_notifications || [];
  }

  /**
   * Get user preferences
   * @returns {Object} User preferences
   */
  static getUserPreferences() {
    const manifest = ManifestService.manifest;
    return (
      manifest?.user_preferences || {
        theme: "light",
        language: "en",
        timezone: "UTC",
        notifications_enabled: true,
        email_notifications: true,
        dashboard_layout: "default",
      }
    );
  }

  /**
   * Get app configuration
   * @returns {Object} App configuration
   */
  static getAppConfig() {
    const manifest = ManifestService.manifest;
    return manifest?.app || {};
  }

  /**
   * Get UI constants
   * @returns {Object} UI constants
   */
  static getUIConstants() {
    const manifest = ManifestService.manifest;
    return manifest?.ui || ManifestService.getDefaultUIConstants();
  }
}

export default ManifestService;
