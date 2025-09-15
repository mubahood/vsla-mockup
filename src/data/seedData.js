/**
 * Uganda FOSTER Project - MIS Seed Data
 * Realistic dummy data for Karamoja region demonstration
 * 
 * Data Structure:
 * - FFS/FBS Groups (Digital Registry)
 * - VSLA Groups (VSLA Ledger)
 * - Training Sessions (Training Module)
 * - Market Listings (E-Marketplace)
 * - Advisory Content (E-Advisory Hub)
 * - M&E Metrics (Monitoring Dashboard)
 */

// Karamoja Sub-counties and Districts
const KARAMOJA_LOCATIONS = {
  moroto: {
    district: 'Moroto',
    subcounties: ['Katakwi', 'Rupa', 'Tapac', 'Nadunget', 'Lotisan']
  },
  kotido: {
    district: 'Kotido',
    subcounties: ['Kotido', 'Kalapata', 'Kotyang', 'Rengen', 'Kaabong']
  },
  kaabong: {
    district: 'Kaabong',
    subcounties: ['Kaabong', 'Kapedo', 'Sidok', 'Karenga', 'Loyoro']
  },
  napak: {
    district: 'Napak',
    subcounties: ['Lokopo', 'Matany', 'Nabilatuk', 'Alakas', 'Iriiri']
  },
  nakapiripirit: {
    district: 'Nakapiripirit',
    subcounties: ['Nakapiripirit', 'Losidok', 'Ngoleriet', 'Karita', 'Lolelia']
  },
  amudat: {
    district: 'Amudat',
    subcounties: ['Amudat', 'Karita', 'Lopei', 'Chepsukunya', 'Kalas']
  },
  karenga: {
    district: 'Karenga',
    subcounties: ['Karenga', 'Kathile', 'Kidepo', 'Kamion', 'Loyoro']
  }
};

// Common Karamojong names for group leaders and members
const KARAMOJONG_NAMES = [
  'Akello Grace', 'Lopeyok Peter', 'Nakut Mary', 'Lomonyang John',
  'Akite Sarah', 'Lokwang James', 'Nakapit Rose', 'Lodungokol David',
  'Apeyo Janet', 'Lokiru Moses', 'Nawal Helen', 'Lokaale Francis',
  'Atyang Alice', 'Lochoro Paul', 'Nakwang Joyce', 'Logira Samuel',
  'Achen Martha', 'Lopusan Michael', 'Napeyok Agnes', 'Lokeris Joseph',
  'Akiru Rebecca', 'Lotelit Stephen', 'Namwong Catherine', 'Loduk Daniel',
  'Aol Christine', 'Lokiring Thomas', 'Nalem Betty', 'Lomuria Robert',
  'Akol Margaret', 'Lopucha George', 'Nalukol Faith', 'Lokales William'
];

// Crop varieties suitable for Karamoja semi-arid conditions
const KARAMOJA_CROPS = [
  'Sorghum (Sekedo, Epuripur)', 'Finger Millet (Amukeke)', 'Pearl Millet',
  'Cowpeas (Eboro)', 'Green Grams (Ngima)', 'Groundnuts (Eboo)',
  'Cassava (Eshosho)', 'Sweet Potatoes (Ebita)', 'Simsim (Sesame)',
  'Sunflower', 'Pigeon Peas', 'Bean varieties (Drought tolerant)'
];

// Livestock common in Karamoja
const KARAMOJA_LIVESTOCK = [
  'Indigenous Cattle (Ankole, Zebu)', 'Goats (Small East African)',
  'Sheep (Red Masaai)', 'Chicken (Indigenous)', 'Donkeys',
  'Camels (Northern districts)', 'Improved Dairy Cattle (Few)'
];

// Generate random date within last 2 years
const generateRandomDate = (monthsBack = 24) => {
  const now = new Date();
  const past = new Date(now.getTime() - (monthsBack * 30 * 24 * 60 * 60 * 1000));
  const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
  return new Date(randomTime).toISOString().split('T')[0];
};

