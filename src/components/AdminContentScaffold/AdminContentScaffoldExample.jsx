import React, { useState, useEffect, useMemo } from 'react';
import AdminContentScaffold from './AdminContentScaffoldV2';

/**
 * Complete Patient Management Example using AdminContentScaffold V2
 * 
 * This example demonstrates:
 * - Three-section layout (Table/Form/Details)
 * - Advanced search and filtering
 * - CRUD operations with validation
 * - Export functionality
 * - Responsive design
 * - Professional admin panel patterns
 */
const PatientManagementExample = () => {
  // Core state management
  const [activeSection, setActiveSection] = useState('table');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Data state
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  
  // Filter state
  const [filters, setFilters] = useState({
    status: '',
    bloodType: '',
    gender: '',
    ageRange: '',
  });

  // Mock patient data with comprehensive fields
  const mockPatients = [
    {
      id: 1,
      patientId: 'P001',
      name: 'John Michael Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      age: 35,
      gender: 'Male',
      bloodType: 'O+',
      address: '123 Main Street, Apt 4B, New York, NY 10001',
      emergencyContact: 'Jane Doe - Wife (+1 555-987-6543)',
      insurance: 'Blue Cross Blue Shield',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-02-15',
      status: 'Active',
      medicalHistory: 'Hypertension, controlled with medication. No known allergies.',
      currentMedications: 'Lisinopril 10mg daily, Metformin 500mg twice daily',
      notes: 'Patient prefers morning appointments. Requires wheelchair access.',
      registrationDate: '2023-06-15',
      doctorAssigned: 'Dr. Sarah Johnson',
      department: 'Internal Medicine',
    },
    {
      id: 2,
      patientId: 'P002',
      name: 'Sarah Elizabeth Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 234-5678',
      age: 28,
      gender: 'Female',
      bloodType: 'A+',
      address: '456 Oak Avenue, Suite 12, Los Angeles, CA 90210',
      emergencyContact: 'Robert Johnson - Father (+1 555-876-5432)',
      insurance: 'Aetna Health',
      lastVisit: '2024-01-10',
      nextAppointment: '2024-02-20',
      status: 'Active',
      medicalHistory: 'Asthma, well controlled. Seasonal allergies to pollen.',
      currentMedications: 'Albuterol inhaler as needed, Claritin 10mg daily',
      notes: 'Prefers email communication. Vegetarian diet.',
      registrationDate: '2023-09-22',
      doctorAssigned: 'Dr. Michael Chen',
      department: 'Pulmonology',
    },
    {
      id: 3,
      patientId: 'P003',
      name: 'Robert David Wilson',
      email: 'robert.wilson@email.com',
      phone: '+1 (555) 345-6789',
      age: 67,
      gender: 'Male',
      bloodType: 'B-',
      address: '789 Pine Ridge Drive, Dallas, TX 75201',
      emergencyContact: 'Margaret Wilson - Wife (+1 555-765-4321)',
      insurance: 'Farmer Cooperative',
      lastVisit: '2024-01-08',
      nextAppointment: '2024-02-12',
      status: 'Active',
      medicalHistory: 'Type 2 Diabetes, Arthritis, Previous cardiac event (2019)',
      currentMedications: 'Insulin glargine, Metformin, Aspirin 81mg, Atorvastatin',
      notes: 'Requires diabetic meal planning. Regular cardiac monitoring.',
      registrationDate: '2023-03-10',
      doctorAssigned: 'Dr. Emily Rodriguez',
      department: 'Endocrinology',
    },
    {
      id: 4,
      patientId: 'P004',
      name: 'Maria Elena Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 456-7890',
      age: 42,
      gender: 'Female',
      bloodType: 'AB+',
      address: '321 Sunset Boulevard, Miami, FL 33101',
      emergencyContact: 'Carlos Garcia - Husband (+1 555-654-3210)',
      insurance: 'United Healthcare',
      lastVisit: '2024-01-20',
      nextAppointment: '2024-02-18',
      status: 'Inactive',
      medicalHistory: 'Migraines, Anxiety, Previous surgery (appendectomy 2020)',
      currentMedications: 'Sumatriptan as needed, Sertraline 50mg daily',
      notes: 'Sensitive to bright lights. Prefers Spanish-speaking staff.',
      registrationDate: '2023-11-05',
      doctorAssigned: 'Dr. James Martinez',
      department: 'Neurology',
    },
    {
      id: 5,
      patientId: 'P005',
      name: 'Michael James Brown',
      email: 'michael.brown@email.com',
      phone: '+1 (555) 567-8901',
      age: 51,
      gender: 'Male',
      bloodType: 'O-',
      address: '654 Maple Court, Chicago, IL 60601',
      emergencyContact: 'Lisa Brown - Sister (+1 555-543-2109)',
      insurance: 'Cigna',
      lastVisit: '2024-01-25',
      nextAppointment: '2024-02-25',
      status: 'Active',
      medicalHistory: 'High cholesterol, Sleep apnea, Previous back surgery',
      currentMedications: 'Lipitor 20mg daily, CPAP therapy',
      notes: 'Works night shifts. Prefers late afternoon appointments.',
      registrationDate: '2023-08-18',
      doctorAssigned: 'Dr. Lisa Park',
      department: 'Orthopedics',
    }
  ];

  // Initialize data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPatients(mockPatients);
      setLoading(false);
    }, 800);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...patients];

    // Apply search filter
    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter(patient =>
        patient.name.toLowerCase().includes(searchLower) ||
        patient.email.toLowerCase().includes(searchLower) ||
        patient.patientId.toLowerCase().includes(searchLower) ||
        patient.phone.includes(searchValue) ||
        patient.doctorAssigned.toLowerCase().includes(searchLower) ||
        patient.department.toLowerCase().includes(searchLower)
      );
    }

    // Apply additional filters
    if (filters.status) {
      filtered = filtered.filter(patient => patient.status === filters.status);
    }
    if (filters.bloodType) {
      filtered = filtered.filter(patient => patient.bloodType === filters.bloodType);
    }
    if (filters.gender) {
      filtered = filtered.filter(patient => patient.gender === filters.gender);
    }
    if (filters.ageRange) {
      const [min, max] = filters.ageRange.split('-').map(Number);
      filtered = filtered.filter(patient => patient.age >= min && patient.age <= max);
    }

    setFilteredPatients(filtered);
  }, [patients, searchValue, filters]);

  // Table configuration with enhanced columns
  const tableColumns = [
    {
      key: 'patientId',
      label: 'Patient ID',
      render: (value, record) => (
        <div>
          <div style={{ fontWeight: '600', color: '#0a1e34' }}>{value}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            Reg: {new Date(record.registrationDate).toLocaleDateString()}
          </div>
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Patient Name',
      render: (value, record) => (
        <div>
          <div style={{ fontWeight: '600', color: '#1e293b' }}>{value}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            {record.age} years • {record.gender}
          </div>
        </div>
      ),
    },
    {
      key: 'contact',
      label: 'Contact Information',
      render: (_, record) => (
        <div>
          <div style={{ fontSize: '14px' }}>{record.email}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>{record.phone}</div>
        </div>
      ),
    },
    {
      key: 'bloodType',
      label: 'Blood Type',
      render: (value) => (
        <span style={{
          padding: '2px 8px',
          backgroundColor: '#f1f5f9',
          border: '1px solid #e2e8f0',
          fontSize: '12px',
          fontWeight: '600',
          color: '#0a1e34',
        }}>
          {value}
        </span>
      ),
    },
    {
      key: 'doctorAssigned',
      label: 'Assigned Doctor',
      render: (value, record) => (
        <div>
          <div style={{ fontSize: '14px', fontWeight: '500' }}>{value}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>{record.department}</div>
        </div>
      ),
    },
    {
      key: 'lastVisit',
      label: 'Last Visit',
      render: (value, record) => (
        <div>
          <div style={{ fontSize: '14px' }}>{new Date(value).toLocaleDateString()}</div>
          {record.nextAppointment && (
            <div style={{ fontSize: '12px', color: '#10b981' }}>
              Next: {new Date(record.nextAppointment).toLocaleDateString()}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span style={{
          padding: '4px 8px',
          backgroundColor: value === 'Active' ? '#dcfce7' : '#fef2f2',
          color: value === 'Active' ? '#166534' : '#dc2626',
          border: `1px solid ${value === 'Active' ? '#bbf7d0' : '#fecaca'}`,
          fontSize: '12px',
          fontWeight: '500',
        }}>
          {value}
        </span>
      ),
    },
  ];

  // Enhanced form fields with comprehensive patient information
  const formFields = [
    // Basic Information Section
    {
      key: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter patient full name',
      validation: (value) => {
        if (value && value.length < 2) return 'Name must be at least 2 characters';
        return null;
      },
    },
    {
      key: 'patientId',
      label: 'Patient ID',
      type: 'text',
      required: true,
      placeholder: 'Auto-generated if left empty',
    },
    {
      key: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'patient@example.com',
    },
    {
      key: 'phone',
      label: 'Phone Number',
      type: 'tel',
      required: true,
      placeholder: '+1 (555) 123-4567',
    },
    
    // Personal Information
    {
      key: 'age',
      label: 'Age',
      type: 'number',
      required: true,
      placeholder: 'Enter age',
      validation: (value) => {
        const age = parseInt(value);
        if (age < 0 || age > 150) return 'Please enter a valid age';
        return null;
      },
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
        { value: 'Prefer not to say', label: 'Prefer not to say' },
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
    
    // Contact Information
    {
      key: 'address',
      label: 'Address',
      type: 'textarea',
      placeholder: 'Enter complete address',
      rows: 2,
    },
    {
      key: 'emergencyContact',
      label: 'Emergency Contact',
      type: 'text',
      required: true,
      placeholder: 'Name - Relationship (Phone)',
    },
    
    // Medical Information
    {
      key: 'insurance',
      label: 'Insurance Provider',
      type: 'text',
      placeholder: 'Insurance company name',
    },
    {
      key: 'doctorAssigned',
      label: 'Assigned Doctor',
      type: 'select',
      required: true,
      options: [
        { value: 'Dr. Sarah Johnson', label: 'Dr. Sarah Johnson - Cardiology' },
        { value: 'Dr. Michael Chen', label: 'Dr. Michael Chen - Neurology' },
        { value: 'Dr. Emily Rodriguez', label: 'Dr. Emily Rodriguez - Pediatrics' },
        { value: 'Dr. James Martinez', label: 'Dr. James Martinez - Internal Medicine' },
        { value: 'Dr. Lisa Park', label: 'Dr. Lisa Park - Orthopedics' },
      ],
    },
    {
      key: 'department',
      label: 'Department',
      type: 'select',
      required: true,
      options: [
        { value: 'Cardiology', label: 'Cardiology' },
        { value: 'Neurology', label: 'Neurology' },
        { value: 'Pediatrics', label: 'Pediatrics' },
        { value: 'Internal Medicine', label: 'Internal Medicine' },
        { value: 'Orthopedics', label: 'Orthopedics' },
        { value: 'Emergency', label: 'Emergency' },
        { value: 'Surgery', label: 'Surgery' },
      ],
    },
    
    // Medical History
    {
      key: 'medicalHistory',
      label: 'Medical History',
      type: 'textarea',
      placeholder: 'Enter medical history, conditions, allergies...',
      rows: 3,
    },
    {
      key: 'currentMedications',
      label: 'Current Medications',
      type: 'textarea',
      placeholder: 'List current medications and dosages...',
      rows: 3,
    },
    {
      key: 'notes',
      label: 'Additional Notes',
      type: 'textarea',
      placeholder: 'Special instructions, preferences, etc.',
      rows: 2,
    },
    
    // Status
    {
      key: 'status',
      label: 'Patient Status',
      type: 'select',
      required: true,
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
        { value: 'Discharged', label: 'Discharged' },
        { value: 'Transferred', label: 'Transferred' },
      ],
    },
  ];

  // Enhanced details fields for comprehensive view
  const detailsFields = [
    // Patient Identification
    { key: 'patientId', label: 'Patient ID' },
    { key: 'name', label: 'Full Name' },
    { key: 'age', label: 'Age', render: (value) => `${value} years old` },
    { key: 'gender', label: 'Gender' },
    { key: 'bloodType', label: 'Blood Type' },
    
    // Contact Information
    { key: 'email', label: 'Email Address' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'address', label: 'Address' },
    { key: 'emergencyContact', label: 'Emergency Contact' },
    
    // Medical Team
    { key: 'doctorAssigned', label: 'Assigned Doctor' },
    { key: 'department', label: 'Department' },
    
    // Insurance & Dates
    { key: 'insurance', label: 'Insurance Provider' },
    { 
      key: 'registrationDate', 
      label: 'Registration Date',
      render: (value) => new Date(value).toLocaleDateString()
    },
    { 
      key: 'lastVisit', 
      label: 'Last Visit',
      render: (value) => new Date(value).toLocaleDateString()
    },
    { 
      key: 'nextAppointment', 
      label: 'Next Appointment',
      render: (value) => value ? new Date(value).toLocaleDateString() : 'Not scheduled'
    },
    
    // Medical Information
    { key: 'medicalHistory', label: 'Medical History' },
    { key: 'currentMedications', label: 'Current Medications' },
    { key: 'notes', label: 'Additional Notes' },
    { key: 'status', label: 'Status' },
  ];

  // Enhanced event handlers
  const handleSectionChange = (section, record = null) => {
    setActiveSection(section);
    setSelectedRecord(record);
    setError(null);
    
    // Auto-generate patient ID for new patients
    if (section === 'form' && !record) {
      const nextId = `P${String(patients.length + 1).padStart(3, '0')}`;
      // This would be handled by the form component
    }
  };

  const handleNewRecord = () => {
    setSelectedRecord(null);
    setError(null);
  };

  const handleSave = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (selectedRecord) {
        // Update existing patient
        setPatients(prev => prev.map(patient =>
          patient.id === selectedRecord.id 
            ? { ...patient, ...formData }
            : patient
        ));
      } else {
        // Create new patient
        const newPatient = {
          ...formData,
          id: Math.max(...patients.map(p => p.id), 0) + 1,
          patientId: formData.patientId || `P${String(patients.length + 1).padStart(3, '0')}`,
          registrationDate: new Date().toISOString().split('T')[0],
          lastVisit: new Date().toISOString().split('T')[0],
        };
        setPatients(prev => [...prev, newPatient]);
      }
    } catch (error) {
      setError('Failed to save patient information. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (record) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPatients(prev => prev.filter(patient => patient.id !== record.id));
    } catch (error) {
      setError('Failed to delete patient. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format) => {
    const data = filteredPatients;
    const timestamp = new Date().toISOString().split('T')[0];
    
    if (format === 'csv') {
      const headers = [
        'Patient ID', 'Name', 'Email', 'Phone', 'Age', 'Gender', 
        'Blood Type', 'Doctor', 'Department', 'Status', 'Last Visit'
      ];
      
      const csvContent = [
        headers.join(','),
        ...data.map(patient => [
          patient.patientId,
          `"${patient.name}"`,
          patient.email,
          patient.phone,
          patient.age,
          patient.gender,
          patient.bloodType,
          `"${patient.doctorAssigned}"`,
          patient.department,
          patient.status,
          patient.lastVisit
        ].join(','))
      ].join('\\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `patients-${timestamp}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
    
    // Additional format handlers for excel, pdf could go here
    console.log(`Exporting ${data.length} patients as ${format}`);
  };

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    
    // Simulate data refresh
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Breadcrumb configuration
  const breadcrumbs = [
    { label: 'Administration', onClick: () => console.log('Navigate to admin') },
    { label: 'Patient Management', onClick: () => console.log('Navigate to patients') },
  ];

  return (
    <AdminContentScaffold
      // Core Configuration
      title="Patient"
      subtitle="Comprehensive patient management system with medical records"
      breadcrumbs={breadcrumbs}
      
      // Section Management
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
      selectedRecord={selectedRecord}
      
      // Table Configuration
      tableProps={{
        data: filteredPatients,
        columns: tableColumns,
        pagination: {
          current: 1,
          total: filteredPatients.length,
          pageSize: 10,
        },
        emptyMessage: searchValue ? 
          "No patients found matching your search criteria." :
          "No patients registered yet. Add your first patient to get started.",
        selectable: true,
      }}
      onNewRecord={handleNewRecord}
      onExport={handleExport}
      
      // Form Configuration
      formProps={{
        fields: formFields,
      }}
      onSave={handleSave}
      onDelete={selectedRecord ? handleDelete : null}
      
      // Details Configuration
      detailsProps={{
        fields: detailsFields,
      }}
      
      // Search and Filtering
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      showFilters={showFilters}
      onToggleFilters={() => setShowFilters(!showFilters)}
      
      // State Management
      loading={loading}
      error={error}
      
      // Event Handlers
      onRefresh={handleRefresh}
      onSettings={() => console.log('Open settings')}
      onHelp={() => console.log('Open help')}
      
      // Advanced Features
      exportFormats={['csv', 'excel', 'pdf']}
      bulkActions={['delete', 'export', 'transfer']}
      
      // Accessibility
      aria-label="Patient management interface"
      data-testid="patient-management-scaffold"
      
      // Layout Customization
      headerHeight={64}
      controlsHeight={56}
      compactMode={false}
    />
  );
};

export default PatientManagementExample;
