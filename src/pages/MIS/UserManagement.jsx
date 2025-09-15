import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AdminContentScaffold from '../../components/AdminContentScaffold/AdminContentScaffold';
import { getData, saveData } from '../../utils/storage';
import { USERS_DATA } from '../../data/seedData';

/**
 * User Management Component
 * Using AdminContentScaffold pattern following employees module exemplar
 * With proper routing for create/edit/view using Links instead of buttons
 */
const UserManagement = () => {
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
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 20,
    from: 0,
    to: 0,
    lastPage: 1,
  });

  useEffect(() => {
    // Update active section when location changes
    const newSection = getCurrentSection();
    setActiveSection(newSection);
    
    loadUsers();
    
    // Load specific record for edit/view
    if (id && (location.pathname.includes('/edit/') || location.pathname.includes('/view/'))) {
      loadSelectedRecord(id);
    } else {
      // Clear selected record when not in edit/view mode
      setSelectedRecord(null);
    }
  }, [id, location.pathname]);

  const loadSelectedRecord = (recordId) => {
    const stored = getData('users') || USERS_DATA;
    const user = stored.find(u => u.id.toString() === recordId.toString());
    if (user) {
      setSelectedRecord(user);
    }
  };

  const loadUsers = () => {
    setLoading(true);
    try {
      const stored = getData('users') || USERS_DATA;
      setUsers(stored);
      setPagination(prev => ({
        ...prev,
        total: stored.length,
        lastPage: Math.ceil(stored.length / prev.pageSize),
      }));
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // Navigation handlers using React Router
  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'table') {
      navigate('/admin/users');
    }
  };

  const handleNewRecord = () => {
    navigate('/admin/users/create');
  };

  const handleSave = (formData) => {
    try {
      setLoading(true);
      const stored = getData('users') || USERS_DATA;
      
      if (selectedRecord) {
        // Update existing user
        const updated = stored.map(user =>
          user.id === selectedRecord.id ? { ...user, ...formData } : user
        );
        saveData('users', updated);
        setUsers(updated);
        navigate('/admin/users');
      } else {
        // Create new user
        const newUser = {
          id: Math.max(...stored.map(u => u.id), 0) + 1,
          ...formData,
          createdAt: new Date().toISOString(),
          status: 'Active'
        };
        const updated = [...stored, newUser];
        saveData('users', updated);
        setUsers(updated);
        navigate('/admin/users');
      }
    } catch (err) {
      setError('Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!selectedRecord) return;
    
    try {
      setLoading(true);
      const stored = getData('users') || USERS_DATA;
      const updated = stored.filter(user => user.id !== selectedRecord.id);
      saveData('users', updated);
      setUsers(updated);
      navigate('/admin/users');
    } catch (err) {
      setError('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format) => {
    console.log(`Exporting users as ${format}`);
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, current: page }));
  };

  const handlePageSizeChange = (pageSize) => {
    setPagination(prev => ({ ...prev, pageSize, current: 1 }));
  };

  // Table columns configuration
  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (text, record) => (
        <Link 
          to={`/admin/users/view/${record.id}`}
          style={{ color: '#0a1e34', textDecoration: 'none' }}
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Admin', value: 'Admin' },
        { text: 'Manager', value: 'Manager' },
        { text: 'Field Officer', value: 'Field Officer' },
        { text: 'Data Entry', value: 'Data Entry' },
      ],
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
        { text: 'Suspended', value: 'Suspended' },
      ],
      render: (status) => (
        <span style={{
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: status === 'Active' ? '#e8f5e8' : 
                          status === 'Inactive' ? '#f5f5f5' : '#ffe8e8',
          color: status === 'Active' ? '#2d5a2d' : 
                 status === 'Inactive' ? '#666' : '#a52a2a'
        }}>
          {status}
        </span>
      ),
    },
  ];

  // Form fields configuration
  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      validation: {
        required: 'Full name is required',
        minLength: { value: 2, message: 'Name must be at least 2 characters' }
      }
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      validation: {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address'
        }
      }
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      required: true,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      options: [
        { value: 'Admin', label: 'Administrator' },
        { value: 'Manager', label: 'Manager' },
        { value: 'Field Officer', label: 'Field Officer' },
        { value: 'Data Entry', label: 'Data Entry Clerk' },
      ]
    },
    {
      name: 'department',
      label: 'Department',
      type: 'select',
      required: true,
      options: [
        { value: 'Management', label: 'Management' },
        { value: 'Field Operations', label: 'Field Operations' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Training', label: 'Training' },
        { value: 'Monitoring & Evaluation', label: 'Monitoring & Evaluation' },
      ]
    },
    {
      name: 'location',
      label: 'Location/District',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
        { value: 'Suspended', label: 'Suspended' },
      ]
    },
  ];

  // Details fields configuration
  const detailsFields = [
    { label: 'Full Name', value: selectedRecord?.name },
    { label: 'Email', value: selectedRecord?.email },
    { label: 'Phone', value: selectedRecord?.phone },
    { label: 'Role', value: selectedRecord?.role },
    { label: 'Department', value: selectedRecord?.department },
    { label: 'Location', value: selectedRecord?.location },
    { label: 'Status', value: selectedRecord?.status },
    { label: 'Created', value: selectedRecord?.createdAt ? new Date(selectedRecord.createdAt).toLocaleDateString() : 'N/A' },
  ];

  return (
    <AdminContentScaffold
      title="User Management"
      subtitle="Manage system users and access control"
      
      activeSection={activeSection}
      selectedRecord={selectedRecord}
      onSectionChange={handleSectionChange}
      
      tableProps={{
        columns: tableColumns,
        data: users,
        pagination: {
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} users`,
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
              navigate(`/admin/users/view/${record.id}`);
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
      onRefresh={() => loadUsers()}
      onBack={() => navigate('/admin/users')}
      
      loading={loading}
      error={error}
      
      exportFormats={['csv']}
      
      // Custom Create New button as Link
      customCreateButton={() => (
        <Link
          to="/admin/users/create"
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
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            zIndex: 10
          }}
        >
          <span>+</span>
          Create New User
        </Link>
      )}
      
      aria-label="FOSTER Project user management interface"
    />
  );
};

export default UserManagement;
