/**
 * Digital Registry Configuration
 * Following AdminContentScaffold patterns and design system guidelines
 */

// Table columns configuration
export const tableColumns = [
  {
    key: 'name',
    label: 'Group Name',
    sortable: true,
    render: (value, record) => (
      <div>
        <div style={{ fontWeight: '500', fontSize: '14px', color: '#1e293b' }}>
          {record.name}
        </div>
        <div style={{ fontSize: '12px', color: '#64748b' }}>
          {record.village}, {record.subcounty}
        </div>
      </div>
    ),
  },
  {
    key: 'type',
    label: 'Type',
    sortable: true,
    render: (value, record) => {
      const colors = { 
        FFS: '#0a1e34', 
        FBS: '#f59e0b', 
        VSLA: '#10b981' 
      };
      return (
        <span style={{
          backgroundColor: colors[record.type] || '#64748b',
          color: '#ffffff',
          padding: '2px 8px',
          fontSize: '11px',
          fontWeight: '500'
        }}>
          {record.type}
        </span>
      );
    },
  },
  {
    key: 'district',
    label: 'District',
    sortable: true,
    render: (value, record) => (
      <div style={{ fontSize: '14px', color: '#1e293b' }}>
        {record.district}
      </div>
    ),
  },
  {
    key: 'facilitator',
    label: 'Facilitator',
    render: (value, record) => (
      <div>
        <div style={{ fontSize: '14px', color: '#1e293b' }}>
          {record.facilitator}
        </div>
        <div style={{ fontSize: '12px', color: '#64748b' }}>
          {record.facilitatorPhone}
        </div>
      </div>
    ),
  },
  {
    key: 'memberCount',
    label: 'Members',
    sortable: true,
    render: (value, record) => (
      <div>
        <div style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
          {record.memberCount} Total
        </div>
        <div style={{ fontSize: '12px', color: '#64748b' }}>
          {record.femaleMembers}F • {record.maleMembers}M • {record.youthMembers}Y
        </div>
      </div>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    render: (value, record) => (
      <span style={{
        backgroundColor: record.status === 'Active' ? '#10b981' : '#64748b',
        color: '#ffffff',
        padding: '2px 8px',
        fontSize: '11px',
        fontWeight: '500'
      }}>
        {record.status}
      </span>
    ),
  }
];

// Form fields configuration
export const formFields = [
  {
    key: 'name',
    label: 'Group Name',
    type: 'text',
    required: true,
    placeholder: 'Enter group name',
    validation: {
      required: 'Group name is required',
      minLength: { value: 3, message: 'Name must be at least 3 characters' }
    }
  },
  {
    key: 'type',
    label: 'Group Type',
    type: 'select',
    required: true,
    options: [
      { value: 'FFS', label: 'Farmer Field School (FFS)' },
      { value: 'FBS', label: 'Farmer Business School (FBS)' },
      { value: 'VSLA', label: 'Village Savings and Loan Association (VSLA)' }
    ],
    validation: {
      required: 'Group type is required'
    }
  },
  {
    key: 'district',
    label: 'District',
    type: 'select',
    required: true,
    options: [
      { value: 'Moroto', label: 'Moroto' },
      { value: 'Kotido', label: 'Kotido' },
      { value: 'Kaabong', label: 'Kaabong' },
      { value: 'Napak', label: 'Napak' },
      { value: 'Nakapiripirit', label: 'Nakapiripirit' },
      { value: 'Amudat', label: 'Amudat' },
      { value: 'Karenga', label: 'Karenga' }
    ],
    validation: {
      required: 'District is required'
    }
  },
  {
    key: 'subcounty',
    label: 'Sub-county',
    type: 'text',
    required: true,
    placeholder: 'Enter sub-county',
    validation: {
      required: 'Sub-county is required'
    }
  },
  {
    key: 'parish',
    label: 'Parish',
    type: 'text',
    required: true,
    placeholder: 'Enter parish',
    validation: {
      required: 'Parish is required'
    }
  },
  {
    key: 'village',
    label: 'Village',
    type: 'text',
    required: true,
    placeholder: 'Enter village',
    validation: {
      required: 'Village is required'
    }
  },
  {
    key: 'facilitator',
    label: 'Facilitator Name',
    type: 'text',
    required: true,
    placeholder: 'Enter facilitator name',
    validation: {
      required: 'Facilitator name is required'
    }
  },
  {
    key: 'facilitatorPhone',
    label: 'Facilitator Phone',
    type: 'tel',
    placeholder: '0772123456',
    validation: {
      pattern: {
        value: /^0[7][0-9]{8}$/,
        message: 'Enter valid Ugandan phone number (e.g., 0772123456)'
      }
    }
  },
  {
    key: 'chairperson',
    label: 'Chairperson',
    type: 'text',
    placeholder: 'Enter chairperson name'
  },
  {
    key: 'secretary',
    label: 'Secretary',
    type: 'text',
    placeholder: 'Enter secretary name'
  },
  {
    key: 'treasurer',
    label: 'Treasurer',
    type: 'text',
    placeholder: 'Enter treasurer name'
  },
  {
    key: 'memberCount',
    label: 'Total Members',
    type: 'number',
    required: true,
    min: 1,
    placeholder: 'Enter total number of members',
    validation: {
      required: 'Total members is required',
      min: { value: 1, message: 'Must have at least 1 member' }
    }
  },
  {
    key: 'maleMembers',
    label: 'Male Members',
    type: 'number',
    min: 0,
    placeholder: 'Enter number of male members'
  },
  {
    key: 'femaleMembers',
    label: 'Female Members',
    type: 'number',
    min: 0,
    placeholder: 'Enter number of female members'
  },
  {
    key: 'youthMembers',
    label: 'Youth Members',
    type: 'number',
    min: 0,
    placeholder: 'Enter number of youth members'
  },
  {
    key: 'pwdMembers',
    label: 'PWD Members',
    type: 'number',
    min: 0,
    placeholder: 'Enter number of PWD members'
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
      { value: 'Suspended', label: 'Suspended' }
    ],
    defaultValue: 'Active'
  }
];

