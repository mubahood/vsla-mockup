import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminContentScaffold } from '../../../components/AdminContentScaffold';
import { MOCK_FOSTER_GROUPS, GROUP_TYPES, KARAMOJA_DISTRICTS } from '../../../data/mockData';

export default function GroupsList() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    district: '',
    status: 'Active'
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let filteredGroups = [...MOCK_FOSTER_GROUPS];
      
      // Apply filters
      if (filters.search) {
        filteredGroups = filteredGroups.filter(group => 
          group.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          group.village.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.type) {
        filteredGroups = filteredGroups.filter(group => group.type === filters.type);
      }
      
      if (filters.district) {
        filteredGroups = filteredGroups.filter(group => group.district === filters.district);
      }
      
      if (filters.status) {
        filteredGroups = filteredGroups.filter(group => group.status === filters.status);
      }

      setGroups(filteredGroups);
      setLoading(false);
    }, 500);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getGroupIcon = (type) => {
    const icons = {
      'FFS': '🌾',
      'FBS': '💼', 
      'VSLA': '💰'
    };
    return icons[type] || '👥';
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const scaffoldConfig = {
    title: "FOSTER Groups Management",
    subtitle: "Manage FFS, FBS, and VSLA groups across Karamoja",
    actions: [
      {
        label: "Register New Group",
        variant: "primary",
        action: () => {
          alert('Group registration form would open here');
        }
      },
      {
        label: "Export Data",
        variant: "secondary", 
        action: () => {
          alert('Export functionality would be implemented here');
        }
      }
    ]
  };

  const filterControls = (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div>
        <input
          type="text"
          placeholder="Search groups or villages..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>
      <div>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
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
          value={filters.district}
          onChange={(e) => handleFilterChange('district', e.target.value)}
        >
          <option value="">All Districts</option>
          {KARAMOJA_DISTRICTS.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>
      <div>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
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
              <span className="text-lg">🌾</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">FFS Groups</p>
            <p className="text-2xl font-bold text-gray-900">
              {groups.filter(g => g.type === 'FFS').length}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">💼</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">FBS Groups</p>
            <p className="text-2xl font-bold text-gray-900">
              {groups.filter(g => g.type === 'FBS').length}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">💰</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">VSLA Groups</p>
            <p className="text-2xl font-bold text-gray-900">
              {groups.filter(g => g.type === 'VSLA').length}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">👥</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Members</p>
            <p className="text-2xl font-bold text-gray-900">
              {groups.reduce((sum, g) => sum + g.memberCount, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const groupsTable = (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Groups List</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Group
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Members
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Facilitator
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
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
            ) : groups.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No groups found matching your criteria
                </td>
              </tr>
            ) : (
              groups.map((group) => (
                <tr key={group.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{getGroupIcon(group.type)}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {group.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {group.village}, {group.district}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {GROUP_TYPES[group.type]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{group.village}</div>
                    <div className="text-gray-500">{group.district}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{group.memberCount}</span>
                      <div className="text-xs text-gray-500">
                        ({group.femaleMembers}F, {group.maleMembers}M)
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {group.facilitatorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(group.status)}`}>
                      {group.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => alert(`View details for ${group.name}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button
                        onClick={() => alert(`Edit ${group.name}`)}
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
      {groupsTable}
    </AdminContentScaffold>
  );
}
