import React, { useState, useEffect } from 'react';
import AdminContentScaffold from '../../../components/AdminContentScaffold/AdminContentScaffold';

const DoctorsList = () => {
  const [activeSection, setActiveSection] = useState('table');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 10,
  });

  // Mock data for doctors
  const mockDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@hospital.com',
      phone: '+1234567892',
      specialization: 'Cardiology',
      department: 'Cardiology',
      license: 'MD123456',
      experience: 15,
      status: 'Active',
      schedule: 'Mon-Fri 8:00-17:00',
      qualifications: 'MD, FACC, Board Certified Cardiologist',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      email: 'michael.chen@hospital.com',
      phone: '+1234567893',
      specialization: 'Neurology',
      department: 'Neurology',
      license: 'MD123457',
      experience: 12,
      status: 'Active',
      schedule: 'Mon-Thu 9:00-18:00',
      qualifications: 'MD, PhD, Board Certified Neurologist',
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@hospital.com',
      phone: '+1234567894',
      specialization: 'Pediatrics',
      department: 'Pediatrics',
      license: 'MD123458',
      experience: 8,
      status: 'On Leave',
      schedule: 'Tue-Sat 8:00-16:00',
      qualifications: 'MD, Board Certified Pediatrician',
    },
  ];

  // Load data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const filteredData = mockDoctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchValue.toLowerCase()) ||
        doctor.department.toLowerCase().includes(searchValue.toLowerCase())
      );
      setDoctors(filteredData);
      setPagination(prev => ({ ...prev, total: filteredData.length }));
      setLoading(false);
    }, 300);
  }, [searchValue]);

  // Table configuration
  const columns = [
    {
      key: 'name',
      label: 'Doctor Name',
      render: (value, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>{value}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>{record.specialization}</div>
        </div>
      ),
    },
    {
      key: 'department',
      label: 'Department',
    },
    {
      key: 'license',
      label: 'License',
      render: (value) => (
        <span style={{ 
          fontFamily: 'monospace',
          fontSize: '12px',
          padding: '2px 6px',
          background: '#f8fafc',
          border: '1px solid #e2e8f0'
        }}>
          {value}
        </span>
      ),
    },
    {
      key: 'experience',
      label: 'Experience',
      render: (value) => `${value} years`,
    },
    {
      key: 'schedule',
      label: 'Schedule',
      render: (value) => (
        <span style={{ fontSize: '12px', color: '#475569' }}>{value}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span style={{ 
          padding: '2px 8px', 
          background: value === 'Active' ? '#dcfce7' : value === 'On Leave' ? '#fef3c7' : '#fef2f2',
          color: value === 'Active' ? '#166534' : value === 'On Leave' ? '#92400e' : '#dc2626',
          border: `1px solid ${value === 'Active' ? '#bbf7d0' : value === 'On Leave' ? '#fde68a' : '#fecaca'}`,
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
      label: 'Doctor Name',
      type: 'text',
      required: true,
      placeholder: 'Enter doctor name (e.g., Dr. John Smith)',
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
      key: 'specialization',
      label: 'Specialization',
      type: 'select',
      required: true,
      options: [
        { value: 'Cardiology', label: 'Cardiology' },
        { value: 'Neurology', label: 'Neurology' },
        { value: 'Pediatrics', label: 'Pediatrics' },
        { value: 'Orthopedics', label: 'Orthopedics' },
        { value: 'Dermatology', label: 'Dermatology' },
        { value: 'Psychiatry', label: 'Psychiatry' },
        { value: 'Radiology', label: 'Radiology' },
        { value: 'Emergency Medicine', label: 'Emergency Medicine' },
        { value: 'Internal Medicine', label: 'Internal Medicine' },
        { value: 'Surgery', label: 'Surgery' },
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
        { value: 'Orthopedics', label: 'Orthopedics' },
        { value: 'Dermatology', label: 'Dermatology' },
        { value: 'Psychiatry', label: 'Psychiatry' },
        { value: 'Radiology', label: 'Radiology' },
        { value: 'Emergency', label: 'Emergency' },
        { value: 'Internal Medicine', label: 'Internal Medicine' },
        { value: 'Surgery', label: 'Surgery' },
      ],
    },
    {
      key: 'license',
      label: 'Medical License',
      type: 'text',
      required: true,
      placeholder: 'Enter medical license number',
    },
    {
      key: 'experience',
      label: 'Years of Experience',
      type: 'number',
      required: true,
      placeholder: 'Enter years of experience',
    },
    {
      key: 'schedule',
      label: 'Work Schedule',
      type: 'text',
      placeholder: 'e.g., Mon-Fri 8:00-17:00',
    },
    {
      key: 'qualifications',
      label: 'Qualifications',
      type: 'textarea',
      placeholder: 'Enter qualifications and certifications',
      rows: 3,
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'On Leave', label: 'On Leave' },
        { value: 'Inactive', label: 'Inactive' },
      ],
    },
  ];

  // Details fields configuration
  const detailsFields = [
    { key: 'name', label: 'Doctor Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'specialization', label: 'Specialization' },
    { key: 'department', label: 'Department' },
    { key: 'license', label: 'Medical License' },
    { key: 'experience', label: 'Experience', render: (value) => `${value} years` },
    { key: 'schedule', label: 'Work Schedule' },
    { key: 'qualifications', label: 'Qualifications' },
    { key: 'status', label: 'Status' },
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
          setDoctors(prev => prev.map(d => 
            d.id === selectedRecord.id ? { ...d, ...formData } : d
          ));
        } else {
          const newDoctor = {
            ...formData,
            id: Math.max(...doctors.map(d => d.id), 0) + 1,
          };
          setDoctors(prev => [...prev, newDoctor]);
        }
        setLoading(false);
        resolve();
      }, 1000);
    });
  };

  const handleDelete = async (record) => {
    if (window.confirm('Are you sure you want to remove this doctor?')) {
      setLoading(true);
      setTimeout(() => {
        setDoctors(prev => prev.filter(d => d.id !== record.id));
        setLoading(false);
      }, 500);
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Department', 'Specialization', 'License', 'Experience', 'Status'],
      ...doctors.map(d => [d.name, d.email, d.department, d.specialization, d.license, d.experience, d.status])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'doctors.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminContentScaffold
      title="Doctor"
      subtitle="Manage doctor profiles and schedules"
      breadcrumbs={[
        { label: 'Dashboard', onClick: () => console.log('Navigate to dashboard') },
      ]}
      
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
      selectedRecord={selectedRecord}
      
      tableProps={{
        data: doctors,
        columns,
        pagination: {
          ...pagination,
          onChange: (page) => setPagination(prev => ({ ...prev, current: page })),
        },
        emptyMessage: "No doctors found. Add your first doctor to get started.",
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

export default DoctorsList;
