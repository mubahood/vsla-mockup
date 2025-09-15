import React, { useState, useEffect } from 'react';
import { AdminContentScaffold } from '../../../components/AdminContentScaffold';
import { MOCK_VSLA_TRANSACTIONS, MOCK_FOSTER_GROUPS } from '../../../data/mockData';

export default function VslaTransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    groupId: '',
    transactionType: '',
    dateRange: 'last_30_days'
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let filteredTransactions = [];
      
      // Flatten all transactions from all VSLA meetings
      MOCK_VSLA_TRANSACTIONS.forEach(meeting => {
        meeting.transactions.forEach(transaction => {
          filteredTransactions.push({
            ...transaction,
            meetingId: meeting.id,
            groupId: meeting.groupId,
            groupName: meeting.groupName,
            meetingDate: meeting.date,
            meetingNumber: meeting.meetingNumber
          });
        });
      });
      
      // Apply filters
      if (filters.search) {
        filteredTransactions = filteredTransactions.filter(transaction => 
          transaction.memberName?.toLowerCase().includes(filters.search.toLowerCase()) ||
          transaction.groupName.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.groupId) {
        filteredTransactions = filteredTransactions.filter(transaction => 
          transaction.groupId === filters.groupId
        );
      }
      
      if (filters.transactionType) {
        filteredTransactions = filteredTransactions.filter(transaction => 
          transaction.type === filters.transactionType
        );
      }

      setTransactions(filteredTransactions);
      setLoading(false);
    }, 500);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getTransactionIcon = (type) => {
    const icons = {
      'savings': '💰',
      'loan_application': '📝',
      'loan_disbursement': '💳',
      'loan_repayment': '💵',
      'social_fund': '🤝'
    };
    return icons[type] || '💼';
  };

  const getTransactionBadge = (type) => {
    const badges = {
      'savings': 'bg-green-100 text-green-800',
      'loan_application': 'bg-blue-100 text-blue-800',
      'loan_disbursement': 'bg-purple-100 text-purple-800',
      'loan_repayment': 'bg-orange-100 text-orange-800',
      'social_fund': 'bg-pink-100 text-pink-800'
    };
    return badges[type] || 'bg-gray-100 text-gray-800';
  };

  const getTransactionLabel = (type) => {
    const labels = {
      'savings': 'Savings',
      'loan_application': 'Loan Application',
      'loan_disbursement': 'Loan Disbursement',
      'loan_repayment': 'Loan Repayment',
      'social_fund': 'Social Fund'
    };
    return labels[type] || type.replace('_', ' ');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const vslaGroups = MOCK_FOSTER_GROUPS.filter(group => group.type === 'VSLA');

  const scaffoldConfig = {
    title: "VSLA Transactions Management",
    subtitle: "Monitor savings, loans, and social fund activities across VSLA groups",
    actions: [
      {
        label: "Record New Meeting",
        variant: "primary",
        action: () => {
          alert('VSLA meeting recording form would open here');
        }
      },
      {
        label: "Financial Report",
        variant: "secondary",
        action: () => {
          alert('VSLA financial analytics report would be generated');
        }
      }
    ]
  };

  const filterControls = (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div>
        <input
          type="text"
          placeholder="Search members or groups..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>
      <div>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.groupId}
          onChange={(e) => handleFilterChange('groupId', e.target.value)}
        >
          <option value="">All VSLA Groups</option>
          {vslaGroups.map(group => (
            <option key={group.id} value={group.id}>{group.name}</option>
          ))}
        </select>
      </div>
      <div>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.transactionType}
          onChange={(e) => handleFilterChange('transactionType', e.target.value)}
        >
          <option value="">All Transaction Types</option>
          <option value="savings">Savings</option>
          <option value="loan_application">Loan Applications</option>
          <option value="loan_disbursement">Loan Disbursements</option>
          <option value="loan_repayment">Loan Repayments</option>
          <option value="social_fund">Social Fund</option>
        </select>
      </div>
      <div>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.dateRange}
          onChange={(e) => handleFilterChange('dateRange', e.target.value)}
        >
          <option value="last_7_days">Last 7 Days</option>
          <option value="last_30_days">Last 30 Days</option>
          <option value="last_3_months">Last 3 Months</option>
          <option value="current_year">Current Year</option>
        </select>
      </div>
    </div>
  );

  const statsCards = (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">💰</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Savings</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(
                transactions
                  .filter(t => t.type === 'savings')
                  .reduce((sum, t) => sum + (t.amount || 0), 0)
              )}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">💳</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Loans Disbursed</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(
                transactions
                  .filter(t => t.type === 'loan_disbursement')
                  .reduce((sum, t) => sum + (t.principalAmount || 0), 0)
              )}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">💵</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Loan Repayments</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(
                transactions
                  .filter(t => t.type === 'loan_repayment')
                  .reduce((sum, t) => sum + (t.totalPaid || 0), 0)
              )}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">🤝</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Social Fund</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(
                transactions
                  .filter(t => t.type === 'social_fund')
                  .reduce((sum, t) => sum + (t.amount || 0), 0)
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const transactionsTable = (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">VSLA Transactions</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Group
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No transactions found matching your criteria
                </td>
              </tr>
            ) : (
              transactions.map((transaction, index) => (
                <tr key={`${transaction.meetingId}-${index}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{getTransactionIcon(transaction.type)}</div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTransactionBadge(transaction.type)}`}>
                          {getTransactionLabel(transaction.type)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {transaction.memberName || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.groupName}</div>
                    <div className="text-xs text-gray-500">Meeting #{transaction.meetingNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(transaction.meetingDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {transaction.amount && formatCurrency(transaction.amount)}
                      {transaction.principalAmount && formatCurrency(transaction.principalAmount)}
                      {transaction.totalPaid && formatCurrency(transaction.totalPaid)}
                    </div>
                    {transaction.interestPaid && (
                      <div className="text-xs text-gray-500">
                        Interest: {formatCurrency(transaction.interestPaid)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {transaction.purpose && (
                        <div className="mb-1">Purpose: {transaction.purpose}</div>
                      )}
                      {transaction.notes && (
                        <div className="text-xs text-gray-500">{transaction.notes}</div>
                      )}
                      {transaction.approvalStatus && (
                        <div className="text-xs text-green-600">Status: {transaction.approvalStatus}</div>
                      )}
                      {transaction.remainingBalance && (
                        <div className="text-xs text-orange-600">
                          Balance: {formatCurrency(transaction.remainingBalance)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => alert(`View transaction details`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      {transaction.type === 'loan_application' && transaction.approvalStatus === 'approved' && (
                        <button
                          onClick={() => alert(`Process loan disbursement`)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Disburse
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <AdminContentScaffold config={scaffoldConfig}>
      {statsCards}
      {filterControls}
      {transactionsTable}
    </AdminContentScaffold>
  );
}
