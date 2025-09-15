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

  // Summary statistics for VSLA transactions
  const summaryStats = [
    {
      title: "Total Groups",
      value: new Set(transactions.map(t => t.groupName)).size,
      trend: "+5%",
      trendDirection: "up",
      icon: "🏦"
    },
    {
      title: "Total Savings",
      value: `UGX ${transactions
        .filter(t => t.type === 'Savings')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0)
        .toLocaleString()}`,
      trend: "+12%",
      trendDirection: "up",
      icon: "💰"
    },
    {
      title: "Active Loans",
      value: transactions.filter(t => t.type === 'Loan' && t.status === 'Active').length,
      trend: "+8%",
      trendDirection: "up",
      icon: "📋"
    },
    {
      title: "Loan Recovery",
      value: "92%",
      trend: "+3%",
      trendDirection: "up",
      icon: "📈"
    }
  ];

  // Quick action buttons
  const quickActions = [
    {
      label: 'Record Transaction',
      onClick: () => navigate('/admin/vsla-ledger/create'),
      variant: 'primary'
    },
    {
      label: 'Financial Reports',
      onClick: () => alert('Financial reports would be shown here'),
      variant: 'secondary'
    },
    {
      label: 'Export Ledger',
      onClick: () => alert('Ledger export functionality would be implemented here'),
      variant: 'secondary'
    }
  ];

  return (
    <AdminContentScaffold
      title="VSLA Digital Ledger"
      subtitle="Digital financial tracking for Village Savings & Loan Associations"
      
      // Summary cards
      summaryCards={summaryStats}
      
      // Quick action buttons
      quickActions={quickActions}
      
      // Main table section
      tableTitle="Financial Transactions"
      tableColumns={columns}
      tableData={transactions}
      renderTableRow={(transaction) => (
        <tr key={transaction.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {transaction.id}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {transaction.groupName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {transaction.memberName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {transaction.date}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              transaction.type === 'Savings' ? 'bg-green-100 text-green-800' :
              transaction.type === 'Loan' ? 'bg-blue-100 text-blue-800' :
              transaction.type === 'Repayment' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {transaction.type}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <span className={transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
              UGX {Math.abs(transaction.amount).toLocaleString()}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
              transaction.status === 'Active' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {transaction.status}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/admin/vsla-ledger/view/${transaction.id}`)}
                className="text-blue-600 hover:text-blue-900"
              >
                View
              </button>
              <button
                onClick={() => navigate(`/admin/vsla-ledger/edit/${transaction.id}`)}
                className="text-indigo-600 hover:text-indigo-900"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(transaction.id)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      )}
      
      // Form section for creating/editing
      formTitle={id ? "Edit Transaction" : "Record New Transaction"}
      formFields={formFields}
      onSubmit={handleFormSubmit}
      submitButtonText={id ? "Update Transaction" : "Record Transaction"}
      
      // Additional sections for financial analytics
      additionalSections={[
        {
          title: "Group Financial Summary",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from(new Set(transactions.map(t => t.groupName))).map(groupName => {
                const groupTransactions = transactions.filter(t => t.groupName === groupName);
                const totalSavings = groupTransactions
                  .filter(t => t.type === 'Savings')
                  .reduce((sum, t) => sum + Math.abs(t.amount), 0);
                const totalLoans = groupTransactions
                  .filter(t => t.type === 'Loan')
                  .reduce((sum, t) => sum + Math.abs(t.amount), 0);
                
                return (
                  <div key={groupName} className="bg-white p-4 rounded-lg shadow border">
                    <h4 className="font-semibold text-gray-900 mb-2">{groupName}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Savings:</span>
                        <span className="text-green-600 font-medium">UGX {totalSavings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Loans:</span>
                        <span className="text-blue-600 font-medium">UGX {totalLoans.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Members:</span>
                        <span className="text-gray-900">{new Set(groupTransactions.map(t => t.memberName)).size}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        }
      ]}
    />
  );
};

export default VSLALedger;
