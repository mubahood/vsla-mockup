import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// Static menu configuration for FOSTER Project MIS
const STATIC_MENU_CONFIG = [
  {
    _key: "dashboard",
    title: "Dashboard",
    uri: "/admin/dashboard",
    children: []
  },
  {
    _key: "group-management",
    title: "Group Management",
    uri: "",
    children: [
      {
        _key: "registry",
        title: "Digital Registry",
        uri: "/admin/registry"
      }
    ]
  },
  {
    _key: "financial-management",
    title: "Financial Management",
    uri: "",
    children: [
      {
        _key: "financial",
        title: "Financial Tracking",
        uri: "/admin/financial"
      },
      {
        _key: "vsla-ledger",
        title: "VSLA Ledger",
        uri: "/admin/vsla-ledger"
      }
    ]
  },
  {
    _key: "capacity-building",
    title: "Capacity Building",
    uri: "",
    children: [
      {
        _key: "training",
        title: "Training Management",
        uri: "/admin/training"
      },
      {
        _key: "advisory",
        title: "E-Advisory Hub",
        uri: "/admin/advisory"
      }
    ]
  },
  {
    _key: "market-systems",
    title: "Market Systems",
    uri: "",
    children: [
      {
        _key: "marketplace",
        title: "E-Marketplace",
        uri: "/admin/marketplace"
      }
    ]
  },
  {
    _key: "monitoring-evaluation",
    title: "Monitoring & Evaluation",
    uri: "",
    children: [
      {
        _key: "monitoring",
        title: "M&E Dashboard",
        uri: "/admin/monitoring"
      }
    ]
  },
  {
    _key: "system-administration",
    title: "System Administration",
    uri: "",
    children: [
      {
        _key: "users",
        title: "User Management",
        uri: "/admin/users"
      },
      {
        _key: "employees",
        title: "Employees",
        uri: "/admin/employees"
      }
    ]
  }
];

