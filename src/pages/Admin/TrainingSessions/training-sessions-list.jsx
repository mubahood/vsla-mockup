import React, { useState, useEffect } from 'react';
import { AdminContentScaffold } from '../../../components/AdminContentScaffold';
import { MOCK_TRAINING_SESSIONS, MOCK_FOSTER_GROUPS, GROUP_TYPES } from '../../../data/mockData';

export default function TrainingSessionsList() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    groupType: '',
    methodology: '',
    dateRange: 'last_30_days'
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let filteredSessions = [...MOCK_TRAINING_SESSIONS];
      
      // Apply filters
      if (filters.search) {
        filteredSessions = filteredSessions.filter(session => 
          session.topic.toLowerCase().includes(filters.search.toLowerCase()) ||
          session.groupName.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.methodology) {
        filteredSessions = filteredSessions.filter(session => 
          session.methodology === filters.methodology
        );
      }

      setSessions(filteredSessions);
      setLoading(false);
    }, 500);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getMethodologyBadge = (methodology) => {
    const badges = {
      'AESA': 'bg-green-100 text-green-800',
      'participatory_discussion': 'bg-blue-100 text-blue-800',
      'hands_on_practical': 'bg-purple-100 text-purple-800',
      'field_demonstration': 'bg-orange-100 text-orange-800'
    };
    return badges[methodology] || 'bg-gray-100 text-gray-800';
  };

  const getMethodologyLabel = (methodology) => {
    const labels = {
      'AESA': 'AESA',
      'participatory_discussion': 'Discussion',
      'hands_on_practical': 'Practical',
      'field_demonstration': 'Demo'
    };
    return labels[methodology] || methodology;
  };

  const scaffoldConfig = {
    title: "Training Sessions Management",
    subtitle: "Track FFS, FBS, and VSLA training activities across Karamoja",
    actions: [
      {
        label: "Log New Session",
        variant: "primary",
        action: () => {
          alert('New training session form would open here');
        }
      },
      {
        label: "Training Report",
        variant: "secondary",
        action: () => {
          alert('Training analytics report would be generated');
        }
      }
    ]
  };

  const filterControls = (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div>
        <input
          type="text"
          placeholder="Search sessions or groups..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>
      <div>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.groupType}
          onChange={(e) => handleFilterChange('groupType', e.target.value)}
        >
          <option value="">All Group Types</option>
          {Object.entries(GROUP_TYPES).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>
      <div>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.methodology}
          onChange={(e) => handleFilterChange('methodology', e.target.value)}
        >
          <option value="">All Methodologies</option>
          <option value="AESA">AESA</option>
          <option value="participatory_discussion">Participatory Discussion</option>
          <option value="hands_on_practical">Hands-on Practical</option>
          <option value="field_demonstration">Field Demonstration</option>
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
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">📚</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Sessions</p>
            <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">👥</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Attendance</p>
            <p className="text-2xl font-bold text-gray-900">
              {sessions.reduce((sum, s) => sum + (s.attendanceTotal || 0), 0)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">♀️</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Female Participation</p>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round((sessions.reduce((sum, s) => sum + (s.attendanceFemale || 0), 0) / 
                sessions.reduce((sum, s) => sum + (s.attendanceTotal || 1), 0)) * 100)}%
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">🌾</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">AESA Sessions</p>
            <p className="text-2xl font-bold text-gray-900">
              {sessions.filter(s => s.methodology === 'AESA').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const sessionsTable = (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Training Sessions</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Session Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Group
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attendance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Methodology
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Facilitator
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
            ) : sessions.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No training sessions found matching your criteria
                </td>
              </tr>
            ) : (
              sessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {session.topic}
                      </div>
                      {session.cropStage && (
                        <div className="text-xs text-gray-500 mt-1">
                          Crop Stage: {session.cropStage.replace('_', ' ')}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{session.groupName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(session.date).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {session.startTime} - {session.endTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {session.attendanceTotal}
                      </span>
                      {session.attendanceFemale !== undefined && (
                        <div className="text-xs text-gray-500">
                          ({session.attendanceFemale}F, {session.attendanceMale}M)
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMethodologyBadge(session.methodology)}`}>
                      {getMethodologyLabel(session.methodology)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {session.facilitatorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => alert(`View session details for: ${session.topic}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button
                        onClick={() => alert(`Edit session: ${session.topic}`)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
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
      {sessionsTable}
    </AdminContentScaffold>
  );
}
