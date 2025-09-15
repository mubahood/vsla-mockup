# AdminContentController - Frontend Scaffold System

## Overview

The AdminContentController is a comprehensive scaffold system that provides consistent structure and UI/UX for all admin-based content in the hospital management system. This controller serves as a layout wrapper specifically designed for admin content sections, ensuring uniformity across all administrative pages.

## Features

### 🎯 **Core Functionality**
- **Unified Layout**: Consistent structure for all admin pages
- **Slot-based Content**: Flexible content injection through React children
- **Responsive Design**: Mobile-friendly and adaptive layouts
- **Modern UI/UX**: Clean, professional appearance with small font sizes
- **Three Modes**: Table, Form, and Detail page layouts

### 📊 **Table Mode Features**
- Compact page titles
- Two-sided control bar with left/right positioning
- Collapsible filter forms (hidden by default)
- Modern table design with striped rows
- Sortable columns and action buttons
- Search functionality with real-time filtering
- Export capabilities
- Create button for new records

### 📝 **Form Mode Features**
- Clean form layouts with proper spacing
- Consistent input styling and validation
- Submit/Cancel button combinations
- Loading states and error handling

### 📋 **Detail Mode Features**
- Structured detail page layouts
- Consistent information presentation
- Action button placement

## File Structure

```
src/pages/Admin/Scaffold/
└── AdminContentController.jsx
```

## Components

### 1. AdminContentController (Main Component)

The primary scaffold controller that wraps all admin content.

**Props:**
```javascript
{
  mode: 'table' | 'form' | 'detail',          // Page mode
  title: string,                               // Page title
  children: React.ReactNode,                   // Main content
  filterForm: React.ReactNode,                 // Filter form (table mode)
  onSearch: Function,                          // Search handler
  onFilter: Function,                          // Filter toggle handler
  onExport: Function,                          // Export handler
  onCreate: Function,                          // Create button handler
  searchValue: string,                         // Current search value
  showFilters: boolean,                        // Filter visibility
  loading: boolean,                            // Loading state
  createButtonText: string,                    // Custom create button text
  exportButtonText: string,                    // Custom export button text
  showSearch: boolean,                         // Show search input
  showExport: boolean,                         // Show export button
  showCreate: boolean,                         // Show create button
  showFilter: boolean,                         // Show filter toggle
  searchPlaceholder: string,                   // Search placeholder
  className: string                            // Additional CSS classes
}
```

### 2. AdminTable (Table Component)

Modern table component with advanced features.

**Props:**
```javascript
{
  columns: Array,                              // Column definitions
  data: Array,                                 // Table data
  onSort: Function,                            // Sort handler
  sortField: string,                           // Current sort field
  sortDirection: 'asc' | 'desc',              // Sort direction
  onRowClick: Function,                        // Row click handler
  actionColumn: React.ReactNode | Function,    // Action column content
  striped: boolean,                            // Striped rows
  hoverable: boolean,                          // Row hover effects
  loading: boolean,                            // Loading state
  emptyMessage: string                         // Empty state message
}
```

### 3. AdminForm (Form Component)

Standardized form component with consistent styling.

**Props:**
```javascript
{
  children: React.ReactNode,                   // Form fields
  onSubmit: Function,                          // Submit handler
  loading: boolean,                            // Loading state
  submitText: string,                          // Submit button text
  cancelText: string,                          // Cancel button text
  onCancel: Function,                          // Cancel handler
  showCancel: boolean,                         // Show cancel button
  className: string                            // Additional CSS classes
}
```

### 4. AdminPagination (Pagination Component)

Comprehensive pagination with items-per-page controls.

**Props:**
```javascript
{
  currentPage: number,                         // Current page
  totalPages: number,                          // Total pages
  totalItems: number,                          // Total items
  itemsPerPage: number,                        // Items per page
  onPageChange: Function,                      // Page change handler
  onItemsPerPageChange: Function,              // Items per page handler
  showItemsPerPage: boolean                    // Show items per page selector
}
```

## Usage Examples

### Table Page Example

