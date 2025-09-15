import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  Users,
  TrendingUp,
  DollarSign,
  GraduationCap,
  ShoppingCart,
  MapPin,
  AlertCircle,
  Plus,
  ArrowUp,
  ArrowDown,
  Activity,
  Target,
  Award,
  BookOpen,
  CreditCard,
  Bell,
  RefreshCw
} from 'lucide-react';

/**
 * FOSTER Project MIS Dashboard
 * Comprehensive overview of all project modules with deep insights
 * Following flat design principles with meaningful data visualization
 */
const MISDashboard = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [activeTab, setActiveTab] = useState('activity');

  // Dashboard styling following our design guidelines
  const styles = {
    container: {
      padding: '0',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      padding: '0',
      position: 'sticky',
      top: '0',
      zIndex: '100',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    headerTop: {
      background: 'linear-gradient(135deg, #0a1e34 0%, #1e40af 100%)',
      color: '#ffffff',
      padding: '16px 0',
    },
    headerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px'
    },
    headerTitle: {
      fontSize: '24px',
      fontWeight: '700',
      margin: '0',
      color: '#ffffff'
    },
    headerSubtitle: {
      fontSize: '14px',
      opacity: '0.9',
      margin: '4px 0 0 0',
      color: '#e2e8f0'
    },
    headerStats: {
      display: 'flex',
      gap: '32px',
      alignItems: 'center'
    },
    headerStat: {
      textAlign: 'center'
    },
    headerStatValue: {
      fontSize: '20px',
      fontWeight: '700',
      margin: '0',
      color: '#ffffff'
    },
    headerStatLabel: {
      fontSize: '11px',
      margin: '2px 0 0 0',
      color: '#cbd5e1',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    controlsBar: {
      backgroundColor: '#ffffff',
      padding: '20px 0',
      borderBottom: '1px solid #f1f5f9'
    },
    controlsContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px'
    },
    breadcrumb: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: '#64748b'
    },
    controls: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center'
    },
    select: {
      padding: '8px 16px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      backgroundColor: '#ffffff',
      color: '#334155',
      fontSize: '14px',
      minWidth: '140px',
      cursor: 'pointer',
      transition: 'border-color 0.2s ease'
    },
    refreshButton: {
      padding: '8px 16px',
      backgroundColor: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      color: '#64748b',
      fontSize: '14px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease'
    },
    mainContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '16px',
      display: 'grid',
      gap: '16px'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      margin: '0 0 16px 0',
      color: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    kpiSection: {
      padding: '16px',
      backgroundColor: '#f8fafc'
    },
    kpiGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px'
    },
    kpiCard: {
      backgroundColor: '#ffffff',
      padding: '16px',
      borderRadius: '0',
      border: '1px solid #e2e8f0',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      position: 'relative'
    },
    kpiCardHover: {
      transform: 'translateY(-2px)',
      borderColor: '#cbd5e1'
    },
    kpiHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px'
    },
    kpiIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px'
    },
    kpiValue: {
      fontSize: '24px',
      fontWeight: '700',
      margin: '0 0 4px 0',
      color: '#0f172a',
      lineHeight: '1'
    },
    kpiLabel: {
      fontSize: '12px',
      color: '#64748b',
      margin: '0 0 8px 0',
      fontWeight: '500'
    },
    kpiChange: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '11px',
      fontWeight: '600',
      padding: '2px 6px',
      borderRadius: '0'
    },
    kpiTrend: {
      position: 'absolute',
      top: '0',
      right: '0',
      width: '100%',
      height: '4px',
      background: 'linear-gradient(90deg, transparent 0%, currentColor 100%)',
      opacity: '0.3'
    },
    chartsSection: {
      display: 'grid',
      gap: '16px',
      paddingLeft: '16px',
      paddingRight: '16px'
    },
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '16px'
    },
    chartCard: {
      backgroundColor: '#ffffff',
      padding: '16px',
      borderRadius: '0',
      border: '1px solid #e2e8f0'
    },
    chartHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    chartTitle: {
      fontSize: '18px',
      fontWeight: '600',
      margin: '0',
      color: '#0f172a'
    },
    chartSubtitle: {
      fontSize: '14px',
      color: '#64748b',
      margin: '4px 0 0 0'
    },
    chartActions: {
      display: 'flex',
      gap: '8px'
    },
    chartButton: {
      padding: '6px 12px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      backgroundColor: '#ffffff',
      color: '#64748b',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    sidebarGrid: {
      display: 'grid',
      gap: '24px'
    },
    activityCard: {
      backgroundColor: '#ffffff',
      padding: '28px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    activityHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    activityTitle: {
      fontSize: '16px',
      fontWeight: '600',
      margin: '0',
      color: '#0f172a'
    },
    activityItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px',
      padding: '16px 0',
      borderBottom: '1px solid #f8fafc'
    },
    activityIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      flexShrink: 0,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    activityContent: {
      flex: 1,
      paddingTop: '2px'
    },
    activityText: {
      fontSize: '14px',
      margin: '0 0 4px 0',
      color: '#334155',
      lineHeight: '1.5'
    },
    activityTime: {
      fontSize: '12px',
      color: '#64748b',
      margin: '0'
    },
    alertsCard: {
      backgroundColor: '#ffffff',
      padding: '28px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    alertItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px 20px',
      backgroundColor: '#fefce8',
      border: '1px solid #fcd34d',
      borderRadius: '8px',
      marginBottom: '12px'
    },
    alertIcon: {
      color: '#d97706',
      flexShrink: 0
    },
    alertText: {
      fontSize: '14px',
      color: '#92400e',
      margin: '0',
      lineHeight: '1.4'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#f1f5f9',
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '8px'
    },
    progressFill: {
      height: '100%',
      borderRadius: '4px',
      transition: 'width 0.6s ease'
    },
    // Tabbed Section Styles
    tabbedSection: {
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '0',
      marginLeft: '16px',
      marginTop: '10px',
      marginRight: '16px'
    },
    tabsHeader: {
      display: 'flex',
      borderBottom: '1px solid #e2e8f0'
    },
    tab: {
      flex: 1,
      padding: '16px 20px',
      backgroundColor: '#f8fafc',
      border: 'none',
      borderRight: '1px solid #e2e8f0',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      color: '#64748b',
      transition: 'all 0.2s ease'
    },
    activeTab: {
      backgroundColor: '#ffffff',
      color: '#0f172a',
      borderBottom: '2px solid #3b82f6'
    },
    tabContent: {
      padding: '16px',
      minHeight: '300px'
    },
    // Quick Actions Styles
    quickActionsSection: {
      paddingLeft: '16px',
      paddingRight: '16px',
      backgroundColor: '#f8fafc',
      marginBottom: '42px'
    },
    quickActionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px'
    },
    quickAction: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      padding: '16px',
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '0',
      textDecoration: 'none',
      color: '#64748b',
      fontSize: '12px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    }
  };

  // Dashboard data with realistic FOSTER Project metrics
  const dashboardData = {
    kpis: [
      {
        id: 'groups',
        label: 'Total Groups',
        value: '247',
        change: '+12',
        changeType: 'increase',
        icon: Users,
        color: '#3b82f6',
        route: '/admin/registry'
      },
      {
        id: 'members',
        label: 'Active Members',
        value: '8,456',
        change: '+284',
        changeType: 'increase',
        icon: Target,
        color: '#10b981',
        route: '/admin/registry'
      },
      {
        id: 'savings',
        label: 'Total Savings',
        value: 'UGX 2.4B',
        change: '+15.2%',
        changeType: 'increase',
        icon: DollarSign,
        color: '#f59e0b',
        route: '/admin/financial'
      },
      {
        id: 'training',
        label: 'Training Completion',
        value: '87.3%',
        change: '+5.1%',
        changeType: 'increase',
        icon: GraduationCap,
        color: '#8b5cf6',
        route: '/admin/training'
      },
      {
        id: 'marketplace',
        label: 'Market Transactions',
        value: '1,234',
        change: '+89',
        changeType: 'increase',
        icon: ShoppingCart,
        color: '#ef4444',
        route: '/admin/marketplace'
      },
      {
        id: 'districts',
        label: 'Districts Covered',
        value: '7/7',
        change: '100%',
        changeType: 'stable',
        icon: MapPin,
        color: '#06b6d4',
        route: '/admin/monitoring'
      },
      {
        id: 'loans',
        label: 'Active Loans',
        value: '892',
        change: '+45',
        changeType: 'increase',
        icon: CreditCard,
        color: '#84cc16',
        route: '/admin/financial'
      },
      {
        id: 'advisories',
        label: 'Advisory Services',
        value: '156',
        change: '+23',
        changeType: 'increase',
        icon: BookOpen,
        color: '#f97316',
        route: '/admin/advisory'
      }
    ],
    groupGrowth: [
      { month: 'Jul 2023', ffs: 45, vsla: 32, total: 77 },
      { month: 'Aug 2023', ffs: 52, vsla: 38, total: 90 },
      { month: 'Sep 2023', ffs: 61, vsla: 45, total: 106 },
      { month: 'Oct 2023', ffs: 73, vsla: 52, total: 125 },
      { month: 'Nov 2023', ffs: 89, vsla: 61, total: 150 },
      { month: 'Dec 2023', ffs: 105, vsla: 73, total: 178 },
      { month: 'Jan 2024', ffs: 125, vsla: 89, total: 214 },
      { month: 'Feb 2024', ffs: 142, vsla: 105, total: 247 }
    ],
    financialFlow: [
      { month: 'Jul', savings: 180000000, loans: 95000000, profit: 12000000 },
      { month: 'Aug', savings: 210000000, loans: 115000000, profit: 18000000 },
      { month: 'Sep', savings: 275000000, loans: 145000000, profit: 25000000 },
      { month: 'Oct', savings: 340000000, loans: 180000000, profit: 32000000 },
      { month: 'Nov', savings: 420000000, loans: 225000000, profit: 41000000 },
      { month: 'Dec', savings: 510000000, loans: 275000000, profit: 52000000 },
      { month: 'Jan', savings: 620000000, loans: 335000000, profit: 65000000 },
      { month: 'Feb', savings: 750000000, loans: 405000000, profit: 78000000 }
    ],
    districtDistribution: [
      { district: 'Moroto', groups: 42, members: 1456, color: '#3b82f6' },
      { district: 'Kotido', groups: 38, members: 1298, color: '#10b981' },
      { district: 'Kaabong', groups: 35, members: 1187, color: '#f59e0b' },
      { district: 'Napak', groups: 41, members: 1402, color: '#8b5cf6' },
      { district: 'Nakapiripirit', groups: 36, members: 1245, color: '#ef4444' },
      { district: 'Amudat', groups: 29, members: 1012, color: '#06b6d4' },
      { district: 'Karenga', groups: 26, members: 856, color: '#84cc16' }
    ],
    trainingProgress: [
      { topic: 'Climate Smart Agriculture', completed: 89, total: 95, percentage: 94 },
      { topic: 'VSLA Management', completed: 156, total: 178, percentage: 88 },
      { topic: 'Post Harvest Handling', completed: 201, total: 247, percentage: 81 },
      { topic: 'Market Access', completed: 178, total: 247, percentage: 72 },
      { topic: 'Financial Literacy', completed: 167, total: 247, percentage: 68 }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'registration',
        text: 'New FFS group "Loyoro Climate Resilience" registered in Kotido',
        time: '2 hours ago',
        icon: Users,
        color: '#3b82f6'
      },
      {
        id: 2,
        type: 'training',
        text: 'Climate Smart Agriculture training completed in Moroto (24 participants)',
        time: '4 hours ago',
        icon: GraduationCap,
        color: '#8b5cf6'
      },
      {
        id: 3,
        type: 'financial',
        text: 'VSLA group in Napak recorded UGX 2.4M in savings',
        time: '6 hours ago',
        icon: DollarSign,
        color: '#f59e0b'
      },
      {
        id: 4,
        type: 'marketplace',
        text: '15 new sorghum listings added to marketplace',
        time: '8 hours ago',
        icon: ShoppingCart,
        color: '#ef4444'
      },
      {
        id: 5,
        type: 'advisory',
        text: 'Weather advisory published for drought preparation',
        time: '1 day ago',
        icon: Activity,
        color: '#06b6d4'
      }
    ],
    alerts: [
      {
        id: 1,
        text: '12 groups have not submitted monthly reports',
        priority: 'medium'
      },
      {
        id: 2,
        text: '3 VSLA groups have low savings balances',
        priority: 'high'
      },
      {
        id: 3,
        text: '5 training sessions scheduled for next week',
        priority: 'low'
      },
      {
        id: 4,
        text: '8 marketplace listings expire in 3 days',
        priority: 'medium'
      }
    ],
    quickActions: [
      { label: 'Register New Group', icon: Users, route: '/admin/registry/create', color: '#3b82f6' },
      { label: 'Schedule Training', icon: GraduationCap, route: '/admin/training/create', color: '#8b5cf6' },
      { label: 'Add Marketplace Item', icon: ShoppingCart, route: '/admin/marketplace/create', color: '#ef4444' },
      { label: 'Record Transaction', icon: CreditCard, route: '/admin/financial/create', color: '#f59e0b' },
      { label: 'Create Advisory', icon: BookOpen, route: '/admin/advisory/create', color: '#06b6d4' },
      { label: 'Generate Report', icon: Activity, route: '/admin/monitoring', color: '#10b981' },
      { label: 'Issue Loan', icon: DollarSign, route: '/admin/financial/loans/create', color: '#84cc16' },
      { label: 'Monitor Progress', icon: Target, route: '/admin/monitoring/progress', color: '#f97316' }
    ]
  };

  const formatCurrency = (value) => {
    if (value >= 1000000000) {
      return `UGX ${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `UGX ${(value / 1000000).toFixed(1)}M`;
    }
    return `UGX ${value.toLocaleString()}`;
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#84cc16'];

  return (
    <div style={styles.container}>
      {/* Enhanced Dashboard Header */}
      <div style={styles.header}>
        {/* Top Header Bar */}
        <div style={styles.headerTop}>
          <div style={styles.headerContent}>
            <div>
              <h1 style={styles.headerTitle}>FOSTER Project Dashboard</h1>
              <p style={styles.headerSubtitle}>
                Digital Agricultural MIS for Karamoja Region
              </p>
            </div>
            <div style={styles.headerStats}>
              <div style={styles.headerStat}>
                <h3 style={styles.headerStatValue}>247</h3>
                <p style={styles.headerStatLabel}>Total Groups</p>
              </div>
              <div style={styles.headerStat}>
                <h3 style={styles.headerStatValue}>8,456</h3>
                <p style={styles.headerStatLabel}>Active Members</p>
              </div>
              <div style={styles.headerStat}>
                <h3 style={styles.headerStatValue}>7</h3>
                <p style={styles.headerStatLabel}>Districts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div style={styles.controlsBar}>
          <div style={styles.controlsContent}>
            <div style={styles.breadcrumb}>
              <Activity size={16} />
              <span>Dashboard</span>
              <span>•</span>
              <span>Overview</span>
            </div>
            <div style={styles.controls}>
              <select 
                style={styles.select}
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
              <select 
                style={styles.select}
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="all">All Districts</option>
                <option value="moroto">Moroto</option>
                <option value="kotido">Kotido</option>
                <option value="kaabong">Kaabong</option>
                <option value="napak">Napak</option>
                <option value="nakapiripirit">Nakapiripirit</option>
                <option value="amudat">Amudat</option>
                <option value="karenga">Karenga</option>
              </select>
              <button
                style={styles.refreshButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f1f5f9';
                  e.target.style.borderColor = '#cbd5e1';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#f8fafc';
                  e.target.style.borderColor = '#e2e8f0';
                }}
              >
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Key Performance Indicators Section */}
        <div style={styles.kpiSection}>
          <div style={styles.kpiGrid}>
            {dashboardData.kpis.map((kpi) => {
              const IconComponent = kpi.icon;
              return (
                <Link
                  key={kpi.id}
                  to={kpi.route}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={styles.kpiCard}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, styles.kpiCardHover);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <div style={{ ...styles.kpiTrend, color: kpi.color }} />
                    <div style={styles.kpiHeader}>
                      <div
                        style={{
                          ...styles.kpiIcon,
                          backgroundColor: `${kpi.color}15`,
                          color: kpi.color
                        }}
                      >
                        <IconComponent size={28} />
                      </div>
                      <div style={{
                        ...styles.kpiChange,
                        color: kpi.changeType === 'increase' ? '#059669' : 
                               kpi.changeType === 'decrease' ? '#dc2626' : '#6b7280',
                        backgroundColor: kpi.changeType === 'increase' ? '#ecfdf5' : 
                                         kpi.changeType === 'decrease' ? '#fef2f2' : '#f9fafb'
                      }}>
                        {kpi.changeType === 'increase' && <ArrowUp size={14} />}
                        {kpi.changeType === 'decrease' && <ArrowDown size={14} />}
                        {kpi.change}
                      </div>
                    </div>
                    <h2 style={styles.kpiValue}>{kpi.value}</h2>
                    <p style={styles.kpiLabel}>{kpi.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Analytics & Insights Section */}
        <div style={styles.chartsSection}>
           
          
          <div style={styles.chartsGrid}>
            {/* Left Column - Main Charts */}
            <div>
              {/* Group Growth Trend */}
              <div style={styles.chartCard}>
                <div style={styles.chartHeader}>
                  <div>
                    <h3 style={styles.chartTitle}>Group Registration Trends</h3>
                    <p style={styles.chartSubtitle}>FFS and VSLA group formation over time</p>
                  </div>
                  <div style={styles.chartActions}>
                    <button style={styles.chartButton}>Export</button>
                    <button style={styles.chartButton}>View Details</button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dashboardData.groupGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#64748b"
                      fontSize={12}
                      tick={{ fill: '#64748b' }}
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={12}
                      tick={{ fill: '#64748b' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="total" 
                      stackId="1"
                      stroke="#3b82f6" 
                      fill="#3b82f615"
                      strokeWidth={3}
                      name="Total Groups"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="ffs" 
                      stackId="2"
                      stroke="#10b981" 
                      fill="#10b98115"
                      strokeWidth={2}
                      name="FFS Groups"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="vsla" 
                      stackId="3"
                      stroke="#f59e0b" 
                      fill="#f59e0b15"
                      strokeWidth={2}
                      name="VSLA Groups"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Financial Performance */}
              <div style={{ ...styles.chartCard, marginTop: '16px' }}>
                <div style={styles.chartHeader}>
                  <div>
                    <h3 style={styles.chartTitle}>Financial Performance Trends</h3>
                    <p style={styles.chartSubtitle}>VSLA savings, loans, and interest earnings</p>
                  </div>
                  <div style={styles.chartActions}>
                    <button style={styles.chartButton}>Export</button>
                    <button style={styles.chartButton}>View Details</button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dashboardData.financialFlow}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#64748b"
                      fontSize={12}
                      tick={{ fill: '#64748b' }}
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={12}
                      tick={{ fill: '#64748b' }}
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                      formatter={(value, name) => [formatCurrency(value), name]}
                    />
                    <Bar dataKey="savings" fill="#3b82f6" name="Total Savings" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="loans" fill="#10b981" name="Active Loans" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="profit" fill="#f59e0b" name="Interest Earned" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Column - Sidebar Widgets */}
            <div style={styles.sidebarGrid}>
              {/* District Distribution */}
              <div style={styles.chartCard}>
                <div style={styles.chartHeader}>
                  <div>
                    <h3 style={styles.chartTitle}>District Coverage</h3>
                    <p style={styles.chartSubtitle}>Distribution of groups across districts</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={dashboardData.districtDistribution}
                      dataKey="groups"
                      nameKey="district"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ district, groups }) => `${district}: ${groups}`}
                      labelStyle={{ fontSize: '10px', fill: '#64748b' }}
                    >
                      {dashboardData.districtDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Training Progress */}
              <div style={styles.chartCard}>
                <div style={styles.chartHeader}>
                  <div>
                    <h3 style={styles.chartTitle}>Training Completion Rates</h3>
                    <p style={styles.chartSubtitle}>Progress across training modules</p>
                  </div>
                </div>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {dashboardData.trainingProgress.map((training, index) => (
                    <div key={index}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '8px',
                        fontSize: '13px'
                      }}>
                        <span style={{ color: '#334155', fontWeight: '500' }}>{training.topic}</span>
                        <span style={{ 
                          color: '#64748b',
                          backgroundColor: '#f8fafc',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {training.percentage}%
                        </span>
                      </div>
                      <div style={styles.progressBar}>
                        <div
                          style={{
                            ...styles.progressFill,
                            width: `${training.percentage}%`,
                            backgroundColor: COLORS[index % COLORS.length]
                          }}
                        />
                      </div>
                      <div style={{ 
                        fontSize: '11px', 
                        color: '#64748b', 
                        marginTop: '4px' 
                      }}>
                        {training.completed} of {training.total} groups completed
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  
            </div>
          </div>
        </div>

        {/* Tabbed Information Section */}
        <div style={styles.tabbedSection}>
          <div style={styles.tabsHeader}>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'activity' ? styles.activeTab : {}),
                borderRight: '1px solid #e2e8f0'
              }}
              onClick={() => setActiveTab('activity')}
            >
              <Activity size={16} style={{ marginRight: '8px', display: 'inline' }} />
              Recent Activity
            </button>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'alerts' ? styles.activeTab : {}),
                borderRight: '1px solid #e2e8f0'
              }}
              onClick={() => setActiveTab('alerts')}
            >
              <Bell size={16} style={{ marginRight: '8px', display: 'inline' }} />
              Alerts & Notifications
            </button>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'reports' ? styles.activeTab : {}),
                borderRight: 'none'
              }}
              onClick={() => setActiveTab('reports')}
            >
              <Award size={16} style={{ marginRight: '8px', display: 'inline' }} />
              System Reports
            </button>
          </div>
          
          <div style={styles.tabContent}>
            {activeTab === 'activity' && (
              <div>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>
                  Recent Activity
                </h3>
                {dashboardData.recentActivity.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={activity.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 0',
                      borderBottom: '1px solid #f1f5f9'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '0',
                        backgroundColor: `${activity.color}15`,
                        color: activity.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <IconComponent size={16} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#0f172a' }}>
                          {activity.text}
                        </p>
                        <p style={{ margin: '0', fontSize: '11px', color: '#64748b' }}>
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'alerts' && (
              <div>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>
                  Alerts & Notifications
                  <span style={{
                    marginLeft: '8px',
                    fontSize: '11px',
                    color: '#f59e0b',
                    backgroundColor: '#fef3c7',
                    padding: '2px 6px',
                    borderRadius: '0',
                    fontWeight: '600'
                  }}>
                    {dashboardData.alerts.length}
                  </span>
                </h3>
                {dashboardData.alerts.map((alert) => (
                  <div key={alert.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: '#fefce8',
                    border: '1px solid #fcd34d',
                    borderRadius: '0',
                    marginBottom: '8px'
                  }}>
                    <AlertCircle size={16} style={{ color: '#d97706', flexShrink: 0 }} />
                    <p style={{ margin: '0', fontSize: '13px', color: '#92400e' }}>
                      {alert.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reports' && (
              <div>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>
                  System Reports
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0'
                  }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                      Monthly Performance Report
                    </h4>
                    <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#64748b' }}>
                      Comprehensive overview of all activities this month
                    </p>
                    <Link to="/admin/monitoring/reports/monthly" style={{
                      fontSize: '12px',
                      color: '#3b82f6',
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}>
                      View Report →
                    </Link>
                  </div>
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0'
                  }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                      Financial Summary
                    </h4>
                    <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#64748b' }}>
                      VSLA savings, loans, and transaction summaries
                    </p>
                    <Link to="/admin/monitoring/reports/financial" style={{
                      fontSize: '12px',
                      color: '#3b82f6',
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}>
                      View Report →
                    </Link>
                  </div>
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0'
                  }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                      Training Progress Report
                    </h4>
                    <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#64748b' }}>
                      Completion rates and training effectiveness metrics
                    </p>
                    <Link to="/admin/monitoring/reports/training" style={{
                      fontSize: '12px',
                      color: '#3b82f6',
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}>
                      View Report →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div style={styles.quickActionsSection}>
          <h2 style={styles.sectionTitle}>
            <Plus size={20} />
            Quick Actions
          </h2>
          <div style={styles.quickActionsGrid}>
            {dashboardData.quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={index}
                  to={action.route}
                  style={styles.quickAction}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = action.color;
                    e.currentTarget.style.backgroundColor = `${action.color}08`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }}
                >
                  <div 
                    style={{ 
                      color: action.color,
                      backgroundColor: `${action.color}15`,
                      padding: '8px',
                      borderRadius: '0',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IconComponent size={16} />
                  </div>
                  <span>{action.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MISDashboard;
