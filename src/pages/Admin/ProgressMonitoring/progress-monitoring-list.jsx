import React, { useState, useEffect } from 'react';
import { AdminContentScaffold } from '../../../components/AdminContentScaffold';

export default function ProgressMonitoringList() {
  const [monitoring, setMonitoring] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    project: '',
    location: ''
  });

  // Mock data for progress monitoring
  const MOCK_MONITORING_DATA = [
    {
      id: 'PM001',
      projectName: 'FOSTER Karamoja Implementation',
      location: 'Moroto District',
      status: 'On Track',
      progress: 85,
      startDate: '2024-01-15',
      endDate: '2024-12-15',
      budget: 250000000,
      spent: 212500000,
      milestones: [
        { name: 'Community Mobilization', status: 'Completed', completion: 100 },
        { name: 'Training Implementation', status: 'In Progress', completion: 85 },
        { name: 'Technology Deployment', status: 'Planned', completion: 0 }
      ],
      metrics: {
        beneficiaries: 1250,
        trainingSessions: 45,
        vslaGroups: 25,
        digitalAdoption: 78
      },
      lastUpdate: '2024-01-20',
      coordinator: 'Sarah Akello'
    },
    {
      id: 'PM002',
      projectName: 'Digital Literacy Enhancement',
      location: 'Kotido District',
      status: 'Behind Schedule',
      progress: 62,
      startDate: '2024-02-01',
      endDate: '2024-11-30',
      budget: 180000000,
      spent: 126000000,
      milestones: [
        { name: 'Needs Assessment', status: 'Completed', completion: 100 },
        { name: 'Training Material Development', status: 'Completed', completion: 100 },
        { name: 'Field Training', status: 'In Progress', completion: 60 }
      ],
      metrics: {
        beneficiaries: 890,
        trainingSessions: 32,
        vslaGroups: 18,
        digitalAdoption: 65
      },
      lastUpdate: '2024-01-18',
      coordinator: 'Michael Okello'
    },
    {
      id: 'PM003',
      projectName: 'E-Advisory Platform Rollout',
      location: 'Napak District',
      status: 'Ahead of Schedule',
      progress: 95,
      startDate: '2024-01-10',
      endDate: '2024-10-10',
      budget: 320000000,
      spent: 288000000,
      milestones: [
        { name: 'Platform Development', status: 'Completed', completion: 100 },
        { name: 'User Training', status: 'Completed', completion: 100 },
        { name: 'Monitoring & Support', status: 'In Progress', completion: 95 }
      ],
      metrics: {
        beneficiaries: 1580,
        trainingSessions: 67,
        vslaGroups: 34,
        digitalAdoption: 88
      },
      lastUpdate: '2024-01-19',
      coordinator: 'Grace Namutebi'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let filteredData = [...MOCK_MONITORING_DATA];
      
      // Apply filters
      if (filters.search) {
        filteredData = filteredData.filter(item => 
          item.projectName.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.location.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.coordinator.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.status) {
        filteredData = filteredData.filter(item => 
          item.status === filters.status
        );
      }
      
      if (filters.location) {
        filteredData = filteredData.filter(item => 
          item.location.includes(filters.location)
        );
      }

      setMonitoring(filteredData);
      setLoading(false);
    }, 500);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getStatusBadge = (status) => {
    const badges = {
      'On Track': 'bg-green-100 text-green-800',
      'Behind Schedule': 'bg-red-100 text-red-800',
      'Ahead of Schedule': 'bg-blue-100 text-blue-800',
      'At Risk': 'bg-yellow-100 text-yellow-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const summaryStats = [
    {
      title: "Active Projects",
      value: monitoring.length,
      trend: "+2",
      trendDirection: "up",
      icon: "📊"
    },
    {
      title: "Total Beneficiaries",
      value: monitoring.reduce((sum, p) => sum + p.metrics.beneficiaries, 0).toLocaleString(),
      trend: "+15%",
      trendDirection: "up",
      icon: "👥"
    },
    {
      title: "Average Progress",
      value: `${Math.round(monitoring.reduce((sum, p) => sum + p.progress, 0) / monitoring.length)}%`,
      trend: "+8%",
      trendDirection: "up",
      icon: "📈"
    },
    {
      title: "Budget Utilization",
      value: `${Math.round(
        (monitoring.reduce((sum, p) => sum + p.spent, 0) / 
         monitoring.reduce((sum, p) => sum + p.budget, 0)) * 100
      )}%`,
      trend: "+5%",
      trendDirection: "up",
      icon: "💰"
    }
  ];

  const quickActions = [
    {
      label: 'New Project',
      onClick: () => alert('New project form would open here'),
      variant: 'primary'
    },
    {
      label: 'Generate Report',
      onClick: () => alert('Report generation would be implemented here'),
      variant: 'secondary'
    },
    {
      label: 'Export Data',
      onClick: () => alert('Data export functionality would be implemented here'),
      variant: 'secondary'
    }
  ];

  const tableColumns = [
    { key: 'id', label: 'Project ID', width: '10%' },
    { key: 'projectName', label: 'Project Name', width: '25%' },
    { key: 'location', label: 'Location', width: '15%' },
    { key: 'status', label: 'Status', width: '12%' },
    { key: 'progress', label: 'Progress', width: '15%' },
    { key: 'budget', label: 'Budget Status', width: '15%' },
    { key: 'actions', label: 'Actions', width: '8%' }
  ];

  return (
    <AdminContentScaffold
      title="Progress Monitoring"
      subtitle="Track project implementation progress, milestones, and performance metrics"
      
      // Summary cards
      summaryCards={summaryStats}
      
      // Quick action buttons
      quickActions={quickActions}
      
      // Main table section
      tableTitle="Project Progress Overview"
      tableColumns={tableColumns}
      tableData={monitoring}
      renderTableRow={(project) => (
        <tr key={project.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {project.id}
          </td>
          <td className="px-6 py-4 text-sm text-gray-900">
            <div>
              <div className="font-medium">{project.projectName}</div>
              <div className="text-gray-500 text-xs">Coordinator: {project.coordinator}</div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {project.location}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(project.status)}`}>
              {project.status}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                <div 
                  className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{project.progress}%</span>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <div>
              <div className="text-xs text-gray-500">
                {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
              </div>
              <div className="text-xs font-medium">
                {Math.round((project.spent / project.budget) * 100)}% utilized
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div className="flex space-x-2">
              <button
                onClick={() => alert(`Viewing details for ${project.projectName}`)}
                className="text-blue-600 hover:text-blue-900"
              >
                View
              </button>
              <button
                onClick={() => alert(`Editing ${project.projectName}`)}
                className="text-indigo-600 hover:text-indigo-900"
              >
                Edit
              </button>
            </div>
          </td>
        </tr>
      )}
      
      // Form section for creating/editing projects
      formTitle="Add New Project"
      formFields={[
        {
          name: 'projectName',
          label: 'Project Name',
          type: 'text',
          required: true,
          placeholder: 'Enter project name'
        },
        {
          name: 'location',
          label: 'Location',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'Select Location' },
            { value: 'Moroto District', label: 'Moroto District' },
            { value: 'Kotido District', label: 'Kotido District' },
            { value: 'Napak District', label: 'Napak District' }
          ]
        },
        {
          name: 'coordinator',
          label: 'Project Coordinator',
          type: 'text',
          required: true,
          placeholder: 'Enter coordinator name'
        },
        {
          name: 'budget',
          label: 'Budget (UGX)',
          type: 'number',
          required: true,
          placeholder: 'Enter budget amount'
        },
        {
          name: 'startDate',
          label: 'Start Date',
          type: 'date',
          required: true
        },
        {
          name: 'endDate',
          label: 'End Date',
          type: 'date',
          required: true
        }
      ]}
      onSubmit={(formData) => {
        console.log('New project data:', formData);
        alert('Project created successfully!');
      }}
      submitButtonText="Create Project"
      
      // Additional sections for detailed analytics
      additionalSections={[
        {
          title: "Project Performance Analytics",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monitoring.map(project => (
                <div key={project.id} className="bg-white p-6 rounded-lg shadow border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 truncate">{project.projectName}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600 block">Beneficiaries</span>
                        <span className="font-medium text-blue-600">{project.metrics.beneficiaries.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 block">VSLA Groups</span>
                        <span className="font-medium text-green-600">{project.metrics.vslaGroups}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 block">Training Sessions</span>
                        <span className="font-medium text-purple-600">{project.metrics.trainingSessions}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 block">Digital Adoption</span>
                        <span className="font-medium text-orange-600">{project.metrics.digitalAdoption}%</span>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-xs text-gray-500">
                        Last updated: {project.lastUpdate}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      ]}
    />
  );
};
