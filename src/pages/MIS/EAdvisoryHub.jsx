import React, { useState } from 'react';
import AdminContentScaffold from '../../components/AdminContentScaffold';

const EAdvisoryHub = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedExpert, setSelectedExpert] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionCategory, setQuestionCategory] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [farmerContact, setFarmerContact] = useState('');
  const [farmerLocation, setFarmerLocation] = useState('');

  // Mock data for advisory content
  const MOCK_QUESTIONS = [
    {
      id: 'Q001',
      title: 'Maize leaf yellowing and stunted growth',
      category: 'Crop Health',
      description: 'My maize plants are showing yellow leaves and stunted growth after recent rains. What could be the cause and how can I treat it?',
      farmer: 'Sarah Nakato',
      contact: '+256701234567',
      location: 'Kamuli District',
      dateSubmitted: '2025-09-12',
      status: 'Answered',
      expert: 'Dr. Joseph Mukasa',
      expertise: 'Plant Pathology',
      answer: 'The symptoms you describe suggest nitrogen deficiency combined with possible waterlogging. Apply urea fertilizer (50kg/acre) and improve drainage around your plants.',
      dateAnswered: '2025-09-13',
      priority: 'Medium'
    },
    {
      id: 'Q002',
      title: 'Best practices for coffee post-harvest handling',
      category: 'Post-Harvest',
      description: 'I need guidance on proper coffee bean processing and storage to get better prices from buyers.',
      farmer: 'John Mukasa',
      contact: '+256702345678',
      location: 'Pallisa District',
      dateSubmitted: '2025-09-14',
      status: 'Pending',
      expert: '',
      expertise: '',
      answer: '',
      dateAnswered: '',
      priority: 'High'
    },
    {
      id: 'Q003',
      title: 'Pest control for sweet potato weevils',
      category: 'Pest Management',
      description: 'Sweet potato weevils are damaging my crop. What are the organic methods to control them?',
      farmer: 'Mary Achieng',
      contact: '+256703456789',
      location: 'Soroti District',
      dateSubmitted: '2025-09-10',
      status: 'Under Review',
      expert: 'Dr. Grace Akello',
      expertise: 'Entomology',
      answer: '',
      dateAnswered: '',
      priority: 'High'
    },
    {
      id: 'Q004',
      title: 'Soil testing and fertilizer recommendations',
      category: 'Soil Management',
      description: 'How can I test my soil and know which fertilizers to use for beans cultivation?',
      farmer: 'Peter Opolot',
      contact: '+256704567890',
      location: 'Kumi District',
      dateSubmitted: '2025-09-08',
      status: 'Answered',
      expert: 'Dr. Agnes Nabuuma',
      expertise: 'Soil Science',
      answer: 'Contact your local agricultural office for soil testing services. For beans, typically use DAP (50kg/acre) at planting and top-dress with urea after 3 weeks.',
      dateAnswered: '2025-09-09',
      priority: 'Medium'
    }
  ];

  const EXPERTS = [
    {
      id: 'EXP001',
      name: 'Dr. Joseph Mukasa',
      expertise: 'Plant Pathology',
      specialization: 'Crop diseases, pest management',
      experience: '15 years',
      institution: 'Makerere University',
      contact: 'j.mukasa@mak.ac.ug',
      languages: ['English', 'Luganda', 'Lusoga'],
      availability: 'Available',
      rating: 4.8,
      questionsAnswered: 156
    },
    {
      id: 'EXP002',
      name: 'Dr. Grace Akello',
      expertise: 'Entomology',
      specialization: 'Insect pest management, IPM',
      experience: '12 years',
      institution: 'NARO - Serere',
      contact: 'g.akello@naro.go.ug',
      languages: ['English', 'Ateso', 'Luganda'],
      availability: 'Busy',
      rating: 4.9,
      questionsAnswered: 203
    },
    {
      id: 'EXP003',
      name: 'Dr. Agnes Nabuuma',
      expertise: 'Soil Science',
      specialization: 'Soil fertility, nutrition management',
      experience: '10 years',
      institution: 'Kawanda Research Institute',
      contact: 'a.nabuuma@naro.go.ug',
      languages: ['English', 'Luganda'],
      availability: 'Available',
      rating: 4.7,
      questionsAnswered: 134
    }
  ];

  const RESOURCES = [
    {
      id: 'RES001',
      title: 'Integrated Pest Management Guide for Coffee',
      category: 'Pest Management',
      type: 'PDF Guide',
      description: 'Comprehensive guide on managing coffee pests using IPM approaches',
      author: 'UCDA & NARO',
      datePublished: '2025-07-15',
      downloads: 1250,
      language: 'English'
    },
    {
      id: 'RES002',
      title: 'Maize Production Calendar for Eastern Uganda',
      category: 'Crop Production',
      type: 'Calendar',
      description: 'Seasonal calendar showing optimal planting and harvesting times',
      author: 'MAAIF Extension Services',
      datePublished: '2025-08-01',
      downloads: 890,
      language: 'English'
    },
    {
      id: 'RES003',
      title: 'Post-Harvest Handling Best Practices',
      category: 'Post-Harvest',
      type: 'Video Tutorial',
      description: 'Step-by-step video guide for proper crop storage and processing',
      author: 'FAO Uganda',
      datePublished: '2025-06-20',
      downloads: 2340,
      language: 'Local Languages'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Answered': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Busy': return 'bg-yellow-100 text-yellow-800';
      case 'Offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Table columns configuration
  const questionColumns = [
    { key: 'id', label: 'Question ID', width: '10%' },
    { key: 'question', label: 'Question Details', width: '30%' },
    { key: 'farmer', label: 'Farmer Info', width: '18%' },
    { key: 'category', label: 'Category', width: '12%' },
    { key: 'status', label: 'Status & Priority', width: '15%' },
    { key: 'expert', label: 'Expert Assigned', width: '15%' }
  ];

  const expertColumns = [
    { key: 'name', label: 'Expert Name', width: '20%' },
    { key: 'expertise', label: 'Expertise', width: '15%' },
    { key: 'specialization', label: 'Specialization', width: '25%' },
    { key: 'institution', label: 'Institution', width: '20%' },
    { key: 'performance', label: 'Performance', width: '15%' },
    { key: 'availability', label: 'Status', width: '5%' }
  ];

  const resourceColumns = [
    { key: 'title', label: 'Resource Title', width: '30%' },
    { key: 'category', label: 'Category', width: '15%' },
    { key: 'type', label: 'Type', width: '12%' },
    { key: 'author', label: 'Author/Source', width: '18%' },
    { key: 'date', label: 'Published', width: '12%' },
    { key: 'downloads', label: 'Downloads', width: '8%' },
    { key: 'actions', label: 'Actions', width: '5%' }
  ];

  // Table data rendering
  const renderQuestionRow = (question) => (
    <tr key={question.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {question.id}
      </td>
      <td className="px-6 py-4 text-sm">
        <div>
          <div className="font-medium text-gray-900">{question.title}</div>
          <div className="text-gray-500 text-xs mt-1 line-clamp-2">{question.description}</div>
          <div className="text-gray-400 text-xs mt-1">
            Submitted: {new Date(question.dateSubmitted).toLocaleDateString()}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm">
        <div>
          <div className="text-gray-900 font-medium">{question.farmer}</div>
          <div className="text-gray-500 text-xs">{question.contact}</div>
          <div className="text-gray-500 text-xs">{question.location}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
          {question.category}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div>
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(question.status)}`}>
            {question.status}
          </span>
          <div className={`text-xs font-medium mt-1 ${getPriorityColor(question.priority)}`}>
            {question.priority} Priority
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm">
        {question.expert ? (
          <div>
            <div className="text-gray-900 font-medium">{question.expert}</div>
            <div className="text-gray-500 text-xs">{question.expertise}</div>
          </div>
        ) : (
          <span className="text-gray-400 text-xs">Not assigned</span>
        )}
      </td>
    </tr>
  );

  const renderExpertRow = (expert) => (
    <tr key={expert.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm">
        <div>
          <div className="font-medium text-gray-900">{expert.name}</div>
          <div className="text-gray-500 text-xs">{expert.experience} experience</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {expert.expertise}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {expert.specialization}
      </td>
      <td className="px-6 py-4 text-sm">
        <div>
          <div className="text-gray-900">{expert.institution}</div>
          <div className="text-gray-500 text-xs">{expert.contact}</div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm">
        <div>
          <div className="text-gray-900">Rating: {expert.rating}/5</div>
          <div className="text-gray-500 text-xs">{expert.questionsAnswered} questions answered</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(expert.availability)}`}>
          {expert.availability}
        </span>
      </td>
    </tr>
  );

  const renderResourceRow = (resource) => (
    <tr key={resource.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm">
        <div>
          <div className="font-medium text-gray-900">{resource.title}</div>
          <div className="text-gray-500 text-xs mt-1">{resource.description}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
          {resource.category}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {resource.type}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {resource.author}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(resource.datePublished).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {resource.downloads.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <button className="text-blue-600 hover:text-blue-800 text-xs bg-blue-50 px-2 py-1 rounded">
          Download
        </button>
      </td>
    </tr>
  );

  // Form fields for new question
  const questionFormFields = [
    {
      name: 'questionTitle',
      label: 'Question Title',
      type: 'text',
      value: questionTitle,
      onChange: (e) => setQuestionTitle(e.target.value),
      required: true,
      placeholder: 'Brief summary of your question'
    },
    {
      name: 'questionCategory',
      label: 'Category',
      type: 'select',
      value: questionCategory,
      onChange: (e) => setQuestionCategory(e.target.value),
      options: [
        { value: '', label: 'Select Category' },
        { value: 'Crop Production', label: 'Crop Production' },
        { value: 'Crop Health', label: 'Crop Health' },
        { value: 'Pest Management', label: 'Pest Management' },
        { value: 'Soil Management', label: 'Soil Management' },
        { value: 'Post-Harvest', label: 'Post-Harvest' },
        { value: 'Livestock', label: 'Livestock' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Financial Services', label: 'Financial Services' }
      ],
      required: true
    },
    {
      name: 'questionDescription',
      label: 'Detailed Question',
      type: 'textarea',
      value: questionDescription,
      onChange: (e) => setQuestionDescription(e.target.value),
      required: true,
      placeholder: 'Provide detailed description of your question, including current situation, symptoms observed, etc.'
    },
    {
      name: 'farmerName',
      label: 'Your Name',
      type: 'text',
      value: farmerName,
      onChange: (e) => setFarmerName(e.target.value),
      required: true,
      placeholder: 'Your full name'
    },
    {
      name: 'farmerContact',
      label: 'Contact Number',
      type: 'tel',
      value: farmerContact,
      onChange: (e) => setFarmerContact(e.target.value),
      required: true,
      placeholder: '+256XXXXXXXXX'
    },
    {
      name: 'farmerLocation',
      label: 'Location/District',
      type: 'select',
      value: farmerLocation,
      onChange: (e) => setFarmerLocation(e.target.value),
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
        { value: 'Crop Production', label: 'Crop Production' },
        { value: 'Crop Health', label: 'Crop Health' },
        { value: 'Pest Management', label: 'Pest Management' },
        { value: 'Soil Management', label: 'Soil Management' },
        { value: 'Post-Harvest', label: 'Post-Harvest' },
        { value: 'Livestock', label: 'Livestock' },
        { value: 'Marketing', label: 'Marketing' }
      ],
      required: false
    },
    {
      name: 'selectedStatus',
      label: 'Filter by Status',
      type: 'select',
      value: selectedStatus,
      onChange: (e) => setSelectedStatus(e.target.value),
      options: [
        { value: '', label: 'All Status' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Under Review', label: 'Under Review' },
        { value: 'Answered', label: 'Answered' },
        { value: 'Closed', label: 'Closed' }
      ],
      required: false
    },
    {
      name: 'selectedExpert',
      label: 'Filter by Expert',
      type: 'select',
      value: selectedExpert,
      onChange: (e) => setSelectedExpert(e.target.value),
      options: [
        { value: '', label: 'All Experts' },
        ...EXPERTS.map(expert => ({ value: expert.name, label: expert.name }))
      ],
      required: false
    }
  ];

  // Filter data based on selections
  const filteredQuestions = MOCK_QUESTIONS.filter(question => {
    const categoryMatch = !selectedCategory || question.category === selectedCategory;
    const statusMatch = !selectedStatus || question.status === selectedStatus;
    const expertMatch = !selectedExpert || question.expert === selectedExpert;
    
    return categoryMatch && statusMatch && expertMatch;
  });

  // Summary statistics
  const summaryStats = [
    {
      title: 'Total Questions',
      value: filteredQuestions.length,
      subtitle: 'Farmer inquiries',
      color: 'blue'
    },
    {
      title: 'Answered',
      value: filteredQuestions.filter(q => q.status === 'Answered').length,
      subtitle: 'Resolved inquiries',
      color: 'green'
    },
    {
      title: 'Pending',
      value: filteredQuestions.filter(q => q.status === 'Pending').length,
      subtitle: 'Awaiting response',
      color: 'yellow'
    },
    {
      title: 'Active Experts',
      value: EXPERTS.filter(e => e.availability === 'Available').length,
      subtitle: 'Ready to help',
      color: 'purple'
    }
  ];

  const quickActions = [
    {
      label: 'Ask Question',
      onClick: () => alert('Question submission form would be highlighted here'),
      variant: 'primary'
    },
    {
      label: 'Browse Resources',
      onClick: () => alert('Resource library would be opened here'),
      variant: 'secondary'
    },
    {
      label: 'Expert Directory',
      onClick: () => alert('Expert contact directory would be shown here'),
      variant: 'secondary'
    }
  ];

  return (
    <AdminContentScaffold
      title="E-Advisory Hub"
      subtitle="Agricultural information and advisory content for farmers"
      
      // Summary cards
      summaryCards={summaryStats}
      
      // Quick action buttons
      quickActions={quickActions}
      
      // Main table section - Questions & Answers
      tableTitle="Questions & Answers"
      tableColumns={questionColumns}
      tableData={filteredQuestions}
      renderTableRow={renderQuestionRow}
      
      // Form section for new question
      formTitle="Ask a Question"
      formFields={questionFormFields}
      onSubmit={(formData) => {
        console.log('New question submitted:', formData);
        alert('Question submitted successfully! An expert will respond soon.');
        // Reset form
        setQuestionTitle('');
        setQuestionCategory('');
        setQuestionDescription('');
        setFarmerName('');
        setFarmerContact('');
        setFarmerLocation('');
      }}
      submitButtonText="Submit Question"
      
      // Additional sections
      additionalSections={[
        {
          title: "Search & Filter Questions",
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
          title: "Agricultural Experts",
          content: (
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {expertColumns.map((column) => (
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
                  {EXPERTS.map(renderExpertRow)}
                </tbody>
              </table>
            </div>
          )
        },
        {
          title: "Knowledge Resources",
          content: (
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {resourceColumns.map((column) => (
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
                  {RESOURCES.map(renderResourceRow)}
                </tbody>
              </table>
            </div>
          )
        }
      ]}
    />
  );
};

export default EAdvisoryHub;
