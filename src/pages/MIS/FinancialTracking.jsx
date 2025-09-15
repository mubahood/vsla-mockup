import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AdminContentScaffold from '../../components/AdminContentScaffold/AdminContentScaffold';
import { getData, saveData } from '../../utils/storage';
import { FINANCIAL_DATA } from '../../data/seedData';

/**
 * Financial Tracking Component
 * Using AdminContentScaffold pattern following employees module exemplar
 * With proper routing for create/edit/view using Links instead of buttons
 */
const FinancialTracking = () => {
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
  const [transactions, setTransactions] = useState([]);
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
    
    loadTransactions();
    
    // Load specific record for edit/view
    if (id && (location.pathname.includes('/edit/') || location.pathname.includes('/view/'))) {
      loadSelectedRecord(id);
    } else {
      // Clear selected record when not in edit/view mode
      setSelectedRecord(null);
    }
  }, [id, location.pathname]);

  const loadSelectedRecord = (recordId) => {
    const stored = getData('financial') || FINANCIAL_DATA;
    const transaction = stored.find(t => t.id.toString() === recordId.toString());
    if (transaction) {
      setSelectedRecord(transaction);
    }
  };

  const loadTransactions = () => {
    setLoading(true);
    try {
      const stored = getData('financial') || FINANCIAL_DATA;
      setTransactions(stored);
      setPagination(prev => ({
        ...prev,
        total: stored.length,
        lastPage: Math.ceil(stored.length / prev.pageSize),
      }));
    } catch (err) {
      setError('Failed to load financial transactions');
    } finally {
      setLoading(false);
    }
  };

  // Navigation handlers using React Router
  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'table') {
      navigate('/admin/financial');
    }
  };

  const handleNewRecord = () => {
    navigate('/admin/financial/create');
  };

  const handleSave = (formData) => {
    try {
      setLoading(true);
      const stored = getData('financial') || FINANCIAL_DATA;
      
      if (selectedRecord) {
        // Update existing transaction
        const updated = stored.map(transaction =>
          transaction.id === selectedRecord.id ? { ...transaction, ...formData } : transaction
        );
        saveData('financial', updated);
        setTransactions(updated);
        navigate('/admin/financial');
      } else {
        // Create new transaction
        const newTransaction = {
          id: Math.max(...stored.map(t => t.id), 0) + 1,
          ...formData,
          date: new Date().toISOString(),
          status: 'Completed'
        };
        const updated = [...stored, newTransaction];
        saveData('financial', updated);
        setTransactions(updated);
        navigate('/admin/financial');
      }
    } catch (err) {
      setError('Failed to save transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!selectedRecord) return;
    
    try {
      setLoading(true);
      const stored = getData('financial') || FINANCIAL_DATA;
      const updated = stored.filter(transaction => transaction.id !== selectedRecord.id);
      saveData('financial', updated);
      setTransactions(updated);
      navigate('/admin/financial');
    } catch (err) {
      setError('Failed to delete transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format) => {
    console.log(`Exporting financial data as ${format}`);
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, current: page }));
  };

  const handlePageSizeChange = (pageSize) => {
    setPagination(prev => ({ ...prev, pageSize, current: 1 }));
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Table columns configuration
  const tableColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: true,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
      render: (text, record) => (
        <Link 
          to={`/admin/financial/view/${record.id}`}
          style={{ color: '#0a1e34', textDecoration: 'none' }}
        >
          {text}
        </Link>
      ),
    },
    {
      title: 'Group/Entity',
      dataIndex: 'entity',
      key: 'entity',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'VSLA Savings', value: 'VSLA Savings' },
        { text: 'VSLA Loan', value: 'VSLA Loan' },
        { text: 'Grant Disbursement', value: 'Grant Disbursement' },
        { text: 'Training Cost', value: 'Training Cost' },
        { text: 'Equipment', value: 'Equipment' },
        { text: 'Other', value: 'Other' },
      ],
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Income', value: 'Income' },
        { text: 'Expense', value: 'Expense' },
        { text: 'Investment', value: 'Investment' },
      ],
    },
    {
      title: 'Amount (UGX)',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true,
      render: (amount, record) => (
        <span style={{
          color: record.category === 'Income' ? '#2d5a2d' : 
                 record.category === 'Expense' ? '#a52a2a' : '#0a1e34',
          fontWeight: '500'
        }}>
          {formatCurrency(amount)}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Completed', value: 'Completed' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Failed', value: 'Failed' },
      ],
      render: (status) => (
        <span style={{
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: status === 'Completed' ? '#e8f5e8' : 
                          status === 'Pending' ? '#fff3cd' : '#ffe8e8',
          color: status === 'Completed' ? '#2d5a2d' : 
                 status === 'Pending' ? '#856404' : '#a52a2a'
        }}>
          {status}
        </span>
      ),
    },
  ];

  // Form fields configuration
  const formFields = [
    {
      name: 'reference',
      label: 'Reference Number',
      type: 'text',
      required: true,
      validation: {
        required: 'Reference number is required',
      }
    },
    {
      name: 'entity',
      label: 'Group/Entity',
      type: 'text',
      required: true,
      validation: {
        required: 'Group or entity name is required',
      }
    },
    {
      name: 'type',
      label: 'Transaction Type',
      type: 'select',
      required: true,
      options: [
        { value: 'VSLA Savings', label: 'VSLA Savings' },
        { value: 'VSLA Loan', label: 'VSLA Loan' },
        { value: 'Grant Disbursement', label: 'Grant Disbursement' },
        { value: 'Training Cost', label: 'Training Cost' },
        { value: 'Equipment', label: 'Equipment Purchase' },
        { value: 'Other', label: 'Other' },
      ]
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { value: 'Income', label: 'Income' },
        { value: 'Expense', label: 'Expense' },
        { value: 'Investment', label: 'Investment' },
      ]
    },
    {
      name: 'amount',
      label: 'Amount (UGX)',
      type: 'number',
      required: true,
      validation: {
        required: 'Amount is required',
        min: { value: 1, message: 'Amount must be greater than 0' }
      }
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      validation: {
        required: 'Description is required',
      }
    },
    {
      name: 'location',
      label: 'Location/District',
      type: 'select',
      required: true,
      options: [
        { value: 'Moroto', label: 'Moroto District' },
        { value: 'Kotido', label: 'Kotido District' },
        { value: 'Napak', label: 'Napak District' },
        { value: 'Nakapiripirit', label: 'Nakapiripirit District' },
        { value: 'Amudat', label: 'Amudat District' },
        { value: 'Karenga', label: 'Karenga District' },
        { value: 'Kaabong', label: 'Kaabong District' },
      ]
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'Completed', label: 'Completed' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Failed', label: 'Failed' },
      ]
    },
  ];

  // Details fields configuration
  const detailsFields = [
    { label: 'Reference', value: selectedRecord?.reference },
    { label: 'Date', value: selectedRecord?.date ? new Date(selectedRecord.date).toLocaleDateString() : 'N/A' },
    { label: 'Group/Entity', value: selectedRecord?.entity },
    { label: 'Type', value: selectedRecord?.type },
    { label: 'Category', value: selectedRecord?.category },
    { label: 'Amount', value: selectedRecord?.amount ? formatCurrency(selectedRecord.amount) : 'N/A' },
    { label: 'Description', value: selectedRecord?.description },
    { label: 'Location', value: selectedRecord?.location },
    { label: 'Status', value: selectedRecord?.status },
  ];

  return (
    <AdminContentScaffold
      title="Financial Tracking"
      subtitle="Monitor financial transactions and VSLA activities"
      
      activeSection={activeSection}
      selectedRecord={selectedRecord}
      onSectionChange={handleSectionChange}
      
      tableProps={{
        columns: tableColumns,
        data: transactions,
        pagination: {
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} transactions`,
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
              navigate(`/admin/financial/view/${record.id}`);
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
      onRefresh={() => loadTransactions()}
      onBack={() => navigate('/admin/financial')}
      
      loading={loading}
      error={error}
      
      exportFormats={['csv', 'excel']}
      
      // Custom Create New button as Link
      customCreateButton={() => (
        <Link
          to="/admin/financial/create"
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
          New Transaction
        </Link>
      )}
      
      aria-label="FOSTER Project financial tracking interface"
    />
  );
};

export default FinancialTracking;
