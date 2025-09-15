/**
 * MOCK DATA FOR AGRICULTURAL MIS - FOSTER PROJECT
 * Complete dummy data for all features - no backend connections
 */

// Mock Users/Staff (FFS Facilitators, Extension Officers, etc.)
export const MOCK_USERS = [
  {
    id: 1,
    name: 'James Okello',
    first_name: 'James',
    last_name: 'Okello',
    email: 'admin@fao-foster.org',
    username: 'admin',
    phone_number_1: '256700000001',
    role: 'admin',
    department: 'FAO Coordination',
    status: 1,
    avatar: null,
    address: 'FAO Office, Moroto District',
    date_of_birth: '1980-01-15',
    gender: 'male',
    nationality: 'Ugandan',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Mary Akello',
    first_name: 'Mary',
    last_name: 'Akello',
    email: 'facilitator@fao-foster.org',
    username: 'facilitator',
    phone_number_1: '256700000002',
    role: 'ffs_facilitator',
    department: 'Farmer Field Schools',
    status: 1,
    avatar: null,
    address: 'Kotido District, Karamoja',
    date_of_birth: '1985-05-20',
    gender: 'female',
    nationality: 'Ugandan',
    specialization: 'Agro-Pastoral Systems',
    years_of_experience: 8,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Peter Lomuria',
    first_name: 'Peter',
    last_name: 'Lomuria',
    email: 'field.officer@fao-foster.org',
    username: 'peter',
    phone_number_1: '256700000003',
    role: 'field_officer',
    department: 'Field Operations',
    status: 1,
    avatar: null,
    address: 'Nakapiripirit District, Karamoja',
    date_of_birth: '1985-03-10',
    gender: 'male',
    nationality: 'Ugandan',
    specialization: 'Livestock Management',
    years_of_experience: 6,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'Sarah Nakoit',
    first_name: 'Sarah',
    last_name: 'Nakoit',
    email: 'specialist@fao-foster.org',
    username: 'sarah',
    phone_number_1: '256700000004',
    role: 'agricultural_specialist',
    department: 'Crop Production',
    status: 1,
    avatar: null,
    address: 'Amudat District, Karamoja',
    date_of_birth: '1982-07-30',
    gender: 'female',
    nationality: 'Ugandan',
    specialization: 'Crop Diversification',
    years_of_experience: 12,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    name: 'Michael Lokeris',
    first_name: 'Michael',
    last_name: 'Lokeris',
    email: 'livestock@fao-foster.org',
    username: 'michael',
    phone_number_1: '256700000005',
    role: 'livestock_specialist',
    department: 'Livestock Development',
    status: 1,
    avatar: null,
    address: 'Napak District, Karamoja',
    date_of_birth: '1978-12-05',
    gender: 'male',
    nationality: 'Ugandan',
    specialization: 'Pastoral Systems',
    years_of_experience: 18,
    created_at: '2024-01-01T00:00:00Z'
  }
];

// Mock Farmer Members
export const MOCK_FARMER_MEMBERS = [
  {
    id: 1,
    member_number: 'FM001',
    first_name: 'Alice',
    last_name: 'Akiru',
    email: 'alice@karamoja-farmers.org',
    phone: '256700001001',
    date_of_birth: '1990-05-15',
    gender: 'female',
    address: 'Rupa Sub-county, Moroto District',
    emergency_contact: 'Robert Akiru - 256700001002',
    farming_type: 'Mixed Crop-Livestock',
    main_crops: 'Sorghum, Maize, Beans',
    livestock_count: 15,
    land_size_acres: 3.5,
    vsla_group: 'Rupa Women VSLA',
    status: 'active',
    created_at: '2024-01-15T00:00:00Z',
    last_visit: '2024-03-01T00:00:00Z'
  },
  {
    id: 2,
    member_number: 'FM002',
    first_name: 'Robert',
    last_name: 'Lokoro',
    email: 'robert@karamoja-farmers.org',
    phone: '256700001003',
    date_of_birth: '1985-08-22',
    gender: 'male',
    address: 'Tapac Sub-county, Kotido District',
    emergency_contact: 'Mary Lokoro - 256700001004',
    farming_type: 'Pastoral',
    main_crops: 'Millet, Cassava',
    livestock_count: 45,
    land_size_acres: 2.0,
    vsla_group: 'Tapac Pastoralists VSLA',
    status: 'active',
    created_at: '2024-01-20T00:00:00Z',
    last_visit: '2024-02-28T00:00:00Z'
  },
  {
    id: 3,
    member_number: 'FM003',
    first_name: 'Maria',
    last_name: 'Achom',
    email: 'maria@karamoja-farmers.org',
    phone: '256700001005',
    date_of_birth: '1992-12-10',
    gender: 'female',
    address: 'Nakapiripirit Town Council',
    emergency_contact: 'Joseph Achom - 256700001006',
    farming_type: 'Crop Production',
    main_crops: 'Sunflower, Groundnuts, Vegetables',
    livestock_count: 8,
    land_size_acres: 4.2,
    vsla_group: 'Nakapiripirit Market VSLA',
    status: 'active',
    created_at: '2024-02-01T00:00:00Z',
    last_visit: '2024-03-05T00:00:00Z'
  }
];

