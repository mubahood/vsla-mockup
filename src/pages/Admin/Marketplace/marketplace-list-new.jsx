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

  // Enhanced summary statistics
  const summaryStats = [
    {
      title: "Total Listings",
      value: listings.length,
      trend: "+12%",
      trendDirection: "up",
      icon: "🏪"
    },
    {
      title: "Active Suppliers",
      value: new Set(listings.map(l => l.supplier || l.seller)).size,
      trend: "+8%",
      trendDirection: "up",
      icon: "👥"
    },
    {
      title: "Total Value",
      value: formatCurrency(listings.reduce((sum, l) => sum + (l.price * (l.quantity || 1)), 0)),
      trend: "+15%",
      trendDirection: "up",
      icon: "💰"
    },
    {
      title: "Active Locations",
      value: new Set(listings.map(l => l.district)).size,
      trend: "+3%",
      trendDirection: "up",
      icon: "📍"
    }
  ];

  // Quick action buttons
  const quickActions = [
    {
      label: 'Add New Listing',
      onClick: () => alert('New marketplace listing form would open here'),
      variant: 'primary'
    },
    {
      label: 'Market Analytics',
      onClick: () => alert('Market analytics dashboard would be displayed'),
      variant: 'secondary'
    },
    {
      label: 'Price Trends',
      onClick: () => alert('Price trends analysis would be shown here'),
      variant: 'secondary'
    }
  ];

  const tableColumns = [
    { key: 'item', label: 'Item', width: '20%' },
    { key: 'category', label: 'Category', width: '12%' },
    { key: 'supplier', label: 'Supplier/Seller', width: '15%' },
    { key: 'price', label: 'Price', width: '12%' },
    { key: 'quantity', label: 'Quantity', width: '10%' },
    { key: 'location', label: 'Location', width: '12%' },
    { key: 'availability', label: 'Availability', width: '12%' },
    { key: 'actions', label: 'Actions', width: '7%' }
  ];

  return (
    <AdminContentScaffold
      title="E-Marketplace Management"
      subtitle="Monitor agricultural inputs, produce, and livestock trading activities"
      
      // Summary cards
      summaryCards={summaryStats}
      
      // Quick action buttons
      quickActions={quickActions}
      
      // Main table section
      tableTitle="Marketplace Listings"
      tableColumns={tableColumns}
      tableData={listings}
      renderTableRow={(listing) => (
        <tr key={listing.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 text-sm text-gray-900">
            <div className="flex items-center">
              <span className="text-lg mr-2">{getCategoryIcon(listing.category)}</span>
              <div>
                <div className="font-medium">{listing.item}</div>
                <div className="text-gray-500 text-xs">{listing.subcategory}</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(listing.category)}`}>
              {listing.category}
            </span>
          </td>
          <td className="px-6 py-4 text-sm text-gray-900">
            <div>
              <div className="font-medium">{listing.supplier || listing.seller}</div>
              <div className="text-gray-500 text-xs">{listing.contact}</div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {formatCurrency(listing.price)}
            {listing.unit && <span className="text-gray-500 text-xs">/{listing.unit}</span>}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {listing.quantity ? `${listing.quantity} ${listing.unit || 'units'}` : 'N/A'}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {listing.district}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAvailabilityBadge(listing.availability)}`}>
              {listing.availability}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div className="flex space-x-2">
              <button
                onClick={() => alert(`Viewing details for ${listing.item}`)}
                className="text-blue-600 hover:text-blue-900"
              >
                View
              </button>
              <button
                onClick={() => alert(`Editing ${listing.item}`)}
                className="text-indigo-600 hover:text-indigo-900"
              >
                Edit
              </button>
            </div>
          </td>
        </tr>
      )}
      
      // Form section for creating/editing listings
      formTitle="Add New Listing"
      formFields={[
        {
          name: 'item',
          label: 'Item Name',
          type: 'text',
          required: true,
          placeholder: 'Enter item name'
        },
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'Select Category' },
            { value: 'inputs', label: 'Agricultural Inputs' },
            { value: 'produce', label: 'Farm Produce' },
            { value: 'livestock', label: 'Livestock' },
            { value: 'equipment', label: 'Equipment' }
          ]
        },
        {
          name: 'subcategory',
          label: 'Subcategory',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'Select Subcategory' },
            { value: 'seeds', label: 'Seeds' },
            { value: 'fertilizer', label: 'Fertilizer' },
            { value: 'grains', label: 'Grains' },
            { value: 'goats', label: 'Goats' },
            { value: 'cattle', label: 'Cattle' }
          ]
        },
        {
          name: 'supplier',
          label: 'Supplier/Seller Name',
          type: 'text',
          required: true,
          placeholder: 'Enter supplier name'
        },
        {
          name: 'contact',
          label: 'Contact Information',
          type: 'text',
          required: true,
          placeholder: 'Enter contact details'
        },
        {
          name: 'price',
          label: 'Price (UGX)',
          type: 'number',
          required: true,
          placeholder: 'Enter price'
        },
        {
          name: 'unit',
          label: 'Unit',
          type: 'text',
          placeholder: 'e.g., kg, bag, head'
        },
        {
          name: 'quantity',
          label: 'Available Quantity',
          type: 'number',
          placeholder: 'Enter quantity'
        },
        {
          name: 'district',
          label: 'Location (District)',
          type: 'select',
          required: true,
          options: [
            { value: '', label: 'Select District' },
            { value: 'Moroto', label: 'Moroto' },
            { value: 'Kotido', label: 'Kotido' },
            { value: 'Kaabong', label: 'Kaabong' },
            { value: 'Nakapiripirit', label: 'Nakapiripirit' }
          ]
        }
      ]}
      onSubmit={(formData) => {
        console.log('New listing data:', formData);
        alert('Listing created successfully!');
      }}
      submitButtonText="Create Listing"
      
      // Additional sections for market analytics
      additionalSections={[
        {
          title: "Market Analysis by Category",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {['inputs', 'produce', 'livestock', 'equipment'].map(category => {
                const categoryListings = listings.filter(l => l.category === category);
                const avgPrice = categoryListings.length > 0 
                  ? categoryListings.reduce((sum, l) => sum + l.price, 0) / categoryListings.length 
                  : 0;
                
                return (
                  <div key={category} className="bg-white p-4 rounded-lg shadow border">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-2">{getCategoryIcon(category)}</span>
                      <h4 className="font-semibold text-gray-900 capitalize">{category}</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Listings:</span>
                        <span className="font-medium">{categoryListings.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Price:</span>
                        <span className="font-medium text-green-600">{formatCurrency(avgPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Suppliers:</span>
                        <span className="font-medium">{new Set(categoryListings.map(l => l.supplier || l.seller)).size}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        },
        {
          title: "Search & Filter Options",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input
                  type="text"
                  placeholder="Search items or sellers..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
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
          )
        }
      ]}
    />
  );
}
