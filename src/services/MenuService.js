import ManifestService from './ManifestService';

/**
 * Menu Service - Handles menu tree building and navigation
 */
class MenuService {
  static _menuTree = null;
  static _flatMenuMap = new Map();
  static _routeMenuMap = new Map();

  /**
   * Initialize menu service with manifest data
   * @returns {Promise<Array>} Menu tree
   */
  static async initialize() {
    try {
      const manifest = await ManifestService.getManifest();
      let menuItems = [];
      let sourceMapItems = [];

      // Prioritize main_menu
      if (manifest && manifest.navigation && manifest.navigation.main_menu && manifest.navigation.main_menu.length > 0) {
        menuItems = manifest.navigation.main_menu;
        sourceMapItems = manifest.navigation.main_menu;
      }
      // Fallback to admin_menu
      else if (manifest && manifest.navigation && manifest.navigation.admin_menu && manifest.navigation.admin_menu.length > 0) {
        menuItems = manifest.navigation.admin_menu;
        sourceMapItems = manifest.navigation.admin_menu;
      }
      
      if (menuItems.length > 0) {
        MenuService._menuTree = MenuService.buildReactMenuTree(menuItems);
        MenuService._buildMenuMaps(sourceMapItems);
      } else {
        // Fallback to default menu if manifest is empty or fails
        MenuService._menuTree = MenuService.getDefaultMenu();
      }
      
      return MenuService._menuTree;
    } catch (error) {
      console.error('MenuService initialization error:', error);
      MenuService._menuTree = MenuService.getDefaultMenu();
      return MenuService._menuTree;
    }
  }

  /**
   * Build React-friendly menu tree from Laravel Admin menu structure
   * @param {Array} menuItems - Flat menu items from backend
   * @returns {Array} Hierarchical menu tree
   */
  static buildReactMenuTree(menuItems) {
    if (!menuItems || !Array.isArray(menuItems)) {
      return [];
    }

    // Convert backend menu structure to React-friendly format
    const convertMenuItem = (item) => ({
      id: item.id,
      title: item.title,
      label: item.title,
      icon: MenuService.convertIcon(item.icon),
      path: item.react_path || MenuService.convertUri(item.uri),
      uri: item.uri,
      permission: item.permission,
      order: item.order,
      children: item.children ? item.children.map(convertMenuItem) : [],
      hasChildren: item.has_children || (item.children && item.children.length > 0),
      react_component: item.react_component,
      react_path: item.react_path
    });

    return menuItems
      .sort((a, b) => (a.order || 0) - (b.order || 0)) // Sort by order
      .map(convertMenuItem);
  }

  /**
   * Convert Laravel Admin FontAwesome icons to modern icon format
   * @param {string} icon - FontAwesome icon class
   * @returns {string} Modern icon identifier
   */
  static convertIcon(icon) {
    const iconMap = {
      // Dashboard & Analytics
      'fa-bar-chart': 'BarChart3',
      'fa-chart-bar': 'BarChart3',
      'fa-tachometer-alt': 'Gauge',
      
      // Medical & Healthcare
      'fa-book': 'Calendar',
      'fa-stethoscope': 'Stethoscope',
      'fa-eyedropper': 'Droplets',
      'fa-binoculars': 'Eye',
      'fa-briefcase': 'Briefcase',
      
      // Users & People
      'fa-users': 'Users',
      'Users': 'Users',
      'fa-user-md': 'UserCheck',
      'fa-user-secret': 'Shield',
      'fa-edit': 'Edit',
      
      // Money & Payments
      'fa-usd': 'DollarSign',
      'fa-paypal': 'CreditCard',
      'fa-credit-card-alt': 'CreditCard',
      'fa-money-bill': 'Banknote',
      
      // Inventory & Stock
      'fa-inbox': 'Package',
      'fa-sitemap': 'Network',
      'fa-adjust': 'Settings',
      'fa-file-text-o': 'FileText',
      
      // Cards & Payments
      'fa-cc-mastercard': 'CreditCard',
      'fa-exchange': 'ArrowRightLeft',
      
      // Buildings & Organization
      'fa-building': 'Building',
      'Building2': 'Building2',
      
      // System & Settings
      'fa-cogs': 'Settings',
      'fa-bars': 'Menu',
      'bi-grid-3x3': 'Grid3X3',
      
      // Default fallback
      'default': 'Circle'
    };

    // Handle both fa- prefixed and clean icon names
    const cleanIcon = icon?.replace(/^fa-/, '') || 'default';
    return iconMap[icon] || iconMap[cleanIcon] || iconMap['default'];
  }