// Mock Training Sessions
export const MOCK_TRAINING_SESSIONS = [
  {
    id: 1,
    member_id: 1,
    facilitator_id: 2,
    member: MOCK_FARMER_MEMBERS[0],
    facilitator: MOCK_USERS[1],
    session_date: '2024-03-15',
    session_time: '09:00',
    type: 'field_school',
    status: 'scheduled',
    topic: 'Improved Sorghum Varieties',
    location: 'Rupa Demo Plot',
    notes: 'Introduction to drought-resistant varieties',
    created_at: '2024-03-01T00:00:00Z'
  },
  {
    id: 2,
    member_id: 2,
    facilitator_id: 4,
    member: MOCK_FARMER_MEMBERS[1],
    facilitator: MOCK_USERS[3],
    session_date: '2024-03-16',
    session_time: '14:30',
    type: 'consultation',
    status: 'completed',
    topic: 'Livestock Health Management',
    location: 'Tapac Community Center',
    notes: 'Vaccination schedule discussed',
    created_at: '2024-03-02T00:00:00Z'
  },
  {
    id: 3,
    member_id: 3,
    facilitator_id: 2,
    member: MOCK_FARMER_MEMBERS[2],
    facilitator: MOCK_USERS[1],
    session_date: '2024-03-17',
    session_time: '11:15',
    type: 'follow_up',
    status: 'scheduled',
    topic: 'Vegetable Production Follow-up',
    location: 'Nakapiripirit Extension Office',
    notes: 'Check progress on kitchen garden',
    created_at: '2024-03-03T00:00:00Z'
  }
];

// Mock Agricultural Extension Records
export const MOCK_AGRICULTURAL_RECORDS = [
  {
    id: 1,
    member_id: 1,
    facilitator_id: 2,
    visit_date: '2024-03-01',
    assessment: 'Sorghum Production - Good Progress',
    observations: 'Good crop establishment, timely weeding',
    recommendations: 'Continue current practices, apply top-dressing fertilizer',
    inputs_provided: 'NPK fertilizer 25kg, improved seeds 2kg',
    notes: 'Farmer following recommended practices well',
    follow_up_date: '2024-06-01',
    created_at: '2024-03-01T00:00:00Z'
  },
  {
    id: 2,
    member_id: 2,
    facilitator_id: 4,
    visit_date: '2024-02-28',
    assessment: 'Livestock Management - Needs Improvement',
    observations: 'Some animals showing nutritional stress',
    recommendations: 'Improve feeding, provide mineral supplements',
    inputs_provided: 'Mineral blocks 5kg, de-worming medicine',
    notes: 'Cattle showing signs of mineral deficiency',
    follow_up_date: '2024-04-28',
    created_at: '2024-02-28T00:00:00Z'
  }
];

// Mock Departments
export const MOCK_DEPARTMENTS = [
  {
    id: 1,
    name: 'FAO Coordination',
    description: 'Project administration and coordination',
    head_of_department: 'James Okello',
    staff_count: 5,
    status: 'active'
  },
  {
    id: 2,
    name: 'Farmer Field Schools',
    description: 'FFS facilitation and farmer training',
    head_of_department: 'Mary Akello',
    staff_count: 8,
    status: 'active'
  },
  {
    id: 3,
    name: 'Crop Production',
    description: 'Crop diversification and improvement',
    head_of_department: 'Sarah Nakoit',
    staff_count: 12,
    status: 'active'
  },
  {
    id: 4,
    name: 'Livestock Development',
    description: 'Pastoral systems and livestock management',
    head_of_department: 'Michael Lokeris',
    staff_count: 15,
    status: 'active'
  },
  {
    id: 5,
    name: 'Field Operations',
    description: 'On-ground extension and farmer support',
    head_of_department: 'Peter Lomuria',
    staff_count: 20,
    status: 'active'
  }
];

