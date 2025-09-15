import React, { useState } from 'react';
import AdminContentScaffold from '../../components/AdminContentScaffold';

const MEDashboard = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedIndicator, setSelectedIndicator] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');

  // Mock data for M&E indicators
  const MOCK_INDICATORS = [
    {
      id: 'IND001',
      category: 'Output',
      name: 'Number of FFS Groups Formed',
      target: 500,
      achieved: 345,
      percentage: 69,
      unit: 'Groups',
      period: 'Q2 2025',
      trend: 'up',
      status: 'On Track'
    },
    {
      id: 'IND002',
      category: 'Outcome',
      name: 'Farmers Adopting Improved Practices',
      target: 2000,
      achieved: 1450,
      percentage: 72.5,
      unit: 'Farmers',
      period: 'Q2 2025',
      trend: 'up',
      status: 'On Track'
    },
    {
      id: 'IND003',
      category: 'Impact',
      name: 'Increase in Crop Yield',
      target: 30,
      achieved: 22,
      percentage: 73.3,
      unit: '% Increase',
      period: 'Q2 2025',
      trend: 'up',
      status: 'On Track'
    },
    {
      id: 'IND004',
      category: 'Output',
      name: 'VSLA Groups Operational',
      target: 200,
      achieved: 156,
      percentage: 78,
      unit: 'Groups',
      period: 'Q2 2025',
      trend: 'up',
      status: 'Ahead'
    },
    {
      id: 'IND005',
      category: 'Outcome',
      name: 'Farmers with Access to Finance',
      target: 1500,
      achieved: 980,
      percentage: 65.3,
      unit: 'Farmers',
      period: 'Q2 2025',
      trend: 'down',
      status: 'At Risk'
    }
  ];

  const ACTIVITIES = [
    {
      id: 'ACT001',
      title: 'FFS Training on AESA',
      description: 'Agro-Ecological System Analysis training for farmer groups',
      district: 'Kamuli',
      startDate: '2025-09-10',
      endDate: '2025-09-15',
      status: 'Completed',
      participants: 45,
      budget: 2500000,
      spent: 2350000,
      progress: 100
    },
    {
      id: 'ACT002',
      title: 'VSLA Group Formation',
      description: 'Establishing new Village Savings and Loan Associations',
      district: 'Pallisa',
      startDate: '2025-09-12',
      endDate: '2025-09-20',
      status: 'Ongoing',
      participants: 60,
      budget: 1800000,
      spent: 900000,
      progress: 60
    },
    {
      id: 'ACT003',
      title: 'E-Marketplace Training',
      description: 'Training farmers on digital marketplace platform usage',
      district: 'Soroti',
      startDate: '2025-09-18',
      endDate: '2025-09-25',
      status: 'Planned',
      participants: 35,
      budget: 1500000,
      spent: 0,
      progress: 0
    }
  ];

  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ahead': return 'bg-green-100 text-green-800';
      case 'On Track': return 'bg-blue-100 text-blue-800';
      case 'At Risk': return 'bg-yellow-100 text-yellow-800';
      case 'Behind': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Ongoing': return 'bg-blue-100 text-blue-800';
      case 'Planned': return 'bg-gray-100 text-gray-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Table columns configuration
  const indicatorColumns = [
    { key: 'id', label: 'Indicator ID', width: '12%' },
    { key: 'category', label: 'Category', width: '12%' },
    { key: 'name', label: 'Indicator Name', width: '25%' },
    { key: 'target', label: 'Target', width: '12%' },
    { key: 'achieved', label: 'Achieved', width: '12%' },
    { key: 'percentage', label: 'Performance', width: '12%' },
    { key: 'status', label: 'Status', width: '15%' }
  ];

  const activityColumns = [
    { key: 'id', label: 'Activity ID', width: '12%' },
    { key: 'title', label: 'Activity', width: '20%' },
    { key: 'district', label: 'District', width: '12%' },
    { key: 'period', label: 'Period', width: '15%' },
    { key: 'participants', label: 'Participants', width: '12%' },
    { key: 'budget', label: 'Budget (UGX)', width: '15%' },
    { key: 'progress', label: 'Progress', width: '14%' }
  ];

  // Table data rendering
  const renderIndicatorRow = (indicator) => (
    <tr key={indicator.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {indicator.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
          {indicator.category}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        {indicator.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {indicator.target.toLocaleString()} {indicator.unit}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {indicator.achieved.toLocaleString()} {indicator.unit}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex items-center">
          <div className="flex-1 mr-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${indicator.percentage >= 80 ? 'bg-green-500' : indicator.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min(indicator.percentage, 100)}%` }}
              ></div>
            </div>
          </div>
          <span className={`text-sm font-medium ${getPerformanceColor(indicator.percentage)}`}>
            {indicator.percentage.toFixed(1)}%
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(indicator.status)}`}>
          {indicator.status}
        </span>
      </td>
    </tr>
  );

  const renderActivityRow = (activity) => (
    <tr key={activity.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {activity.id}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">
        <div>
          <div className="font-medium">{activity.title}</div>
          <div className="text-gray-500 text-xs">{activity.description}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {activity.district}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div>
          <div>{new Date(activity.startDate).toLocaleDateString()}</div>
          <div className="text-xs">to {new Date(activity.endDate).toLocaleDateString()}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {activity.participants}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div>
          <div>{activity.budget.toLocaleString()}</div>
          <div className="text-xs text-gray-400">Spent: {activity.spent.toLocaleString()}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex items-center">
          <div className="flex-1 mr-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${activity.progress >= 80 ? 'bg-green-500' : activity.progress >= 40 ? 'bg-blue-500' : 'bg-gray-400'}`}
                style={{ width: `${activity.progress}%` }}
              ></div>
            </div>
          </div>
          <span className="text-sm text-gray-600">{activity.progress}%</span>
        </div>
        <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${getActivityStatusColor(activity.status)}`}>
          {activity.status}
        </span>
      </td>
    </tr>
  );

  // Form fields for filters and actions
  const formFields = [
    {
      name: 'selectedProject',
      label: 'Select Project',
      type: 'select',
      value: selectedProject,
      onChange: (e) => setSelectedProject(e.target.value),
      options: [
        { value: '', label: 'All Projects' },
        { value: 'foster', label: 'FOSTER Project' },
        { value: 'youth-agri', label: 'Youth in Agriculture' },
        { value: 'women-coop', label: 'Women Cooperatives' }
      ],
      required: false
    },
    {
      name: 'selectedIndicator',
      label: 'Filter by Indicator Category',
      type: 'select',
      value: selectedIndicator,
      onChange: (e) => setSelectedIndicator(e.target.value),
      options: [
        { value: '', label: 'All Categories' },
        { value: 'Output', label: 'Output Indicators' },
        { value: 'Outcome', label: 'Outcome Indicators' },
        { value: 'Impact', label: 'Impact Indicators' }
      ],
      required: false
    },
    {
      name: 'selectedPeriod',
      label: 'Reporting Period',
      type: 'select',
      value: selectedPeriod,
      onChange: (e) => setSelectedPeriod(e.target.value),
      options: [
        { value: '', label: 'All Periods' },
        { value: 'Q1-2025', label: 'Q1 2025' },
        { value: 'Q2-2025', label: 'Q2 2025' },
        { value: 'Q3-2025', label: 'Q3 2025' },
        { value: 'Q4-2025', label: 'Q4 2025' }
      ],
      required: false
    }
  ];

  // Filter data based on selections
  const filteredIndicators = MOCK_INDICATORS.filter(indicator => {
    return (!selectedIndicator || indicator.category === selectedIndicator);
  });

  // Summary statistics
  const summaryStats = [
    {
      title: 'Total Indicators',
      value: filteredIndicators.length,
      subtitle: 'Being monitored',
      color: 'blue'
    },
    {
      title: 'On Track',
      value: filteredIndicators.filter(i => i.status === 'On Track' || i.status === 'Ahead').length,
      subtitle: 'Performance indicators',
      color: 'green'
    },
    {
      title: 'At Risk',
      value: filteredIndicators.filter(i => i.status === 'At Risk' || i.status === 'Behind').length,
      subtitle: 'Need attention',
      color: 'red'
    },
    {
      title: 'Avg Performance',
      value: `${(filteredIndicators.reduce((sum, i) => sum + i.percentage, 0) / filteredIndicators.length || 0).toFixed(1)}%`,
      subtitle: 'Overall achievement',
      color: 'purple'
    }
  ];

  const quickActions = [
    {
      label: 'Generate Report',
      onClick: () => alert('Report generation functionality would be implemented here'),
      variant: 'primary'
    },
    {
      label: 'Data Collection',
      onClick: () => alert('Data collection interface would be implemented here'),
      variant: 'secondary'
    },
    {
      label: 'Export Data',
      onClick: () => alert('Data export functionality would be implemented here'),
      variant: 'secondary'
    }
  ];

  return (
    <AdminContentScaffold
      title="Monitoring & Evaluation Dashboard"
      subtitle="Real-time project performance indicators and analytics"
      
      // Summary cards
      summaryCards={summaryStats}
      
      // Quick action buttons
      quickActions={quickActions}
      
      // Main table section - Performance Indicators
      tableTitle="Performance Indicators"
      tableColumns={indicatorColumns}
      tableData={filteredIndicators}
      renderTableRow={renderIndicatorRow}
      
      // Form section for filters
      formTitle="Filters & Reports"
      formFields={formFields}
      onSubmit={(formData) => {
        console.log('Filter applied:', formData);
        alert('Filters applied successfully');
      }}
      submitButtonText="Apply Filters"
      
      // Additional sections
      additionalSections={[
        {
          title: "Activity Monitoring",
          content: (
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {activityColumns.map((column) => (
                      <th
                        key={column.key}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        style={{ width: column.width }}
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {ACTIVITIES.map(renderActivityRow)}
                </tbody>
              </table>
            </div>
          )
        },
        {
          title: "Key Performance Insights",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Output Level</h4>
                <p className="text-blue-600">
                  Strong performance in FFS group formation and VSLA establishment. 
                  Target achievement averaging 73% across output indicators.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-green-800 mb-2">Outcome Level</h4>
                <p className="text-green-600">
                  Good adoption rates for improved farming practices. 
                  Need to strengthen financial inclusion through enhanced VSLA operations.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-purple-800 mb-2">Impact Level</h4>
                <p className="text-purple-600">
                  Positive yield improvements documented. 
                  Continue monitoring long-term sustainability and income effects.
                </p>
              </div>
            </div>
          )
        }
      ]}
    />
  );
};

export default MEDashboard;
