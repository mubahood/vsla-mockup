import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AdminContentScaffold from '../../components/AdminContentScaffold/AdminContentScaffold';
import { getData, saveData } from '../../utils/storage';
import { VSLA_TRANSACTIONS } from '../../data/seedData';

/**
 * VSLA Ledger Component
 * Using AdminContentScaffold pattern following DigitalRegistry exemplar
 * Digital financial tracking for VSLA groups with savings, loans, and interest calculations
 */
const VSLALedger = () => {
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

  useEffect(() => {
    loadTransactions();
  }, [pagination.current, searchValue]);

  const loadSelectedRecord = (recordId) => {
    const allTransactions = getData('vslaTransactions') || VSLA_TRANSACTIONS;
    const record = allTransactions.find(transaction => transaction.id === recordId);
    if (record) {
      setSelectedRecord(record);
    }
  };

  const loadTransactions = () => {
    setLoading(true);
    setError(null);
    
    try {
      const savedTransactions = getData('vslaTransactions');
      const transactionsData = savedTransactions && savedTransactions.length > 0 ? savedTransactions : VSLA_TRANSACTIONS;
      
      if (!savedTransactions || savedTransactions.length === 0) {
        saveData('vslaTransactions', VSLA_TRANSACTIONS);
      }
      
      // Filter by search if provided
      const filteredTransactions = searchValue 
        ? transactionsData.filter(transaction => 
            transaction.groupName.toLowerCase().includes(searchValue.toLowerCase()) ||
            transaction.memberName.toLowerCase().includes(searchValue.toLowerCase()) ||
            transaction.type.toLowerCase().includes(searchValue.toLowerCase()) ||
            transaction.purpose.toLowerCase().includes(searchValue.toLowerCase())
          )
        : transactionsData;
      
      // Sort by date (newest first)
      const sortedTransactions = filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      // Pagination
      const startIndex = (pagination.current - 1) * pagination.pageSize;
      const endIndex = startIndex + pagination.pageSize;
      const paginatedTransactions = sortedTransactions.slice(startIndex, endIndex);
      
      setTransactions(paginatedTransactions);
      setPagination(prev => ({
        ...prev,
        total: filteredTransactions.length,
        from: startIndex + 1,
        to: Math.min(endIndex, filteredTransactions.length),
        lastPage: Math.ceil(filteredTransactions.length / prev.pageSize)
      }));
      
    } catch (error) {
      console.error('Error loading VSLA transactions:', error);
      setError('Failed to load VSLA transactions');
    } finally {
      setLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(Math.abs(amount));
  };

  // Table column configuration
  const columns = [
    {
      key: 'date',
      label: 'Date',
      width: '100px',
      render: (transaction) => new Date(transaction.date).toLocaleDateString()
    },
    {
      key: 'groupName',
      label: 'VSLA Group',
      width: '180px',
      render: (transaction) => transaction.groupName
    },
    {
      key: 'memberName',
      label: 'Member',
      width: '130px',
      render: (transaction) => transaction.memberName
    },
    {
      key: 'type',
      label: 'Type',
      width: '120px',
      render: (transaction) => {
        const getTypeColor = (type) => {
          switch (type) {
            case 'Savings': return { bg: '#e8f5e8', color: '#2e7d32' };
            case 'Loan': return { bg: '#fff3e0', color: '#ef6c00' };
            case 'Loan Repayment': return { bg: '#e3f2fd', color: '#1976d2' };
            case 'Interest': return { bg: '#f3e5f5', color: '#7b1fa2' };
            case 'Fee': return { bg: '#fce4ec', color: '#c2185b' };
            default: return { bg: '#f5f5f5', color: '#666' };
          }
        };
        const colors = getTypeColor(transaction.type);
        return (
          <span style={{
            backgroundColor: colors.bg,
            color: colors.color,
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            {transaction.type}
          </span>
        );
      }
    },
    {
      key: 'amount',
      label: 'Amount',
      width: '120px',
      render: (transaction) => (
        <span style={{
          color: transaction.amount >= 0 ? '#2e7d32' : '#d32f2f',
          fontWeight: '600'
        }}>
          {transaction.amount >= 0 ? '+' : ''}{formatCurrency(transaction.amount)}
        </span>
      )
    },
    {
      key: 'purpose',
      label: 'Purpose',
      width: '200px',
      render: (transaction) => transaction.purpose
    },
    {
      key: 'runningBalance',
      label: 'Balance',
      width: '120px',
      render: (transaction) => formatCurrency(transaction.runningBalance)
    },
    {
      key: 'recordedBy',
      label: 'Recorded By',
      width: '130px',
      render: (transaction) => transaction.recordedBy
    }
  ];

  // Form field configuration
  const formFields = [
    {
      name: 'groupName',
      label: 'VSLA Group',
      type: 'select',
      required: true,
      options: [
        'Kalapata Women VSLA',
        'Losidok Unity VSLA',
        'Amudat Savings Circle',
        'Nakapiripirit Women Cooperative',
        'Kotido United VSLA'
      ]
    },
    {
      name: 'memberName',
      label: 'Member Name',
      type: 'text',
      required: true,
      placeholder: 'Member full name'
    },
    {
      name: 'type',
      label: 'Transaction Type',
      type: 'select',
      required: true,
      options: [
        { value: 'Savings', label: 'Savings Deposit' },
        { value: 'Loan', label: 'Loan Disbursement' },
        { value: 'Loan Repayment', label: 'Loan Repayment' },
        { value: 'Interest', label: 'Interest Payment' },
        { value: 'Fee', label: 'Service Fee' }
      ]
    },
    {
      name: 'amount',
      label: 'Amount (UGX)',
      type: 'number',
      required: true,
      min: 0,
      placeholder: 'Enter amount in UGX'
    },
    {
      name: 'date',
      label: 'Transaction Date',
      type: 'date',
      required: true
    },
    {
      name: 'purpose',
      label: 'Purpose/Description',
      type: 'text',
      required: true,
      placeholder: 'Purpose of the transaction'
    },
    {
      name: 'recordedBy',
      label: 'Recorded By',
      type: 'text',
      required: true,
      placeholder: 'Name and role (e.g., Jane Doe - Treasurer)'
    },
    {
      name: 'notes',
      label: 'Additional Notes',
      type: 'textarea',
      placeholder: 'Any additional notes or observations',
      rows: 3
    },
    // Loan-specific fields (shown conditionally)
    {
      name: 'loanDetails.interestRate',
      label: 'Interest Rate (%)',
      type: 'number',
      min: 0,
      max: 100,
      step: 0.1,
      condition: (formData) => formData.type === 'Loan',
      placeholder: 'Monthly interest rate'
    },
    {
      name: 'loanDetails.repaymentPeriod',
      label: 'Repayment Period (Months)',
      type: 'number',
      min: 1,
      max: 24,
      condition: (formData) => formData.type === 'Loan',
      placeholder: 'Number of months'
    },
    {
      name: 'loanDetails.collateral',
      label: 'Collateral/Guarantee',
      type: 'text',
      condition: (formData) => formData.type === 'Loan',
      placeholder: 'Type of collateral or guarantee'
    }
  ];

  // Details field configuration
  const detailsFields = [
    { label: 'Transaction ID', key: 'id' },
    { label: 'VSLA Group', key: 'groupName' },
    { label: 'Member Name', key: 'memberName' },
    { label: 'Transaction Type', key: 'type' },
    { label: 'Amount', key: 'amount', render: (value) => formatCurrency(value) },
    { label: 'Date', key: 'date', render: (value) => new Date(value).toLocaleDateString() },
    { label: 'Purpose', key: 'purpose' },
    { label: 'Running Balance', key: 'runningBalance', render: (value) => formatCurrency(value) },
    { label: 'Recorded By', key: 'recordedBy' },
    { label: 'Notes', key: 'notes' },
    // Loan details (if applicable)
    { 
      label: 'Interest Rate', 
      key: 'loanDetails.interestRate', 
      render: (value, record) => record.loanDetails ? `${value}% per month` : 'N/A',
      condition: (record) => record.loanDetails
    },
    { 
      label: 'Repayment Period', 
      key: 'loanDetails.repaymentPeriod', 
      render: (value, record) => record.loanDetails ? `${value} months` : 'N/A',
      condition: (record) => record.loanDetails
    },
    { 
      label: 'Monthly Repayment', 
      key: 'loanDetails.monthlyRepayment', 
      render: (value, record) => record.loanDetails ? formatCurrency(value) : 'N/A',
      condition: (record) => record.loanDetails
    },
    { 
      label: 'Collateral', 
      key: 'loanDetails.collateral',
      condition: (record) => record.loanDetails
    }
  ];

  // Handle form submission
  const handleFormSubmit = (formData) => {
    try {
      const allTransactions = getData('vslaTransactions') || VSLA_TRANSACTIONS;
      
      // Calculate running balance
      const groupTransactions = allTransactions.filter(t => t.groupName === formData.groupName);
      const lastBalance = groupTransactions.length > 0 
        ? Math.max(...groupTransactions.map(t => t.runningBalance || 0))
        : 0;
      
      let transactionAmount = parseFloat(formData.amount) || 0;
      if (formData.type === 'Loan') {
        transactionAmount = -transactionAmount; // Loans are negative
      }
      
      const newRunningBalance = lastBalance + transactionAmount;
      
      // Process loan details
      let loanDetails = null;
      if (formData.type === 'Loan' && formData.loanDetails) {
        const principal = Math.abs(transactionAmount);
        const monthlyRate = (parseFloat(formData.loanDetails.interestRate) || 0) / 100;
        const months = parseInt(formData.loanDetails.repaymentPeriod) || 1;
        const monthlyRepayment = principal * (1 + monthlyRate) / months;
        
        loanDetails = {
          interestRate: parseFloat(formData.loanDetails.interestRate) || 0,
          repaymentPeriod: parseInt(formData.loanDetails.repaymentPeriod) || 1,
          monthlyRepayment: Math.round(monthlyRepayment),
          collateral: formData.loanDetails.collateral || ''
        };
      }
      
      const processedData = {
        ...formData,
        amount: transactionAmount,
        runningBalance: newRunningBalance,
        loanDetails
      };
      
      if (selectedRecord) {
        // Update existing transaction
        const updatedTransactions = allTransactions.map(transaction => 
          transaction.id === selectedRecord.id ? { ...selectedRecord, ...processedData } : transaction
        );
        saveData('vslaTransactions', updatedTransactions);
      } else {
        // Create new transaction
        const newTransaction = {
          id: `${formData.groupName.replace(/\s+/g, '').substring(0, 6).toUpperCase()}_${String(allTransactions.length + 1).padStart(3, '0')}`,
          groupId: `VSLA${String(allTransactions.length + 1).padStart(3, '0')}`,
          ...processedData
        };
        const updatedTransactions = [...allTransactions, newTransaction];
        saveData('vslaTransactions', updatedTransactions);
      }
      
      // Navigate back to table view
      navigate('/admin/vsla-ledger');
      loadTransactions();
      
    } catch (error) {
      console.error('Error saving VSLA transaction:', error);
      setError('Failed to save VSLA transaction');
    }
  };

  // Handle record deletion
  const handleDelete = (transactionId) => {
    try {
      const allTransactions = getData('vslaTransactions') || VSLA_TRANSACTIONS;
      const updatedTransactions = allTransactions.filter(transaction => transaction.id !== transactionId);
      saveData('vslaTransactions', updatedTransactions);
      loadTransactions();
    } catch (error) {
      console.error('Error deleting VSLA transaction:', error);
      setError('Failed to delete VSLA transaction');
    }
  };

  // Prepare form data for editing
  const getFormData = () => {
    if (!selectedRecord) return {};
    
    return {
      ...selectedRecord,
      amount: Math.abs(selectedRecord.amount) // Always show positive amount in form
    };
  };

  return (
    <AdminContentScaffold
      title="VSLA Digital Ledger"
      subtitle="Digital financial tracking for Village Savings & Loan Associations"
      
      // Table configuration
      data={transactions}
      columns={columns}
      loading={loading}
      error={error}
      
      // Search and pagination
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      searchPlaceholder="Search by group, member, type, purpose..."
      pagination={pagination}
      onPageChange={(page) => setPagination(prev => ({ ...prev, current: page }))}
      
      // Actions
      primaryActions={[
        {
          label: 'Record Transaction',
          action: () => navigate('/admin/vsla-ledger/create'),
          variant: 'primary'
        }
      ]}
      
      rowActions={[
        {
          label: 'View',
          action: (transaction) => navigate(`/admin/vsla-ledger/view/${transaction.id}`),
          icon: 'eye'
        },
        {
          label: 'Edit',
          action: (transaction) => navigate(`/admin/vsla-ledger/edit/${transaction.id}`),
          icon: 'edit'
        },
        {
          label: 'Delete',
          action: (transaction) => handleDelete(transaction.id),
          icon: 'trash',
          variant: 'danger',
          confirm: true
        }
      ]}
      
      // Form configuration
      formFields={formFields}
      formData={getFormData()}
      onFormSubmit={handleFormSubmit}
      
      // Details configuration
      detailsFields={detailsFields}
      detailsData={selectedRecord}
      
      // Section management
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      
      // Navigation
      breadcrumbs={[
        { label: 'Dashboard', path: '/admin' },
        { label: 'VSLA Ledger', path: '/admin/vsla-ledger' },
        ...(id ? [{ label: selectedRecord?.memberName || 'Transaction Details' }] : [])
      ]}
    />
  );
};

export default VSLALedger;
