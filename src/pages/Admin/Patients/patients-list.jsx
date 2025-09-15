import React, { useState, useEffect } from 'react';
import AdminContentScaffold from '../../../components/AdminContentScaffold/AdminContentScaffold';

const PatientsList = () => {
  // State management
  const [activeSection, setActiveSection] = useState('table');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 10,
  });

  // Mock data for demonstration
  const mockPatients = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      age: 35,
      gender: 'Male',
      bloodType: 'O+',
      lastVisit: '2024-01-15',
      status: 'Active',
      address: '123 Main St, City, State 12345',
      medicalHistory: 'No significant medical history',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1234567891',
      age: 28,
      gender: 'Female',
      bloodType: 'A+',
      lastVisit: '2024-01-10',
      status: 'Active',
      address: '456 Oak Ave, City, State 12345',
      medicalHistory: 'Hypertension, controlled with medication',
    },
  ];

  // Load data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const filteredData = mockPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchValue.toLowerCase())
      );
      setPatients(filteredData);
      setPagination(prev => ({ ...prev, total: filteredData.length }));
      setLoading(false);
    }, 500);
  }, [searchValue]);

  // Table configuration
  const columns = [
    {
      key: 'name',
      label: 'Patient Name',
      render: (value, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>{value}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>ID: {record.id}</div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'phone',
      label: 'Phone',
    },
    {
      key: 'age',
      label: 'Age',
      render: (value) => `${value} years`,
    },
    {
      key: 'bloodType',
      label: 'Blood Type',
      render: (value) => (
        <span style={{ 
          padding: '2px 8px', 
          background: '#f1f5f9', 
          border: '1px solid #e2e8f0',
          fontSize: '12px'
        }}>
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span style={{ 
          padding: '2px 8px', 
          background: value === 'Active' ? '#dcfce7' : '#fef2f2',
          color: value === 'Active' ? '#166534' : '#dc2626',
          border: `1px solid ${value === 'Active' ? '#bbf7d0' : '#fecaca'}`,
          fontSize: '12px'
        }}>
          {value}
        </span>
      ),
    },
  ];

  // Form fields configuration
  const formFields = [
    {
      key: 'name',
      label: 'Patient Name',
      type: 'text',
      required: true,
      placeholder: 'Enter patient name',
    },
    {
      key: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'Enter email address',
    },
    {
      key: 'phone',
      label: 'Phone Number',
      type: 'tel',
      required: true,
      placeholder: 'Enter phone number',
    },
    {
      key: 'age',
      label: 'Age',
      type: 'number',
      required: true,
      placeholder: 'Enter age',
    },
    {
      key: 'gender',
      label: 'Gender',
      type: 'select',
      required: true,
      options: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
      ],
    },
    {
      key: 'bloodType',
      label: 'Blood Type',
      type: 'select',
      required: true,
      options: [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' },
      ],
    },
    {
      key: 'address',
      label: 'Address',
      type: 'textarea',
      placeholder: 'Enter full address',
      rows: 3,
    },
    {
      key: 'medicalHistory',
      label: 'Medical History',
      type: 'textarea',
      placeholder: 'Enter medical history',
      rows: 4,
    },
  ];

  // Details fields configuration
  const detailsFields = [
    { key: 'name', label: 'Patient Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'age', label: 'Age', render: (value) => `${value} years` },
    { key: 'gender', label: 'Gender' },
    { key: 'bloodType', label: 'Blood Type' },
    { key: 'address', label: 'Address' },
    { key: 'lastVisit', label: 'Last Visit' },
    { key: 'status', label: 'Status' },
    { key: 'medicalHistory', label: 'Medical History' },
  ];

  // Event handlers
  const handleSectionChange = (section, record = null) => {
    setActiveSection(section);
    setSelectedRecord(record);
  };

  const handleNewRecord = () => {
    setSelectedRecord(null);
  };

  const handleSave = async (formData) => {
    setLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        if (selectedRecord) {
          setPatients(prev => prev.map(p => 
            p.id === selectedRecord.id ? { ...p, ...formData } : p
          ));
        } else {
          const newPatient = {
            ...formData,
            id: Math.max(...patients.map(p => p.id), 0) + 1,
            lastVisit: new Date().toISOString().split('T')[0],
            status: 'Active',
          };
          setPatients(prev => [...prev, newPatient]);
        }
        setLoading(false);
        resolve();
      }, 1000);
    });
  };

  const handleDelete = async (record) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setLoading(true);
      setTimeout(() => {
        setPatients(prev => prev.filter(p => p.id !== record.id));
        setLoading(false);
      }, 500);
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Age', 'Blood Type', 'Status'],
      ...patients.map(p => [p.name, p.email, p.phone, p.age, p.bloodType, p.status])
    ].map(row => row.join(',')).join('\\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patients.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminContentScaffold
      title="Patient"
      subtitle="Manage patient records and medical information"
      breadcrumbs={[
        { label: 'Dashboard', onClick: () => console.log('Navigate to dashboard') },
      ]}
      
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
      selectedRecord={selectedRecord}
      
      tableProps={{
        data: patients,
        columns,
        pagination: {
          ...pagination,
          onChange: (page) => setPagination(prev => ({ ...prev, current: page })),
        },
        emptyMessage: "No patients found. Add your first patient to get started.",
      }}
      onNewRecord={handleNewRecord}
      onExport={handleExport}
      
      formProps={{
        fields: formFields,
      }}
      onSave={handleSave}
      onDelete={selectedRecord ? handleDelete : null}
      
      detailsProps={{
        fields: detailsFields,
      }}
      
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      
      loading={loading}
    />
  );
};

export default PatientsList;