// Mock Services
export const MOCK_SERVICES = [
  {
    id: 1,
    name: 'FFS Training Session',
    description: 'Farmer Field School training and demonstration',
    department_id: 2,
    price: 0,
    duration: 180,
    status: 'active'
  },
  {
    id: 2,
    name: 'Crop Consultation',
    description: 'Individual crop production consultation',
    department_id: 3,
    price: 0,
    duration: 60,
    status: 'active'
  },
  {
    id: 3,
    name: 'Livestock Assessment',
    description: 'Livestock health and management assessment',
    department_id: 4,
    price: 0,
    duration: 90,
    status: 'active'
  },
  {
    id: 4,
    name: 'VSLA Training',
    description: 'Village Savings and Loan Association training',
    department_id: 5,
    price: 0,
    duration: 120,
    status: 'active'
  }
];

// Mock Dashboard Statistics
export const MOCK_DASHBOARD_STATS = {
  total_members: 156,
  total_staff: 45,
  training_sessions_today: 12,
  total_training_sessions: 340,
  project_budget_spent: 15750000,
  pending_sessions: 8,
  completed_sessions_today: 4,
  departments_count: 5,
  active_staff: 42,
  emergency_cases_today: 2
};

// Mock Manifest (System Configuration)
export const MOCK_MANIFEST = {
  project_name: 'FOSTER Project - Karamoja',
  project_address: 'FAO Office, Moroto District, Karamoja, Uganda',
  project_phone: '256700000000',
  project_email: 'info@fao-foster.org',
  logo: '/logo192.png',
  theme_color: '#2563eb',
  currency: 'UGX',
  timezone: 'Africa/Kampala',
  features: {
    training_sessions: true,
    member_tracking: true,
    laboratory: true,
    pharmacy: true,
    emergency: true
  },
  navigation: {
    main_menu: [
      {
        id: 1,
        title: 'Dashboard',
        uri: 'dashboard',
        icon: 'BarChart3',
        permission: '*',
        parent_id: 0,
        order: 1
      },
      {
        id: 2,
        title: 'Groups Management',
        uri: 'groups',
        icon: 'Users',
        permission: '*',
        parent_id: 0,
        order: 2
      },
      {
        id: 3,
        title: 'Training Sessions',
        uri: 'training-sessions',
        icon: 'Calendar',
        permission: '*',
        parent_id: 0,
        order: 3
      },
      {
        id: 4,
        title: 'VSLA Transactions',
        uri: 'vsla-transactions',
        icon: 'CreditCard',
        permission: '*',
        parent_id: 0,
        order: 4
      },
      {
        id: 5,
        title: 'E-Marketplace',
        uri: 'marketplace',
        icon: 'ShoppingCart',
        permission: '*',
        parent_id: 0,
        order: 5
      },
      {
        id: 6,
        title: 'Advisory Content',
        uri: 'advisory-content',
        icon: 'BookOpen',
        permission: '*',
        parent_id: 0,
        order: 6
      },
      {
        id: 7,
        title: 'System Administration',
        uri: '',
        icon: 'Settings',
        permission: 'admin',
        parent_id: 0,
        order: 7
      },
      {
        id: 71,
        title: 'Users',
        uri: 'users',
        icon: 'UserCog',
        permission: 'admin',
        parent_id: 7,
        order: 1
      },
      {
        id: 72,
        title: 'System Settings',
        uri: 'settings',
        icon: 'Settings',
        permission: 'admin',
        parent_id: 7,
        order: 2
      }
    ],
    admin_menu: [],
    public_menu: [],
    user_menu: [],
    footer_menu: {}
  },
  version: '1.0.0',
  last_updated: '2024-03-01T00:00:00Z'
};

