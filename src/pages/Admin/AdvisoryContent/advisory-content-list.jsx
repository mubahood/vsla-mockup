import React, { useState, useEffect } from 'react';
import { AdminContentScaffold } from '../../../components/AdminContentScaffold';
import { MOCK_ADVISORY_CONTENT } from '../../../data/mockData';

export default function AdvisoryContentList() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    language: '',
    priority: ''
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let filteredContent = [...MOCK_ADVISORY_CONTENT];
      
      // Apply filters
      if (filters.search) {
        filteredContent = filteredContent.filter(item => 
          item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.content.summary.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.category) {
        filteredContent = filteredContent.filter(item => 
          item.category === filters.category
        );
      }
      
      if (filters.language) {
        filteredContent = filteredContent.filter(item => 
          item.language === filters.language
        );
      }
      
      if (filters.priority) {
        filteredContent = filteredContent.filter(item => 
          item.priority === filters.priority
        );
      }

      setContent(filteredContent);
      setLoading(false);
    }, 500);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'crops': '🌾',
      'livestock': '🐄',
      'financial_literacy': '💰',
      'climate': '🌦️',
      'market': '📈',
      'technology': '📱'
    };
    return icons[category] || '📚';
  };

  const getCategoryBadge = (category) => {
    const badges = {
      'crops': 'bg-green-100 text-green-800',
      'livestock': 'bg-purple-100 text-purple-800',
      'financial_literacy': 'bg-blue-100 text-blue-800',
      'climate': 'bg-yellow-100 text-yellow-800',
      'market': 'bg-orange-100 text-orange-800',
      'technology': 'bg-gray-100 text-gray-800'
    };
    return badges[category] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800'
    };
    return badges[priority] || 'bg-gray-100 text-gray-800';
  };

  const scaffoldConfig = {
    title: "E-Advisory Content Management",
    subtitle: "Manage agricultural advisory content, guides, and educational materials",
    actions: [
      {
        label: "Create New Content",
        variant: "primary",
        action: () => {
          alert('Content creation form would open here');
        }
      },
      {
        label: "Content Analytics",
        variant: "secondary",
        action: () => {
          alert('Content usage analytics would be displayed');
        }
      }
    ]
  };

  const filterControls = (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div>
        <input
          type="text"
          placeholder="Search content..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>
      <div>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="crops">Crops</option>
          <option value="livestock">Livestock</option>
          <option value="financial_literacy">Financial Literacy</option>
          <option value="climate">Climate & Weather</option>
          <option value="market">Market Information</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      <div>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.language}
          onChange={(e) => handleFilterChange('language', e.target.value)}
        >
          <option value="">All Languages</option>
          <option value="en">English</option>
          <option value="ngakarimojong">Ngakarimojong</option>
          <option value="luganda">Luganda</option>
        </select>
      </div>
      <div>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
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
            <p className="text-sm font-medium text-gray-600">Total Content</p>
            <p className="text-2xl font-bold text-gray-900">{content.length}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">⭐</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Avg Rating</p>
            <p className="text-2xl font-bold text-gray-900">
              {content.length > 0 ? 
                (content.reduce((sum, c) => sum + c.rating, 0) / content.length).toFixed(1) : 
                '0.0'
              }
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">📥</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Downloads</p>
            <p className="text-2xl font-bold text-gray-900">
              {content.reduce((sum, c) => sum + c.downloads, 0)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">🔥</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">High Priority</p>
            <p className="text-2xl font-bold text-gray-900">
              {content.filter(c => c.priority === 'high').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const contentTable = (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Advisory Content</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Language
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Downloads
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
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
            ) : content.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No content found matching your criteria
                </td>
              </tr>
            ) : (
              content.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{getCategoryIcon(item.category)}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.content.summary.substring(0, 80)}...
                        </div>
                        <div className="flex items-center mt-2 space-x-2">
                          {item.content.audio && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              🎵 Audio
                            </span>
                          )}
                          {item.content.video && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                              🎥 Video
                            </span>
                          )}
                          {item.content.images && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              📸 Images
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryBadge(item.category)}`}>
                      {item.category.replace('_', ' ')}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {item.subcategory}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.language === 'en' ? 'English' : 
                       item.language === 'ngakarimojong' ? 'Ngakarimojong' : 
                       item.language}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadge(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item.downloads.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">
                        {item.rating}
                      </span>
                      <span className="ml-1 text-yellow-400">⭐</span>
                      <span className="ml-1 text-xs text-gray-500">
                        ({item.reviews})
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => alert(`View content: ${item.title}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button
                        onClick={() => alert(`Edit content: ${item.title}`)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => alert(`Download analytics for: ${item.title}`)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Analytics
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
      {contentTable}
    </AdminContentScaffold>
  );
}
