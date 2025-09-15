import React, { useState, useEffect } from 'react';
import AdminContentScaffold from '../../components/AdminContentScaffold/AdminContentScaffold';
import { getData } from '../../utils/storage';
import { initializeSeedData } from '../../data/seedData';
import SummaryCards from './Dashboard/components/SummaryCards';
import DashboardCharts from './Dashboard/components/DashboardCharts';
import KPISection from './Dashboard/components/KPISection';
import { 
  dashboardBreadcrumbs, 
  summaryCards, 
  chartConfigs,
  formatCurrency 
} from './Dashboard/config/dashboardConfig';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get data from localStorage or use seed data
      let data = getData('fosterMISData');
      if (!data) {
        data = initializeSeedData();
      }
      
      // Calculate dashboard metrics
      const groups = data.groups || [];
      const trainingSessions = data.trainingSessions || [];
      const vslaTransactions = data.vslaTransactions || [];
      const monitoringData = data.monitoringData || {};
      
      const metrics = {
        totalGroups: groups.length,
        totalMembers: groups.reduce((sum, group) => sum + group.memberCount, 0),
        activeVSLAs: groups.filter(g => g.type === 'VSLA').length,
        activeFFS: groups.filter(g => g.type === 'FFS').length,
        activeFBS: groups.filter(g => g.type === 'FBS').length,
        totalSavings: vslaTransactions
          .filter(t => t.type === 'Savings')
          .reduce((sum, t) => sum + t.amount, 0),
        totalLoans: Math.abs(vslaTransactions
          .filter(t => t.type === 'Loan')
          .reduce((sum, t) => sum + t.amount, 0)),
        trainingSessionsCompleted: trainingSessions.length,
        averageAttendance: trainingSessions.length > 0 
          ? (trainingSessions.reduce((sum, session) => sum + session.attendees.total, 0) / trainingSessions.length).toFixed(1)
          : 0,
        genderStats: {
          male: groups.reduce((sum, group) => sum + group.maleMembers, 0),
          female: groups.reduce((sum, group) => sum + group.femaleMembers, 0),
          youth: groups.reduce((sum, group) => sum + group.youthMembers, 0),
          pwd: groups.reduce((sum, group) => sum + group.pwdMembers, 0)
        },
        districtStats: groups.reduce((acc, group) => {
          if (!acc[group.district]) {
            acc[group.district] = { groups: 0, members: 0 };
          }
          acc[group.district].groups++;
          acc[group.district].members += group.memberCount;
          return acc;
        }, {}),
        monthlyProgress: monitoringData.monthlyProgress || [],
        completionRates: groups.map(group => ({
          name: group.name.length > 20 ? group.name.substring(0, 20) + '...' : group.name,
          rate: group.completionRate || 0,
          type: group.type
        }))
      };

      // Prepare chart data
      const genderData = [
        { name: 'Male', value: metrics.genderStats.male },
        { name: 'Female', value: metrics.genderStats.female },
        { name: 'Youth', value: metrics.genderStats.youth },
        { name: 'PWD', value: metrics.genderStats.pwd }
      ];

      const districtData = Object.entries(metrics.districtStats).map(([district, stats]) => ({
        district,
        groups: stats.groups,
        members: stats.members
      }));

      setDashboardData({
        ...metrics,
        genderData,
        districtData
      });
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Custom content renderer for different sections
  const contextValue = {
    pageTitle: 'Uganda FOSTER Project - MIS Dashboard',
    breadcrumbs: dashboardBreadcrumbs,
    sections: {
      overview: {
        title: 'Dashboard Overview',
        content: dashboardData ? (
          <div>
            <SummaryCards data={dashboardData} config={summaryCards} />
            <KPISection data={dashboardData} />
          </div>
        ) : null
      },
      analytics: {
        title: 'Analytics & Charts',
        content: dashboardData ? (
          <div>
            <SummaryCards data={dashboardData} config={summaryCards} />
            <DashboardCharts data={dashboardData} config={chartConfigs} />
          </div>
        ) : null
      },
      recent: {
        title: 'Recent Activity',
        content: dashboardData ? (
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            padding: '20px'
          }}>
            <h3 style={{
              margin: '0 0 16px 0',
              fontSize: '18px',
              fontWeight: '600',
              color: '#1e293b'
            }}>
              Recent Activity Summary
            </h3>
            <div style={{
              color: '#64748b',
              fontSize: '14px'
            }}>
              <p>• {dashboardData.totalGroups} groups registered across {Object.keys(dashboardData.districtStats).length} districts</p>
              <p>• {dashboardData.trainingSessionsCompleted} training sessions completed</p>
              <p>• {formatCurrency(dashboardData.totalSavings)} in VSLA savings accumulated</p>
              <p>• {dashboardData.genderStats.youth} youth members actively participating</p>
            </div>
          </div>
        ) : null
      }
    },
    data: dashboardData,
    loading,
    error
  };

  return <AdminContentScaffold context={contextValue} />;

  return <AdminContentScaffold context={contextValue} />;
};

export default Dashboard;