// Generate mock data for lists/pagination
export const generateMockFarmerMembers = (count = 50) => {
  const members = [...MOCK_FARMER_MEMBERS];
  for (let i = members.length; i < count; i++) {
    members.push({
      id: i + 1,
      member_number: `FM${String(i + 1).padStart(3, '0')}`,
      first_name: `Member${i + 1}`,
      last_name: `Surname${i + 1}`,
      email: `member${i + 1}@karamoja-farmers.org`,
      phone: `25670000${String(i + 1000).slice(-4)}`,
      date_of_birth: `19${80 + (i % 20)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      gender: i % 2 === 0 ? 'male' : 'female',
      address: `Village ${i + 1}, Karamoja Sub-county`,
      emergency_contact: `Contact${i + 1} - 256700${String(i + 2000).slice(-6)}`,
      farming_type: ['Mixed Crop-Livestock', 'Pastoral', 'Crop Production'][i % 3],
      main_crops: ['Sorghum, Maize', 'Millet, Beans', 'Sunflower, Groundnuts'][i % 3],
      livestock_count: (i % 50) + 5,
      land_size_acres: ((i % 10) + 1) * 0.5,
      vsla_group: `VSLA Group ${i + 1}`,
      status: 'active',
      created_at: `2024-0${((i % 2) + 1)}-${String((i % 28) + 1).padStart(2, '0')}T00:00:00Z`,
      last_visit: `2024-0${((i % 2) + 2)}-${String((i % 28) + 1).padStart(2, '0')}T00:00:00Z`
    });
  }
  return members;
};

export const generateMockStaff = (count = 20) => {
  const staff = [...MOCK_USERS];
  const roles = ['agricultural_specialist', 'field_officer', 'ffs_facilitator', 'livestock_specialist'];
  const departments = ['Crop Production', 'Livestock Development', 'Farmer Field Schools', 'Field Operations', 'FAO Coordination'];
  
  for (let i = staff.length; i < count; i++) {
    staff.push({
      id: i + 1,
      name: `Staff Member ${i + 1}`,
      first_name: `Staff${i + 1}`,
      last_name: `Member${i + 1}`,
      email: `staff${i + 1}@hospital.com`,
      username: `staff${i + 1}`,
      phone_number_1: `25670000${String(i + 3000).slice(-4)}`,
      role: roles[i % roles.length],
      department: departments[i % departments.length],
      status: 1,
      avatar: null,
      address: `${i + 1} Staff Street, Kampala`,
      date_of_birth: `19${70 + (i % 30)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      gender: i % 2 === 0 ? 'male' : 'female',
      nationality: 'Ugandan',
      created_at: '2024-01-01T00:00:00Z'
    });
  }
  return staff;
};

// Mock error responses for testing
export const MOCK_ERRORS = {
  network: {
    code: 0,
    message: 'Network error. Please check your connection.',
    data: null
  },
  unauthorized: {
    code: 0,
    message: 'Unauthorized access. Please login again.',
    data: null
  },
  validation: {
    code: 0,
    message: 'Validation failed.',
    data: null,
    errors: {
      email: ['Email is required'],
      password: ['Password must be at least 6 characters']
    }
  }
};

// FOSTER PROJECT SPECIFIC DATA

// Group Types for FOSTER Project
export const GROUP_TYPES = {
  FFS: 'Farmer Field School',
  FBS: 'Farmer Business School', 
  VSLA: 'Village Savings and Loan Association'
};

// Districts in Karamoja
export const KARAMOJA_DISTRICTS = [
  'Abim', 'Amudat', 'Kaabong', 'Kotido', 'Moroto', 
  'Nakapiripirit', 'Napak', 'Nabilatuk', 'Karenga'
];

// Crops and Livestock in Karamoja
export const KARAMOJA_CROPS = [
  { id: 'sorghum', name: 'Sorghum', icon: '🌾', season: 'Both' },
  { id: 'maize', name: 'Maize', icon: '🌽', season: 'Rain' },
  { id: 'millet', name: 'Millet', icon: '🌾', season: 'Both' },
  { id: 'beans', name: 'Beans', icon: '🫘', season: 'Rain' },
  { id: 'groundnuts', name: 'Groundnuts', icon: '🥜', season: 'Rain' },
  { id: 'sesame', name: 'Sesame', icon: '🌱', season: 'Dry' }
];

export const KARAMOJA_LIVESTOCK = [
  { id: 'cattle', name: 'Cattle', icon: '🐄', type: 'Large Ruminant' },
  { id: 'goats', name: 'Goats', icon: '🐐', type: 'Small Ruminant' },
  { id: 'sheep', name: 'Sheep', icon: '🐑', type: 'Small Ruminant' },
  { id: 'poultry', name: 'Poultry', icon: '🐓', type: 'Birds' }
];

// Mock FFS/FBS/VSLA Groups
export const MOCK_FOSTER_GROUPS = [
  {
    id: 'grp001',
    name: 'Nakapiripirit Women\'s VSLA',
    type: 'VSLA',
    district: 'Nakapiripirit',
    village: 'Lokitelaebu',
    parish: 'Losidok',
    subcounty: 'Nakapiripirit',
    coordinates: { lat: 2.1644, lng: 34.7453 },
    dateCreated: '2024-01-15',
    facilitatorId: 2,
    facilitatorName: 'Mary Akello',
    status: 'Active',
    memberCount: 25,
    femaleMembers: 20,
    maleMembers: 5,
    totalSavings: 2450000, // UGX
    totalLoans: 1200000,
    socialFund: 125000,
    shareValue: 10000,
    meetingDay: 'Thursday',
    meetingTime: '14:00',
    constitutionSigned: true,
    groupPhoto: 'nakapiripirit_women.jpg',
    trainingsCompleted: 12,
    lastMeetingDate: '2024-09-05'
  },
  {
    id: 'grp002',
    name: 'Moroto Sorghum FFS',
    type: 'FFS',
    district: 'Moroto',
    village: 'Nadunget',
    parish: 'Nadunget',
    subcounty: 'Moroto',
    coordinates: { lat: 2.5240, lng: 34.6664 },
    dateCreated: '2024-02-20',
    facilitatorId: 3,
    facilitatorName: 'Peter Lomuria',
    status: 'Active',
    memberCount: 30,
    femaleMembers: 18,
    maleMembers: 12,
    primaryCrop: 'sorghum',
    secondaryCrops: ['millet', 'groundnuts'],
    plotSize: 2.5, // hectares
    season: '2024B',
    expectedYield: 1800, // kg
    gapPractices: ['improved_seeds', 'spacing', 'weeding'],
    groupPhoto: 'moroto_sorghum.jpg',
    trainingsCompleted: 8,
    lastTrainingDate: '2024-09-10'
  },
  {
    id: 'grp003',
    name: 'Kotido Goat Keepers FBS',
    type: 'FBS',
    district: 'Kotido',
    village: 'Rengen',
    parish: 'Rengen',
    subcounty: 'Kotido',
    coordinates: { lat: 3.0163, lng: 34.1267 },
    dateCreated: '2024-03-10',
    facilitatorId: 2,
    facilitatorName: 'Mary Akello',
    status: 'Active',
    memberCount: 20,
    femaleMembers: 12,
    maleMembers: 8,
    primaryLivestock: 'goats',
    businessModel: 'goat_fattening',
    averageHerdSize: 15,
    marketTarget: 'local_traders',
    businessPlan: true,
    groupPhoto: 'kotido_goats.jpg',
    trainingsCompleted: 6,
    lastTrainingDate: '2024-09-08'
  },
  {
    id: 'grp004',
    name: 'Kaabong Mixed FFS',
    type: 'FFS',
    district: 'Kaabong',
    village: 'Kalapata',
    parish: 'Kalapata',
    subcounty: 'Kaabong',
    coordinates: { lat: 3.5287, lng: 33.9656 },
    dateCreated: '2024-01-30',
    facilitatorId: 4,
    facilitatorName: 'Agnes Nangiro',
    status: 'Active',
    memberCount: 28,
    femaleMembers: 16,
    maleMembers: 12,
    primaryCrop: 'beans',
    secondaryCrops: ['maize', 'groundnuts'],
    primaryLivestock: 'poultry',
    plotSize: 1.8,
    season: '2024B',
    expectedYield: 950,
    gapPractices: ['improved_varieties', 'fertilizer_use', 'pest_management'],
    groupPhoto: 'kaabong_mixed.jpg',
    trainingsCompleted: 10,
    lastTrainingDate: '2024-09-12'
  }
];

// Mock Detailed Training Sessions with AESA
export const MOCK_DETAILED_TRAINING_SESSIONS = [
  {
    id: 'tr001',
    groupId: 'grp002',
    groupName: 'Moroto Sorghum FFS',
    topic: 'Land Preparation for Sorghum',
    date: '2024-09-10',
    startTime: '09:00',
    endTime: '12:00',
    facilitatorId: 3,
    facilitatorName: 'Peter Lomuria',
    attendanceTotal: 28,
    attendanceFemale: 17,
    attendanceMale: 11,
    methodology: 'AESA',
    cropStage: 'land_preparation',
    plotObservations: {
      soilMoisture: 'adequate',
      soilColor: 'dark_brown',
      pestPresence: false,
      diseaseSymptoms: 'none',
      weedDensity: 'medium',
      weatherConditions: 'sunny'
    },
    gapRecommendations: [
      'Apply organic manure before planting',
      'Use improved sorghum varieties (IESV 23008)',
      'Plant with proper spacing (60cm x 15cm)',
      'Prepare early to catch first rains'
    ],
    farmerDecisions: [
      'Group agreed to contribute for organic manure',
      'Will source improved seeds from AgroInputs Ltd',
      'Plan to start planting by October 15th'
    ],
    challengesDiscussed: [
      'Lack of sufficient organic manure',
      'High cost of improved seeds',
      'Unpredictable rainfall patterns'
    ],
    photos: ['land_prep_demo.jpg', 'group_discussion.jpg', 'soil_assessment.jpg'],
    nextSession: {
      date: '2024-09-24',
      topic: 'Seed Selection and Planting'
    }
  },
  {
    id: 'tr002',
    groupId: 'grp001',
    groupName: 'Nakapiripirit Women\'s VSLA',
    topic: 'VSLA Constitution and Loan Procedures',
    date: '2024-09-05',
    startTime: '14:00',
    endTime: '16:30',
    facilitatorId: 2,
    facilitatorName: 'Mary Akello',
    attendanceTotal: 23,
    attendanceFemale: 18,
    attendanceMale: 5,
    methodology: 'participatory_discussion',
    keyTopics: [
      'Group constitution review',
      'Loan application procedures',
      'Interest rate determination',
      'Meeting schedules'
    ],
    decisions: [
      'Monthly meetings every first Thursday',
      'Minimum savings: UGX 5,000 per month',
      'Loan interest rate: 2% per month',
      'Maximum loan amount: 3x member savings',
      'Grace period for loan repayment: 1 week'
    ],
    financialLiteracyTopics: [
      'Importance of savings',
      'Calculating simple interest',
      'Record keeping basics',
      'Business planning fundamentals'
    ],
    actionPoints: [
      'All members to sign updated constitution',
      'Elect new loan committee members',
      'Set up group savings box with triple locks'
    ],
    nextSession: {
      date: '2024-09-19',
      topic: 'Record Keeping and Financial Management'
    }
  },
  {
    id: 'tr003',
    groupId: 'grp003',
    groupName: 'Kotido Goat Keepers FBS',
    topic: 'Goat Nutrition and Feed Formulation',
    date: '2024-09-08',
    startTime: '10:00',
    endTime: '13:00',
    facilitatorId: 2,
    facilitatorName: 'Mary Akello',
    attendanceTotal: 18,
    attendanceFemale: 11,
    attendanceMale: 7,
    methodology: 'hands_on_practical',
    practicalActivities: [
      'Feed mixing demonstration',
      'Body condition scoring',
      'Identifying nutritious local plants',
      'Feed storage techniques'
    ],
    businessSkills: [
      'Cost calculation for feed',
      'Profit margin analysis',
      'Market price monitoring',
      'Customer relationship management'
    ],
    animalObservations: {
      averageBodyCondition: 3.2, // scale 1-5
      healthStatus: 'good',
      reproductivePerformance: 'satisfactory',
      feedAvailability: 'adequate'
    },
    marketInformation: {
      currentGoatPrice: 280000, // UGX per goat
      demandLevel: 'high',
      bestMarketDays: ['Monday', 'Thursday'],
      transportCost: 15000 // to nearest market
    },
    actionPoints: [
      'Members to establish feed banks',
      'Form marketing sub-committee',
      'Schedule vaccination program'
    ],
    nextSession: {
      date: '2024-09-22',
      topic: 'Goat Health Management and Disease Prevention'
    }
  }
];

// Mock VSLA Transactions
export const MOCK_VSLA_TRANSACTIONS = [
  {
    id: 'vsla001',
    groupId: 'grp001',
    groupName: 'Nakapiripirit Women\'s VSLA',
    date: '2024-09-05',
    meetingNumber: 36,
    transactionType: 'meeting',
    attendance: 23,
    transactions: [
      {
        type: 'savings',
        memberId: 'mem001',
        memberName: 'Akello Grace',
        amount: 10000,
        shares: 1,
        runningBalance: 160000,
        notes: 'Regular monthly savings'
      },
      {
        type: 'savings',
        memberId: 'mem002',
        memberName: 'Lomuria Sarah',
        amount: 15000,
        shares: 1.5,
        runningBalance: 145000,
        notes: 'Extra savings from goat sale'
      },
      {
        type: 'loan_application',
        memberId: 'mem003',
        memberName: 'Achola Mary',
        requestedAmount: 80000,
        purpose: 'Goat purchase for fattening',
        repaymentPeriod: 3, // months
        guarantors: ['mem001', 'mem002'],
        approvalStatus: 'approved'
      },
      {
        type: 'loan_disbursement',
        memberId: 'mem003',
        memberName: 'Achola Mary',
        principalAmount: 80000,
        serviceCharge: 2000,
        netDisbursed: 78000,
        interestRate: 2, // per month
        repaymentDate: '2024-12-05'
      },
      {
        type: 'loan_repayment',
        memberId: 'mem004',
        memberName: 'Opio James',
        principalPaid: 30000,
        interestPaid: 1800,
        totalPaid: 31800,
        remainingBalance: 50000
      },
      {
        type: 'social_fund',
        memberId: 'mem005',
        memberName: 'Atim Florence',
        amount: 3000,
        purpose: 'Medical assistance',
        approvedBy: 'group_consensus'
      }
    ],
    summaryTotals: {
      totalSavings: 167000,
      totalLoansOut: 280000,
      socialFundContribution: 11500,
      cashInBox: 1456000
    },
    fines: [
      {
        memberId: 'mem006',
        memberName: 'Akol Peter',
        reason: 'Late arrival',
        amount: 1000
      }
    ],
    meetingNotes: 'Good attendance. Discussed upcoming share-out in December.',
    nextMeetingDate: '2024-10-03'
  }
];

// Mock E-Marketplace Data
export const MOCK_MARKETPLACE_DATA = [
  // Input Suppliers
  {
    id: 'mk001',
    category: 'inputs',
    subcategory: 'seeds',
    item: 'Improved Sorghum Seeds (IESV 23008)',
    supplier: 'AgroInputs Ltd',
    location: 'Moroto Town',
    district: 'Moroto',
    contact: {
      phone: '+256774567890',
      person: 'John Akisophel'
    },
    price: 8000, // per kg
    unit: 'kg',
    minimumOrder: 5,
    availability: 'In Stock',
    quality: 'Certified',
    description: 'Drought-resistant sorghum variety suitable for Karamoja conditions',
    features: ['drought_resistant', 'high_yield', 'early_maturing'],
    photo: 'sorghum_seeds.jpg',
    datePosted: '2024-09-01',
    rating: 4.5,
    verified: true
  },
  {
    id: 'mk002',
    category: 'inputs',
    subcategory: 'fertilizer',
    item: 'Organic Compost Manure',
    supplier: 'Karamoja Organic Farms',
    location: 'Kotido',
    district: 'Kotido',
    contact: {
      phone: '+256771234567',
      person: 'Mary Lokwang'
    },
    price: 25000, // per 50kg bag
    unit: '50kg bag',
    minimumOrder: 2,
    availability: 'In Stock',
    quality: 'Organic Certified',
    description: 'Well-decomposed organic manure rich in nutrients',
    features: ['organic', 'slow_release', 'soil_improvement'],
    photo: 'organic_manure.jpg',
    datePosted: '2024-08-28',
    rating: 4.8,
    verified: true
  },
  // Produce for Sale
  {
    id: 'mk003',
    category: 'produce',
    subcategory: 'grains',
    item: 'Sorghum Grain (Local Variety)',
    seller: 'Moroto Sorghum FFS',
    location: 'Moroto',
    district: 'Moroto',
    contact: {
      phone: '+256772345678',
      person: 'Peter Lomuria'
    },
    quantity: 500, // kg
    pricePerKg: 3500,
    totalValue: 1750000,
    harvestDate: '2024-08-15',
    quality: 'Grade A',
    moistureContent: 12,
    description: 'Sun-dried sorghum grain, properly stored',
    photo: 'sorghum_harvest.jpg',
    datePosted: '2024-09-02',
    urgent: false
  },
  {
    id: 'mk004',
    category: 'livestock',
    subcategory: 'goats',
    item: 'Mature Goats for Sale',
    seller: 'Kotido Goat Keepers FBS',
    location: 'Kotido',
    district: 'Kotido',
    contact: {
      phone: '+256773456789',
      person: 'Agnes Atim'
    },
    quantity: 15,
    pricePerHead: 280000,
    totalValue: 4200000,
    breed: 'Local crossbreed',
    averageWeight: 25, // kg
    ageRange: '1-2 years',
    healthStatus: 'Vaccinated',
    description: 'Well-fed goats ready for market',
    features: ['vaccinated', 'dewormed', 'good_condition'],
    photo: 'goats_for_sale.jpg',
    datePosted: '2024-09-05',
    urgent: true
  }
];

// Mock Advisory Content
export const MOCK_ADVISORY_CONTENT = [
  {
    id: 'adv001',
    title: 'Sorghum Planting Best Practices',
    category: 'crops',
    subcategory: 'sorghum',
    language: 'en',
    priority: 'high',
    targetAudience: ['ffs_groups', 'farmers'],
    content: {
      summary: 'Complete guide to sorghum planting for maximum yield in Karamoja conditions',
      text: 'Plant sorghum at the beginning of the rainy season. Space rows 60cm apart and plants 15cm within rows. Use improved varieties like IESV 23008 for better drought resistance.',
      steps: [
        'Prepare land by clearing and making ridges',
        'Apply organic manure 2 weeks before planting',
        'Plant seeds 2-3cm deep',
        'Thin seedlings after 2 weeks',
        'Weed regularly until flowering'
      ],
      tips: [
        'Plant early to maximize moisture use',
        'Use certified seeds for better germination',
        'Inter-crop with legumes for soil fertility'
      ],
      audio: 'sorghum_planting_en.mp3',
      images: ['sorghum_spacing.jpg', 'proper_planting.jpg', 'field_layout.jpg']
    },
    author: 'FAO Uganda Technical Team',
    datePublished: '2024-08-01',
    lastUpdated: '2024-09-01',
    downloads: 145,
    rating: 4.8,
    reviews: 24,
    tags: ['planting', 'sorghum', 'gap', 'drought_resistant']
  },
  {
    id: 'adv002',
    title: 'VSLA Meeting Procedures Manual',
    category: 'financial_literacy',
    subcategory: 'vsla',
    language: 'en',
    priority: 'high',
    targetAudience: ['vsla_groups', 'facilitators'],
    content: {
      summary: 'Step-by-step guide for conducting effective VSLA meetings',
      text: 'Conduct VSLA meetings systematically: attendance, opening prayer, savings collection, loan applications review, repayments, social fund contributions, and closing.',
      procedures: [
        'Take attendance and collect fines for lateness',
        'Count and record previous meeting money',
        'Collect weekly/monthly savings from members',
        'Review loan applications and vote',
        'Collect loan repayments and interest',
        'Address social fund requests',
        'Count total money and lock in box',
        'Record everything in ledger books'
      ],
      audio: 'vsla_procedures_en.mp3',
      video: 'vsla_meeting_demo.mp4',
      documents: ['vsla_constitution_template.pdf', 'record_keeping_forms.pdf']
    },
    author: 'FAO Uganda VSLA Team',
    datePublished: '2024-07-15',
    lastUpdated: '2024-08-20',
    downloads: 89,
    rating: 4.9,
    reviews: 18,
    tags: ['vsla', 'meetings', 'procedures', 'financial_literacy']
  },
  {
    id: 'adv003',
    title: 'Goat Health and Nutrition Guide',
    category: 'livestock',
    subcategory: 'goats',
    language: 'en',
    priority: 'medium',
    targetAudience: ['fbs_groups', 'livestock_farmers'],
    content: {
      summary: 'Comprehensive guide to keeping goats healthy and productive',
      text: 'Proper goat management includes good nutrition, regular health checks, vaccination schedules, and proper housing.',
      sections: [
        {
          title: 'Feeding and Nutrition',
          content: 'Goats need diverse feed sources. Provide browse, grass, and supplementary feeding during dry seasons.'
        },
        {
          title: 'Health Management',
          content: 'Vaccinate against PPR, deworm regularly, and monitor for signs of illness.'
        },
        {
          title: 'Housing and Management',
          content: 'Provide dry, well-ventilated shelter. Separate sick animals immediately.'
        }
      ],
      audio: 'goat_management_en.mp3',
      images: ['goat_feeding.jpg', 'vaccination_schedule.jpg', 'housing_design.jpg']
    },
    author: 'FAO Livestock Specialist',
    datePublished: '2024-08-10',
    lastUpdated: '2024-09-05',
    downloads: 67,
    rating: 4.6,
    reviews: 12,
    tags: ['goats', 'health', 'nutrition', 'management']
  }
];

// Weather and Seasonal Information
export const MOCK_WEATHER_DATA = [
  {
    date: '2024-09-11',
    district: 'Moroto',
    temperature: {
      max: 32,
      min: 18,
      unit: 'celsius'
    },
    rainfall: {
      amount: 0,
      probability: 20,
      unit: 'mm'
    },
    humidity: 45,
    windSpeed: 12,
    season: 'dry',
    farmingAdvice: 'Good time for land preparation. Start collecting organic manure.',
    weatherCondition: 'sunny'
  }
];