  /**
   * Convert Laravel Admin URI to React Router path
   * @param {string} uri - Backend URI
   * @returns {string} React Router path
   */
  static convertUri(uri) {
    if (!uri || uri === '/' || uri === 'dashboard') {
      return '/admin/dashboard';
    }

    // Handle special cases
    const uriMap = {
      'auth/setting': '/admin/profile',
      '/admin/components': '/admin/components'
    };

    if (uriMap[uri]) {
      return uriMap[uri];
    }

    // Convert standard URIs
    const cleanUri = uri.replace(/^\/+|\/+$/g, ''); // Remove leading/trailing slashes
    return `/admin/${cleanUri}`;
  }

  /**
   * Build internal maps for fast lookups
   * @param {Array} menuItems - Flat menu items
   */
  static _buildMenuMaps(menuItems) {
    const processItem = (item) => {
      // Add to flat map
      MenuService._flatMenuMap.set(item.id, item);
      
      // Add to route map
      const reactPath = item.path || MenuService.convertUri(item.uri);
      MenuService._routeMenuMap.set(reactPath, item);
      
      // Process children
      if (item.children) {
        item.children.forEach(processItem);
      }
    };

    menuItems.forEach(processItem);
  }

  /**
   * Get menu tree
   * @returns {Array} Menu tree
   */
  static getMenuTree() {
    return MenuService._menuTree || [];
  }

  /**
   * Get menu item by ID
   * @param {number} id - Menu item ID
   * @returns {Object|null} Menu item
   */
  static getMenuById(id) {
    return MenuService._flatMenuMap.get(id) || null;
  }

  /**
   * Get menu item by route path
   * @param {string} path - React Router path
   * @returns {Object|null} Menu item
   */
  static getMenuByPath(path) {
    return MenuService._routeMenuMap.get(path) || null;
  }

  /**
   * Generate breadcrumbs for a given path
   * @param {string} path - Current route path
   * @returns {Array} Breadcrumb items
   */
  static generateBreadcrumbs(path) {
    const menuItem = MenuService.getMenuByPath(path);
    if (!menuItem) {
      return [{ title: 'Dashboard', path: '/admin/dashboard' }];
    }

    const breadcrumbs = [];
    let currentItem = menuItem;

    // Build breadcrumb chain
    while (currentItem) {
      breadcrumbs.unshift({
        title: currentItem.title,
        path: currentItem.path || MenuService.convertUri(currentItem.uri),
        icon: currentItem.icon || MenuService.convertIcon(currentItem.icon)
      });

      // Find parent
      if (currentItem.parent_id && currentItem.parent_id !== 0) {
        currentItem = MenuService.getMenuById(currentItem.parent_id);
      } else {
        break;
      }
    }

    // Always include dashboard as root if not already present
    if (breadcrumbs[0]?.path !== '/admin/dashboard') {
      breadcrumbs.unshift({
        title: 'Dashboard',
        path: '/admin/dashboard',
        icon: 'BarChart3'
      });
    }

    return breadcrumbs;
  }

  /**
   * Get all routes that need to be registered
   * @returns {Array} Route definitions
   */
  static getAllRoutes() {
    const routes = [];
    
    const processItem = (item, parentPath = '/admin') => {
      const path = item.path || MenuService.convertUri(item.uri);
      
      routes.push({
        id: item.id,
        path,
        title: item.title,
        uri: item.uri,
        permission: item.permission,
        component: MenuService.getComponentName(item.uri),
        exact: true
      });

      // Process children
      if (item.children) {
        item.children.forEach(child => processItem(child, path));
      }
    };

    if (MenuService._menuTree) {
      MenuService._menuTree.forEach(item => processItem(item));
    }

    return routes;
  }

