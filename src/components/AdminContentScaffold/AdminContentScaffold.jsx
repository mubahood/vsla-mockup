import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Edit,
  Eye,
  Trash2,
  Plus,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Home,
  ChevronDown,
  RefreshCw,
  AlertCircle,
  List,
  Database
} from 'lucide-react';

// Context for managing scaffold state
const AdminScaffoldContext = createContext();

// Hook to use scaffold context
const useAdminScaffold = () => {
  const context = useContext(AdminScaffoldContext);
  if (!context) {
    throw new Error('useAdminScaffold must be used within AdminContentScaffold');
  }
  return context;
};

/**
 * Enhanced AdminContentScaffold Layout Component
 * 
 * A comprehensive, production-ready admin panel layout that provides:
 * - Three-section architecture (Table/Form/Details)
 * - Advanced header with navigation and controls
 * - Responsive design with modern UI patterns
 * - State management and context API
 * - Export and filtering capabilities
 * - Professional design following flat design principles
 */
const AdminContentScaffold = ({
  // Core Configuration
  title = "Record",
  subtitle = "",
  breadcrumbs = [],
  
  // Section Management
  activeSection = "table",
  onSectionChange,
  selectedRecord = null,
  
  // Table Section Props
  tableProps = {},
  onNewRecord,
  onExport,
  
  // Form Section Props
  formProps = {},
  onSave,
  onDelete,
  
  // Details Section Props
  detailsProps = {},
  
  // Search and Filtering
  searchValue = "",
  onSearchChange,
  showFilters = false,
  onToggleFilters,
  
  // Additional Props
  loading = false,
  error = null,
  actions = [],
  className = "",
  style = {},
  
  // Layout Customization
  headerHeight = 48, // Reduced from 64 for more compact design
  controlsHeight = 56,
  compactMode = false,
  sidebarCollapsed = false,
  onToggleSidebar,
  
  // Advanced Features
  exportFormats = ['csv', 'excel', 'pdf'],
  bulkActions = [],
  quickFilters = [],
  notifications = [],
  
  // Custom Components
  customCreateButton,
  
  // Accessibility
  'aria-label': ariaLabel,
  'data-testid': testId,
  
  // Event Handlers
  onRefresh,
  onBack,
  onSettings,
  onHelp,
  onNotificationClick,
  
  // Theme and Styling
  theme = 'light',
  customStyles = {},
  
  ...rest
}) => {
  // Internal State
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState(null);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, card
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterValues, setFilterValues] = useState({});
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Advanced state for layout management
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Context value with all state and handlers
  const contextValue = useMemo(() => ({
    // Core state
    activeSection,
    selectedRecord,
    loading: loading || internalLoading,
    error: error || internalError,
    
    // Form state
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    isDirty,
    setIsDirty,
    
    // Table state
    selectedItems,
    setSelectedItems,
    sortConfig,
    setSortConfig,
    viewMode,
    setViewMode,
    
    // Filter state
    filterValues,
    setFilterValues,
    showFilters,
    isFilterPanelOpen,
    setIsFilterPanelOpen,
    
    // Pagination state
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    
    // UI state
    isExportMenuOpen,
    setIsExportMenuOpen,
    isActionsMenuOpen,
    setIsActionsMenuOpen,
    isFullscreen,
    setIsFullscreen,
    
    // Handlers
    onSectionChange,
    onSave,
    onDelete,
    onNewRecord,
    onExport,
    onSearchChange,
    onToggleFilters,
    onRefresh,
    setInternalLoading,
    setInternalError,
  }), [
    activeSection,
    selectedRecord,
    loading,
    internalLoading,
    error,
    internalError,
    formData,
    formErrors,
    isDirty,
    selectedItems,
    sortConfig,
    viewMode,
    filterValues,
    showFilters,
    isFilterPanelOpen,
    pageSize,
    currentPage,
    isExportMenuOpen,
    isActionsMenuOpen,
    isFullscreen,
    onSectionChange,
    onSave,
    onDelete,
    onNewRecord,
    onExport,
    onSearchChange,
    onToggleFilters,
    onRefresh,
  ]);

  // Effect to reset form when selectedRecord changes
  useEffect(() => {
    if (selectedRecord) {
      setFormData(selectedRecord);
      setFormErrors({});
      setIsDirty(false);
    } else {
      setFormData({});
      setFormErrors({});
      setIsDirty(false);
    }
  }, [selectedRecord]);

  // Handle form changes
  const handleFormChange = useCallback((key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
    
    // Clear error for this field
    if (formErrors[key]) {
      setFormErrors(prev => ({ ...prev, [key]: null }));
    }
  }, [formErrors]);

  // Handle form submission
  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!onSave) return;
    
    setInternalLoading(true);
    setInternalError(null);
    
    try {
      // Validate form
      const errors = validateForm(formData, formProps.fields || []);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      
      await onSave(formData, selectedRecord);
      setIsDirty(false);
      
      // Auto-redirect to table view after save
      if (onSectionChange) {
        onSectionChange('table');
      }
    } catch (error) {
      setInternalError(error.message || 'An error occurred while saving');
    } finally {
      setInternalLoading(false);
    }
  }, [formData, selectedRecord, onSave, formProps.fields, onSectionChange]);

  // Handle delete action
  const handleDelete = useCallback(async () => {
    if (!onDelete || !selectedRecord) return;
    
    if (!window.confirm('Are you sure you want to delete this record?')) {
      return;
    }
    
    setInternalLoading(true);
    setInternalError(null);
    
    try {
      await onDelete(selectedRecord);
      
      // Auto-redirect to table view after delete
      if (onSectionChange) {
        onSectionChange('table');
      }
    } catch (error) {
      setInternalError(error.message || 'An error occurred while deleting');
    } finally {
      setInternalLoading(false);
    }
  }, [selectedRecord, onDelete, onSectionChange]);

  // Base styles following the design system
  const baseStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: 'auto', // Changed from 100vh to auto
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '14px',
      color: '#1e293b',
      margin: 0, // Ensure no margin
      ...customStyles.container,
    },
    
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: `${headerHeight}px`,
      backgroundColor: 'transparent',
      borderBottom: 'none',
      padding: '0 20px',
      margin: 0, // Ensure no margin
      position: 'relative',
      zIndex: 10,
      ...customStyles.header,
    },
    
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    
    controls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: `${controlsHeight}px`,
      backgroundColor: '#ffffff',
      padding: '0 20px 0 20px', // Removed bottom padding
      ...customStyles.controls,
    },
    
    controlsLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    
    controlsRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    
    content: {
      flex: 1,
      padding: '0 20px 20px 20px', // No top padding
      overflow: 'auto',
      backgroundColor: '#ffffff',
      ...customStyles.content,
    },
    
    // Common component styles
    button: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      border: '1px solid #e2e8f0',
      backgroundColor: '#ffffff',
      color: '#64748b',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none',
    },
    
    buttonPrimary: {
      backgroundColor: '#f59e0b',
      color: '#ffffff',
      border: '1px solid #f59e0b',
    },
    
    buttonAccent: {
      backgroundColor: '#0a1e34',
      color: '#ffffff', 
      border: '1px solid #0a1e34',
    },
    
    buttonSecondary: {
      backgroundColor: '#0a1e34',
      color: '#ffffff',
      border: '1px solid #0a1e34',
    },
    
    searchInput: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      padding: '8px 12px',
      gap: '8px',
      minWidth: '300px',
      borderRadius: 0, // Squared borders for flat design
      flex: 1,
      maxWidth: '400px',
    },
    
    searchInputMobile: {
      minWidth: 'auto',
      maxWidth: 'none',
      flex: 1,
    },
    
    buttonResponsive: {
      '@media (max-width: 768px)': {
        padding: '8px',
        minWidth: 'auto',
      },
    },
    
    buttonTextMobile: {
      '@media (max-width: 768px)': {
        display: 'none',
      },
    },
    
    input: {
      border: 'none',
      outline: 'none',
      flex: 1,
      fontSize: '14px',
      color: '#1e293b',
      backgroundColor: 'transparent',
    },
    
    breadcrumb: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#64748b',
      fontSize: '14px',
    },
    
    breadcrumbItem: {
      cursor: 'pointer',
      padding: 0,
      background: 'none',
      border: 'none',
      color: '#64748b',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
    },
    
    breadcrumbSeparator: {
      color: '#cbd5e1',
    },
    
    sectionTabs: {
      display: 'flex',
      gap: '2px',
      backgroundColor: '#f1f5f9',
      border: '1px solid #e2e8f0',
      padding: '2px',
    },
    
    sectionTab: {
      padding: '8px 16px',
      backgroundColor: 'transparent',
      color: '#64748b',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
    },
    
    sectionTabActive: {
      backgroundColor: '#ffffff',
      color: '#0a1e34',
      border: '1px solid #e2e8f0',
    },
    
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(248, 250, 252, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    
    spinner: {
      width: '24px',
      height: '24px',
      border: '2px solid #e2e8f0',
      borderTop: '2px solid #f59e0b',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    
    errorMessage: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 16px',
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      color: '#dc2626',
      fontSize: '14px',
      marginBottom: '16px',
    },
    
    dropdownMenu: {
      position: 'absolute',
      top: '100%',
      right: 0,
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      minWidth: '200px',
      zIndex: 1000,
      marginTop: '4px',
    },
    
    dropdownItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 16px',
      cursor: 'pointer',
      borderBottom: '1px solid #f1f5f9',
      fontSize: '14px',
      color: '#64748b',
      transition: 'background-color 0.2s ease',
    },
  };

  // Render breadcrumb navigation
  const renderBreadcrumbs = () => {
    return (
      <nav style={baseStyles.breadcrumb} aria-label="Breadcrumb">
        <button
          style={baseStyles.breadcrumbItem}
          onClick={() => console.log('Navigate to dashboard')}
          aria-label="Dashboard"
        >
          <Home size={16} />
        </button>
        <span style={baseStyles.breadcrumbSeparator}>/</span>
        <span style={{ ...baseStyles.breadcrumbItem, color: '#0a1e34', fontWeight: '500' }}>
          {title}
        </span>
      </nav>
    );
  };

  // Render section navigation tabs
  const renderSectionTabs = () => {
    const sections = [
      { key: 'table', label: 'List', icon: List },
      { key: 'form', label: selectedRecord ? 'Edit' : 'Add', icon: selectedRecord ? Edit : Plus },
      { key: 'details', label: 'Details', icon: Eye },
    ];

    return (
      <div style={baseStyles.sectionTabs}>
        {sections.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            style={{
              ...baseStyles.sectionTab,
              ...(activeSection === key ? baseStyles.sectionTabActive : {}),
            }}
            onClick={() => onSectionChange?.(key)}
            disabled={key === 'details' && !selectedRecord}
            aria-label={`Switch to ${label} section`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>
    );
  };

  // Render header section
  const renderHeader = () => {
    // Check if back navigation is available (custom handler or browser history)
    const canGoBack = onBack || window.history.length > 1;
    
    return (
      <header style={baseStyles.header}>
        <div style={baseStyles.headerLeft}>
          {renderBreadcrumbs()}
        </div>
        
        <div style={baseStyles.headerRight}>
          {/* Refresh Button */}
          {onRefresh && (
            <button
              style={{
                ...baseStyles.button,
                border: 'none',
                backgroundColor: 'transparent',
                padding: '8px',
              }}
              onClick={onRefresh}
              disabled={loading}
              aria-label="Refresh data"
              title="Refresh data"
            >
              <RefreshCw size={16} color="#64748b" />
            </button>
          )}
          
          {/* Back Button - shown when navigation is available */}
          {canGoBack && (
            <button
              style={{
                ...baseStyles.button,
                border: 'none',
                backgroundColor: 'transparent',
                padding: '8px',
                marginLeft: '4px',
              }}
              onClick={() => {
                if (onBack) {
                  onBack();
                } else {
                  window.history.back();
                }
              }}
              aria-label="Go back"
              title="Go back"
            >
              <ChevronLeft size={16} color="#64748b" />
            </button>
          )}
        </div>
      </header>
    );
  };

  // Render controls section
  const renderControls = () => {
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;
    
    return (
      <div style={baseStyles.controls}>
        {/* Left Side - Search Box */}
        <div style={baseStyles.controlsLeft}>
          <div style={{
            ...baseStyles.searchInput,
            ...(isMobile ? baseStyles.searchInputMobile : {})
          }}>
            <Search size={16} color="#94a3b8" />
            <input
              style={baseStyles.input}
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              aria-label="Search records"
            />
            {searchValue && (
              <button
                style={{ 
                  border: 'none', 
                  background: 'none', 
                  cursor: 'pointer',
                  padding: '2px',
                  color: '#94a3b8'
                }}
                onClick={() => onSearchChange?.('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
        
        {/* Right Side - Export and Create New Buttons */}
        <div style={baseStyles.controlsRight}>
          {/* Export Button (Accent Color) */}
          {onExport && (
            <button
              className="btn btn-accent"
              style={{
                borderRadius: 0, // Squared borders for flat design
              }}
              onClick={() => onExport('csv')}
              aria-label="Export data"
            >
              <Download size={16} />
              {!isMobile && <span>Export</span>}
            </button>
          )}
          
          {/* Create New Button (Primary Color) */}
          {customCreateButton ? (
            customCreateButton()
          ) : onNewRecord ? (
            <button
              className="btn btn-primary"
              style={{
                borderRadius: 0, // Squared borders for flat design
              }}
              onClick={() => {
                onNewRecord();
                onSectionChange?.('form');
              }}
              aria-label="Add new record"
            >
              <Plus size={16} />
              {!isMobile && <span>Create New</span>}
            </button>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <AdminScaffoldContext.Provider value={contextValue}>
      <div
        style={{
          ...baseStyles.container,
          ...style,
        }}
        className={className}
        aria-label={ariaLabel}
        data-testid={testId}
        {...rest}
      >
        {/* Add CSS for animations */}
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .admin-scaffold-dropdown:hover {
            background-color: #f8fafc;
          }
          
          .admin-scaffold-button:hover {
            background-color: #f1f5f9;
            border-color: #cbd5e1;
          }
          
          .admin-scaffold-button-primary:hover {
            background-color: #d97706;
          }
          
          .admin-scaffold-input:focus {
            border-color: #f59e0b;
          }
        `}</style>
        
        {/* Header */}
        {renderHeader()}
        
        {/* Controls - Only show in table view */}
        {activeSection === 'table' && renderControls()}
        
        {/* Error Message */}
        {(error || internalError) && (
          <div style={baseStyles.errorMessage}>
            <AlertCircle size={16} />
            {error || internalError}
          </div>
        )}
        
        {/* Main Content */}
        <main style={baseStyles.content}>
          {activeSection === 'table' && (
            <TableSection {...tableProps} />
          )}
          
          {activeSection === 'form' && (
            <FormSection 
              {...formProps}
              formData={formData}
              formErrors={formErrors}
              onFormChange={handleFormChange}
              onSubmit={handleFormSubmit}
            />
          )}
          
          {activeSection === 'details' && selectedRecord && (
            <DetailsSection 
              {...detailsProps}
              record={selectedRecord}
            />
          )}
        </main>
        
        {/* Loading Overlay */}
        {(loading || internalLoading) && (
          <div style={baseStyles.loadingOverlay}>
            <div style={baseStyles.spinner} />
          </div>
        )}
      </div>
    </AdminScaffoldContext.Provider>
  );
};

// Table Section Component
const TableSection = ({ 
  data = [], 
  columns = [], 
  pagination = {}, 
  emptyMessage = "No records found.",
  onRowClick,
  onRowSelect,
  selectable = false,
  ...props 
}) => {
  const { 
    selectedItems, 
    setSelectedItems, 
    sortConfig, 
    setSortConfig,
    viewMode,
    currentPage,
    pageSize,
    setPageSize,
    setCurrentPage,
    onSectionChange 
  } = useAdminScaffold();

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(data.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id, checked) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id]);
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id));
    }
  };

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Paginate data (only for client-side pagination)
  const paginatedData = useMemo(() => {
    // If server-side pagination is enabled, return all data as it's already paginated
    if (pagination.serverSide) {
      return sortedData;
    }
    
    // For client-side pagination, slice the data
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, pagination.serverSide]);

  const tableStyles = {
    container: {
      border: '1px solid #e2e8f0',
      backgroundColor: '#ffffff',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    header: {
      backgroundColor: '#f8fafc',
      borderBottom: '1px solid #e2e8f0',
    },
    headerCell: {
      padding: '12px 16px',
      textAlign: 'left',
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      borderRight: '1px solid #e2e8f0',
      cursor: 'pointer',
      userSelect: 'none',
    },
    row: {
      borderBottom: '1px solid #f1f5f9',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
    },
    cell: {
      padding: '12px 16px',
      fontSize: '14px',
      color: '#1e293b',
      borderRight: '1px solid #f1f5f9',
    },
    actions: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
    },
    actionButton: {
      padding: '4px',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      color: '#64748b',
      transition: 'color 0.2s ease',
    },
    emptyState: {
      textAlign: 'center',
      padding: '48px 24px',
      color: '#64748b',
    },
    pagination: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'between',
      padding: '16px',
      borderTop: '1px solid #e2e8f0',
      backgroundColor: '#f8fafc',
    },
    paginationInfo: {
      fontSize: '14px',
      color: '#64748b',
    },
    paginationControls: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
    },
    paginationButton: {
      padding: '8px 12px',
      border: '1px solid #e2e8f0',
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#64748b',
    },
  };

  if (data.length === 0) {
    return (
      <div style={tableStyles.container}>
        <div style={tableStyles.emptyState}>
          <Database size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#374151' }}>
            No Data Available
          </h3>
          <p style={{ margin: 0, fontSize: '14px' }}>
            {emptyMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={tableStyles.container}>
      <table style={tableStyles.table}>
        <thead style={tableStyles.header}>
          <tr>
            {selectable && (
              <th style={{ ...tableStyles.headerCell, width: '40px' }}>
                <input
                  type="checkbox"
                  checked={selectedItems.length === data.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
            )}
            {columns.map((column, index) => (
              <th
                key={column.key || index}
                style={tableStyles.headerCell}
                onClick={() => handleSort(column.key)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {column.label}
                  {sortConfig.key === column.key && (
                    sortConfig.direction === 'asc' ? 
                      <ChevronDown size={14} /> : 
                      <ChevronRight size={14} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              style={{
                ...tableStyles.row,
                backgroundColor: selectedItems.includes(row.id) ? '#f1f5f9' : 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 
                  selectedItems.includes(row.id) ? '#f1f5f9' : 'transparent';
              }}
            >
              {selectable && (
                <td style={tableStyles.cell}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(row.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectItem(row.id, e.target.checked);
                    }}
                  />
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td key={column.key || colIndex} style={tableStyles.cell}>
                  {column.render ? 
                    column.render(row[column.key], row, rowIndex) : 
                    row[column.key]
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      {pagination && (
        <div style={tableStyles.pagination}>
          <div style={tableStyles.paginationInfo}>
            {pagination.serverSide ? (
              // Server-side pagination info using actual server response data
              `Showing ${pagination.from || 1} to ${pagination.to || data.length} of ${pagination.total || data.length} entries`
            ) : (
              // Client-side pagination info  
              `Showing ${((currentPage - 1) * pageSize) + 1} to ${Math.min(currentPage * pageSize, data.length)} of ${data.length} entries`
            )}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
          }}>
            {/* Left side - Page Controls */}
            <div style={tableStyles.paginationControls}>
              <button
                style={{
                  ...tableStyles.paginationButton,
                  opacity: (pagination.serverSide ? pagination.current <= 1 : currentPage === 1) ? 0.5 : 1,
                  cursor: (pagination.serverSide ? pagination.current <= 1 : currentPage === 1) ? 'not-allowed' : 'pointer',
                }}
                onClick={() => {
                  if (pagination.serverSide && pagination.onChange) {
                    pagination.onChange(Math.max(1, pagination.current - 1));
                  } else {
                    setCurrentPage(prev => Math.max(1, prev - 1));
                  }
                }}
                disabled={pagination.serverSide ? pagination.current <= 1 : currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>
              <span style={{ fontSize: '14px', color: '#64748b' }}>
                {pagination.serverSide ? (
                  `Page ${pagination.current || 1} of ${pagination.lastPage || 1}`
                ) : (
                  `Page ${currentPage} of ${Math.ceil(data.length / pageSize)}`
                )}
              </span>
              <button
                style={{
                  ...tableStyles.paginationButton,
                  opacity: pagination.serverSide 
                    ? (pagination.current >= pagination.lastPage ? 0.5 : 1)
                    : (currentPage >= Math.ceil(data.length / pageSize) ? 0.5 : 1),
                  cursor: pagination.serverSide 
                    ? (pagination.current >= pagination.lastPage ? 'not-allowed' : 'pointer')
                    : (currentPage >= Math.ceil(data.length / pageSize) ? 'not-allowed' : 'pointer'),
                }}
                onClick={() => {
                  if (pagination.serverSide && pagination.onChange) {
                    pagination.onChange(Math.min(pagination.lastPage, pagination.current + 1));
                  } else {
                    setCurrentPage(prev => Math.min(Math.ceil(data.length / pageSize), prev + 1));
                  }
                }}
                disabled={pagination.serverSide 
                  ? pagination.current >= pagination.lastPage 
                  : currentPage >= Math.ceil(data.length / pageSize)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
            
            {/* Right side - Per Page Selector */}
            {pagination.showSizeChanger !== false && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#64748b',
              }}>
                <span>Show:</span>
                <select
                  value={pagination.serverSide ? pagination.pageSize : pageSize}
                  onChange={(e) => {
                    const newPageSize = parseInt(e.target.value);
                    if (pagination.serverSide && pagination.onPageSizeChange) {
                      pagination.onPageSizeChange(newPageSize);
                    } else {
                      setPageSize(newPageSize);
                      setCurrentPage(1);
                    }
                  }}
                  style={{
                    ...tableStyles.paginationButton,
                    padding: '6px 8px',
                    minWidth: '70px',
                    fontSize: '14px',
                  }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>per page</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Form Section Component
const FormSection = ({ 
  fields = [], 
  formData = {}, 
  formErrors = {}, 
  onFormChange,
  onSubmit,
  ...props 
}) => {
  const { selectedRecord, loading } = useAdminScaffold();

  const formStyles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
    },
    form: {
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      padding: '24px',
    },
    header: {
      marginBottom: '24px',
      paddingBottom: '16px',
      borderBottom: '1px solid #e2e8f0',
    },
    title: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#0a1e34',
      margin: '0 0 8px 0',
    },
    subtitle: {
      fontSize: '14px',
      color: '#64748b',
      margin: 0,
    },
    fieldGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '6px',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #e2e8f0',
      fontSize: '14px',
      color: '#1e293b',
      backgroundColor: '#ffffff',
      outline: 'none',
      transition: 'border-color 0.2s ease',
    },
    inputError: {
      borderColor: '#dc2626',
    },
    inputFocus: {
      borderColor: '#f59e0b',
    },
    textarea: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #e2e8f0',
      fontSize: '14px',
      color: '#1e293b',
      backgroundColor: '#ffffff',
      outline: 'none',
      resize: 'vertical',
      minHeight: '80px',
      fontFamily: 'inherit',
    },
    select: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #e2e8f0',
      fontSize: '14px',
      color: '#1e293b',
      backgroundColor: '#ffffff',
      outline: 'none',
    },
    error: {
      fontSize: '12px',
      color: '#dc2626',
      marginTop: '4px',
    },
    required: {
      color: '#dc2626',
    },
    row: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '16px',
    },
  };

  const renderField = (field, index) => {
    const value = formData[field.key] || '';
    const error = formErrors[field.key];
    const inputId = `field-${field.key}`;

    const handleChange = (newValue) => {
      onFormChange?.(field.key, newValue);
    };

    return (
      <div key={field.key || field.label || index} style={formStyles.fieldGroup}>
        <label htmlFor={inputId} style={formStyles.label}>
          {field.label}
          {field.required && <span style={formStyles.required}> *</span>}
        </label>
        
        {field.type === 'textarea' ? (
          <textarea
            id={inputId}
            style={{
              ...formStyles.textarea,
              ...(error ? formStyles.inputError : {}),
            }}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            disabled={loading}
          />
        ) : field.type === 'select' ? (
          <select
            id={inputId}
            style={{
              ...formStyles.select,
              ...(error ? formStyles.inputError : {}),
            }}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            disabled={loading}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={inputId}
            type={field.type || 'text'}
            style={{
              ...formStyles.input,
              ...(error ? formStyles.inputError : {}),
            }}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            disabled={loading}
          />
        )}
        
        {error && (
          <div style={formStyles.error}>
            {error}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={formStyles.container}>
      <form style={formStyles.form} onSubmit={onSubmit}>
        <div style={formStyles.header}>
          <h2 style={formStyles.title}>
            {selectedRecord ? 'Edit Record' : 'Add New Record'}
          </h2>
          <p style={formStyles.subtitle}>
            {selectedRecord ? 
              'Update the information below to modify this record.' : 
              'Fill in the information below to create a new record.'
            }
          </p>
        </div>
        
        <div style={formStyles.row}>
          {fields.map((field, index) => renderField(field, index))}
        </div>
        
        {/* Form Actions */}
        <div style={{
          marginTop: '32px',
          paddingTop: '20px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          <button
            type="button"
            onClick={() => window.history.back()}
            style={{
              padding: '10px 20px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              color: '#64748b',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: '#0a1e34',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            disabled={loading}
          >
            {loading ? 'Saving...' : (selectedRecord ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  );
};

// Details Section Component
const DetailsSection = ({ 
  fields = [], 
  record = {}, 
  ...props 
}) => {
  const detailsStyles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
    },
    card: {
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      padding: '24px',
    },
    header: {
      marginBottom: '24px',
      paddingBottom: '16px',
      borderBottom: '1px solid #e2e8f0',
    },
    title: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#0a1e34',
      margin: '0 0 8px 0',
    },
    subtitle: {
      fontSize: '14px',
      color: '#64748b',
      margin: 0,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
    },
    field: {
      marginBottom: '16px',
    },
    label: {
      fontSize: '12px',
      fontWeight: '500',
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '4px',
    },
    value: {
      fontSize: '14px',
      color: '#1e293b',
      fontWeight: '500',
    },
    emptyValue: {
      fontSize: '14px',
      color: '#94a3b8',
      fontStyle: 'italic',
    },
  };

  return (
    <div style={detailsStyles.container}>
      <div style={detailsStyles.card}>
        <div style={detailsStyles.header}>
          <h2 style={detailsStyles.title}>Record Details</h2>
          <p style={detailsStyles.subtitle}>
            Complete information for this record.
          </p>
        </div>
        
        <div style={detailsStyles.grid}>
          {fields.map((field) => (
            <div key={field.key} style={detailsStyles.field}>
              <div style={detailsStyles.label}>{field.label}</div>
              <div style={record[field.key] ? detailsStyles.value : detailsStyles.emptyValue}>
                {field.render ? 
                  field.render(record[field.key], record) : 
                  record[field.key] || '—'
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Form validation utility
const validateForm = (data, fields) => {
  const errors = {};
  
  fields.forEach(field => {
    const value = data[field.key];
    
    // Required validation
    if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors[field.key] = `${field.label} is required`;
      return;
    }
    
    // Custom validation
    if (field.validation && value) {
      const result = field.validation(value);
      if (result) {
        errors[field.key] = result;
      }
    }
    
    // Type-based validation
    if (value && field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors[field.key] = 'Please enter a valid email address';
      }
    }
    
    if (value && field.type === 'number') {
      if (isNaN(value)) {
        errors[field.key] = 'Please enter a valid number';
      }
    }
  });
  
  return errors;
};

// PropTypes
AdminContentScaffold.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  })),
  activeSection: PropTypes.oneOf(['table', 'form', 'details']),
  onSectionChange: PropTypes.func,
  selectedRecord: PropTypes.object,
  tableProps: PropTypes.object,
  onNewRecord: PropTypes.func,
  onExport: PropTypes.func,
  customCreateButton: PropTypes.func,
  formProps: PropTypes.object,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  detailsProps: PropTypes.object,
  searchValue: PropTypes.string,
  onSearchChange: PropTypes.func,
  showFilters: PropTypes.bool,
  onToggleFilters: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
  actions: PropTypes.array,
  className: PropTypes.string,
  style: PropTypes.object,
  headerHeight: PropTypes.number,
  controlsHeight: PropTypes.number,
  compactMode: PropTypes.bool,
  sidebarCollapsed: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  exportFormats: PropTypes.arrayOf(PropTypes.string),
  bulkActions: PropTypes.array,
  quickFilters: PropTypes.array,
  notifications: PropTypes.array,
  'aria-label': PropTypes.string,
  'data-testid': PropTypes.string,
  onRefresh: PropTypes.func,
  onBack: PropTypes.func,
  onSettings: PropTypes.func,
  onHelp: PropTypes.func,
  onNotificationClick: PropTypes.func,
  theme: PropTypes.oneOf(['light', 'dark']),
  customStyles: PropTypes.object,
};

// Default export
export default AdminContentScaffold;

// Named exports for individual components
export { 
  AdminContentScaffold,
  useAdminScaffold,
  TableSection,
  FormSection,
  DetailsSection,
};
