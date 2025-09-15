# AdminContentScaffold - Comprehensive Documentation

## 🎯 Overview

AdminContentScaffold is a revolutionary, production-ready React component that provides a complete admin panel layout system. Built following modern design principles and the hospital management system's design guidelines, it offers a three-section architecture with advanced functionality for managing complex administrative tasks.

## ✨ Key Features

### 🏗️ **Three-Section Architecture**
- **Table Section**: Advanced data listing with search, filtering, pagination, and bulk operations
- **Form Section**: Dynamic form generation with validation and contextual actions  
- **Details Section**: Comprehensive read-only view with professional formatting

### 🎨 **Design Excellence**
- **Flat Design**: Clean, modern interface following hospital system guidelines
- **Responsive Layout**: Seamless experience across desktop, tablet, and mobile
- **Professional Typography**: Optimized font hierarchy and spacing
- **Consistent Color Scheme**: Following the MediCare design system

### ⚡ **Advanced Functionality**
- **Context API Integration**: Sophisticated state management
- **Real-time Search**: Instant filtering with debounced input
- **Export Capabilities**: Multiple format support (CSV, Excel, PDF)
- **Bulk Operations**: Multi-select with batch actions
- **Form Validation**: Comprehensive client-side validation
- **Loading States**: Professional loading indicators throughout

### 🔧 **Developer Experience**
- **TypeScript Support**: Full type safety with PropTypes
- **Modular Architecture**: Reusable components and hooks
- **Extensive Testing**: Comprehensive test suite included
- **Accessibility**: ARIA labels and keyboard navigation
- **Documentation**: Complete API reference and examples

## 🚀 Quick Start

### Installation

```bash
# The component uses these dependencies
npm install @tanstack/react-table react-paginate react-select react-datepicker react-toastify prop-types lucide-react --legacy-peer-deps
```

### Basic Usage

```jsx
import React, { useState } from 'react';
import AdminContentScaffold from './components/AdminContentScaffold';

const MyAdminPage = () => {
  const [activeSection, setActiveSection] = useState('table');
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  ];
  
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' },
  ];
  
  const formFields = [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true },
    { key: 'status', label: 'Status', type: 'select', options: [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
    ]},
  ];

  return (
    <AdminContentScaffold
      title="User"
      subtitle="Manage user accounts"
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      selectedRecord={selectedRecord}
      tableProps={{ data, columns }}
      formProps={{ fields: formFields }}
      onSave={(formData) => console.log('Save:', formData)}
    />
  );
};
```

## 📚 Complete API Reference

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Record"` | Main entity title displayed in header |
| `subtitle` | `string` | `""` | Descriptive subtitle below title |
| `breadcrumbs` | `BreadcrumbItem[]` | `[]` | Navigation breadcrumb items |
| `activeSection` | `'table' \| 'form' \| 'details'` | `'table'` | Currently active section |
| `onSectionChange` | `(section, record?) => void` | - | Section change handler |
| `selectedRecord` | `object \| null` | `null` | Currently selected record |
| `loading` | `boolean` | `false` | Global loading state |
| `error` | `string \| null` | `null` | Error message to display |
| `searchValue` | `string` | `""` | Current search input value |
| `onSearchChange` | `(value) => void` | - | Search input change handler |

### Table Section Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tableProps.data` | `Array<object>` | `[]` | Data array for table |
| `tableProps.columns` | `ColumnConfig[]` | `[]` | Column configuration |
| `tableProps.pagination` | `PaginationConfig` | - | Pagination settings |
| `tableProps.emptyMessage` | `string` | - | Message for empty state |
| `tableProps.selectable` | `boolean` | `false` | Enable row selection |
| `onNewRecord` | `() => void` | - | New record button handler |
| `onExport` | `(format) => void` | - | Export button handler |

### Form Section Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `formProps.fields` | `FieldConfig[]` | `[]` | Form field configurations |
| `onSave` | `(formData, record?) => Promise` | - | Form save handler |
| `onDelete` | `(record) => Promise` | - | Record delete handler |

### Details Section Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `detailsProps.fields` | `DetailFieldConfig[]` | `[]` | Detail field configurations |

