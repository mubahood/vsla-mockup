import React, { useState } from 'react';
import AdminContentScaffold from '../../components/AdminContentScaffold';

const EMarketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productUnit, setProductUnit] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerContact, setSellerContact] = useState('');
  const [sellerLocation, setSellerLocation] = useState('');

  // Mock data for marketplace listings
  const MOCK_PRODUCTS = [
    {
      id: 'PROD001',
      name: 'Maize (White)',
      category: 'Cereals',
      price: 2500,
      unit: 'kg',
      quantity: 500,
      available: 450,
      seller: 'Sarah Nakato',
      contact: '+256701234567',
      location: 'Kamuli District',
      district: 'Kamuli',
      quality: 'Grade A',
      harvestDate: '2025-08-15',
      status: 'Available',
      description: 'High quality white maize, well dried and stored'
    },
    {
      id: 'PROD002',
      name: 'Coffee Beans (Arabica)',
      category: 'Cash Crops',
      price: 8500,
      unit: 'kg',
      quantity: 200,
      available: 180,
      seller: 'John Mukasa',
      contact: '+256702345678',
      location: 'Pallisa District',
      district: 'Pallisa',
      quality: 'Premium',
      harvestDate: '2025-07-20',
      status: 'Available',
      description: 'Premium arabica coffee beans, sun-dried, ready for export'
    },
    {
      id: 'PROD003',
      name: 'Sweet Potatoes (Orange)',
      category: 'Roots & Tubers',
      price: 1800,
      unit: 'kg',
      quantity: 1000,
      available: 800,
      seller: 'Mary Achieng',
      contact: '+256703456789',
      location: 'Soroti District',
      district: 'Soroti',
      quality: 'Grade A',
      harvestDate: '2025-09-01',
      status: 'Available',
      description: 'Fresh orange sweet potatoes, rich in Vitamin A'
    },
    {
      id: 'PROD004',
      name: 'Beans (Red)',
      category: 'Legumes',
      price: 4200,
      unit: 'kg',
      quantity: 300,
      available: 120,
      seller: 'Peter Opolot',
      contact: '+256704567890',
      location: 'Kumi District',
      district: 'Kumi',
      quality: 'Grade B',
      harvestDate: '2025-08-30',
      status: 'Low Stock',
      description: 'Red kidney beans, well sorted and clean'
    },
    {
      id: 'PROD005',
      name: 'Sesame Seeds',
      category: 'Cash Crops',
      price: 12000,
      unit: 'kg',
      quantity: 150,
      available: 0,
      seller: 'Grace Akello',
      contact: '+256705678901',
      location: 'Serere District',
      district: 'Serere',
      quality: 'Premium',
      harvestDate: '2025-07-10',
      status: 'Sold Out',
      description: 'High quality sesame seeds for export market'
    }
  ];

  const BUYERS = [
    {
      id: 'BUY001',
      name: 'Tilda Uganda Ltd',
      type: 'Processor',
      products: ['Maize', 'Rice', 'Beans'],
      contact: '+256777123456',
      location: 'Kampala',
      demand: 'High Volume',
      paymentTerms: 'Cash on Delivery'
    },
    {
      id: 'BUY002',
      name: 'Good African Coffee',
      type: 'Exporter',
      products: ['Coffee Beans', 'Sesame'],
      contact: '+256777234567',
      location: 'Kampala',
      demand: 'Premium Quality',
      paymentTerms: '30 Days Credit'
    },
    {
      id: 'BUY003',
      name: 'Local Market - Kamuli',
      type: 'Retail Market',
      products: ['Vegetables', 'Fruits', 'Tubers'],
      contact: '+256701987654',
      location: 'Kamuli Town',
      demand: 'Daily Fresh',
      paymentTerms: 'Immediate Cash'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Sold Out': return 'bg-red-100 text-red-800';
      case 'Reserved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'Premium': return 'text-purple-600';
      case 'Grade A': return 'text-green-600';
      case 'Grade B': return 'text-yellow-600';
      case 'Grade C': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  // Table columns configuration
  const productColumns = [
    { key: 'id', label: 'Product ID', width: '10%' },
    { key: 'product', label: 'Product Details', width: '25%' },
    { key: 'pricing', label: 'Price & Quantity', width: '18%' },
    { key: 'seller', label: 'Seller Information', width: '20%' },
    { key: 'quality', label: 'Quality & Status', width: '15%' },
    { key: 'actions', label: 'Actions', width: '12%' }
  ];

  const buyerColumns = [
    { key: 'id', label: 'Buyer ID', width: '12%' },
    { key: 'name', label: 'Buyer Name', width: '20%' },
    { key: 'type', label: 'Type', width: '15%' },
    { key: 'products', label: 'Products Needed', width: '25%' },
    { key: 'contact', label: 'Contact & Location', width: '20%' },
    { key: 'terms', label: 'Terms', width: '8%' }
  ];

  // Table data rendering
  const renderProductRow = (product) => (
    <tr key={product.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {product.id}
      </td>
      <td className="px-6 py-4 text-sm">
        <div>
          <div className="font-medium text-gray-900">{product.name}</div>
          <div className="text-gray-500 text-xs">{product.category}</div>
          <div className="text-gray-400 text-xs mt-1">{product.description}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div>
          <div className="text-gray-900 font-medium">
            UGX {product.price.toLocaleString()}/{product.unit}
          </div>
          <div className="text-gray-500 text-xs">
            Available: {product.available}/{product.quantity} {product.unit}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm">
        <div>
          <div className="text-gray-900 font-medium">{product.seller}</div>
          <div className="text-gray-500 text-xs">{product.contact}</div>
          <div className="text-gray-500 text-xs">{product.location}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div>
          <div className={`font-medium ${getQualityColor(product.quality)}`}>
            {product.quality}
          </div>
          <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}>
            {product.status}
          </span>
          <div className="text-gray-400 text-xs mt-1">
            Harvest: {new Date(product.harvestDate).toLocaleDateString()}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <button className="text-blue-600 hover:text-blue-800 text-xs bg-blue-50 px-2 py-1 rounded mr-1">
          Contact
        </button>
        <button className="text-green-600 hover:text-green-800 text-xs bg-green-50 px-2 py-1 rounded">
          Order
        </button>
      </td>
    </tr>
  );

  const renderBuyerRow = (buyer) => (
    <tr key={buyer.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {buyer.id}
      </td>
      <td className="px-6 py-4 text-sm">
        <div className="font-medium text-gray-900">{buyer.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {buyer.type}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {buyer.products.join(', ')}
      </td>
      <td className="px-6 py-4 text-sm">
        <div>
          <div className="text-gray-900">{buyer.contact}</div>
          <div className="text-gray-500 text-xs">{buyer.location}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <button className="text-blue-600 hover:text-blue-800 text-xs bg-blue-50 px-2 py-1 rounded">
          Connect
        </button>
      </td>
    </tr>
  );

  // Form fields for product listing
  const productFormFields = [
    {
      name: 'productName',
      label: 'Product Name',
      type: 'text',
      value: productName,
      onChange: (e) => setProductName(e.target.value),
      required: true,
      placeholder: 'e.g., White Maize, Coffee Beans'
    },
    {
      name: 'productCategory',
      label: 'Category',
      type: 'select',
      value: productCategory,
      onChange: (e) => setProductCategory(e.target.value),
      options: [
        { value: '', label: 'Select Category' },
        { value: 'Cereals', label: 'Cereals' },
        { value: 'Legumes', label: 'Legumes' },
        { value: 'Cash Crops', label: 'Cash Crops' },
        { value: 'Roots & Tubers', label: 'Roots & Tubers' },
        { value: 'Vegetables', label: 'Vegetables' },
        { value: 'Fruits', label: 'Fruits' }
      ],
      required: true
    },
    {
      name: 'productPrice',
      label: 'Price per Unit (UGX)',
      type: 'number',
      value: productPrice,
      onChange: (e) => setProductPrice(e.target.value),
      required: true,
      placeholder: 'Enter price'
    },
    {
      name: 'productQuantity',
      label: 'Quantity Available',
      type: 'number',
      value: productQuantity,
      onChange: (e) => setProductQuantity(e.target.value),
      required: true,
      placeholder: 'Enter quantity'
    },
    {
      name: 'productUnit',
      label: 'Unit of Measurement',
      type: 'select',
      value: productUnit,
      onChange: (e) => setProductUnit(e.target.value),
      options: [
        { value: '', label: 'Select Unit' },
        { value: 'kg', label: 'Kilograms (kg)' },
        { value: 'bags', label: 'Bags' },
        { value: 'pieces', label: 'Pieces' },
        { value: 'litres', label: 'Litres' },
        { value: 'bunches', label: 'Bunches' }
      ],
      required: true
    },
    {
      name: 'productDescription',
      label: 'Product Description',
      type: 'textarea',
      value: productDescription,
      onChange: (e) => setProductDescription(e.target.value),
      required: true,
      placeholder: 'Describe quality, storage conditions, etc.'
    },
    {
      name: 'sellerName',
      label: 'Seller Name',
      type: 'text',
      value: sellerName,
      onChange: (e) => setSellerName(e.target.value),
      required: true,
      placeholder: 'Your full name'
    },
    {
      name: 'sellerContact',
      label: 'Contact Number',
      type: 'tel',
      value: sellerContact,
      onChange: (e) => setSellerContact(e.target.value),
      required: true,
      placeholder: '+256XXXXXXXXX'
    },
    {
      name: 'sellerLocation',
      label: 'Location/District',
      type: 'select',
      value: sellerLocation,
      onChange: (e) => setSellerLocation(e.target.value),
      options: [
        { value: '', label: 'Select District' },
        { value: 'Kamuli', label: 'Kamuli' },
        { value: 'Pallisa', label: 'Pallisa' },
        { value: 'Soroti', label: 'Soroti' },
        { value: 'Kumi', label: 'Kumi' },
        { value: 'Serere', label: 'Serere' },
        { value: 'Butaleja', label: 'Butaleja' }
      ],
      required: true
    }
  ];

  // Filter form fields
  const filterFields = [
    {
      name: 'selectedCategory',
      label: 'Filter by Category',
      type: 'select',
      value: selectedCategory,
      onChange: (e) => setSelectedCategory(e.target.value),
      options: [
        { value: '', label: 'All Categories' },
        { value: 'Cereals', label: 'Cereals' },
        { value: 'Legumes', label: 'Legumes' },
        { value: 'Cash Crops', label: 'Cash Crops' },
        { value: 'Roots & Tubers', label: 'Roots & Tubers' },
        { value: 'Vegetables', label: 'Vegetables' },
        { value: 'Fruits', label: 'Fruits' }
      ],
      required: false
    },
    {
      name: 'selectedDistrict',
      label: 'Filter by District',
      type: 'select',
      value: selectedDistrict,
      onChange: (e) => setSelectedDistrict(e.target.value),
      options: [
        { value: '', label: 'All Districts' },
        { value: 'Kamuli', label: 'Kamuli' },
        { value: 'Pallisa', label: 'Pallisa' },
        { value: 'Soroti', label: 'Soroti' },
        { value: 'Kumi', label: 'Kumi' },
        { value: 'Serere', label: 'Serere' }
      ],
      required: false
    },
    {
      name: 'priceRange',
      label: 'Price Range',
      type: 'select',
      value: priceRange,
      onChange: (e) => setPriceRange(e.target.value),
      options: [
        { value: '', label: 'All Prices' },
        { value: '0-2000', label: 'Below UGX 2,000' },
        { value: '2000-5000', label: 'UGX 2,000 - 5,000' },
        { value: '5000-10000', label: 'UGX 5,000 - 10,000' },
        { value: '10000+', label: 'Above UGX 10,000' }
      ],
      required: false
    }
  ];

  // Filter data based on selections
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const categoryMatch = !selectedCategory || product.category === selectedCategory;
    const districtMatch = !selectedDistrict || product.district === selectedDistrict;
    
    let priceMatch = true;
    if (priceRange) {
      if (priceRange === '0-2000') priceMatch = product.price < 2000;
      else if (priceRange === '2000-5000') priceMatch = product.price >= 2000 && product.price <= 5000;
      else if (priceRange === '5000-10000') priceMatch = product.price >= 5000 && product.price <= 10000;
      else if (priceRange === '10000+') priceMatch = product.price > 10000;
    }
    
    return categoryMatch && districtMatch && priceMatch;
  });

  // Summary statistics
  const summaryStats = [
    {
      title: 'Active Listings',
      value: filteredProducts.filter(p => p.status === 'Available').length,
      subtitle: 'Products available',
      color: 'green'
    },
    {
      title: 'Total Value',
      value: `UGX ${(filteredProducts.reduce((sum, p) => sum + (p.price * p.available), 0)).toLocaleString()}`,
      subtitle: 'Market value',
      color: 'blue'
    },
    {
      title: 'Active Sellers',
      value: new Set(filteredProducts.map(p => p.seller)).size,
      subtitle: 'Farmers selling',
      color: 'purple'
    },
    {
      title: 'Buyers Connected',
      value: BUYERS.length,
      subtitle: 'Looking to buy',
      color: 'orange'
    }
  ];

  const quickActions = [
    {
      label: 'List New Product',
      onClick: () => alert('Product listing form would be shown here'),
      variant: 'primary'
    },
    {
      label: 'Price Alerts',
      onClick: () => alert('Price alert system would be implemented here'),
      variant: 'secondary'
    },
    {
      label: 'Market Reports',
      onClick: () => alert('Market analysis reports would be generated here'),
      variant: 'secondary'
    }
  ];

  return (
    <AdminContentScaffold
      title="E-Marketplace"
      subtitle="Connect farmers to buyers and input suppliers"
      
      // Summary cards
      summaryCards={summaryStats}
      
      // Quick action buttons
      quickActions={quickActions}
      
      // Main table section - Product Listings
      tableTitle="Product Listings"
      tableColumns={productColumns}
      tableData={filteredProducts}
      renderTableRow={renderProductRow}
      
      // Form section for new product listing
      formTitle="List New Product"
      formFields={productFormFields}
      onSubmit={(formData) => {
        console.log('New product listing:', formData);
        alert('Product listing submitted successfully!');
        // Reset form
        setProductName('');
        setProductCategory('');
        setProductPrice('');
        setProductQuantity('');
        setProductUnit('');
        setProductDescription('');
        setSellerName('');
        setSellerContact('');
        setSellerLocation('');
      }}
      submitButtonText="List Product"
      
      // Additional sections
      additionalSections={[
        {
          title: "Search & Filter Products",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {filterFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <select
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )
        },
        {
          title: "Active Buyers",
          content: (
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {buyerColumns.map((column) => (
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
                  {BUYERS.map(renderBuyerRow)}
                </tbody>
              </table>
            </div>
          )
        },
        {
          title: "Market Intelligence",
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-green-800 mb-2">Price Trends</h4>
                <p className="text-green-600">
                  Maize prices stable at UGX 2,500/kg. Coffee showing upward trend with premium beans reaching UGX 8,500/kg.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Demand Insights</h4>
                <p className="text-blue-600">
                  High demand for export quality crops. Processors seeking consistent supply of grade A cereals and legumes.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-purple-800 mb-2">Quality Standards</h4>
                <p className="text-purple-600">
                  Buyers increasingly requiring quality certifications. Premium prices for properly processed and stored products.
                </p>
              </div>
            </div>
          )
        }
      ]}
    />
  );
};

export default EMarketplace;