  /**
   * Get component name for a URI
   * @param {string} uri - Backend URI
   * @returns {string} Component name
   */
  static getComponentName(uri) {
    const componentMap = {
      'dashboard': 'MISDashboard',
      '/': 'MISDashboard',
      'registry': 'DigitalRegistry',
      'training': 'Training',
      'advisory': 'EAdvisoryHub',
      'marketplace': 'EMarketplace',
      'vsla-ledger': 'VSLALedger',
      'monitoring': 'MEDashboard',
      'users': 'Users',
      'settings': 'Settings',
      // Legacy mappings
      'groups': 'Groups',
      'training-sessions': 'TrainingSessions',
      'vsla-transactions': 'VSLATransactions',
      'advisory-content': 'AdvisoryContent',
      'consultations': 'Consultations',
      'medical-services': 'MedicalServices',
      'doses': 'Doses',
      'consultation-billing': 'ConsultationBilling',
      'consultation-payments': 'ConsultationPayments',
      'payment-records': 'PaymentRecords',
      'progress-monitoring': 'ProgressMonitoring',
      'patients': 'Patients',
      'cards': 'Cards',
      'card-records': 'CardRecords',
      'stock-item-categories': 'StockItemCategories',
      'stock-items': 'StockItems',
      'stock-out-records': 'StockOutRecords',
      'services': 'Services',
      'employees': 'Employees',
      'companies': 'Companies',
      'auth/setting': 'Profile',
      '/admin/components': 'Components'
    };

    return componentMap[uri] || 'PlaceholderPage';
  }

  /**
   * Default menu structure (fallback)
   * @returns {Array} Default menu items
   */
  static getDefaultMenu() {
    return [
      {
        id: 1,
        title: 'Dashboard',
        label: 'Dashboard',
        icon: 'BarChart3',
        path: '/admin/dashboard',
        uri: 'dashboard',
        children: []
      },
      {
        id: 2,
        title: 'Digital Registry',
        label: 'Digital Registry',
        icon: 'Users',
        path: '/admin/registry',
        uri: 'registry',
        children: []
      },
      {
        id: 3,
        title: 'Training',
        label: 'Training',
        icon: 'GraduationCap',
        path: '/admin/training',
        uri: 'training',
        children: []
      },
      {
        id: 4,
        title: 'E-Advisory Hub',
        label: 'E-Advisory Hub',
        icon: 'BookOpen',
        path: '/admin/advisory',
        uri: 'advisory',
        children: []
      },
      {
        id: 5,
        title: 'E-Marketplace',
        label: 'E-Marketplace',
        icon: 'ShoppingCart',
        path: '/admin/marketplace',
        uri: 'marketplace',
        children: []
      },
      {
        id: 6,
        title: 'VSLA Ledger',
        label: 'VSLA Ledger',
        icon: 'CreditCard',
        path: '/admin/vsla-ledger',
        uri: 'vsla-ledger',
        children: []
      },
      {
        id: 7,
        title: 'M&E Dashboard',
        label: 'M&E Dashboard',
        icon: 'TrendingUp',
        path: '/admin/monitoring',
        uri: 'monitoring',
        children: []
      },
      {
        id: 8,
        title: 'System Administration',
        label: 'System Administration',
        icon: 'Settings',
        path: '',
        uri: '',
        children: [
          {
            id: 81,
            title: 'Users',
            label: 'Users',
            icon: 'UserCog',
            path: '/admin/users',
            uri: 'users'
          },
          {
            id: 82,
            title: 'Settings',
            label: 'Settings',
            icon: 'Settings',
            path: '/admin/settings',
            uri: 'settings'
          }
        ]
      }
    ];
  }

  /**
   * Check if user has permission to access menu item
   * @param {Object} menuItem - Menu item
   * @param {Object} user - Current user
   * @returns {boolean} Has access
   */
  static hasMenuAccess(menuItem, user) {
    if (!menuItem.permission || menuItem.permission === '*') {
      return true;
    }

    // Check if user has the required permission or role
    if (user && typeof user.hasPermission === 'function') {
      return user.hasPermission(menuItem.permission);
    }

    if (user && typeof user.hasRole === 'function') {
      return user.hasRole(menuItem.permission);
    }

    // Development mode - allow access
    if (process.env.NODE_ENV === 'development') {
      return true;
    }

    return false;
  }

  /**
   * Filter menu tree based on user permissions
   * @param {Array} menuTree - Menu tree
   * @param {Object} user - Current user
   * @returns {Array} Filtered menu tree
   */
  static filterMenuByPermissions(menuTree, user) {
    if (!Array.isArray(menuTree)) return [];

    return menuTree
      .filter(item => MenuService.hasMenuAccess(item, user))
      .map(item => ({
        ...item,
        children: MenuService.filterMenuByPermissions(item.children || [], user)
      }));
  }
}

export default MenuService;