// Generate phone number (Uganda format)
const generateUgandanPhone = () => {
  const prefixes = ['0772', '0782', '0752', '0702', '0712'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `${prefix}${suffix}`;
};

// FFS/FBS Groups Data (Digital Registry)
export const GROUPS_DATA = [
  // Moroto District Groups
  {
    id: 'FFS001',
    name: 'Katakwi Sorghum Farmers School',
    type: 'FFS',
    district: 'Moroto',
    subcounty: 'Katakwi',
    parish: 'Katakwi Central',
    village: 'Lorengecora',
    facilitator: 'Akello Grace',
    facilitatorPhone: generateUgandanPhone(),
    chairperson: 'Lopeyok Peter',
    secretary: 'Nakut Mary',
    treasurer: 'Lomonyang John',
    memberCount: 32,
    maleMembers: 15,
    femaleMembers: 17,
    youthMembers: 8,
    pwdMembers: 2,
    registrationDate: '2023-03-15',
    status: 'Active',
    mainCrops: ['Sorghum (Sekedo)', 'Cowpeas (Eboro)', 'Green Grams'],
    livestock: ['Indigenous Cattle', 'Goats', 'Chicken'],
    lastMeeting: '2024-01-12',
    totalTrainingSessions: 24,
    completionRate: 85
  },
  {
    id: 'FBS002',
    name: 'Rupa Livestock Business School',
    type: 'FBS',
    district: 'Moroto',
    subcounty: 'Rupa',
    parish: 'Rupa Town Council',
    village: 'Nakapelimoru',
    facilitator: 'Akite Sarah',
    facilitatorPhone: generateUgandanPhone(),
    chairperson: 'Lokwang James',
    secretary: 'Nakapit Rose',
    treasurer: 'Lodungokol David',
    memberCount: 28,
    maleMembers: 12,
    femaleMembers: 16,
    youthMembers: 6,
    pwdMembers: 1,
    registrationDate: '2023-05-20',
    status: 'Active',
    mainCrops: ['Cassava', 'Sweet Potatoes', 'Groundnuts'],
    livestock: ['Goats', 'Chicken', 'Improved Dairy Cattle'],
    lastMeeting: '2024-01-08',
    totalTrainingSessions: 18,
    completionRate: 78
  },
  // Kotido District Groups
  {
    id: 'FFS003',
    name: 'Kotido Millet Farmers School',
    type: 'FFS',
    district: 'Kotido',
    subcounty: 'Kotido',
    parish: 'Kotido Central',
    village: 'Loyoro',
    facilitator: 'Apeyo Janet',
    facilitatorPhone: generateUgandanPhone(),
    chairperson: 'Lokiru Moses',
    secretary: 'Nawal Helen',
    treasurer: 'Lokaale Francis',
    memberCount: 45,
    maleMembers: 20,
    femaleMembers: 25,
    youthMembers: 12,
    pwdMembers: 3,
    registrationDate: '2023-02-10',
    status: 'Active',
    mainCrops: ['Finger Millet (Amukeke)', 'Pearl Millet', 'Simsim'],
    livestock: ['Indigenous Cattle', 'Goats', 'Sheep'],
    lastMeeting: '2024-01-15',
    totalTrainingSessions: 28,
    completionRate: 92
  },
  {
    id: 'VSLA001',
    name: 'Kalapata Women VSLA',
    type: 'VSLA',
    district: 'Kotido',
    subcounty: 'Kalapata',
    parish: 'Kalapata',
    village: 'Nakapelemoru',
    facilitator: 'Atyang Alice',
    facilitatorPhone: generateUgandanPhone(),
    chairperson: 'Lochoro Paul',
    secretary: 'Nakwang Joyce',
    treasurer: 'Logira Samuel',
    memberCount: 25,
    maleMembers: 8,
    femaleMembers: 17,
    youthMembers: 5,
    pwdMembers: 1,
    registrationDate: '2023-04-12',
    status: 'Active',
    mainCrops: ['Sorghum', 'Cowpeas', 'Groundnuts'],
    livestock: ['Goats', 'Chicken'],
    lastMeeting: '2024-01-10',
    totalTrainingSessions: 15,
    completionRate: 88
  },
  // Napak District Groups
  {
    id: 'FFS004',
    name: 'Lokopo Drought Resistant Crops FFS',
    type: 'FFS',
    district: 'Napak',
    subcounty: 'Lokopo',
    parish: 'Lokopo Central',
    village: 'Nakapelimoru',
    facilitator: 'Achen Martha',
    facilitatorPhone: generateUgandanPhone(),
    chairperson: 'Lopusan Michael',
    secretary: 'Napeyok Agnes',
    treasurer: 'Lokeris Joseph',
    memberCount: 38,
    maleMembers: 18,
    femaleMembers: 20,
    youthMembers: 10,
    pwdMembers: 2,
    registrationDate: '2023-06-08',
    status: 'Active',
    mainCrops: ['Sorghum (Epuripur)', 'Cassava', 'Green Grams'],
    livestock: ['Indigenous Cattle', 'Goats', 'Donkeys'],
    lastMeeting: '2024-01-14',
    totalTrainingSessions: 22,
    completionRate: 81
  },
  {
    id: 'FBS005',
    name: 'Matany Agribusiness School',
    type: 'FBS',
    district: 'Napak',
    subcounty: 'Matany',
    parish: 'Matany Town Council',
    village: 'Kawalakol',
    facilitator: 'Akiru Rebecca',
    facilitatorPhone: generateUgandanPhone(),
    chairperson: 'Lotelit Stephen',
    secretary: 'Namwong Catherine',
    treasurer: 'Loduk Daniel',
    memberCount: 30,
    maleMembers: 14,
    femaleMembers: 16,
    youthMembers: 7,
    pwdMembers: 1,
    registrationDate: '2023-07-22',
    status: 'Active',
    mainCrops: ['Sunflower', 'Simsim', 'Pigeon Peas'],
    livestock: ['Goats', 'Chicken', 'Improved Dairy Cattle'],
    lastMeeting: '2024-01-11',
    totalTrainingSessions: 16,
    completionRate: 75
  },
  // Nakapiripirit District Groups
  {
    id: 'VSLA002',
    name: 'Losidok Unity VSLA',
    type: 'VSLA',
    district: 'Nakapiripirit',
    subcounty: 'Losidok',
    parish: 'Losidok',
    village: 'Nakujit',
    facilitator: 'Aol Christine',
    facilitatorPhone: generateUgandanPhone(),
    chairperson: 'Lokiring Thomas',
    secretary: 'Nalem Betty',
    treasurer: 'Lomuria Robert',
    memberCount: 22,
    maleMembers: 6,
    femaleMembers: 16,
    youthMembers: 4,
    pwdMembers: 0,
    registrationDate: '2023-08-14',
    status: 'Active',
    mainCrops: ['Finger Millet', 'Cowpeas', 'Sweet Potatoes'],
    livestock: ['Goats', 'Chicken', 'Sheep'],
    lastMeeting: '2024-01-09',
    totalTrainingSessions: 12,
    completionRate: 90
  },
  // Amudat District Groups
  {
    id: 'FFS006',
    name: 'Amudat Highland Farmers School',
    type: 'FFS',
    district: 'Amudat',
    subcounty: 'Amudat',
    parish: 'Amudat Central',
    village: 'Chepsukunya',
    facilitator: 'Akol Margaret',
    facilitatorPhone: generateUgandanPhone(),
    chairperson: 'Lopucha George',
    secretary: 'Nalukol Faith',
    treasurer: 'Lokales William',
    memberCount: 35,
    maleMembers: 16,
    femaleMembers: 19,
    youthMembers: 9,
    pwdMembers: 2,
    registrationDate: '2023-09-05',
    status: 'Active',
    mainCrops: ['Bean varieties', 'Irish Potatoes', 'Maize (Small scale)'],
    livestock: ['Indigenous Cattle', 'Goats', 'Chicken'],
    lastMeeting: '2024-01-13',
    totalTrainingSessions: 14,
    completionRate: 79
  }
];

// Training Sessions Data
export const TRAINING_SESSIONS = [
  {
    id: 'TRN001',
    groupId: 'FFS001',
    groupName: 'Katakwi Sorghum Farmers School',
    sessionType: 'AESA',
    topic: 'Sorghum Growth Stages and Pest Management',
    facilitator: 'Akello Grace',
    date: '2024-01-12',
    startTime: '09:00',
    endTime: '12:00',
    venue: 'Katakwi Community Center',
    attendees: {
      male: 14,
      female: 16,
      youth: 7,
      pwd: 2,
      total: 30
    },
    keyLearningOutcomes: [
      'Identification of sorghum growth stages',
      'Recognition of common pests (shoot flies, stem borers)',
      'Integrated pest management practices',
      'Use of local organic pesticides'
    ],
    practicalActivities: [
      'Field observation of crop stages',
      'Pest identification exercise',
      'Preparation of neem-based spray'
    ],
    challenges: ['Late arrival of some members', 'Language barrier for technical terms'],
    followUpActions: ['Practice field assessment next week', 'Distribute pest identification charts'],
    weatherConditions: 'Sunny, ideal for field work',
    facilitatorNotes: 'Good participation, members eager to learn IPM practices'
  },
  {
    id: 'TRN002',
    groupId: 'FBS002',
    groupName: 'Rupa Livestock Business School',
    sessionType: 'GAP',
    topic: 'Goat Breeding and Record Keeping',
    facilitator: 'Akite Sarah',
    date: '2024-01-08',
    startTime: '14:00',
    endTime: '17:00',
    venue: 'Rupa Livestock Demo Farm',
    attendees: {
      male: 11,
      female: 15,
      youth: 6,
      pwd: 1,
      total: 26
    },
    keyLearningOutcomes: [
      'Selection criteria for breeding bucks',
      'Breeding calendar planning',
      'Record keeping for livestock',
      'Market-oriented goat production'
    ],
    practicalActivities: [
      'Hands-on goat examination',
      'Record book completion',
      'Cost-benefit analysis exercise'
    ],
    challenges: ['Limited demonstration animals', 'Need for more record books'],
    followUpActions: ['Source quality breeding bucks', 'Provide record keeping materials'],
    weatherConditions: 'Partly cloudy, good for outdoor activities',
    facilitatorNotes: 'Members showed strong interest in improved breeding techniques'
  },
  {
    id: 'TRN003',
    groupId: 'FFS003',
    groupName: 'Kotido Millet Farmers School',
    sessionType: 'AESA',
    topic: 'Finger Millet Disease Management',
    facilitator: 'Apeyo Janet',
    date: '2024-01-15',
    startTime: '08:30',
    endTime: '11:30',
    venue: 'Kotido Agricultural Center',
    attendees: {
      male: 19,
      female: 23,
      youth: 11,
      pwd: 3,
      total: 42
    },
    keyLearningOutcomes: [
      'Common finger millet diseases (blast, rust)',
      'Disease prevention strategies',
      'Seed treatment methods',
      'Crop rotation benefits'
    ],
    practicalActivities: [
      'Disease symptom identification',
      'Seed treatment demonstration',
      'Planning crop rotation schedule'
    ],
    challenges: ['Limited disease samples for demonstration'],
    followUpActions: ['Collect disease samples from fields', 'Follow up on seed treatment adoption'],
    weatherConditions: 'Cool morning, suitable for training',
    facilitatorNotes: 'Excellent attendance and participation, members very engaged'
  },
  {
    id: 'TRN004',
    groupId: 'VSLA001',
    groupName: 'Kalapata Women VSLA',
    sessionType: 'Financial Literacy',
    topic: 'Savings and Loan Management',
    facilitator: 'Atyang Alice',
    date: '2024-01-10',
    startTime: '10:00',
    endTime: '13:00',
    venue: 'Kalapata Primary School',
    attendees: {
      male: 7,
      female: 16,
      youth: 5,
      pwd: 1,
      total: 23
    },
    keyLearningOutcomes: [
      'VSLA savings methodology',
      'Loan calculation and interest',
      'Record keeping for VSLA',
      'Business planning basics'
    ],
    practicalActivities: [
      'Mock savings session',
      'Loan calculation exercise',
      'Business idea development'
    ],
    challenges: ['Numeracy levels varied among members'],
    followUpActions: ['Additional numeracy support sessions', 'Peer mentoring setup'],
    weatherConditions: 'Warm day, indoor venue was comfortable',
    facilitatorNotes: 'Strong commitment to savings, need more business skills training'
  },
  {
    id: 'TRN005',
    groupId: 'FFS004',
    groupName: 'Lokopo Drought Resistant Crops FFS',
    sessionType: 'AESA',
    topic: 'Water Harvesting and Conservation',
    facilitator: 'Achen Martha',
    date: '2024-01-14',
    startTime: '09:00',
    endTime: '12:30',
    venue: 'Lokopo Water Point',
    attendees: {
      male: 17,
      female: 18,
      youth: 9,
      pwd: 2,
      total: 35
    },
    keyLearningOutcomes: [
      'Rainwater harvesting techniques',
      'Soil water conservation methods',
      'Drought-resistant crop varieties',
      'Mulching and composting'
    ],
    practicalActivities: [
      'Construction of simple water harvesting structure',
      'Mulching demonstration',
      'Compost pit preparation'
    ],
    challenges: ['Limited tools for practical work', 'Dry season reduced demonstration effectiveness'],
    followUpActions: ['Source tools for water harvesting', 'Plan rainy season follow-up'],
    weatherConditions: 'Hot and dry, typical for season',
    facilitatorNotes: 'Critical topic for the area, high farmer interest in water conservation'
  }
];

// E-Marketplace Listings Data
export const MARKETPLACE_LISTINGS = [
  // Agricultural Inputs
  {
    id: 'MKT001',
    category: 'Inputs',
    subcategory: 'Seeds',
    title: 'Certified Sorghum Seeds (Sekedo Variety)',
    description: 'High-yielding drought-resistant sorghum seeds suitable for Karamoja conditions. Certified by NARO.',
    seller: 'Kotido Agro-Dealers Cooperative',
    location: 'Kotido Town',
    district: 'Kotido',
    price: 15000,
    unit: 'kg',
    quantity: 200,
    contact: generateUgandanPhone(),
    datePosted: '2024-01-10',
    status: 'Available',
    images: [],
    specifications: {
      variety: 'Sekedo',
      maturityPeriod: '90-120 days',
      yieldPotential: '2-3 tons/hectare',
      certification: 'NARO Certified'
    }
  },
  {
    id: 'MKT002',
    category: 'Inputs',
    subcategory: 'Fertilizers',
    title: 'Organic Compost Manure',
    description: 'Well-decomposed organic compost suitable for all crops. Rich in nutrients and soil conditioning.',
    seller: 'Moroto Organic Farmers Group',
    location: 'Moroto Town',
    district: 'Moroto',
    price: 25000,
    unit: 'truck load (5 tons)',
    quantity: 10,
    contact: generateUgandanPhone(),
    datePosted: '2024-01-08',
    status: 'Available',
    images: [],
    specifications: {
      type: 'Cattle manure based',
      carbonNitrogenRatio: '25:1',
      moisture: '40-50%',
      packaging: 'Loose, truck delivery'
    }
  },
  {
    id: 'MKT003',
    category: 'Inputs',
    subcategory: 'Tools',
    title: 'Ox-Ploughs (Local Made)',
    description: 'Locally manufactured ox-ploughs suitable for Karamoja soil conditions. Durable iron construction.',
    seller: 'Napak Blacksmiths Cooperative',
    location: 'Matany Trading Center',
    district: 'Napak',
    price: 180000,
    unit: 'piece',
    quantity: 5,
    contact: generateUgandanPhone(),
    datePosted: '2024-01-12',
    status: 'Available',
    images: [],
    specifications: {
      material: 'Iron steel',
      weight: '25kg',
      oxenRequired: '2 animals',
      warranty: '1 year'
    }
  },
  // Agricultural Produce
  {
    id: 'MKT004',
    category: 'Produce',
    subcategory: 'Grains',
    title: 'Finger Millet (Amukeke) - Fresh Harvest',
    description: 'High-quality finger millet from recent harvest. Clean, dry and ready for market.',
    seller: 'Nakapiripirit Millet Farmers',
    location: 'Losidok Market',
    district: 'Nakapiripirit',
    price: 4500,
    unit: 'kg',
    quantity: 2000,
    contact: generateUgandanPhone(),
    datePosted: '2024-01-14',
    status: 'Available',
    images: [],
    specifications: {
      variety: 'Local Amukeke',
      moisture: '12%',
      purity: '98%',
      packaging: '50kg bags'
    }
  },
  {
    id: 'MKT005',
    category: 'Produce',
    subcategory: 'Legumes',
    title: 'Cowpeas (Eboro) - Premium Quality',
    description: 'Premium quality cowpeas, well dried and sorted. High protein content, suitable for household consumption and market.',
    seller: 'Kotyang Farmers Cooperative',
    location: 'Kotyang Market',
    district: 'Kotido',
    price: 6000,
    unit: 'kg',
    quantity: 800,
    contact: generateUgandanPhone(),
    datePosted: '2024-01-11',
    status: 'Available',
    images: [],
    specifications: {
      variety: 'Local Eboro',
      moisture: '10%',
      damaged: '<2%',
      packaging: '25kg bags'
    }
  },
  {
    id: 'MKT006',
    category: 'Produce',
    subcategory: 'Livestock',
    title: 'Local Goats for Sale',
    description: 'Healthy local goats, vaccinated and dewormed. Mixed ages available for breeding and meat.',
    seller: 'Amudat Livestock Traders',
    location: 'Amudat Livestock Market',
    district: 'Amudat',
    price: 250000,
    unit: 'animal',
    quantity: 15,
    contact: generateUgandanPhone(),
    datePosted: '2024-01-09',
    status: 'Available',
    images: [],
    specifications: {
      breed: 'Small East African',
      health: 'Vaccinated & Dewormed',
      ageRange: '1-3 years',
      purpose: 'Breeding/Meat'
    }
  },
  // Services
  {
    id: 'MKT007',
    category: 'Services',
    subcategory: 'Land Preparation',
    title: 'Tractor Plowing Services',
    description: 'Professional tractor plowing services for land preparation. Experienced operator with quality equipment.',
    seller: 'Karamoja Mechanization Services',
    location: 'Moroto Town',
    district: 'Moroto',
    price: 80000,
    unit: 'acre',
    quantity: 0, // Service
    contact: generateUgandanPhone(),
    datePosted: '2024-01-13',
    status: 'Available',
    images: [],
    specifications: {
      equipment: 'John Deere Tractor',
      serviceArea: 'All Karamoja Districts',
      season: 'Dry season preparation',
      booking: 'Advance booking required'
    }
  },
  {
    id: 'MKT008',
    category: 'Services',
    subcategory: 'Transportation',
    title: 'Produce Transportation to Markets',
    description: 'Reliable transportation services for agricultural produce to major markets in Kampala and Mbale.',
    seller: 'Karamoja Transport Cooperative',
    location: 'Kotido Town',
    district: 'Kotido',
    price: 2000,
    unit: 'kg',
    quantity: 0, // Service
    contact: generateUgandanPhone(),
    datePosted: '2024-01-07',
    status: 'Available',
    images: [],
    specifications: {
      destinations: 'Kampala, Mbale, Soroti',
      schedule: 'Weekly trips',
      capacity: '10 tons per trip',
      insurance: 'Goods covered'
    }
  },
  {
    id: 'MKT009',
    category: 'Services',
    subcategory: 'Veterinary',
    title: 'Mobile Veterinary Services',
    description: 'Professional veterinary services for livestock. Vaccination, treatment, and breeding services available.',
    seller: 'Dr. Lokiru Veterinary Services',
    location: 'Napak District',
    district: 'Napak',
    price: 50000,
    unit: 'visit',
    quantity: 0, // Service
    contact: generateUgandanPhone(),
    datePosted: '2024-01-15',
    status: 'Available',
    images: [],
    specifications: {
      services: 'Vaccination, Treatment, AI',
      coverage: 'All Karamoja Districts',
      availability: '24/7 Emergency',
      qualification: 'Licensed Veterinarian'
    }
  }
];

// VSLA Transaction Data
export const VSLA_TRANSACTIONS = [
  // Kalapata Women VSLA Transactions
  {
    id: 'VSLA001_001',
    groupId: 'VSLA001',
    groupName: 'Kalapata Women VSLA',
    date: '2024-01-10',
    type: 'Savings',
    memberName: 'Nakwang Joyce',
    amount: 50000,
    purpose: 'Regular weekly savings',
    runningBalance: 2750000,
    recordedBy: 'Logira Samuel (Treasurer)',
    notes: 'Consistent saver, on track with savings target'
  },
  {
    id: 'VSLA001_002',
    groupId: 'VSLA001',
    groupName: 'Kalapata Women VSLA',
    date: '2024-01-10',
    type: 'Loan',
    memberName: 'Atyang Alice',
    amount: -200000,
    purpose: 'Goat purchase for breeding',
    runningBalance: 2550000,
    recordedBy: 'Logira Samuel (Treasurer)',
    notes: 'Loan approved unanimously, 3-month repayment period',
    loanDetails: {
      interestRate: 5,
      repaymentPeriod: 3,
      monthlyRepayment: 70000,
      collateral: 'Group guarantee'
    }
  },
  {
    id: 'VSLA001_003',
    groupId: 'VSLA001',
    groupName: 'Kalapata Women VSLA',
    date: '2024-01-03',
    type: 'Savings',
    memberName: 'Nawal Helen',
    amount: 75000,
    purpose: 'Extra savings from cowpea sales',
    runningBalance: 2750000,
    recordedBy: 'Logira Samuel (Treasurer)',
    notes: 'Voluntary additional savings beyond weekly requirement'
  },
  {
    id: 'VSLA001_004',
    groupId: 'VSLA001',
    groupName: 'Kalapata Women VSLA',
    date: '2023-12-27',
    type: 'Loan Repayment',
    memberName: 'Lochoro Paul',
    amount: 75000,
    purpose: 'Monthly loan repayment + interest',
    runningBalance: 2675000,
    recordedBy: 'Logira Samuel (Treasurer)',
    notes: 'On-time payment, good repayment history'
  },
  // Losidok Unity VSLA Transactions
  {
    id: 'VSLA002_001',
    groupId: 'VSLA002',
    groupName: 'Losidok Unity VSLA',
    date: '2024-01-09',
    type: 'Savings',
    memberName: 'Nalem Betty',
    amount: 40000,
    purpose: 'Regular weekly savings',
    runningBalance: 1850000,
    recordedBy: 'Lomuria Robert (Treasurer)',
    notes: 'Regular weekly contribution'
  },
  {
    id: 'VSLA002_002',
    groupId: 'VSLA002',
    groupName: 'Losidok Unity VSLA',
    date: '2024-01-09',
    type: 'Emergency Fund',
    memberName: 'Aol Christine',
    amount: 10000,
    purpose: 'Emergency fund contribution',
    runningBalance: 1860000,
    recordedBy: 'Lomuria Robert (Treasurer)',
    notes: 'Monthly emergency fund contribution'
  },
  {
    id: 'VSLA002_003',
    groupId: 'VSLA002',
    groupName: 'Losidok Unity VSLA',
    date: '2024-01-02',
    type: 'Loan',
    memberName: 'Lokiring Thomas',
    amount: -150000,
    purpose: 'Seed money for millet farming',
    runningBalance: 1850000,
    recordedBy: 'Lomuria Robert (Treasurer)',
    notes: 'Seasonal loan for agricultural inputs',
    loanDetails: {
      interestRate: 5,
      repaymentPeriod: 4,
      monthlyRepayment: 40000,
      collateral: 'Future harvest'
    }
  }
];

// Advisory Content Data
export const ADVISORY_CONTENT = [
  {
    id: 'ADV001',
    category: 'Seasonal Calendar',
    title: 'Karamoja Farming Calendar 2024',
    type: 'calendar',
    content: {
      season1: {
        name: 'First Rains (March - July)',
        months: ['March', 'April', 'May', 'June', 'July'],
        activities: {
          'March': ['Land preparation', 'Early planting preparation', 'Tool maintenance'],
          'April': ['First planting (sorghum, millet)', 'Weeding', 'Pest monitoring'],
          'May': ['Second weeding', 'Gap filling', 'Continue planting'],
          'June': ['Crop monitoring', 'Pest control', 'Water management'],
          'July': ['Harvesting early varieties', 'Post-harvest handling', 'Storage preparation']
        }
      },
      season2: {
        name: 'Second Rains (August - December)',
        months: ['August', 'September', 'October', 'November', 'December'],
        activities: {
          'August': ['Second season planting', 'Land preparation for second crops'],
          'September': ['Weeding second season crops', 'Harvesting first season'],
          'October': ['Continued harvesting', 'Storage and processing'],
          'November': ['Final harvesting', 'Land preparation for next season'],
          'December': ['Dry season farming preparation', 'Equipment maintenance']
        }
      }
    },
    lastUpdated: '2024-01-01',
    author: 'FOSTER Project Technical Team'
  },
  {
    id: 'ADV002',
    category: 'Crop Guides',
    title: 'Sorghum Production Guide for Karamoja',
    type: 'guide',
    content: {
      introduction: 'Sorghum is the most important cereal crop in Karamoja due to its drought tolerance and adaptability to semi-arid conditions.',
      varieties: [
        {
          name: 'Sekedo',
          maturity: '90-120 days',
          yield: '2-3 tons/hectare',
          characteristics: 'Drought tolerant, good grain quality, preferred for local consumption'
        },
        {
          name: 'Epuripur',
          maturity: '120-150 days',
          yield: '3-4 tons/hectare',
          characteristics: 'Higher yield potential, requires more water, good for commercial production'
        }
      ],
      landPreparation: [
        'Prepare land during dry season (December-February)',
        'Clear vegetation and burn crop residues',
        'Plough 15-20cm deep when soil moisture is adequate',
        'Level the field and make furrows for planting'
      ],
      planting: [
        'Plant at onset of rains (March-April)',
        'Use 8-10kg seeds per hectare',
        'Plant in rows 60cm apart',
        'Plant 2-3 seeds per hole, 20cm between holes',
        'Cover seeds with 2-3cm soil'
      ],
      management: [
        'First weeding: 2-3 weeks after germination',
        'Second weeding: 4-6 weeks after germination',
        'Thin to 1-2 plants per hole during first weeding',
        'Apply organic manure if available (2-3 tons/hectare)'
      ],
      pestManagement: [
        'Monitor for shoot flies, stem borers, and birds',
        'Use neem-based organic pesticides',
        'Plant early to avoid peak pest periods',
        'Use bird scaring techniques during grain filling'
      ],
      harvesting: [
        'Harvest when grains are hard and moisture is 15-20%',
        'Cut heads early morning to avoid grain shattering',
        'Dry in sun for 7-10 days before threshing',
        'Store in properly ventilated stores'
      ]
    },
    lastUpdated: '2024-01-05',
    author: 'NARO Serere & FOSTER Technical Team'
  },
  {
    id: 'ADV003',
    category: 'Livestock Management',
    title: 'Goat Management for Smallholder Farmers',
    type: 'guide',
    content: {
      introduction: 'Goats are well-adapted to Karamoja conditions and provide income, food, and serve as a bank for emergencies.',
      breeds: [
        {
          name: 'Small East African Goat',
          characteristics: 'Hardy, drought tolerant, good mothering ability, multiple births',
          adultWeight: '25-35kg',
          uses: 'Meat, milk, skins'
        }
      ],
      housing: [
        'Construct simple but adequate shelter',
        'Raised floors to keep goats dry',
        'Good ventilation to prevent respiratory diseases',
        'Easy to clean and disinfect'
      ],
      feeding: [
        'Provide access to browse and pasture',
        'Supplement with agricultural by-products',
        'Ensure clean water is always available',
        'Provide mineral licks or supplements'
      ],
      breeding: [
        'Select healthy, well-built breeding stock',
        'Maintain breeding records',
        'Practice controlled breeding for genetic improvement',
        'Separate breeding males from females when not breeding'
      ],
      healthManagement: [
        'Vaccinate against PPR, CCPP, and other diseases',
        'Deworm regularly (every 3-4 months)',
        'Quarantine new animals before introduction',
        'Monitor animals daily for signs of illness'
      ],
      recordKeeping: [
        'Keep records of animals (births, deaths, sales)',
        'Track breeding dates and kidding',
        'Record vaccination and treatment dates',
        'Monitor feed costs and income from sales'
      ]
    },
    lastUpdated: '2024-01-08',
    author: 'NADDEC & FOSTER Livestock Specialists'
  },
  {
    id: 'ADV004',
    category: 'Weather Information',
    title: 'Karamoja Weather Update - January 2024',
    type: 'weather',
    content: {
      currentConditions: {
        temperature: { min: 18, max: 32, unit: '°C' },
        humidity: 45,
        rainfall: 0,
        windSpeed: 12,
        outlook: 'Hot and dry conditions continue across Karamoja region'
      },
      weeklyForecast: [
        { date: '2024-01-16', min: 19, max: 33, conditions: 'Sunny', rainfall: 0 },
        { date: '2024-01-17', min: 18, max: 32, conditions: 'Partly cloudy', rainfall: 0 },
        { date: '2024-01-18', min: 20, max: 34, conditions: 'Sunny', rainfall: 0 },
        { date: '2024-01-19', min: 19, max: 33, conditions: 'Hot', rainfall: 0 },
        { date: '2024-01-20', min: 18, max: 31, conditions: 'Partly cloudy', rainfall: 2 },
        { date: '2024-01-21', min: 17, max: 30, conditions: 'Cloudy', rainfall: 5 },
        { date: '2024-01-22', min: 19, max: 32, conditions: 'Sunny', rainfall: 0 }
      ],
      seasonalOutlook: {
        nextRains: 'March-April 2024',
        confidence: 'Medium to High',
        recommendation: 'Prepare land and procure inputs for first season planting'
      },
      advisories: [
        'Continue dry season farming where water is available',
        'Maintain livestock nutrition through supplemental feeding',
        'Prepare for land preparation activities',
        'Service and maintain farm equipment'
      ]
    },
    lastUpdated: '2024-01-15',
    author: 'UNMA & FOSTER Climate Information Service'
  }
];

// M&E Dashboard Data
export const MONITORING_DATA = {
  // Summary Statistics
  summary: {
    totalGroups: 8,
    totalMembers: 255,
    activeVSLAs: 2,
    activeFFS: 5,
    activeFBS: 2,
    totalSavings: 4610000, // Combined VSLA savings
    totalLoans: 350000,
    trainingSessionsCompleted: 124,
    averageAttendance: 83.5
  },
  
  // Monthly Progress Data
  monthlyProgress: [
    { month: 'Jan 2024', newGroups: 0, newMembers: 5, trainingSessions: 12, savings: 4610000 },
    { month: 'Dec 2023', newGroups: 1, newMembers: 8, trainingSessions: 10, savings: 4200000 },
    { month: 'Nov 2023', newGroups: 0, newMembers: 3, trainingSessions: 8, savings: 3900000 },
    { month: 'Oct 2023', newGroups: 1, newMembers: 12, trainingSessions: 11, savings: 3700000 },
    { month: 'Sep 2023', newGroups: 2, newMembers: 15, trainingSessions: 14, savings: 3400000 },
    { month: 'Aug 2023', newGroups: 1, newMembers: 22, trainingSessions: 9, savings: 3100000 }
  ],
  
  // District-wise Performance
  districtPerformance: [
    { district: 'Kotido', groups: 2, members: 70, completionRate: 90, savings: 2000000 },
    { district: 'Moroto', groups: 2, members: 60, completionRate: 81.5, savings: 1500000 },
    { district: 'Napak', groups: 2, members: 68, completionRate: 78, savings: 800000 },
    { district: 'Nakapiripirit', groups: 1, members: 22, completionRate: 90, savings: 310000 },
    { district: 'Amudat', groups: 1, members: 35, completionRate: 79, savings: 0 }
  ],
  
  // Gender and Youth Participation
  demographics: {
    gender: { male: 105, female: 150 },
    youth: 49,
    pwd: 12,
    categories: [
      { category: 'Adult Male', count: 56, percentage: 22 },
      { category: 'Adult Female', count: 101, percentage: 40 },
      { category: 'Youth Male', count: 25, percentage: 10 },
      { category: 'Youth Female', count: 24, percentage: 9 },
      { category: 'PWD Male', count: 6, percentage: 2 },
      { category: 'PWD Female', count: 6, percentage: 2 }
    ]
  },
  
  // Training Effectiveness
  trainingMetrics: {
    totalSessions: 124,
    averageAttendance: 83.5,
    topicDistribution: [
      { topic: 'AESA', sessions: 45, attendance: 85 },
      { topic: 'GAP', sessions: 32, attendance: 82 },
      { topic: 'Financial Literacy', sessions: 28, attendance: 87 },
      { topic: 'Market Orientation', sessions: 19, attendance: 78 }
    ],
    seasonalTrends: [
      { month: 'Jan', sessions: 12, attendance: 84 },
      { month: 'Dec', sessions: 10, attendance: 86 },
      { month: 'Nov', sessions: 8, attendance: 82 },
      { month: 'Oct', sessions: 11, attendance: 79 },
      { month: 'Sep', sessions: 14, attendance: 88 },
      { month: 'Aug', sessions: 9, attendance: 81 }
    ]
  },
  
  // Financial Performance (VSLA specific)
  financialMetrics: {
    totalSavings: 4610000,
    totalLoans: 350000,
    repaymentRate: 96,
    averageLoanSize: 175000,
    savingsGrowth: [
      { month: 'Jan 2024', amount: 4610000 },
      { month: 'Dec 2023', amount: 4200000 },
      { month: 'Nov 2023', amount: 3900000 },
      { month: 'Oct 2023', amount: 3700000 },
      { month: 'Sep 2023', amount: 3400000 },
      { month: 'Aug 2023', amount: 3100000 }
    ]
  }
};

// System Users Data
export const USERS_DATA = [
  {
    id: 1,
    name: 'Dr. Akello Grace',
    email: 'g.akello@foster.ug',
    phone: '+256701234567',
    role: 'Admin',
    department: 'Management',
    location: 'Moroto District',
    status: 'Active',
    createdAt: '2023-06-15T08:00:00Z',
  },
  {
    id: 2,
    name: 'Lopeyok Peter',
    email: 'p.lopeyok@foster.ug',
    phone: '+256702345678',
    role: 'Manager',
    department: 'Field Operations',
    location: 'Kotido District',
    status: 'Active',
    createdAt: '2023-07-20T09:30:00Z',
  },
  {
    id: 3,
    name: 'Nakut Mary',
    email: 'm.nakut@foster.ug',
    phone: '+256703456789',
    role: 'Field Officer',
    department: 'Field Operations',
    location: 'Napak District',
    status: 'Active',
    createdAt: '2023-08-10T10:15:00Z',
  },
  {
    id: 4,
    name: 'Lomonyang John',
    email: 'j.lomonyang@foster.ug',
    phone: '+256704567890',
    role: 'Field Officer',
    department: 'Training',
    location: 'Nakapiripirit District',
    status: 'Active',
    createdAt: '2023-08-25T11:45:00Z',
  },
  {
    id: 5,
    name: 'Akite Sarah',
    email: 's.akite@foster.ug',
    phone: '+256705678901',
    role: 'Data Entry',
    department: 'Monitoring & Evaluation',
    location: 'Amudat District',
    status: 'Active',
    createdAt: '2023-09-05T14:20:00Z',
  },
  {
    id: 6,
    name: 'Lokwang James',
    email: 'j.lokwang@foster.ug',
    phone: '+256706789012',
    role: 'Manager',
    department: 'Finance',
    location: 'Karenga District',
    status: 'Active',
    createdAt: '2023-09-20T16:00:00Z',
  },
  {
    id: 7,
    name: 'Nakapit Rose',
    email: 'r.nakapit@foster.ug',
    phone: '+256707890123',
    role: 'Field Officer',
    department: 'Field Operations',
    location: 'Moroto District',
    status: 'Inactive',
    createdAt: '2023-10-01T08:30:00Z',
  },
  {
    id: 8,
    name: 'Lodungokol David',
    email: 'd.lodungokol@foster.ug',
    phone: '+256708901234',
    role: 'Data Entry',
    department: 'Finance',
    location: 'Kotido District',
    status: 'Active',
    createdAt: '2023-10-15T13:45:00Z',
  },
  {
    id: 9,
    name: 'Apeyo Janet',
    email: 'j.apeyo@foster.ug',
    phone: '+256709012345',
    role: 'Field Officer',
    department: 'Training',
    location: 'Napak District',
    status: 'Active',
    createdAt: '2023-11-01T09:15:00Z',
  },
  {
    id: 10,
    name: 'Lokiru Moses',
    email: 'm.lokiru@foster.ug',
    phone: '+256700123456',
    role: 'Manager',
    department: 'Monitoring & Evaluation',
    location: 'Nakapiripirit District',
    status: 'Suspended',
    createdAt: '2023-11-20T15:30:00Z',
  }
];

// Financial Tracking Data
export const FINANCIAL_DATA = [
  {
    id: 1,
    reference: 'FIN-2024-001',
    date: '2024-01-15T10:30:00Z',
    entity: 'Napak Women VSLA',
    type: 'VSLA Savings',
    category: 'Income',
    amount: 850000,
    description: 'Monthly savings collection from 25 members',
    location: 'Napak',
    status: 'Completed'
  },
  {
    id: 2,
    reference: 'FIN-2024-002',
    date: '2024-01-18T14:15:00Z',
    entity: 'Moroto Farmers FFS',
    type: 'Grant Disbursement',
    category: 'Expense',
    amount: 2500000,
    description: 'Agricultural inputs grant disbursement for season B',
    location: 'Moroto',
    status: 'Completed'
  },
  {
    id: 3,
    reference: 'FIN-2024-003',
    date: '2024-01-20T09:45:00Z',
    entity: 'Kotido Youth VSLA',
    type: 'VSLA Loan',
    category: 'Investment',
    amount: 500000,
    description: 'Small business loan to member for livestock trading',
    location: 'Kotido',
    status: 'Completed'
  },
  {
    id: 4,
    reference: 'FIN-2024-004',
    date: '2024-01-22T11:20:00Z',
    entity: 'Training Venue - Nakapiripirit',
    type: 'Training Cost',
    category: 'Expense',
    amount: 750000,
    description: 'AESA training session costs including materials and refreshments',
    location: 'Nakapiripirit',
    status: 'Completed'
  },
  {
    id: 5,
    reference: 'FIN-2024-005',
    date: '2024-01-25T08:30:00Z',
    entity: 'Amudat Mixed FBS',
    type: 'Equipment',
    category: 'Expense',
    amount: 1200000,
    description: 'Purchase of demonstration plot tools and storage equipment',
    location: 'Amudat',
    status: 'Pending'
  },
  {
    id: 6,
    reference: 'FIN-2024-006',
    date: '2024-01-28T16:00:00Z',
    entity: 'Karenga Women VSLA',
    type: 'VSLA Savings',
    category: 'Income',
    amount: 450000,
    description: 'Bi-weekly savings collection from 18 members',
    location: 'Karenga',
    status: 'Completed'
  },
  {
    id: 7,
    reference: 'FIN-2024-007',
    date: '2024-01-30T13:45:00Z',
    entity: 'Kaabong Pastoralists FFS',
    type: 'Grant Disbursement',
    category: 'Expense',
    amount: 1800000,
    description: 'Livestock improvement grant for breeding program',
    location: 'Kaabong',
    status: 'Failed'
  },
  {
    id: 8,
    reference: 'FIN-2024-008',
    date: '2024-02-02T10:15:00Z',
    entity: 'Moroto Youth VSLA',
    type: 'VSLA Loan',
    category: 'Investment',
    amount: 300000,
    description: 'Education loan for member\'s child school fees',
    location: 'Moroto',
    status: 'Completed'
  },
  {
    id: 9,
    reference: 'FIN-2024-009',
    date: '2024-02-05T15:30:00Z',
    entity: 'Regional Training Center',
    type: 'Training Cost',
    category: 'Expense',
    amount: 950000,
    description: 'GAP training workshop for field officers and lead farmers',
    location: 'Kotido',
    status: 'Completed'
  },
  {
    id: 10,
    reference: 'FIN-2024-010',
    date: '2024-02-08T12:00:00Z',
    entity: 'Napak Mixed VSLA',
    type: 'VSLA Savings',
    category: 'Income',
    amount: 920000,
    description: 'Monthly savings plus share-out preparation funds',
    location: 'Napak',
    status: 'Completed'
  }
];

// Export function to initialize data in localStorage
export const initializeSeedData = () => {
  const data = {
    groups: GROUPS_DATA,
    users: USERS_DATA,
    financial: FINANCIAL_DATA,
    trainingSessions: TRAINING_SESSIONS,
    marketplaceListings: MARKETPLACE_LISTINGS,
    vslaTransactions: VSLA_TRANSACTIONS,
    advisoryContent: ADVISORY_CONTENT,
    monitoringData: MONITORING_DATA,
    lastUpdated: new Date().toISOString()
  };
  
  // Store in localStorage using our storage utility
  localStorage.setItem('fosterMISData', JSON.stringify(data));
  console.log('✅ FOSTER Project MIS seed data initialized successfully');
  return data;
};

// Utility functions for data manipulation
export const getGroupsByDistrict = (district) => {
  return GROUPS_DATA.filter(group => group.district === district);
};

export const getGroupsByType = (type) => {
  return GROUPS_DATA.filter(group => group.type === type);
};

export const getTrainingsByGroup = (groupId) => {
  return TRAINING_SESSIONS.filter(session => session.groupId === groupId);
};

export const getMarketListingsByCategory = (category) => {
  return MARKETPLACE_LISTINGS.filter(listing => listing.category === category);
};

export const getVSLATransactionsByGroup = (groupId) => {
  return VSLA_TRANSACTIONS.filter(transaction => transaction.groupId === groupId);
};

// Default export
export default {
  GROUPS_DATA,
  USERS_DATA,
  FINANCIAL_DATA,
  TRAINING_SESSIONS,
  MARKETPLACE_LISTINGS,
  VSLA_TRANSACTIONS,
  ADVISORY_CONTENT,
  MONITORING_DATA,
  initializeSeedData,
  getGroupsByDistrict,
  getGroupsByType,
  getTrainingsByGroup,
  getMarketListingsByCategory,
  getVSLATransactionsByGroup
};
