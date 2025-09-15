import React, { useState, useEffect } from 'react';
import { AdminContentScaffold } from '../../../components/AdminContentScaffold';
import { MOCK_MARKETPLACE_DATA } from '../../../data/mockData';

export default function MarketplaceList() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    subcategory: '',
    location: ''
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let filteredListings = [...MOCK_MARKETPLACE_DATA];
      
      // Apply filters
      if (filters.search) {
        filteredListings = filteredListings.filter(listing => 
          listing.item.toLowerCase().includes(filters.search.toLowerCase()) ||
          listing.supplier?.toLowerCase().includes(filters.search.toLowerCase()) ||
          listing.seller?.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.category) {
        filteredListings = filteredListings.filter(listing => 
          listing.category === filters.category
        );
      }
      
      if (filters.subcategory) {
        filteredListings = filteredListings.filter(listing => 
          listing.subcategory === filters.subcategory
        );
      }
      
      if (filters.location) {
        filteredListings = filteredListings.filter(listing => 
          listing.district === filters.location
        );
      }

      setListings(filteredListings);
      setLoading(false);
    }, 500);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'inputs': '🌱',
      'produce': '🌾',
      'livestock': '🐄',
      'equipment': '🚜'
    };
    return icons[category] || '📦';
  };

  const getCategoryBadge = (category) => {
    const badges = {
      'inputs': 'bg-green-100 text-green-800',
      'produce': 'bg-yellow-100 text-yellow-800',
      'livestock': 'bg-purple-100 text-purple-800',
      'equipment': 'bg-blue-100 text-blue-800'
    };
    return badges[category] || 'bg-gray-100 text-gray-800';
  };

  const getAvailabilityBadge = (availability) => {
    const badges = {
      'In Stock': 'bg-green-100 text-green-800',
      'Limited Stock': 'bg-yellow-100 text-yellow-800',
      'Out of Stock': 'bg-red-100 text-red-800',
      'Available': 'bg-blue-100 text-blue-800'
    };
    return badges[availability] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const scaffoldConfig = {
    title: "E-Marketplace Management",
    subtitle: "Monitor agricultural inputs, produce, and livestock trading activities",
    actions: [
      {
        label: "Add New Listing",
        variant: "primary",
        action: () => {
          alert('New marketplace listing form would open here');
        }
      },
      {
        label: "Market Analytics",
        variant: "secondary",
        action: () => {
          alert('Market analytics dashboard would be displayed');
        }
      }
    ]
  };

  const filterControls = (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div>
        <input
          type="text"
          placeholder="Search items or sellers..."
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
          <option value="inputs">Agricultural Inputs</option>
          <option value="produce">Farm Produce</option>
          <option value="livestock">Livestock</option>
          <option value="equipment">Equipment</option>
        </select>
      </div>
      <div>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.subcategory}
          onChange={(e) => handleFilterChange('subcategory', e.target.value)}
        >
          <option value="">All Subcategories</option>
          <option value="seeds">Seeds</option>
          <option value="fertilizer">Fertilizer</option>
          <option value="grains">Grains</option>
          <option value="goats">Goats</option>
          <option value="cattle">Cattle</option>
        </select>
      </div>
      <div>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="Moroto">Moroto</option>
          <option value="Kotido">Kotido</option>
          <option value="Kaabong">Kaabong</option>
          <option value="Nakapiripirit">Nakapiripirit</option>
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
              <span className="text-lg">🌱</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Input Suppliers</p>
            <p className="text-2xl font-bold text-gray-900">
              {listings.filter(l => l.category === 'inputs').length}
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
            <p className="text-sm font-medium text-gray-600">Produce Listings</p>
            <p className="text-2xl font-bold text-gray-900">
              {listings.filter(l => l.category === 'produce').length}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">🐄</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Livestock</p>
            <p className="text-2xl font-bold text-gray-900">
              {listings.filter(l => l.category === 'livestock').length}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">💰</span>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Value</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(
                listings.reduce((sum, l) => 
                  sum + ((l.totalValue || (l.price * (l.quantity || 1))) || 0), 0
                )
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const listingsTable = (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Marketplace Listings</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seller/Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price/Quantity
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
            ) : listings.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No marketplace listings found matching your criteria
                </td>
              </tr>
            ) : (
              listings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{getCategoryIcon(listing.category)}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {listing.item}
                        </div>
                        <div className="text-xs text-gray-500">
                          {listing.description && listing.description.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryBadge(listing.category)}`}>
                      {listing.category}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {listing.subcategory}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {listing.supplier || listing.seller}
                    </div>
                    <div className="text-xs text-gray-500">
                      {listing.contact.person}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{listing.location}</div>
                    <div className="text-xs text-gray-500">{listing.district}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {listing.price && formatCurrency(listing.price)}
                      {listing.pricePerKg && formatCurrency(listing.pricePerKg)}
                      {listing.pricePerHead && formatCurrency(listing.pricePerHead)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {listing.unit && `per ${listing.unit}`}
                      {listing.quantity && ` • ${listing.quantity} available`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAvailabilityBadge(listing.availability || 'Available')}`}>
                      {listing.availability || 'Available'}
                    </span>
                    {listing.urgent && (
                      <div className="text-xs text-red-600 mt-1">Urgent Sale</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => alert(`View listing details for: ${listing.item}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button
                        onClick={() => alert(`Contact: ${listing.contact.phone}`)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Contact
                      </button>
                      <button
                        onClick={() => alert(`Edit listing: ${listing.item}`)}
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
      {listingsTable}
    </AdminContentScaffold>
  );
}