// Details view fields configuration
export const detailsFields = [
  {
    key: 'basicInfo',
    label: 'Basic Information',
    type: 'section',
    fields: [
      { key: 'name', label: 'Group Name' },
      { key: 'type', label: 'Type' },
      { key: 'status', label: 'Status' },
      { key: 'registrationDate', label: 'Registration Date', type: 'date' }
    ]
  },
  {
    key: 'location',
    label: 'Location',
    type: 'section',
    fields: [
      { key: 'district', label: 'District' },
      { key: 'subcounty', label: 'Sub-county' },
      { key: 'parish', label: 'Parish' },
      { key: 'village', label: 'Village' }
    ]
  },
  {
    key: 'leadership',
    label: 'Leadership',
    type: 'section',
    fields: [
      { key: 'facilitator', label: 'Facilitator' },
      { key: 'facilitatorPhone', label: 'Facilitator Phone' },
      { key: 'chairperson', label: 'Chairperson' },
      { key: 'secretary', label: 'Secretary' },
      { key: 'treasurer', label: 'Treasurer' }
    ]
  },
  {
    key: 'membership',
    label: 'Membership',
    type: 'section',
    fields: [
      { key: 'memberCount', label: 'Total Members' },
      { key: 'maleMembers', label: 'Male Members' },
      { key: 'femaleMembers', label: 'Female Members' },
      { key: 'youthMembers', label: 'Youth Members' },
      { key: 'pwdMembers', label: 'PWD Members' }
    ]
  },
  {
    key: 'activities',
    label: 'Activities',
    type: 'section',
    fields: [
      { key: 'mainCrops', label: 'Main Crops', type: 'array' },
      { key: 'livestock', label: 'Livestock', type: 'array' },
      { key: 'totalTrainingSessions', label: 'Training Sessions' },
      { key: 'completionRate', label: 'Completion Rate', suffix: '%' },
      { key: 'lastMeeting', label: 'Last Meeting', type: 'date' }
    ]
  }
];

// Breadcrumbs configuration
export const registryBreadcrumbs = [
  { label: 'FOSTER Project', href: '/admin/dashboard' },
  { label: 'Digital Registry', href: '/admin/registry', active: true }
];

// Export configurations
export const exportFormats = ['csv', 'excel'];

// Search configuration
export const searchConfig = {
  placeholder: 'Search groups, facilitators, villages...',
  fields: ['name', 'facilitator', 'village', 'subcounty', 'district']
};

// Filter configuration
export const filterConfig = [
  {
    key: 'type',
    label: 'Group Type',
    type: 'select',
    options: [
      { value: '', label: 'All Types' },
      { value: 'FFS', label: 'FFS' },
      { value: 'FBS', label: 'FBS' },
      { value: 'VSLA', label: 'VSLA' }
    ]
  },
  {
    key: 'district',
    label: 'District',
    type: 'select',
    options: [
      { value: '', label: 'All Districts' },
      { value: 'Moroto', label: 'Moroto' },
      { value: 'Kotido', label: 'Kotido' },
      { value: 'Kaabong', label: 'Kaabong' },
      { value: 'Napak', label: 'Napak' },
      { value: 'Nakapiripirit', label: 'Nakapiripirit' },
      { value: 'Amudat', label: 'Amudat' },
      { value: 'Karenga', label: 'Karenga' }
    ]
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: '', label: 'All Status' },
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
      { value: 'Suspended', label: 'Suspended' }
    ]
  }
];
