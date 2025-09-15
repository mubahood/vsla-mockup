import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AdminContentScaffold from '../../components/AdminContentScaffold/AdminContentScaffold';
import { getData, saveData } from '../../utils/storage';
import { GROUPS_DATA } from '../../data/seedData';

/**
 * Digital Registry Component
 * Using AdminContentScaffold pattern following employees module exemplar
 * With proper routing for create/edit/view
 */
const DigitalRegistry = () => {
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
  const [groups, setGroups] = useState([]);
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
    
    loadGroups();
    
    // Load specific record for edit/view
    if (id && (location.pathname.includes('/edit/') || location.pathname.includes('/view/'))) {
      loadSelectedRecord(id);
    } else {
      // Clear selected record when not in edit/view mode
      setSelectedRecord(null);
    }
  }, [id, location.pathname]);

  const loadSelectedRecord = (recordId) => {
    const allGroups = getData('groups') || GROUPS_DATA;
    const record = allGroups.find(group => group.id === recordId);
    if (record) {
      setSelectedRecord(record);
    }
  };

  const loadGroups = () => {
    setLoading(true);
    setError(null);
    
    try {
      const savedGroups = getData('groups');
      const groupsData = savedGroups && savedGroups.length > 0 ? savedGroups : GROUPS_DATA;
      
      if (!savedGroups || savedGroups.length === 0) {
        saveData('groups', GROUPS_DATA);
      }
      
      // Filter by search if provided
      const filteredGroups = searchValue 
        ? groupsData.filter(group => 
            group.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            group.facilitator.toLowerCase().includes(searchValue.toLowerCase()) ||
            group.district.toLowerCase().includes(searchValue.toLowerCase()) ||
            group.village.toLowerCase().includes(searchValue.toLowerCase())
          )
        : groupsData;
      
      // Pagination
      const startIndex = (pagination.current - 1) * pagination.pageSize;
      const endIndex = startIndex + pagination.pageSize;
      const paginatedGroups = filteredGroups.slice(startIndex, endIndex);
      
      setGroups(paginatedGroups);
      setPagination(prev => ({
        ...prev,
        total: filteredGroups.length,
        from: startIndex + 1,
        to: Math.min(endIndex, filteredGroups.length),
        lastPage: Math.ceil(filteredGroups.length / prev.pageSize)
      }));
      
    } catch (error) {
      console.error('Failed to load groups:', error);
      setError('Failed to load groups. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, [pagination.current, pagination.pageSize, searchValue]);

  // Section change handler - uses navigation instead of state
  const handleSectionChange = (section, record = null) => {
    if (section === 'table') {
      navigate('/admin/registry');
    } else if (section === 'form') {
      if (record && record.id) {
        navigate(`/admin/registry/edit/${record.id}`);
      } else {
        navigate('/admin/registry/create');
      }
    } else if (section === 'details' && record) {
      navigate(`/admin/registry/view/${record.id}`);
    }
    setActiveSection(section);
    if (record) {
      setSelectedRecord(record);
    }
  };

  // Page change handlers
  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, current: page }));
  };

  const handlePageSizeChange = (size) => {
    setPagination(prev => ({ ...prev, pageSize: size, current: 1 }));
  };

  // New record handler - navigates to create route
  const handleNewRecord = () => {
    navigate('/admin/registry/create');
    setSelectedRecord(null);
    setActiveSection('form');
  };

  // Export handler
  const handleExport = (format) => {
    const allGroups = getData('groups') || GROUPS_DATA;
    
    if (format === 'csv') {
      const csvContent = [
        ['Name', 'Type', 'District', 'Subcounty', 'Village', 'Facilitator', 'Phone', 'Members', 'Status'].join(','),
        ...allGroups.map(group => [
          group.name,
          group.type,
          group.district,
          group.subcounty,
          group.village,
          group.facilitator,
          group.facilitatorPhone || '',
          group.memberCount,
          group.status
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'digital-registry.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  // Save handler
  const handleSave = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const allGroups = getData('groups') || [];
      let savedGroup;
      
      if (selectedRecord && selectedRecord.id) {
        // Update existing group
        savedGroup = { ...formData, id: selectedRecord.id };
        const updatedGroups = allGroups.map(group => 
          group.id === selectedRecord.id ? savedGroup : group
        );
        saveData('groups', updatedGroups);
        
        // Update the group in the list
        setGroups(prev => prev.map(group => 
          group.id === selectedRecord.id ? savedGroup : group
        ));
      } else {
        // Create new group
        savedGroup = {
          ...formData,
          id: Date.now().toString(),
          registrationDate: new Date().toISOString().split('T')[0]
        };
        const updatedGroups = [...allGroups, savedGroup];
        saveData('groups', updatedGroups);
        
        // Reload the list to get updated data
        loadGroups();
      }
      
      // Navigate to details view after saving
      navigate(`/admin/registry/view/${savedGroup.id}`);
      setActiveSection('details');
      setSelectedRecord(savedGroup);
      
    } catch (error) {
      console.error('Failed to save group:', error);
      setError('Failed to save group. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete handler
  const handleDelete = async (record) => {
    if (!window.confirm(`Are you sure you want to delete "${record.name}"?`)) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const allGroups = getData('groups') || [];
      const updatedGroups = allGroups.filter(group => group.id !== record.id);
      saveData('groups', updatedGroups);
      
      // Remove from local state
      setGroups(prev => prev.filter(group => group.id !== record.id));
      
      // Update pagination
      setPagination(prev => ({
        ...prev,
        total: prev.total - 1
      }));
      
      // Navigate back to table after deletion
      navigate('/admin/registry');
      setActiveSection('table');
      setSelectedRecord(null);
      
    } catch (error) {
      console.error('Failed to delete group:', error);
      setError('Failed to delete group. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Table columns configuration
  const tableColumns = [
    {
      key: 'name',
      label: 'Group Name',
      sortable: true,
      render: (value, record) => (
        <div>
          <div style={{ fontWeight: '500', fontSize: '14px', color: '#1e293b' }}>
            {record.name}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            {record.village}, {record.subcounty}
          </div>
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (value, record) => {
        const colors = { 
          FFS: '#0a1e34', 
          FBS: '#f59e0b', 
          VSLA: '#10b981' 
        };
        return (
          <span style={{
            backgroundColor: colors[record.type] || '#64748b',
            color: '#ffffff',
            padding: '2px 8px',
            fontSize: '11px',
            fontWeight: '500'
          }}>
            {record.type}
          </span>
        );
      },
    },
    {
      key: 'district',
      label: 'District',
      sortable: true,
      render: (value, record) => (
        <div style={{ fontSize: '14px', color: '#1e293b' }}>
          {record.district}
        </div>
      ),
    },
    {
      key: 'facilitator',
      label: 'Facilitator',
      render: (value, record) => (
        <div>
          <div style={{ fontSize: '14px', color: '#1e293b' }}>
            {record.facilitator}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            {record.facilitatorPhone || 'No phone'}
          </div>
        </div>
      ),
    },
    {
      key: 'memberCount',
      label: 'Members',
      sortable: true,
      render: (value, record) => (
        <div>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
            {record.memberCount} Total
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            {record.femaleMembers || 0}F • {record.maleMembers || 0}M • {record.youthMembers || 0}Y
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value, record) => (
        <span style={{
          backgroundColor: record.status === 'Active' ? '#10b981' : '#64748b',
          color: '#ffffff',
          padding: '2px 8px',
          fontSize: '11px',
          fontWeight: '500'
        }}>
          {record.status}
        </span>
      ),
    }
  ];

  // Form fields configuration
  const formFields = [
    {
      key: 'name',
      label: 'Group Name',
      type: 'text',
      required: true,
      placeholder: 'Enter group name',
    },
    {
      key: 'type',
      label: 'Group Type',
      type: 'select',
      required: true,
      options: [
        { value: 'FFS', label: 'Farmer Field School (FFS)' },
        { value: 'FBS', label: 'Farmer Business School (FBS)' },
        { value: 'VSLA', label: 'Village Savings and Loan Association (VSLA)' }
      ],
    },
    {
      key: 'district',
      label: 'District',
      type: 'select',
      required: true,
      options: [
        { value: 'Moroto', label: 'Moroto' },
        { value: 'Kotido', label: 'Kotido' },
        { value: 'Kaabong', label: 'Kaabong' },
        { value: 'Napak', label: 'Napak' },
        { value: 'Nakapiripirit', label: 'Nakapiripirit' },
        { value: 'Amudat', label: 'Amudat' },
        { value: 'Karenga', label: 'Karenga' }
      ],
    },
    {
      key: 'subcounty',
      label: 'Sub-county',
      type: 'text',
      required: true,
      placeholder: 'Enter sub-county',
    },
    {
      key: 'parish',
      label: 'Parish',
      type: 'text',
      required: true,
      placeholder: 'Enter parish',
    },
    {
      key: 'village',
      label: 'Village',
      type: 'text',
      required: true,
      placeholder: 'Enter village',
    },
    {
      key: 'facilitator',
      label: 'Facilitator Name',
      type: 'text',
      required: true,
      placeholder: 'Enter facilitator name',
    },
    {
      key: 'facilitatorPhone',
      label: 'Facilitator Phone',
      type: 'tel',
      placeholder: '0772123456',
    },
    {
      key: 'chairperson',
      label: 'Chairperson',
      type: 'text',
      placeholder: 'Enter chairperson name'
    },
    {
      key: 'secretary',
      label: 'Secretary',
      type: 'text',
      placeholder: 'Enter secretary name'
    },
    {
      key: 'treasurer',
      label: 'Treasurer',
      type: 'text',
      placeholder: 'Enter treasurer name'
    },
    {
      key: 'memberCount',
      label: 'Total Members',
      type: 'number',
      required: true,
      min: 1,
      placeholder: 'Enter total number of members',
    },
    {
      key: 'maleMembers',
      label: 'Male Members',
      type: 'number',
      min: 0,
      placeholder: 'Enter number of male members'
    },
    {
      key: 'femaleMembers',
      label: 'Female Members',
      type: 'number',
      min: 0,
      placeholder: 'Enter number of female members'
    },
    {
      key: 'youthMembers',
      label: 'Youth Members',
      type: 'number',
      min: 0,
      placeholder: 'Enter number of youth members'
    },
    {
      key: 'pwdMembers',
      label: 'PWD Members',
      type: 'number',
      min: 0,
      placeholder: 'Enter number of PWD members'
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
        { value: 'Suspended', label: 'Suspended' }
      ],
      defaultValue: 'Active'
    }
  ];

  // Details fields configuration
  const detailsFields = [
    {
      key: 'name',
      label: 'Group Name',
    },
    {
      key: 'type',
      label: 'Type',
    },
    {
      key: 'status',
      label: 'Status',
    },
    {
      key: 'district',
      label: 'District',
    },
    {
      key: 'subcounty',
      label: 'Sub-county',
    },
    {
      key: 'parish',
      label: 'Parish',
    },
    {
      key: 'village',
      label: 'Village',
    },
    {
      key: 'facilitator',
      label: 'Facilitator',
    },
    {
      key: 'facilitatorPhone',
      label: 'Facilitator Phone',
    },
    {
      key: 'chairperson',
      label: 'Chairperson',
    },
    {
      key: 'secretary',
      label: 'Secretary',
    },
    {
      key: 'treasurer',
      label: 'Treasurer',
    },
    {
      key: 'memberCount',
      label: 'Total Members',
    },
    {
      key: 'maleMembers',
      label: 'Male Members',
    },
    {
      key: 'femaleMembers',
      label: 'Female Members',
    },
    {
      key: 'youthMembers',
      label: 'Youth Members',
    },
    {
      key: 'pwdMembers',
      label: 'PWD Members',
    },
    {
      key: 'registrationDate',
      label: 'Registration Date',
      render: (value) => {
        if (!value) return 'Not specified';
        return new Date(value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      },
    },
  ];

  return (
    <AdminContentScaffold
      title="Digital Registry"
      subtitle="Manage FFS, FBS, and VSLA groups"
      
      activeSection={activeSection}
      selectedRecord={selectedRecord}
      onSectionChange={handleSectionChange}
      
      tableProps={{
        columns: tableColumns,
        data: groups,
        pagination: {
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} groups`,
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
              navigate(`/admin/registry/view/${record.id}`);
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
      onRefresh={() => loadGroups()}
      onBack={() => navigate('/admin/registry')}
      
      loading={loading}
      error={error}
      
      exportFormats={['csv']}
      
      // Custom Create New button as Link
      customCreateButton={() => (
        <Link
          to="/admin/registry/create"
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
          Create New
        </Link>
      )}
      
      aria-label="FOSTER Project group registry management interface"
    />
  );
};

export default DigitalRegistry;