// Menu item component for main level items
const MenuItem = React.memo(
  ({ item, isActiveItem, expandedItems, toggleExpansion, onNavigate }) => {
    const hasChildren = item.children && item.children.length > 0;
    // Use the unique key we created
    const itemKey = item._uniqueKey || item._key;
    const isExpanded = expandedItems[itemKey];
    const isActive = item.uri ? isActiveItem(item.uri) : false;

    const handleClick = useCallback(
      (e) => {
        if (hasChildren) {
          e.preventDefault();
          toggleExpansion(itemKey);
        } else if (item.uri && onNavigate) {
          onNavigate();
        }
      },
      [hasChildren, itemKey, item.uri, item.title, toggleExpansion, onNavigate]
    );

    const menuContent = (
      <div
        className={`sidebar-menu__item ${
          isActive ? "sidebar-menu__item--active" : ""
        }`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick(e);
          }
        }}
        aria-expanded={hasChildren ? isExpanded : undefined}
      >
        <div className="sidebar-menu__item-content">
          <div className="sidebar-menu__icon">
            <span className="sidebar-menu__icon-dot"></span>
          </div>
          <span className="sidebar-menu__label">{item.title}</span>
          {/* Active indicator - pulsing dot */}
          {isActive && (
            <div className="sidebar-menu__active-indicator">
              <span className="sidebar-menu__active-dot"></span>
            </div>
          )}
        </div>
        {hasChildren && (
          <div
            className={`sidebar-menu__chevron ${
              isExpanded ? "sidebar-menu__chevron--expanded" : ""
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path
                d="M4.5 3L7.5 6L4.5 9"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    );

    return (
      <div className="sidebar-menu__item-wrapper">
        {item.uri && !hasChildren ? (
          <Link to={item.uri} className="sidebar-menu__link">
            {menuContent}
          </Link>
        ) : (
          menuContent
        )}

        {hasChildren && isExpanded && (
          <div className="sidebar-menu__submenu">
            {item.children.map((child, childIndex) => {
              // Create unique key for child items
              const childUniqueKey = `${itemKey}-child-${childIndex}-${
                child._key || child.title?.replace(/\s+/g, "-").toLowerCase()
              }`;
              return (
                <SubMenuItem
                  key={childUniqueKey}
                  item={{ ...child, _uniqueKey: childUniqueKey }}
                  isActiveItem={isActiveItem}
                  onNavigate={onNavigate}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

// Submenu item component
const SubMenuItem = React.memo(({ item, isActiveItem, onNavigate }) => {
  const isActive = item.uri ? isActiveItem(item.uri) : false;

  const handleSubItemClick = useCallback(() => {
    if (item.uri && onNavigate) {
      onNavigate();
    }
  }, [item.uri, onNavigate]);

  const submenuContent = (
    <div
      className={`sidebar-menu__subitem ${
        isActive ? "sidebar-menu__subitem--active" : ""
      }`}
      onClick={handleSubItemClick}
    >
      <div className="sidebar-menu__subitem-content">
        <div className="sidebar-menu__connector">
          <span className="sidebar-menu__connector-line"></span>
        </div>
        <span className="sidebar-menu__sublabel">{item.title}</span>
        {/* Active indicator for submenu items */}
        {isActive && (
          <div className="sidebar-menu__subitem-active-indicator">
            <span className="sidebar-menu__subitem-active-dot"></span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="sidebar-menu__subitem-wrapper">
      {item.uri ? (
        <Link to={item.uri} className="sidebar-menu__link">
          {submenuContent}
        </Link>
      ) : (
        submenuContent
      )}
    </div>
  );
});

const SidebarMenu = ({ menuData = [], currentPath, onNavigate }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [manifestMenuData, setManifestMenuData] = useState([]);
  const [isLoadingManifest, setIsLoadingManifest] = useState(false); // No loading needed for static menu
  const location = useLocation();
  const currentPathFromLocation = currentPath || location.pathname;

  // Initialize static menu data
  useEffect(() => {
    // Transform static menu to our expected format
    const transformedMenu = transformStaticMenu(STATIC_MENU_CONFIG);
    setManifestMenuData(transformedMenu);
    setIsLoadingManifest(false);
  }, []);

  // Transform static menu format to our component format
  const transformStaticMenu = useCallback((staticMenu) => {
    return staticMenu.map((item) => {
      const hasChildren = item.children && item.children.length > 0;

      return {
        _key: item._key,
        title: item.title,
        uri: item.uri,
        // Handle children properly - only include if children array exists and has items
        children: hasChildren
          ? item.children.map((child) => {
              return {
                _key: child._key,
                title: child.title,
                uri: child.uri,
              };
            })
          : undefined,
      };
    });
  }, []);

  // Use manifest menu data if available, otherwise fall back to props
  const finalMenuData =
    manifestMenuData.length > 0 ? manifestMenuData : menuData;

  // Debug logging for current path (development only)
  if (process.env.NODE_ENV === "development") {
  }

  // Memoize the active path check to avoid unnecessary re-calculations
  const isActiveItem = useCallback(
    (uri) => {
      if (!uri) {
        return false;
      }

      // Get the last segment of both paths
      const getLastSegment = (path) => {
        return (
          path
            .split("/")
            .filter((segment) => segment.length > 0)
            .pop() || ""
        );
      };

      const currentLastSegment = getLastSegment(currentPathFromLocation);
      const uriLastSegment = getLastSegment(uri);

      // Check if last segments match
      const segmentMatch =
        currentLastSegment === uriLastSegment && currentLastSegment.length > 0;

      // Also keep original exact matching as fallback
      const exactMatch =
        currentPathFromLocation === uri ||
        currentPathFromLocation.startsWith(uri + "/");

      const isActive = segmentMatch || exactMatch;

      return isActive;
    },
    [currentPathFromLocation]
  );

  // Auto-expand parent items when child is active
  useEffect(() => {
    const findAndExpandActiveParents = (items) => {
      const newExpandedState = {};

      const processItems = (itemList, parentPath = []) => {
        itemList.forEach((item) => {
          const currentItemPath = [...parentPath, item._key];

          if (isActiveItem(item.uri)) {
            // Expand all parents of active item
            parentPath.forEach((parentKey) => {
              newExpandedState[parentKey] = true;
            });
          }

          if (item.children && item.children.length > 0) {
            processItems(item.children, currentItemPath);
          }
        });
      };

      processItems(items);
      setExpandedItems((prev) => ({ ...prev, ...newExpandedState }));
    };

    if (menuData.length > 0) {
      findAndExpandActiveParents(menuData);
    }
  }, [currentPathFromLocation, menuData, isActiveItem]);

  // Toggle menu item expansion
  const toggleExpansion = useCallback((itemKey) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  }, []);

  // Memoize the menu items to prevent unnecessary re-renders
  const memoizedMenuItems = useMemo(() => {
    return finalMenuData.map((item, index) => {
      // Create a unique key by combining index and _key to ensure uniqueness
      const uniqueKey = `menu-item-${index}-${
        item._key || item.title?.replace(/\s+/g, "-").toLowerCase()
      }`;

      return (
        <MenuItem
          key={uniqueKey}
          item={{ ...item, _uniqueKey: uniqueKey }}
          isActiveItem={isActiveItem}
          expandedItems={expandedItems}
          toggleExpansion={toggleExpansion}
          onNavigate={onNavigate}
        />
      );
    });
  }, [
    finalMenuData,
    expandedItems,
    currentPathFromLocation,
    isActiveItem,
    toggleExpansion,
    onNavigate,
  ]);

  if (isLoadingManifest) {
    return (
      <nav className="sidebar-menu sidebar-menu--loading">
        <div className="sidebar-menu__loading-state">Loading menu...</div>
      </nav>
    );
  }

  if (!finalMenuData || finalMenuData.length === 0) {
    return (
      <nav className="sidebar-menu sidebar-menu--empty">
        <div className="sidebar-menu__empty-state">No menu items available</div>
      </nav>
    );
  }

  return (
    <nav
      className="sidebar-menu"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="sidebar-menu__container">{memoizedMenuItems}</div>
      <SidebarMenuStyles />
    </nav>
  );
};

// Separate styles component for better organization
const SidebarMenuStyles = () => (
  <style>{`
    /* Sidebar Menu Container */
    .sidebar-menu {
      background: #0a1e34;
      width: 100%;
      min-height: 100vh;
      padding: 0;
    }

    .sidebar-menu__container {
      padding: 0;
    }

    .sidebar-menu--empty {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sidebar-menu--loading {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sidebar-menu__loading-state {
      color: #64748b;
      font-size: 14px;
      text-align: center;
      padding: 20px;
      animation: pulse 1.5s infinite;
    }

    .sidebar-menu__empty-state {
      color: #64748b;
      font-size: 14px;
      text-align: center;
      padding: 20px;
    }

    /* Main Menu Items */
    .sidebar-menu__item-wrapper {
      margin-bottom: 2px;
    }

    .sidebar-menu__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;
      color: #ffffff;
      cursor: pointer;
      min-height: 36px;
      border-left: 3px solid transparent;
      transition: all 0.2s ease;
    }

    .sidebar-menu__item:hover {
      background: #1a2e44;
    }

    .sidebar-menu__item--active {
      background: #1a2e44;
      border-left: 4px solid #f59e0b;
      box-shadow: inset 0 0 10px rgba(245, 158, 11, 0.1);
    }

    .sidebar-menu__item-content {
      display: flex;
      align-items: center;
      flex: 1;
    }

    .sidebar-menu__icon {
      width: 6px;
      height: 6px;
      margin-right: 12px;
      flex-shrink: 0;
    }

    .sidebar-menu__icon-dot {
      width: 6px;
      height: 6px;
      background: #f59e0b;
      display: block;
    }

    .sidebar-menu__item--active .sidebar-menu__icon-dot {
      background: #ffffff;
    }

    /* Active indicator styles */
    .sidebar-menu__active-indicator {
      margin-left: auto;
      margin-right: 8px;
    }

    .sidebar-menu__active-dot {
      width: 8px;
      height: 8px;
      background: #f59e0b;
      border-radius: 50%;
      display: block;
      animation: pulse 2s infinite;
      box-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.7;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .sidebar-menu__label {
      color: inherit;
      font-size: 14px;
      font-weight: 300;
    }

    .sidebar-menu__chevron {
      color: #64748b;
      transition: transform 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sidebar-menu__chevron--expanded {
      transform: rotate(90deg);
    }

    .sidebar-menu__item--active .sidebar-menu__chevron {
      color: #ffffff;
    }

    /* Submenu */
    .sidebar-menu__submenu {
      margin-left: 18px;
      border-left: 1px solid #1a2e44;
    }

    .sidebar-menu__subitem-wrapper {
      margin-bottom: 1px;
    }

    .sidebar-menu__subitem {
      display: flex;
      align-items: center;
      padding: 6px 16px;
      color: #94a3b8;
      cursor: pointer;
      min-height: 32px;
      border-left: 2px solid transparent;
      transition: all 0.2s ease;
    }

    .sidebar-menu__subitem:hover {
      background: #1a2e44;
      color: #ffffff;
    }

    .sidebar-menu__subitem--active {
      background: #1a2e44;
      color: #ffffff;
      border-left: 2px solid #f59e0b;
    }

    .sidebar-menu__subitem-content {
      display: flex;
      align-items: center;
      width: 100%;
    }

    /* Submenu active indicator styles */
    .sidebar-menu__subitem-active-indicator {
      margin-left: auto;
      margin-right: 4px;
    }

    .sidebar-menu__subitem-active-dot {
      width: 6px;
      height: 6px;
      background: #f59e0b;
      border-radius: 50%;
      display: block;
      animation: pulse 2s infinite;
      box-shadow: 0 0 6px rgba(245, 158, 11, 0.5);
    }

    .sidebar-menu__connector {
      width: 12px;
      height: 16px;
      position: relative;
      margin-right: 8px;
      flex-shrink: 0;
    }

    .sidebar-menu__connector-line {
      position: absolute;
      top: 8px;
      left: 0;
      width: 8px;
      height: 1px;
      background: #1a2e44;
    }

    .sidebar-menu__sublabel {
      color: inherit;
      font-size: 13px;
      font-weight: 300;
    }

    /* Link Styles */
    .sidebar-menu__link {
      text-decoration: none;
      color: inherit;
      display: block;
    }

    .sidebar-menu__link:hover {
      text-decoration: none;
      color: inherit;
    }

    .sidebar-menu__link:focus {
      outline: 2px solid #f59e0b;
      outline-offset: -2px;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .sidebar-menu {
        width: 100%;
        min-height: auto;
      }
      
      .sidebar-menu__item {
        padding: 10px 16px;
        min-height: 40px;
      }
      
      .sidebar-menu__subitem {
        padding: 8px 16px;
        min-height: 36px;
      }
    }

    /* Accessibility */
    .sidebar-menu__item:focus {
      outline: 2px solid #f59e0b;
      outline-offset: -2px;
    }

    .sidebar-menu__subitem:focus {
      outline: 2px solid #f59e0b;
      outline-offset: -2px;
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .sidebar-menu {
        border-right: 2px solid #ffffff;
      }
      
      .sidebar-menu__item {
        border: 1px solid transparent;
      }
      
      .sidebar-menu__item--active {
        border: 1px solid #ffffff;
      }
    }
  `}</style>
);

// PropTypes for type checking
SidebarMenu.propTypes = {
  menuData: PropTypes.arrayOf(
    PropTypes.shape({
      _key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      uri: PropTypes.string,
      children: PropTypes.array,
    })
  ),
  currentPath: PropTypes.string,
  onNavigate: PropTypes.func,
};

MenuItem.propTypes = {
  item: PropTypes.shape({
    _key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    uri: PropTypes.string,
    children: PropTypes.array,
  }).isRequired,
  isActiveItem: PropTypes.func.isRequired,
  expandedItems: PropTypes.object.isRequired,
  toggleExpansion: PropTypes.func.isRequired,
  onNavigate: PropTypes.func,
};

SubMenuItem.propTypes = {
  item: PropTypes.shape({
    _key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    uri: PropTypes.string,
  }).isRequired,
  isActiveItem: PropTypes.func.isRequired,
  onNavigate: PropTypes.func,
};

// Ensure clean default export
export default SidebarMenu;
