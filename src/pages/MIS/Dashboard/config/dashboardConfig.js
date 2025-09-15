/**
 * Dashboard Configuration for FOSTER Project MIS
 * Following AdminContentScaffold patterns and design system guidelines
 */

// Dashboard sections configuration
export const dashboardSections = {
  overview: {
    title: 'Overview',
    component: 'cards'
  },
  analytics: {
    title: 'Analytics', 
    component: 'charts'
  },
  recent: {
    title: 'Recent Activity',
    component: 'activity'
  }
};

// Summary cards configuration
export const summaryCards = [
  {
    id: 'total-groups',
    title: 'Total Groups',
    icon: 'group',
    color: '#0a1e34',
    getValue: (data) => data.totalGroups || 0,
    getSubtext: (data) => `${data.activeFFS || 0} FFS • ${data.activeFBS || 0} FBS • ${data.activeVSLAs || 0} VSLA`
  },
  {
    id: 'total-members',
    title: 'Total Members',
    icon: 'person',
    color: '#f59e0b',
    getValue: (data) => data.totalMembers || 0,
    getSubtext: (data) => `${data.genderStats?.female || 0} Female • ${data.genderStats?.male || 0} Male`
  },
  {
    id: 'vsla-savings',
    title: 'VSLA Savings',
    icon: 'bank',
    color: '#10b981',
    getValue: (data) => formatCurrency(data.totalSavings || 0),
    getSubtext: (data) => `Active Loans: ${formatCurrency(data.totalLoans || 0)}`
  },
  {
    id: 'training-sessions',
    title: 'Training Sessions',
    icon: 'school',
    color: '#3b82f6',
    getValue: (data) => data.trainingSessionsCompleted || 0,
    getSubtext: (data) => `Avg. Attendance: ${data.averageAttendance || 0}`
  }
];

// Chart configurations
export const chartConfigs = [
  {
    id: 'monthly-progress',
    title: 'Monthly Progress Trends',
    type: 'line',
    height: 300,
    data: 'monthlyProgress',
    xAxis: 'month',
    lines: [
      { key: 'newMembers', color: '#0a1e34', name: 'New Members' },
      { key: 'trainingSessions', color: '#f59e0b', name: 'Training Sessions' }
    ]
  },
  {
    id: 'member-demographics',
    title: 'Member Demographics',
    type: 'pie',
    height: 300,
    data: 'genderData',
    colors: ['#0a1e34', '#f59e0b', '#10b981', '#3b82f6']
  },
  {
    id: 'district-performance',
    title: 'Groups by District',
    type: 'bar',
    height: 300,
    data: 'districtData',
    xAxis: 'district',
    bars: [
      { key: 'groups', color: '#0a1e34', name: 'Groups' },
      { key: 'members', color: '#f59e0b', name: 'Members' }
    ]
  },
  {
    id: 'savings-growth',
    title: 'VSLA Savings Growth',
    type: 'area',
    height: 300,
    data: 'monthlyProgress',
    xAxis: 'month',
    area: { key: 'savings', color: '#10b981', name: 'VSLA Savings' }
  }
];

// KPI configuration
export const kpiMetrics = [
  {
    id: 'youth-participation',
    title: 'Youth Members',
    getValue: (data) => data.genderStats?.youth || 0,
    getPercentage: (data) => Math.round((data.genderStats?.youth || 0) / (data.totalMembers || 1) * 100),
    color: '#0a1e34'
  },
  {
    id: 'pwd-inclusion',
    title: 'PWD Members', 
    getValue: (data) => data.genderStats?.pwd || 0,
    getPercentage: (data) => Math.round((data.genderStats?.pwd || 0) / (data.totalMembers || 1) * 100),
    color: '#f59e0b'
  },
  {
    id: 'female-participation',
    title: 'Female Participation',
    getValue: (data) => Math.round((data.genderStats?.female || 0) / (data.totalMembers || 1) * 100),
    getSubtext: () => '%',
    color: '#10b981'
  },
  {
    id: 'districts-covered',
    title: 'Districts Covered',
    getValue: (data) => Object.keys(data.districtStats || {}).length,
    getSubtext: () => 'of 7',
    color: '#3b82f6'
  }
];

// Helper function for currency formatting
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Breadcrumb configuration
export const dashboardBreadcrumbs = [
  { label: 'FOSTER Project', href: '/admin/dashboard' },
  { label: 'MIS Dashboard', href: '/admin/dashboard', active: true }
];
