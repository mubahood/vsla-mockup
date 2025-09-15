import React, { useState, useEffect, useCallback } from 'react';
import AdminContentScaffold from '../../../components/AdminContentScaffold/AdminContentScaffold';
import EmployeeModel from '../../../models/EmployeeModel';

const EmployeesList = () => {
  const [activeSection, setActiveSection] = useState('table');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 20, // Set to 20 per page
    from: 0,
    to: 0,
    lastPage: 1,
  });

  // Load employees from API
  const loadEmployees = useCallback(async (page = 1, search = '', perPage = pagination.pageSize) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        page: page,
        per_page: perPage, // Use dynamic per_page value
        search: search,
        search_by: 'name,first_name,last_name,email,phone_number_1,title',
        sort_by: 'created_at',
        sort_order: 'desc',
        // Additional filters for employees
        filter_user_type: 'employee',
        filter_status: [1, 2], // Active statuses
      };

      const response = await EmployeeModel.getAll(params);
      
      if (response.data && response.data.data) {
        const { data, pagination: paginationData } = response.data;
        
        // Convert plain objects to EmployeeModel instances
        const employeeInstances = (data || []).map(employeeData => new EmployeeModel(employeeData));
        setEmployees(employeeInstances);
        
        setPagination({
          current: paginationData?.current_page || page,
          total: paginationData?.total || 0,
          pageSize: paginationData?.per_page || perPage, // Use server-side per_page value
          from: paginationData?.from || 0,
          to: paginationData?.to || 0,
          lastPage: paginationData?.last_page || 1,
        });
      } else {
        // Handle case where API returns different structure
        // Convert plain objects to EmployeeModel instances
        const employeeInstances = (response.data || []).map(employeeData => new EmployeeModel(employeeData));
        setEmployees(employeeInstances);
      }
    } catch (error) {
      console.error('Failed to load employees:', error);
      setError('Failed to load employees. Please try again.');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.pageSize]);

  // Initial load and search effect
  useEffect(() => {
    loadEmployees(1, searchValue, pagination.pageSize);
  }, [searchValue, loadEmployees]);

  // Pagination handler
  const handlePageChange = (page) => {
    loadEmployees(page, searchValue, pagination.pageSize);
  };

  // Page size change handler
  const handlePageSizeChange = (newPageSize) => {
    setPagination(prev => ({
      ...prev,
      pageSize: newPageSize,
      current: 1, // Reset to first page when changing page size
    }));
    loadEmployees(1, searchValue, newPageSize);
  };

  // Section change handler
  const handleSectionChange = (section, record) => {
    setActiveSection(section);
    if (record) {
      setSelectedRecord(record);
    }
  };

  // New record handler
  const handleNewRecord = () => {
    setSelectedRecord(null);
    setActiveSection('form');
  };

  // Save handler (create/update)
  const handleSave = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      let savedEmployee;
      
      if (selectedRecord && selectedRecord.id) {
        // Update existing employee
        const response = await EmployeeModel.update(selectedRecord.id, formData);
        savedEmployee = response.data.data;
        
        // Update the employee in the list
        setEmployees(prev => prev.map(emp => 
          emp.id === selectedRecord.id ? new EmployeeModel(savedEmployee) : emp
        ));
      } else {
        // Create new employee
        const response = await EmployeeModel.create(formData);
        savedEmployee = response.data.data;
        
        // Reload the list to get updated data
        await loadEmployees(pagination.current, searchValue);
      }
      
      setActiveSection('details');
      setSelectedRecord(new EmployeeModel(savedEmployee));
      
    } catch (error) {
      console.error('Failed to save employee:', error);
      setError('Failed to save employee. Please try again.');
      throw error; // Re-throw to let the form handle it
    } finally {
      setLoading(false);
    }
  };

  // Delete handler
  const handleDelete = async (record) => {
    if (!window.confirm(`Are you sure you want to delete ${record.getDisplayName()}?`)) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await EmployeeModel.delete(record.id);
      
      // Remove from local state
      setEmployees(prev => prev.filter(emp => emp.id !== record.id));
      
      // Update pagination if needed
      setPagination(prev => ({
        ...prev,
        total: prev.total - 1
      }));
      
      // If we deleted the selected record, clear selection
      if (selectedRecord && selectedRecord.id === record.id) {
        setSelectedRecord(null);
        setActiveSection('table');
      }
      
    } catch (error) {
      console.error('Failed to delete employee:', error);
      setError('Failed to delete employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Export handler
  const handleExport = (format) => {
    const timestamp = new Date().toISOString().split('T')[0];
    
    if (format === 'csv') {
      const headers = ['Name', 'Email', 'Phone', 'Title', 'Department', 'Status', 'Created Date'];
      const csvContent = [
        headers.join(','),
        ...employees.map(emp => [
          `"${emp.getDisplayName()}"`,
          emp.email || '',
          emp.phone_number_1 || '',
          emp.title || '',
          emp.department || '',
          emp.getStatusText(),
          emp.created_at ? new Date(emp.created_at).toLocaleDateString() : ''
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `employees-${timestamp}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  // Table columns configuration
  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (value, record) => (
        <div style={{ fontWeight: 600, color: '#0a1e34' }}>
          {record.getDisplayName()}
        </div>
      ),
    },
    {
      key: 'phone_number',
      label: 'Phone Number',
      render: (value, record) => (
        <div style={{ fontSize: '14px' }}>
          {record.phone_number_1 || 'No Phone'}
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email Address',
      render: (value, record) => (
        <div style={{ fontSize: '14px' }}>
          {record.email || 'No Email'}
        </div>
      ),
    },
    {
      key: 'address',
      label: 'Address',
      render: (value, record) => (
        <div style={{ fontSize: '14px' }}>
          {record.home_address || 'No Address'}
        </div>
      ),
    },
    {
      key: 'gender',
      label: 'Gender',
      render: (value, record) => (
        <div style={{ fontSize: '14px', textTransform: 'capitalize' }}>
          {record.sex || 'Not Specified'}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value, record) => {
        const statusText = record.getStatusText();
        const isActive = record.isActive; // Property, not function
        
        return (
          <span style={{
            padding: '2px 6px',
            backgroundColor: isActive ? '#dcfce7' : '#fef2f2',
            color: isActive ? '#166534' : '#dc2626',
            border: `1px solid ${isActive ? '#bbf7d0' : '#fecaca'}`,
            fontSize: '12px',
            fontWeight: '500',
            borderRadius: '4px',
          }}>
            {statusText}
          </span>
        );
      },
    },
    {
      key: 'registered',
      label: 'Registered',
      render: (value, record) => {
        if (!record.created_at) return 'Unknown';
        return new Date(record.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      },
    },
  ];

  // Form fields configuration
  const formFields = [
    {
      key: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter employee full name',
    },
    {
      key: 'first_name',
      label: 'First Name',
      type: 'text',
      required: true,
      placeholder: 'Enter first name',
    },
    {
      key: 'last_name',
      label: 'Last Name',
      type: 'text',
      required: true,
      placeholder: 'Enter last name',
    },
    {
      key: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'Enter email address',
    },
    {
      key: 'phone_number_1',
      label: 'Primary Phone',
      type: 'tel',
      required: true,
      placeholder: 'Enter primary phone number',
    },
    {
      key: 'phone_number_2',
      label: 'Secondary Phone',
      type: 'tel',
      placeholder: 'Enter secondary phone number',
    },
    {
      key: 'title',
      label: 'Job Title',
      type: 'text',
      required: true,
      placeholder: 'Enter job title (e.g., Nurse, Administrator)',
    },
    {
      key: 'user_type',
      label: 'Employee Type',
      type: 'select',
      required: true,
      options: [
        { value: 'employee', label: 'Employee' },
        { value: 'admin', label: 'Administrator' },
        { value: 'manager', label: 'Manager' },
        { value: 'doctor', label: 'Doctor' },
        { value: 'nurse', label: 'Nurse' },
        { value: 'technician', label: 'Technician' },
      ],
    },
    {
      key: 'home_address',
      label: 'Home Address',
      type: 'textarea',
      rows: 2,
      placeholder: 'Enter home address',
    },
    {
      key: 'emergency_person_name',
      label: 'Emergency Contact Name',
      type: 'text',
      placeholder: 'Enter emergency contact name',
    },
    {
      key: 'emergency_person_phone',
      label: 'Emergency Contact Phone',
      type: 'tel',
      placeholder: 'Enter emergency contact phone',
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 2, label: 'Active' },
        { value: 1, label: 'Pending' },
        { value: 0, label: 'Inactive' },
      ],
    },
  ];

  // Details fields configuration
  const detailsFields = [
    { key: 'id', label: 'Employee ID' },
    { 
      key: 'name', 
      label: 'Full Name',
      render: (value, record) => record.getDisplayName()
    },
    { key: 'email', label: 'Email' },
    { key: 'phone_number_1', label: 'Primary Phone' },
    { key: 'phone_number_2', label: 'Secondary Phone' },
    { key: 'title', label: 'Job Title' },
    { 
      key: 'user_type', 
      label: 'Employee Type',
      render: (value) => value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Employee'
    },
    { key: 'home_address', label: 'Home Address' },
    { key: 'emergency_person_name', label: 'Emergency Contact' },
    { key: 'emergency_person_phone', label: 'Emergency Phone' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value, record) => record.getStatusText()
    },
    { 
      key: 'created_at', 
      label: 'Date Joined',
      render: (value) => value ? new Date(value).toLocaleDateString() : 'Unknown'
    },
  ];

  return (
    <AdminContentScaffold
      title="Employee"
      subtitle="Manage hospital staff and employee records"
      breadcrumbs={[
        { label: 'Dashboard', onClick: () => console.log('Navigate to dashboard') },
        { label: 'Human Resources', onClick: () => console.log('Navigate to HR') },
      ]}
      
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
      selectedRecord={selectedRecord}
      
      tableProps={{
        data: employees,
        columns,
        pagination: {
          current: pagination.current,
          total: pagination.total,
          pageSize: pagination.pageSize,
          from: pagination.from,
          to: pagination.to,
          lastPage: pagination.lastPage,
          onChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange, // Add page size change handler
          showSizeChanger: true, // Enable the size changer
          serverSide: true, // Enable server-side pagination
        },
        emptyMessage: "No employees found. Add your first employee to get started.",
        selectable: true,
      }}
      onNewRecord={handleNewRecord}
      onExport={handleExport}
      
      formProps={{
        fields: formFields,
      }}
      onSave={handleSave}
      onDelete={selectedRecord ? handleDelete : null}
      
      detailsProps={{
        fields: detailsFields,
      }}
      
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      onRefresh={() => loadEmployees(pagination.current, searchValue, pagination.pageSize)}
      onBack={() => window.history.length > 1 ? window.history.back() : window.location.href = '/admin/dashboard'}
      
      loading={loading}
      error={error}
      
      exportFormats={['csv']}
      
      aria-label="Employee management interface"
    />
  );
};

export default EmployeesList;