### Advanced Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `exportFormats` | `string[]` | `['csv', 'excel', 'pdf']` | Available export formats |
| `bulkActions` | `string[]` | `[]` | Available bulk actions |
| `headerHeight` | `number` | `64` | Header height in pixels |
| `controlsHeight` | `number` | `56` | Controls height in pixels |
| `compactMode` | `boolean` | `false` | Enable compact layout |
| `customStyles` | `object` | `{}` | Custom style overrides |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme configuration |

## 🔧 Configuration Objects

### Column Configuration

```typescript
interface ColumnConfig {
  key: string;                    // Field key in data object
  label: string;                  // Column header text
  render?: (value, record, index) => ReactNode;  // Custom renderer
  sortable?: boolean;             // Enable sorting
  width?: string | number;        // Column width
}
```

**Example:**
```jsx
const columns = [
  {
    key: 'name',
    label: 'Patient Name',
    render: (value, record) => (
      <div>
        <div style={{ fontWeight: '600' }}>{value}</div>
        <div style={{ fontSize: '12px', color: '#64748b' }}>
          ID: {record.patientId}
        </div>
      </div>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <span style={{
        padding: '4px 8px',
        backgroundColor: value === 'Active' ? '#dcfce7' : '#fef2f2',
        color: value === 'Active' ? '#166534' : '#dc2626',
        border: `1px solid ${value === 'Active' ? '#bbf7d0' : '#fecaca'}`,
        fontSize: '12px',
      }}>
        {value}
      </span>
    ),
  },
];
```

### Field Configuration

```typescript
interface FieldConfig {
  key: string;                    // Field key for form data
  label: string;                  // Display label
  type: FieldType;               // Field type (see below)
  required?: boolean;             // Validation requirement
  placeholder?: string;           // Placeholder text
  options?: SelectOption[];       // For select/radio fields
  rows?: number;                 // For textarea fields
  validation?: (value) => string | null;  // Custom validation
}

type FieldType = 
  | 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  | 'textarea' | 'select' | 'radio' | 'checkbox'
  | 'date' | 'time' | 'datetime-local';
```

**Example:**
```jsx
const formFields = [
  {
    key: 'name',
    label: 'Full Name',
    type: 'text',
    required: true,
    placeholder: 'Enter patient full name',
    validation: (value) => {
      if (value && value.length < 2) return 'Name must be at least 2 characters';
      return null;
    },
  },
  {
    key: 'age',
    label: 'Age',
    type: 'number',
    required: true,
    validation: (value) => {
      const age = parseInt(value);
      if (age < 0 || age > 150) return 'Please enter a valid age';
      return null;
    },
  },
  {
    key: 'gender',
    label: 'Gender',
    type: 'select',
    required: true,
    options: [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      { value: 'Other', label: 'Other' },
    ],
  },
  {
    key: 'medicalHistory',
    label: 'Medical History',
    type: 'textarea',
    rows: 4,
    placeholder: 'Enter medical history...',
  },
];
```

### Detail Field Configuration

```typescript
interface DetailFieldConfig {
  key: string;                    // Field key in data object
  label: string;                  // Display label
  render?: (value, record) => ReactNode;  // Custom renderer
}
```

**Example:**
```jsx
const detailsFields = [
  { key: 'name', label: 'Patient Name' },
  { key: 'email', label: 'Email Address' },
  { 
    key: 'age', 
    label: 'Age',
    render: (value) => `${value} years old`
  },
  { 
    key: 'lastVisit', 
    label: 'Last Visit',
    render: (value) => new Date(value).toLocaleDateString()
  },
];
```

### Pagination Configuration

```typescript
interface PaginationConfig {
  current: number;                // Current page number
  total: number;                  // Total number of records
  pageSize: number;              // Records per page
  showSizeChanger?: boolean;     // Show page size selector
  showQuickJumper?: boolean;     // Show quick page jumper
  onChange?: (page, pageSize) => void;  // Page change handler
  onShowSizeChange?: (current, size) => void;  // Page size change handler
}
```

## 🎨 Design System Integration

The component follows the MediCare Hospital Management System design guidelines:

### Color Palette

