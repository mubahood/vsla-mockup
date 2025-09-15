import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AdminContentScaffold from '../../../components/AdminContentScaffold/AdminContentScaffold';
import EmployeeModel from '../../../models/EmployeeModel';

const EmployeesList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine section based on route
  const getCurrentSection = () => {
    if (location.pathname.includes('/create')) return 'form';
    if (location.pathname.includes('/edit/')) return 'form';
    if (location.pathname.includes('/view/')) return 'details';
    return 'table';
  };
  
  const [activeSection, setActiveSection] = useState(getCurrentSection());
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 20,
    from: 0,
    to: 0,
    lastPage: 1,
  });

  // Load employees using static data
  const loadEmployees = useCallback(async (page = 1, search = '', perPage = pagination.pageSize) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        page: page,
        per_page: perPage,
        search: search,
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
          pageSize: paginationData?.per_page || perPage,
          from: paginationData?.from || 0,
          to: paginationData?.to || 0,
          lastPage: paginationData?.last_page || 1,
        });
      }
    } catch (error) {
      console.error('Failed to load employees:', error);
      setError('Failed to load employees. Please try again.');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.pageSize]);

  useEffect(() => {
    loadEmployees(1, searchValue, pagination.pageSize);
    
    // Load specific record for edit/view
    if (id && (location.pathname.includes('/edit/') || location.pathname.includes('/view/'))) {
      loadSelectedRecord(id);
    }
  }, [searchValue, loadEmployees, id, location.pathname]);

  const loadSelectedRecord = async (recordId) => {
    try {
      const response = await EmployeeModel.getById(recordId);
      if (response.data && response.data.data) {
        setSelectedRecord(new EmployeeModel(response.data.data));
      }
    } catch (error) {
      console.error('Failed to load employee:', error);
      setError('Failed to load employee details');
    }
  };

  // Pagination handler
  const handlePageChange = (page) => {
    loadEmployees(page, searchValue, pagination.pageSize);
  };

  // Page size change handler
  const handlePageSizeChange = (newPageSize) => {
    setPagination(prev => ({
      ...prev,
      pageSize: newPageSize,
      current: 1,
    }));
    loadEmployees(1, searchValue, newPageSize);
  };

  // Section change handler using React Router
  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'table') {
      navigate('/admin/employees');
    }
  };

  // New record handler using React Router
  const handleNewRecord = () => {
    navigate('/admin/employees/create');
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
        
        navigate('/admin/employees');
      } else {
        // Create new employee
        const response = await EmployeeModel.create(formData);
        savedEmployee = response.data.data;
        
        // Reload the list to get updated data
        await loadEmployees(pagination.current, searchValue);
        navigate('/admin/employees');
      }
      
    } catch (error) {
      console.error('Failed to save employee:', error);
      setError('Failed to save employee. Please try again.');
      throw error;
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
      
      // Update pagination
      setPagination(prev => ({
        ...prev,
        total: prev.total - 1
      }));
      
      // If we deleted the selected record, clear selection and navigate
      if (selectedRecord && selectedRecord.id === record.id) {
        setSelectedRecord(null);
        navigate('/admin/employees');
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
      const headers = ['Name', 'Email', 'Phone', 'Role', 'Department', 'Status', 'Created Date'];
      const csvContent = [
        headers.join(','),
        ...employees.map(emp => [
          `"${emp.getDisplayName()}"`,
          emp.email || '',
          emp.phone || '',
          emp.role || '',
          emp.department || '',
          emp.status || '',
          emp.created_at ? new Date(emp.created_at).toLocaleDateString() : ''
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `foster-project-employees-${timestamp}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  // Table columns configuration - simplified for essential fields
  const tableColumns = [
    {
      key: 'avatar',
      label: '',
      render: (value, record) => (
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: '600',
          color: '#374151',
        }}>
          {record.getInitials()}
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value, record) => (
        <div>
          <div style={{ fontWeight: '500', fontSize: '14px' }}>
            <Link 
              to={`/admin/employees/view/${record.id}`}
              style={{ color: '#0a1e34', textDecoration: 'none' }}
            >
              {record.getDisplayName()}
            </Link>
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            {record.email}
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (value, record) => (
        <div style={{ fontSize: '14px' }}>
          {record.phone || 'Not Provided'}
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (value, record) => (
        <div style={{ fontSize: '14px' }}>
          {record.role || 'Not Specified'}
        </div>
      ),
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,
      render: (value, record) => (
        <div style={{ fontSize: '14px' }}>
          {record.department || 'Not Specified'}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value, record) => {
        const isActive = record.isActive();
        
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
            {record.status}
          </span>
        );
      },
    },
    {
      key: 'created_at',
      label: 'Joined',
      render: (value, record) => {
        if (!record.created_at) return 'Unknown';
        return new Date(record.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link
            to={`/admin/employees/view/${record.id}`}
            style={{
              padding: '4px 8px',
              backgroundColor: '#f0f0f0',
              color: '#0a1e34',
              textDecoration: 'none',
              fontSize: '12px',
              border: 'none'
            }}
          >
            View
          </Link>
          <Link
            to={`/admin/employees/edit/${record.id}`}
            style={{
              padding: '4px 8px',
              backgroundColor: '#e8f4fd',
              color: '#0a1e34',
              textDecoration: 'none',
              fontSize: '12px',
              border: 'none'
            }}
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(record)}
            style={{
              padding: '4px 8px',
              backgroundColor: '#ffe8e8',
              color: '#a52a2a',
              fontSize: '12px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Form fields configuration - simplified for essential fields
  const formFields = [
    {
      key: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter employee full name',
    },
    {
      key: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'Enter email address',
    },
    {
      key: 'phone',
      label: 'Phone Number',
      type: 'tel',
      required: true,
      placeholder: 'Enter phone number',
    },
    {
      key: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      options: [
        { value: 'Project Coordinator', label: 'Project Coordinator' },
        { value: 'FFS Technical Specialist', label: 'FFS Technical Specialist' },
        { value: 'VSLA Coordinator', label: 'VSLA Coordinator' },
        { value: 'Digital Systems Specialist', label: 'Digital Systems Specialist' },
        { value: 'M&E Officer', label: 'M&E Officer' },
        { value: 'Community Mobilizer', label: 'Community Mobilizer' },
        { value: 'Training Coordinator', label: 'Training Coordinator' },
        { value: 'Agricultural Extension Officer', label: 'Agricultural Extension Officer' },
        { value: 'Field Coordinator', label: 'Field Coordinator' },
        { value: 'FFS Facilitator', label: 'FFS Facilitator' },
        { value: 'VSLA Facilitator', label: 'VSLA Facilitator' },
        { value: 'Agronomist', label: 'Agronomist' },
      ],
    },
    {
      key: 'department',
      label: 'Department',
      type: 'select',
      required: true,
      options: [
        { value: 'Management', label: 'Management' },
        { value: 'Field Operations', label: 'Field Operations' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Technology', label: 'Technology' },
        { value: 'Monitoring', label: 'Monitoring' },
        { value: 'Capacity Building', label: 'Capacity Building' },
        { value: 'Social Development', label: 'Social Development' },
        { value: 'Technical', label: 'Technical' },
        { value: 'Communications', label: 'Communications' },
        { value: 'Administration', label: 'Administration' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Health', label: 'Health' },
      ],
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
        { value: 'On Leave', label: 'On Leave' },
      ],
    },
  ];

  // Details fields configuration - simplified for essential fields
  const detailsFields = [
    {
      key: 'name',
      label: 'Full Name',
      render: (value, record) => record.getDisplayName(),
    },
    {
      key: 'email',
      label: 'Email',
      render: (value, record) => record.email || 'Not Provided',
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (value, record) => record.phone || 'Not Provided',
    },
    {
      key: 'role',
      label: 'Role',
      render: (value, record) => record.role || 'Not Specified',
    },
    {
      key: 'department',
      label: 'Department',
      render: (value, record) => record.department || 'Not Specified',
    },
    {
      key: 'status',
      label: 'Status',
      render: (value, record) => {
        const isActive = record.isActive();
        return (
          <span style={{
            padding: '4px 8px',
            backgroundColor: isActive ? '#dcfce7' : '#fef2f2',
            color: isActive ? '#166534' : '#dc2626',
            border: `1px solid ${isActive ? '#bbf7d0' : '#fecaca'}`,
            fontSize: '14px',
            fontWeight: '500',
            borderRadius: '6px',
          }}>
            {record.status}
          </span>
        );
      },
    },
    {
      key: 'created_at',
      label: 'Date Joined',
      render: (value, record) => {
        if (!record.created_at) return 'Unknown';
        return new Date(record.created_at).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      },
    },
  ];

  return (
    <AdminContentScaffold
      title="FOSTER Project Employees"
      subtitle="Manage team members and staff"
      
      activeSection={activeSection}
      selectedRecord={selectedRecord}
      onSectionChange={handleSectionChange}
      
      tableProps={{
        columns: tableColumns,
        data: employees,
        pagination: {
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} employees`,
          pageSizeOptions: ['10', '20', '50', '100'],
          onShowSizeChange: (current, size) => {
            handlePageSizeChange(size);
          },
          onChange: handlePageChange,
        },
        rowSelection: {
          type: 'radio',
          selectedRowKeys: selectedRecord ? [selectedRecord.id] : [],
          onSelect: (record, selected) => {
            if (selected) {
              navigate(`/admin/employees/view/${record.id}`);
            }
          },
        },
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
      onBack={() => navigate('/admin/employees')}
      
      loading={loading}
      error={error}
      
      exportFormats={['csv']}
      
      // Custom Create New button as Link
      customCreateButton={() => (
        <Link
          to="/admin/employees/create"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#0a1e34',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            border: 'none'
          }}
        >
          <span>+</span>
          Create New Employee
        </Link>
      )}
      
      aria-label="FOSTER Project employee management interface"
    />
  );
};

export default EmployeesList;
