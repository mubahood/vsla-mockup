import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AdminContentScaffold from '../../components/AdminContentScaffold/AdminContentScaffold';
import { getData, saveData } from '../../utils/storage';
import { TRAINING_SESSIONS } from '../../data/seedData';

/**
 * Training Management Component
 * Using AdminContentScaffold pattern following DigitalRegistry exemplar
 * With proper routing for create/edit/view training sessions
 */
const Training = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine section based on route
  const getCurrentSection = () => {
    if (location.pathname.includes('/create')) return 'form';
    if (location.pathname.includes('/edit/')) return 'form';
    if (location.pathname.includes('/view/')) return 'details';
    return 'table';
  };
  
  const [activeSection, setActiveSection] = useState(getCurrentSection());
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [trainingSessions, setTrainingSessions] = useState([]);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 20,
    from: 0,
    to: 0,
    lastPage: 1,
  });

  useEffect(() => {
    // Update active section when location changes
    const newSection = getCurrentSection();
    setActiveSection(newSection);
    
    loadTrainingSessions();
    
    // Load specific record for edit/view
    if (id && (location.pathname.includes('/edit/') || location.pathname.includes('/view/'))) {
      loadSelectedRecord(id);
    } else {
      // Clear selected record when not in edit/view mode
      setSelectedRecord(null);
    }
  }, [id, location.pathname]);

  useEffect(() => {
    loadTrainingSessions();
  }, [pagination.current, searchValue]);

  const loadSelectedRecord = (recordId) => {
    const allSessions = getData('trainingSessions') || TRAINING_SESSIONS;
    const record = allSessions.find(session => session.id === recordId);
    if (record) {
      setSelectedRecord(record);
    }
  };

  const loadTrainingSessions = () => {
    setLoading(true);
    setError(null);
    
    try {
      const savedSessions = getData('trainingSessions');
      const sessionsData = savedSessions && savedSessions.length > 0 ? savedSessions : TRAINING_SESSIONS;
      
      if (!savedSessions || savedSessions.length === 0) {
        saveData('trainingSessions', TRAINING_SESSIONS);
      }
      
      // Filter by search if provided
      const filteredSessions = searchValue 
        ? sessionsData.filter(session => 
            session.groupName.toLowerCase().includes(searchValue.toLowerCase()) ||
            session.topic.toLowerCase().includes(searchValue.toLowerCase()) ||
            session.facilitator.toLowerCase().includes(searchValue.toLowerCase()) ||
            session.sessionType.toLowerCase().includes(searchValue.toLowerCase())
          )
        : sessionsData;
      
      // Pagination
      const startIndex = (pagination.current - 1) * pagination.pageSize;
      const endIndex = startIndex + pagination.pageSize;
      const paginatedSessions = filteredSessions.slice(startIndex, endIndex);
      
      setTrainingSessions(paginatedSessions);
      setPagination(prev => ({
        ...prev,
        total: filteredSessions.length,
        from: startIndex + 1,
        to: Math.min(endIndex, filteredSessions.length),
        lastPage: Math.ceil(filteredSessions.length / prev.pageSize)
      }));
      
    } catch (error) {
      console.error('Error loading training sessions:', error);
      setError('Failed to load training sessions');
    } finally {
      setLoading(false);
    }
  };

  // Table column configuration
  const columns = [
    {
      key: 'date',
      label: 'Date',
      width: '120px',
      render: (session) => new Date(session.date).toLocaleDateString()
    },
    {
      key: 'groupName',
      label: 'Group',
      width: '200px',
      render: (session) => session.groupName
    },
    {
      key: 'sessionType',
      label: 'Type',
      width: '80px',
      render: (session) => (
        <span style={{
          backgroundColor: session.sessionType === 'AESA' ? '#e3f2fd' : '#f3e5f5',
          color: session.sessionType === 'AESA' ? '#1976d2' : '#7b1fa2',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          {session.sessionType}
        </span>
      )
    },
    {
      key: 'topic',
      label: 'Topic',
      width: '250px',
      render: (session) => session.topic
    },
    {
      key: 'facilitator',
      label: 'Facilitator',
      width: '150px',
      render: (session) => session.facilitator
    },
    {
      key: 'attendance',
      label: 'Attendance',
      width: '120px',
      render: (session) => `${session.attendees.total} (M:${session.attendees.male}, F:${session.attendees.female})`
    },
    {
      key: 'duration',
      label: 'Duration',
      width: '100px',
      render: (session) => `${session.startTime} - ${session.endTime}`
    }
  ];

  // Form field configuration
  const formFields = [
    {
      name: 'groupName',
      label: 'Group Name',
      type: 'select',
      required: true,
      options: [
        'Katakwi Sorghum Farmers School',
        'Rupa Livestock Business School',
        'Amudat Women Savings Group',
        'Nakapiripirit Millet Growers',
        'Kotido Pastoralist Association'
      ]
    },
    {
      name: 'sessionType',
      label: 'Session Type',
      type: 'select',
      required: true,
      options: [
        { value: 'AESA', label: 'AESA (Agro-Ecosystem Analysis)' },
        { value: 'GAP', label: 'GAP (Good Agricultural Practices)' }
      ]
    },
    {
      name: 'topic',
      label: 'Training Topic',
      type: 'text',
      required: true,
      placeholder: 'e.g., Sorghum Growth Stages and Pest Management'
    },
    {
      name: 'facilitator',
      label: 'Facilitator',
      type: 'text',
      required: true,
      placeholder: 'Facilitator name'
    },
    {
      name: 'date',
      label: 'Training Date',
      type: 'date',
      required: true
    },
    {
      name: 'startTime',
      label: 'Start Time',
      type: 'time',
      required: true
    },
    {
      name: 'endTime',
      label: 'End Time',
      type: 'time',
      required: true
    },
    {
      name: 'venue',
      label: 'Venue',
      type: 'text',
      required: true,
      placeholder: 'Training venue location'
    },
    {
      name: 'attendees.male',
      label: 'Male Attendees',
      type: 'number',
      min: 0
    },
    {
      name: 'attendees.female',
      label: 'Female Attendees',
      type: 'number',
      min: 0
    },
    {
      name: 'attendees.youth',
      label: 'Youth Attendees',
      type: 'number',
      min: 0
    },
    {
      name: 'attendees.pwd',
      label: 'PWD Attendees',
      type: 'number',
      min: 0
    },
    {
      name: 'keyLearningOutcomes',
      label: 'Key Learning Outcomes',
      type: 'textarea',
      placeholder: 'List the main learning outcomes (one per line)',
      rows: 4
    },
    {
      name: 'practicalActivities',
      label: 'Practical Activities',
      type: 'textarea',
      placeholder: 'List practical activities conducted (one per line)',
      rows: 3
    },
    {
      name: 'challenges',
      label: 'Challenges Faced',
      type: 'textarea',
      placeholder: 'Any challenges during the session (one per line)',
      rows: 2
    },
    {
      name: 'followUpActions',
      label: 'Follow-up Actions',
      type: 'textarea',
      placeholder: 'Actions to be taken after the session (one per line)',
      rows: 2
    },
    {
      name: 'weatherConditions',
      label: 'Weather Conditions',
      type: 'text',
      placeholder: 'Weather during the training session'
    },
    {
      name: 'facilitatorNotes',
      label: 'Facilitator Notes',
      type: 'textarea',
      placeholder: 'Additional notes and observations',
      rows: 3
    }
  ];

  // Details field configuration for view mode
  const detailsFields = [
    { label: 'Session ID', key: 'id' },
    { label: 'Group Name', key: 'groupName' },
    { label: 'Session Type', key: 'sessionType', 
      render: (value) => value === 'AESA' ? 'AESA (Agro-Ecosystem Analysis)' : 'GAP (Good Agricultural Practices)' 
    },
    { label: 'Topic', key: 'topic' },
    { label: 'Facilitator', key: 'facilitator' },
    { label: 'Date', key: 'date', render: (value) => new Date(value).toLocaleDateString() },
    { label: 'Time', key: 'duration', render: (_, session) => `${session.startTime} - ${session.endTime}` },
    { label: 'Venue', key: 'venue' },
    { label: 'Male Attendees', key: 'attendees.male' },
    { label: 'Female Attendees', key: 'attendees.female' },
    { label: 'Youth Attendees', key: 'attendees.youth' },
    { label: 'PWD Attendees', key: 'attendees.pwd' },
    { label: 'Total Attendees', key: 'attendees.total' },
    { label: 'Key Learning Outcomes', key: 'keyLearningOutcomes', 
      render: (value) => Array.isArray(value) ? value.join('\n• ') : value 
    },
    { label: 'Practical Activities', key: 'practicalActivities',
      render: (value) => Array.isArray(value) ? value.join('\n• ') : value 
    },
    { label: 'Challenges', key: 'challenges',
      render: (value) => Array.isArray(value) ? value.join('\n• ') : value 
    },
    { label: 'Follow-up Actions', key: 'followUpActions',
      render: (value) => Array.isArray(value) ? value.join('\n• ') : value 
    },
    { label: 'Weather Conditions', key: 'weatherConditions' },
    { label: 'Facilitator Notes', key: 'facilitatorNotes' }
  ];

  // Handle form submission
  const handleFormSubmit = (formData) => {
    try {
      const allSessions = getData('trainingSessions') || TRAINING_SESSIONS;
      
      // Calculate total attendees
      const totalAttendees = (parseInt(formData.attendees?.male || 0) || 0) + 
                            (parseInt(formData.attendees?.female || 0) || 0);
      
      // Process arrays from textarea inputs
      const processedData = {
        ...formData,
        attendees: {
          male: parseInt(formData.attendees?.male || 0) || 0,
          female: parseInt(formData.attendees?.female || 0) || 0,
          youth: parseInt(formData.attendees?.youth || 0) || 0,
          pwd: parseInt(formData.attendees?.pwd || 0) || 0,
          total: totalAttendees
        },
        keyLearningOutcomes: formData.keyLearningOutcomes ? 
          formData.keyLearningOutcomes.split('\n').filter(item => item.trim()) : [],
        practicalActivities: formData.practicalActivities ? 
          formData.practicalActivities.split('\n').filter(item => item.trim()) : [],
        challenges: formData.challenges ? 
          formData.challenges.split('\n').filter(item => item.trim()) : [],
        followUpActions: formData.followUpActions ? 
          formData.followUpActions.split('\n').filter(item => item.trim()) : []
      };
      
      if (selectedRecord) {
        // Update existing session
        const updatedSessions = allSessions.map(session => 
          session.id === selectedRecord.id ? { ...selectedRecord, ...processedData } : session
        );
        saveData('trainingSessions', updatedSessions);
      } else {
        // Create new session
        const newSession = {
          id: `TRN${String(allSessions.length + 1).padStart(3, '0')}`,
          groupId: `FFS${String(allSessions.length + 1).padStart(3, '0')}`,
          ...processedData
        };
        const updatedSessions = [...allSessions, newSession];
        saveData('trainingSessions', updatedSessions);
      }
      
      // Navigate back to table view
      navigate('/admin/training');
      loadTrainingSessions();
      
    } catch (error) {
      console.error('Error saving training session:', error);
      setError('Failed to save training session');
    }
  };

  // Handle record deletion
  const handleDelete = (sessionId) => {
    try {
      const allSessions = getData('trainingSessions') || TRAINING_SESSIONS;
      const updatedSessions = allSessions.filter(session => session.id !== sessionId);
      saveData('trainingSessions', updatedSessions);
      loadTrainingSessions();
    } catch (error) {
      console.error('Error deleting training session:', error);
      setError('Failed to delete training session');
    }
  };

  // Prepare form data for editing
  const getFormData = () => {
    if (!selectedRecord) return {};
    
    return {
      ...selectedRecord,
      keyLearningOutcomes: Array.isArray(selectedRecord.keyLearningOutcomes) ? 
        selectedRecord.keyLearningOutcomes.join('\n') : selectedRecord.keyLearningOutcomes,
      practicalActivities: Array.isArray(selectedRecord.practicalActivities) ? 
        selectedRecord.practicalActivities.join('\n') : selectedRecord.practicalActivities,
      challenges: Array.isArray(selectedRecord.challenges) ? 
        selectedRecord.challenges.join('\n') : selectedRecord.challenges,
      followUpActions: Array.isArray(selectedRecord.followUpActions) ? 
        selectedRecord.followUpActions.join('\n') : selectedRecord.followUpActions
    };
  };

  return (
    <AdminContentScaffold
      title="Training Management"
      subtitle="Manage AESA and GAP training sessions for FFS groups"
      
      // Table configuration
      data={trainingSessions}
      columns={columns}
      loading={loading}
      error={error}
      
      // Search and pagination
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      searchPlaceholder="Search by group, topic, facilitator..."
      pagination={pagination}
      onPageChange={(page) => setPagination(prev => ({ ...prev, current: page }))}
      
      // Actions
      primaryActions={[
        {
          label: 'Schedule Training',
          action: () => navigate('/admin/training/create'),
          variant: 'primary'
        }
      ]}
      
      rowActions={[
        {
          label: 'View',
          action: (session) => navigate(`/admin/training/view/${session.id}`),
          icon: 'eye'
        },
        {
          label: 'Edit',
          action: (session) => navigate(`/admin/training/edit/${session.id}`),
          icon: 'edit'
        },
        {
          label: 'Delete',
          action: (session) => handleDelete(session.id),
          icon: 'trash',
          variant: 'danger',
          confirm: true
        }
      ]}
      
      // Form configuration
      formFields={formFields}
      formData={getFormData()}
      onFormSubmit={handleFormSubmit}
      
      // Details configuration
      detailsFields={detailsFields}
      detailsData={selectedRecord}
      
      // Section management
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      
      // Navigation
      breadcrumbs={[
        { label: 'Dashboard', path: '/admin' },
        { label: 'Training Management', path: '/admin/training' },
        ...(id ? [{ label: selectedRecord?.topic || 'Session Details' }] : [])
      ]}
    />
  );
};

export default Training;