```javascript
import AdminContentController, { AdminTable, AdminPagination } from '../Scaffold/AdminContentController';
import { EmployeeModel } from '../../../models';

const EmployeesIndex = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20
  });

  // Table columns definition
  const columns = [
    {
      field: 'id',
      label: 'ID',
      sortable: true
    },
    {
      field: 'fullName',
      label: 'Name',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            {row.initials}
          </div>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-gray-500">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      field: 'title',
      label: 'Position',
      sortable: true
    },
    {
      field: 'departmentDisplay',
      label: 'Department',
      sortable: false
    },
    {
      field: 'statusDisplay',
      label: 'Status',
      sortable: true,
      render: (value, row) => (
        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
          row.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    }
  ];

  // Filter form
  const filterForm = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Department
        </label>
        <select className="w-full text-xs border-gray-300 rounded-md">
          <option value="">All Departments</option>
          <option value="IT">IT Department</option>
          <option value="HR">Human Resources</option>
          <option value="Finance">Finance</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Status
        </label>
        <select className="w-full text-xs border-gray-300 rounded-md">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Position
        </label>
        <input
          type="text"
          placeholder="Enter position..."
          className="w-full text-xs border-gray-300 rounded-md"
        />
      </div>
    </div>
  );

  // Action column
  const actionColumn = (row) => (
    <div className="flex items-center space-x-2">
      <button className="text-blue-600 hover:text-blue-800 text-xs">
        Edit
      </button>
      <button className="text-red-600 hover:text-red-800 text-xs">
        Delete
      </button>
    </div>
  );

  return (
    <AdminContentController
      mode="table"
      title="Employees"
      searchValue={searchValue}
      onSearch={setSearchValue}
      showFilters={showFilters}
      onFilter={setShowFilters}
      onExport={() => console.log('Export')}
      onCreate={() => console.log('Create')}
      loading={loading}
      filterForm={filterForm}
      createButtonText="Add Employee"
    >
      <AdminTable
        columns={columns}
        data={employees}
        actionColumn={actionColumn}
        loading={loading}
        onRowClick={(row) => console.log('Row clicked:', row)}
      />
      
      <AdminPagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        itemsPerPage={pagination.itemsPerPage}
        onPageChange={(page) => setPagination(prev => ({ ...prev, currentPage: page }))}
        onItemsPerPageChange={(items) => setPagination(prev => ({ ...prev, itemsPerPage: items }))}
      />
    </AdminContentController>
  );
};
```

### Form Page Example

```javascript
import AdminContentController, { AdminForm } from '../Scaffold/AdminContentController';

const EmployeeCreate = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number_1: '',
    title: '',
    department: ''
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      // Save employee logic here
      console.log('Saving employee:', formData);
    } catch (error) {
      console.error('Error saving employee:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContentController
      mode="form"
      title="Create New Employee"
      loading={loading}
    >
      <AdminForm
        onSubmit={handleSubmit}
        loading={loading}
        submitText="Create Employee"
        onCancel={() => window.history.back()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => setFormData(prev => ({...prev, first_name: e.target.value}))}
              className="w-full text-xs border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => setFormData(prev => ({...prev, last_name: e.target.value}))}
              className="w-full text-xs border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
              className="w-full text-xs border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone_number_1}
              onChange={(e) => setFormData(prev => ({...prev, phone_number_1: e.target.value}))}
              className="w-full text-xs border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
              className="w-full text-xs border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              value={formData.department}
              onChange={(e) => setFormData(prev => ({...prev, department: e.target.value}))}
              className="w-full text-xs border-gray-300 rounded-md"
            >
              <option value="">Select Department</option>
              <option value="IT">IT Department</option>
              <option value="HR">Human Resources</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>
      </AdminForm>
    </AdminContentController>
  );
};
```

## Design Specifications

### Typography
- **Font Size**: Small (text-xs) for compact information display
- **Font Weight**: Medium for headers, normal for content
- **Line Height**: Tight for compact layouts

### Colors
- **Primary**: Blue-600 (#2563eb)
- **Secondary**: Gray-600 (#4b5563)
- **Success**: Green-600 (#16a34a)
- **Danger**: Red-600 (#dc2626)
- **Background**: White with gray-50 accents

### Spacing
- **Padding**: Compact spacing (2-4 units)
- **Margins**: Minimal margins for dense layouts
- **Gaps**: 2-4 units between elements

### Interactive Elements
- **Hover States**: Subtle color transitions
- **Focus States**: Blue ring with offset
- **Disabled States**: Opacity reduction with cursor changes
- **Loading States**: Spinners with appropriate positioning

## Responsive Behavior

### Mobile (< 640px)
- Stacked control layouts
- Full-width buttons
- Simplified table views with horizontal scrolling
- Collapsed filter forms

### Tablet (640px - 1024px)
- Two-column form layouts
- Condensed control bars
- Responsive table columns

### Desktop (> 1024px)
- Full multi-column layouts
- Expanded control bars
- Complete table visibility

## Best Practices

### Implementation Guidelines
1. **Consistent Usage**: Always use the scaffold for admin pages
2. **Slot Utilization**: Leverage children props for content injection
3. **State Management**: Handle loading, error, and success states
4. **Accessibility**: Include proper ARIA labels and keyboard navigation
5. **Performance**: Implement pagination and lazy loading for large datasets

### Customization
- Use className props for additional styling
- Extend components through composition, not modification
- Follow the established design system patterns
- Maintain small font sizes for information density

### Integration
- Integrate with existing UI components (buttons, inputs, selects)
- Use consistent error handling patterns
- Implement proper form validation
- Follow established routing conventions

## Future Enhancements

### Planned Features
- **Bulk Actions**: Multi-select with bulk operations
- **Advanced Filters**: Date ranges, number ranges, custom filters
- **Column Management**: Show/hide columns, reordering
- **Export Options**: Multiple format support (PDF, Excel, CSV)
- **Real-time Updates**: WebSocket integration for live data
- **Keyboard Shortcuts**: Navigation and action shortcuts

### Accessibility Improvements
- Enhanced screen reader support
- High contrast mode compatibility
- Keyboard-only navigation optimization
- Focus management improvements

This scaffold system provides a solid foundation for all admin content in the hospital management system, ensuring consistency, usability, and maintainability across the entire application.