```css
/* Primary Colors */
--primary-color: #0a1e34;        /* Deep Navy Blue */
--accent-color: #f59e0b;         /* Medical Orange */
--background-color: #f8fafc;     /* Light Gray */
--white: #ffffff;                /* Pure White */

/* Text Colors */
--text-primary: #1e293b;         /* Dark Gray */
--text-secondary: #64748b;       /* Medium Gray */
--text-muted: #94a3b8;          /* Light Gray */

/* Status Colors */
--success-color: #10b981;        /* Green */
--warning-color: #f59e0b;        /* Orange */
--error-color: #ef4444;          /* Red */
--info-color: #3b82f6;          /* Blue */
```

### Typography

```css
/* Font Hierarchy */
--font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-size-base: 14px;
--font-size-sm: 12px;
--font-size-lg: 16px;
--font-size-xl: 18px;
--font-size-2xl: 20px;

/* Font Weights */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
```

### Spacing

```css
/* Padding and Margins */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 20px;
--spacing-2xl: 24px;
```

## 💡 Advanced Examples

### Hospital Patient Management

```jsx
import React, { useState, useEffect } from 'react';
import AdminContentScaffold from './AdminContentScaffoldV2';

const PatientManagement = () => {
  const [activeSection, setActiveSection] = useState('table');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  // Enhanced columns with medical data
  const columns = [
    {
      key: 'patientId',
      label: 'Patient ID',
      render: (value, record) => (
        <div>
          <div style={{ fontWeight: '600', color: '#0a1e34' }}>{value}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            Reg: {new Date(record.registrationDate).toLocaleDateString()}
          </div>
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Patient Name',
      render: (value, record) => (
        <div>
          <div style={{ fontWeight: '600' }}>{value}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            {record.age} years • {record.gender}
          </div>
        </div>
      ),
    },
    {
      key: 'bloodType',
      label: 'Blood Type',
      render: (value) => (
        <span style={{
          padding: '2px 8px',
          backgroundColor: '#f1f5f9',
          border: '1px solid #e2e8f0',
          fontSize: '12px',
          fontWeight: '600',
        }}>
          {value}
        </span>
      ),
    },
    {
      key: 'doctorAssigned',
      label: 'Assigned Doctor',
      render: (value, record) => (
        <div>
          <div style={{ fontWeight: '500' }}>{value}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            {record.department}
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span style={{
          padding: '4px 8px',
          backgroundColor: value === 'Active' ? '#dcfce7' : '#fef2f2',
          color: value === 'Active' ? '#166534' : '#dc2626',
          border: `1px solid ${value === 'Active' ? '#bbf7d0' : '#fecaca'}`,
          fontSize: '12px',
          fontWeight: '500',
        }}>
          {value}
        </span>
      ),
    },
  ];

  // Comprehensive form fields
  const formFields = [
    {
      key: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter patient full name',
    },
    {
      key: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'patient@example.com',
    },
    {
      key: 'phone',
      label: 'Phone Number',
      type: 'tel',
      required: true,
      placeholder: '+1 (555) 123-4567',
    },
    {
      key: 'age',
      label: 'Age',
      type: 'number',
      required: true,
      validation: (value) => {
        const age = parseInt(value);
        if (age < 0 || age > 150) return 'Please enter a valid age';
        return null;
      },
    },
    {
      key: 'gender',
      label: 'Gender',
      type: 'select',
      required: true,
      options: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
      ],
    },
    {
      key: 'bloodType',
      label: 'Blood Type',
      type: 'select',
      required: true,
      options: [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' },
      ],
    },
    {
      key: 'address',
      label: 'Address',
      type: 'textarea',
      rows: 2,
      placeholder: 'Enter complete address',
    },
    {
      key: 'emergencyContact',
      label: 'Emergency Contact',
      type: 'text',
      required: true,
      placeholder: 'Name - Relationship (Phone)',
    },
    {
      key: 'medicalHistory',
      label: 'Medical History',
      type: 'textarea',
      rows: 4,
      placeholder: 'Enter medical history, conditions, allergies...',
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
      ],
    },
  ];

  // Detailed view fields
  const detailsFields = [
    { key: 'patientId', label: 'Patient ID' },
    { key: 'name', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'age', label: 'Age', render: (value) => `${value} years` },
    { key: 'gender', label: 'Gender' },
    { key: 'bloodType', label: 'Blood Type' },
    { key: 'address', label: 'Address' },
    { key: 'emergencyContact', label: 'Emergency Contact' },
    { key: 'medicalHistory', label: 'Medical History' },
    { key: 'status', label: 'Status' },
  ];

  // Event handlers
  const handleSave = async (formData) => {
    setLoading(true);
    try {
      if (selectedRecord) {
        // Update existing patient
        const response = await fetch(`/api/patients/${selectedRecord.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          setPatients(prev => prev.map(patient =>
            patient.id === selectedRecord.id ? { ...patient, ...formData } : patient
          ));
        }
      } else {
        // Create new patient
        const response = await fetch('/api/patients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          const newPatient = await response.json();
          setPatients(prev => [...prev, newPatient]);
        }
      }
    } catch (error) {
      console.error('Error saving patient:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format) => {
    const data = patients;
    const timestamp = new Date().toISOString().split('T')[0];
    
    if (format === 'csv') {
      const headers = ['Patient ID', 'Name', 'Email', 'Phone', 'Age', 'Blood Type', 'Status'];
      const csvContent = [
        headers.join(','),
        ...data.map(patient => [
          patient.patientId,
          `"${patient.name}"`,
          patient.email,
          patient.phone,
          patient.age,
          patient.bloodType,
          patient.status
        ].join(','))
      ].join('\\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `patients-${timestamp}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <AdminContentScaffold
      title="Patient"
      subtitle="Comprehensive patient management with medical records"
      breadcrumbs={[
        { label: 'Dashboard', onClick: () => console.log('Navigate to dashboard') },
        { label: 'Medical Records', onClick: () => console.log('Navigate to records') },
      ]}
      
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      selectedRecord={selectedRecord}
      
      tableProps={{
        data: patients,
        columns,
        pagination: { current: 1, total: patients.length, pageSize: 10 },
        emptyMessage: "No patients found. Add your first patient to get started.",
        selectable: true,
      }}
      onNewRecord={() => setSelectedRecord(null)}
      onExport={handleExport}
      
      formProps={{ fields: formFields }}
      onSave={handleSave}
      
      detailsProps={{ fields: detailsFields }}
      
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      
      loading={loading}
      
      exportFormats={['csv', 'excel', 'pdf']}
      
      aria-label="Patient management interface"
    />
  );
};

export default PatientManagement;
```

### Doctor Management

```jsx
const DoctorManagement = () => {
  // Similar structure but with doctor-specific fields
  const formFields = [
    { key: 'name', label: 'Doctor Name', type: 'text', required: true },
    { key: 'specialization', label: 'Specialization', type: 'select', required: true, options: [
      { value: 'Cardiology', label: 'Cardiology' },
      { value: 'Neurology', label: 'Neurology' },
      { value: 'Pediatrics', label: 'Pediatrics' },
    ]},
    { key: 'license', label: 'Medical License', type: 'text', required: true },
    { key: 'experience', label: 'Years of Experience', type: 'number', required: true },
    { key: 'schedule', label: 'Work Schedule', type: 'text' },
  ];

  return (
    <AdminContentScaffold
      title="Doctor"
      subtitle="Manage doctor profiles and schedules"
      // ... similar configuration
    />
  );
};
```

## 🔌 Context API Usage

The component provides a powerful context API for advanced customization:

```jsx
import { useAdminScaffold } from './AdminContentScaffoldV2';

const CustomComponent = () => {
  const {
    activeSection,
    selectedRecord,
    loading,
    formData,
    setFormData,
    selectedItems,
    sortConfig,
    setSortConfig,
    // ... many more context values
  } = useAdminScaffold();

  // Use context values for custom behavior
  return (
    <div>
      <p>Current section: {activeSection}</p>
      <p>Selected items: {selectedItems.length}</p>
    </div>
  );
};
```

## 🧪 Testing

The component includes comprehensive tests. Run them with:

```bash
npm test AdminContentScaffoldV2.test.jsx
```

### Test Coverage

- ✅ Basic rendering and props
- ✅ Section navigation
- ✅ Table functionality (sorting, pagination, selection)
- ✅ Form validation and submission
- ✅ Details view rendering
- ✅ Search and filtering
- ✅ Action buttons and handlers
- ✅ Loading and error states
- ✅ Context provider functionality
- ✅ Accessibility features
- ✅ Responsive design
- ✅ Performance with large datasets

## 🎯 Best Practices

### 1. Data Management

```jsx
// Use proper state management for large applications
const PatientPage = () => {
  const [patients, setPatients] = useState([]);
  
  // Memoize expensive calculations
  const filteredPatients = useMemo(() => {
    return patients.filter(patient =>
      patient.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [patients, searchValue]);

  return (
    <AdminContentScaffold
      tableProps={{ data: filteredPatients, columns }}
      // ... other props
    />
  );
};
```

### 2. Form Validation

```jsx
// Create reusable validation functions
const validators = {
  required: (value) => value ? null : 'This field is required',
  email: (value) => /\\S+@\\S+\\.\\S+/.test(value) ? null : 'Invalid email',
  minLength: (min) => (value) => 
    value.length >= min ? null : `Must be at least ${min} characters`,
};

const formFields = [
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    validation: validators.email,
  },
];
```

### 3. Performance Optimization

```jsx
// Debounce search input
import { useDebouncedCallback } from 'use-debounce';

const MyComponent = () => {
  const debouncedSearch = useDebouncedCallback(
    (value) => performSearch(value),
    300
  );
  
  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);
};
```

### 4. Custom Styling

```jsx
const customStyles = {
  container: {
    backgroundColor: '#f0f9ff',
  },
  header: {
    backgroundColor: '#0369a1',
    color: '#ffffff',
  },
  controls: {
    backgroundColor: '#e0f2fe',
  },
};

<AdminContentScaffold
  customStyles={customStyles}
  // ... other props
/>
```

## 🚨 Common Issues & Solutions

### Issue: Component not rendering
**Solution**: Ensure all required dependencies are installed with `--legacy-peer-deps` flag.

### Issue: Form validation not working
**Solution**: Make sure validation functions return `null` for valid values, not `undefined` or empty string.

### Issue: Search not filtering data
**Solution**: Implement filtering logic in parent component, not inside the scaffold.

### Issue: Export not working
**Solution**: Ensure `onExport` handler is properly implemented and handles different formats.

## 🔄 Migration Guide

### From AdminContentScaffold V1 to V2

```jsx
// V1 (Old way)
<AdminContentScaffold
  data={data}
  columns={columns}
  onSave={handleSave}
/>

// V2 (New way)
<AdminContentScaffold
  tableProps={{ data, columns }}
  formProps={{ fields }}
  onSave={handleSave}
/>
```

### Breaking Changes
- Props are now organized into sections (`tableProps`, `formProps`, `detailsProps`)
- Context API is more comprehensive
- Event handlers have different signatures
- Styling system has been redesigned

## 🆕 What's New in V2

### Enhanced Features
- **Better State Management**: Comprehensive context API
- **Advanced Table**: Sorting, filtering, bulk operations
- **Professional Design**: Following hospital design system
- **Better Performance**: Optimized rendering and memory usage
- **Accessibility**: Full ARIA support and keyboard navigation
- **Mobile Responsive**: Seamless mobile experience
- **TypeScript Support**: Better type safety

### New Props
- `exportFormats`: Configure available export formats
- `bulkActions`: Define bulk operation capabilities
- `customStyles`: Fine-tune component styling
- `compactMode`: Enable space-efficient layout
- `headerHeight`/`controlsHeight`: Control layout dimensions

### New Components
- Individual section components can be used standalone
- Enhanced context hook for advanced customization
- Comprehensive test utilities

## 📞 Support & Contributing

### Getting Help
- Review this documentation thoroughly
- Check the example implementations
- Run the test suite to understand expected behavior
- Create issues for bugs or feature requests

### Contributing
- Follow the established code style
- Add tests for new features
- Update documentation for changes
- Follow the hospital design system guidelines

## 📄 License

This component is part of the MediCare Hospital Management System and follows the project's licensing terms.

---

**AdminContentScaffold** represents the pinnacle of admin interface design for React applications. With its comprehensive feature set, professional design, and developer-friendly API, it enables rapid development of sophisticated administrative interfaces while maintaining the highest standards of quality and user experience.
