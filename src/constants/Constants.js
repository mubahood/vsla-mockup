// Base configuration - MOCKUP MODE (No Backend) - FOSTER PROJECT
export const BASE_URL = "";
export const API_URL = "";
export const ADMIN_URL = "";
export const TIMEOUT = 30000;
export const MAX_RETRIES = 3;
export const DATE_FORMAT = "YYYY-MM-DD";
export const CURRENCY = "UGX";

// Storage Keys - FOSTER Project
export const LOCAL_MANIFEST = "FOSTER_LOCAL_MANIFEST";
export const LOCAL_DISTRICTS = "FOSTER_LOCAL_DISTRICTS";
export const LOCAL_FFS_MANIFEST = "LOCAL_FFS_MANIFEST";
export const DB_TOKEN = "DB_TOKEN";
export const DB_LOGGED_IN_PROFILE = "DB_LOGGED_IN_PROFILE";
export const DB_MANIFEST = "DB_MANIFEST";
export const VSLA_DATA = "FOSTER_VSLA_DATA";
export const FFS_GROUPS = "FOSTER_FFS_GROUPS";
export const TRAINING_LOGS = "FOSTER_TRAINING_LOGS";

// Assets - Using local/placeholder assets
export const LOGO = "/logo192.png";
export const DEFAULT_AVATAR = "data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23ddd'/%3e%3ctext x='50' y='50' font-size='18' text-anchor='middle' dy='7'%3eFarmer%3c/text%3e%3c/svg%3e";
export const DEFAULT_IMAGE = "data:image/svg+xml,%3csvg width='300' height='200' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='300' height='200' fill='%23f0f0f0'/%3e%3ctext x='150' y='100' font-size='18' text-anchor='middle' dy='7'%3eAgricultural%3c/text%3e%3c/svg%3e";

// FFS Role Options
export const FFS_ROLE_OPTIONS = [
  { value: "ffs_facilitator", label: "FFS Facilitator" },
  { value: "extension_officer", label: "Extension Officer" },
  { value: "community_facilitator", label: "Community Facilitator" },
  { value: "vsla_coordinator", label: "VSLA Coordinator" },
  { value: "field_coordinator", label: "Field Coordinator" },
];

// Karamoja Districts
export const KARAMOJA_DISTRICTS = [
  { value: "Abim", label: "Abim" },
  { value: "Amudat", label: "Amudat" },
  { value: "Kaabong", label: "Kaabong" },
  { value: "Kotido", label: "Kotido" },
  { value: "Moroto", label: "Moroto" },
  { value: "Nakapiripirit", label: "Nakapiripirit" },
  { value: "Napak", label: "Napak" },
  { value: "Nabilatuk", label: "Nabilatuk" },
  { value: "Karenga", label: "Karenga" },
];

// Countries List
export const COUNTRIES = [
  { value: "UG", label: "Uganda" },
  { value: "AF", label: "Afghanistan" },
  { value: "AL", label: "Albania" },
  { value: "DZ", label: "Algeria" },
  { value: "AS", label: "American Samoa" },
  { value: "AD", label: "Andorra" },
  { value: "AO", label: "Angola" },
  { value: "AI", label: "Anguilla" },
  { value: "AQ", label: "Antarctica" },
  { value: "AG", label: "Antigua and Barbuda" },
  { value: "AR", label: "Argentina" },
  { value: "AM", label: "Armenia" },
  { value: "AW", label: "Aruba" },
  { value: "AU", label: "Australia" },
  { value: "AT", label: "Austria" },
  { value: "AZ", label: "Azerbaijan" },
  { value: "BS", label: "Bahamas" },
  { value: "BH", label: "Bahrain" },
  { value: "BD", label: "Bangladesh" },
  { value: "BB", label: "Barbados" },
  { value: "BY", label: "Belarus" },
  { value: "BE", label: "Belgium" },
  { value: "BZ", label: "Belize" },
  { value: "BJ", label: "Benin" },
  { value: "BM", label: "Bermuda" },
  { value: "BT", label: "Bhutan" },
  { value: "BO", label: "Bolivia" },
  { value: "BA", label: "Bosnia and Herzegovina" },
  { value: "BW", label: "Botswana" },
  { value: "BR", label: "Brazil" },
  { value: "BN", label: "Brunei Darussalam" },
  { value: "BG", label: "Bulgaria" },
  { value: "BF", label: "Burkina Faso" },
  { value: "BI", label: "Burundi" },
  { value: "KH", label: "Cambodia" },
  { value: "CM", label: "Cameroon" },
  { value: "CA", label: "Canada" },
  { value: "CV", label: "Cape Verde" },
  { value: "KY", label: "Cayman Islands" },
  { value: "CF", label: "Central African Republic" },
  { value: "TD", label: "Chad" },
  { value: "CL", label: "Chile" },
  { value: "CN", label: "China" },
  { value: "CO", label: "Colombia" },
  { value: "KM", label: "Comoros" },
  { value: "CG", label: "Congo" },
  { value: "CD", label: "Congo, Democratic Republic" },
  { value: "CR", label: "Costa Rica" },
  { value: "CI", label: "Cote d'Ivoire" },
  { value: "HR", label: "Croatia" },
  { value: "CU", label: "Cuba" },
  { value: "CY", label: "Cyprus" },
  { value: "CZ", label: "Czech Republic" },
  { value: "DK", label: "Denmark" },
  { value: "DJ", label: "Djibouti" },
  { value: "DM", label: "Dominica" },
  { value: "DO", label: "Dominican Republic" },
  { value: "EC", label: "Ecuador" },
  { value: "EG", label: "Egypt" },
  { value: "SV", label: "El Salvador" },
  { value: "GQ", label: "Equatorial Guinea" },
  { value: "ER", label: "Eritrea" },
  { value: "EE", label: "Estonia" },
  { value: "ET", label: "Ethiopia" },
  { value: "FJ", label: "Fiji" },
  { value: "FI", label: "Finland" },
  { value: "FR", label: "France" },
  { value: "GA", label: "Gabon" },
  { value: "GM", label: "Gambia" },
  { value: "GE", label: "Georgia" },
  { value: "DE", label: "Germany" },
  { value: "GH", label: "Ghana" },
  { value: "GR", label: "Greece" },
  { value: "GD", label: "Grenada" },
  { value: "GU", label: "Guam" },
  { value: "GT", label: "Guatemala" },
  { value: "GN", label: "Guinea" },
  { value: "GW", label: "Guinea-Bissau" },
  { value: "GY", label: "Guyana" },
  { value: "HT", label: "Haiti" },
  { value: "HN", label: "Honduras" },
  { value: "HK", label: "Hong Kong" },
  { value: "HU", label: "Hungary" },
  { value: "IS", label: "Iceland" },
  { value: "IN", label: "India" },
  { value: "ID", label: "Indonesia" },
  { value: "IR", label: "Iran" },
  { value: "IQ", label: "Iraq" },
  { value: "IE", label: "Ireland" },
  { value: "IL", label: "Israel" },
  { value: "IT", label: "Italy" },
  { value: "JM", label: "Jamaica" },
  { value: "JP", label: "Japan" },
  { value: "JO", label: "Jordan" },
  { value: "KZ", label: "Kazakhstan" },
  { value: "KE", label: "Kenya" },
  { value: "KI", label: "Kiribati" },
  { value: "KP", label: "Korea, Democratic People's Republic" },
  { value: "KR", label: "Korea, Republic" },
  { value: "KW", label: "Kuwait" },
  { value: "KG", label: "Kyrgyzstan" },
  { value: "LA", label: "Lao People's Democratic Republic" },
  { value: "LV", label: "Latvia" },
  { value: "LB", label: "Lebanon" },
  { value: "LS", label: "Lesotho" },
  { value: "LR", label: "Liberia" },
  { value: "LY", label: "Libya" },
  { value: "LI", label: "Liechtenstein" },
  { value: "LT", label: "Lithuania" },
  { value: "LU", label: "Luxembourg" },
  { value: "MO", label: "Macao" },
  { value: "MK", label: "Macedonia" },
  { value: "MG", label: "Madagascar" },
  { value: "MW", label: "Malawi" },
  { value: "MY", label: "Malaysia" },
  { value: "MV", label: "Maldives" },
  { value: "ML", label: "Mali" },
  { value: "MT", label: "Malta" },
  { value: "MH", label: "Marshall Islands" },
  { value: "MR", label: "Mauritania" },
  { value: "MU", label: "Mauritius" },
  { value: "MX", label: "Mexico" },
  { value: "FM", label: "Micronesia" },
  { value: "MD", label: "Moldova" },
  { value: "MC", label: "Monaco" },
  { value: "MN", label: "Mongolia" },
  { value: "ME", label: "Montenegro" },
  { value: "MS", label: "Montserrat" },
  { value: "MA", label: "Morocco" },
  { value: "MZ", label: "Mozambique" },
  { value: "MM", label: "Myanmar" },
  { value: "NA", label: "Namibia" },
  { value: "NR", label: "Nauru" },
  { value: "NP", label: "Nepal" },
  { value: "NL", label: "Netherlands" },
  { value: "NZ", label: "New Zealand" },
  { value: "NI", label: "Nicaragua" },
  { value: "NE", label: "Niger" },
  { value: "NG", label: "Nigeria" },
  { value: "NU", label: "Niue" },
  { value: "NF", label: "Norfolk Island" },
  { value: "MP", label: "Northern Mariana Islands" },
  { value: "NO", label: "Norway" },
  { value: "OM", label: "Oman" },
  { value: "PK", label: "Pakistan" },
  { value: "PW", label: "Palau" },
  { value: "PS", label: "Palestine" },
  { value: "PA", label: "Panama" },
  { value: "PG", label: "Papua New Guinea" },
  { value: "PY", label: "Paraguay" },
  { value: "PE", label: "Peru" },
  { value: "PH", label: "Philippines" },
  { value: "PL", label: "Poland" },
  { value: "PT", label: "Portugal" },
  { value: "PR", label: "Puerto Rico" },
  { value: "QA", label: "Qatar" },
  { value: "RO", label: "Romania" },
  { value: "RU", label: "Russian Federation" },
  { value: "RW", label: "Rwanda" },
  { value: "KN", label: "Saint Kitts and Nevis" },
  { value: "LC", label: "Saint Lucia" },
  { value: "VC", label: "Saint Vincent and the Grenadines" },
  { value: "WS", label: "Samoa" },
  { value: "SM", label: "San Marino" },
  { value: "ST", label: "Sao Tome and Principe" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "SN", label: "Senegal" },
  { value: "RS", label: "Serbia" },
  { value: "SC", label: "Seychelles" },
  { value: "SL", label: "Sierra Leone" },
  { value: "SG", label: "Singapore" },
  { value: "SK", label: "Slovakia" },
  { value: "SI", label: "Slovenia" },
  { value: "SB", label: "Solomon Islands" },
  { value: "SO", label: "Somalia" },
  { value: "ZA", label: "South Africa" },
  { value: "SS", label: "South Sudan" },
  { value: "ES", label: "Spain" },
  { value: "LK", label: "Sri Lanka" },
  { value: "SD", label: "Sudan" },
  { value: "SR", label: "Suriname" },
  { value: "SZ", label: "Swaziland" },
  { value: "SE", label: "Sweden" },
  { value: "CH", label: "Switzerland" },
  { value: "SY", label: "Syrian Arab Republic" },
  { value: "TW", label: "Taiwan" },
  { value: "TJ", label: "Tajikistan" },
  { value: "TZ", label: "Tanzania" },
  { value: "TH", label: "Thailand" },
  { value: "TL", label: "Timor-Leste" },
  { value: "TG", label: "Togo" },
  { value: "TO", label: "Tonga" },
  { value: "TT", label: "Trinidad and Tobago" },
  { value: "TN", label: "Tunisia" },
  { value: "TR", label: "Turkey" },
  { value: "TM", label: "Turkmenistan" },
  { value: "TV", label: "Tuvalu" },
  { value: "UA", label: "Ukraine" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "GB", label: "United Kingdom" },
  { value: "US", label: "United States" },
  { value: "UY", label: "Uruguay" },
  { value: "UZ", label: "Uzbekistan" },
  { value: "VU", label: "Vanuatu" },
  { value: "VE", label: "Venezuela" },
  { value: "VN", label: "Viet Nam" },
  { value: "YE", label: "Yemen" },
  { value: "ZM", label: "Zambia" },
  { value: "ZW", label: "Zimbabwe" },
];

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: 'users/login',
  REGISTER: 'users/register',
  LOGOUT: 'auth/logout',
  REFRESH: 'auth/refresh',
  FORGOT_PASSWORD: 'auth/forgot-password',
  RESET_PASSWORD: 'auth/reset-password',
  VERIFY_EMAIL: 'auth/verify-email',
  
  // User management
  PROFILE: 'users/me',
  UPDATE_PROFILE: 'update-profile',
  CHANGE_PASSWORD: 'password-change',
  UPLOAD_AVATAR: 'post-media-upload',
  DELETE_ACCOUNT: 'delete-account',
  
  // Core data
  MANIFEST: 'manifest',
  USERS: 'users',
  
  // Agricultural management
  FARMER_MEMBERS: 'farmer-members',
  TRAINING_SESSIONS: 'training-sessions',
  TASKS: 'tasks',
  SERVICES: 'services',
  AGRICULTURAL_SERVICES: 'agricultural-services',
  DEPARTMENTS: 'departments',
  DOSE_ITEMS: 'dose-item-records',
  DOSE_ITEMS_STATE: 'dose-item-records-state',
  
  // Billing and payments
  CONSULTATION_BILLING: 'consultation-billing',
  CONSULTATION_PAYMENTS: 'consultation-payments',
  PAYMENT_RECORDS: 'payment-records',
  CONSULTATION_CARD_PAYMENT: 'consultation-card-payment',
  CONSULTATION_FLUTTERWAVE_PAYMENT: 'consultation-flutterwave-payment',
  FLUTTERWAVE_PAYMENT_VERIFICATION: 'flutterwave-payment-verification',
  
  // Tasks and meetings
  TASKS_CREATE: 'tasks-create',
  TASKS_UPDATE_STATUS: 'tasks-update-status',
  CONSULTATION_CREATE: 'consultation-create',
  MEETINGS: 'meetings',
  
  // Laboratory and radiology
  LABORATORY: 'laboratory',
  LAB_TESTS: 'laboratory/tests',
  LAB_RESULTS: 'laboratory/results',
  RADIOLOGY: 'radiology',
  
  // Reports and analytics
  REPORTS: 'reports',
  ANALYTICS: 'analytics',
  
  // Settings
  SETTINGS: 'settings',
  SYSTEM_SETTINGS: 'settings/system'
};

// User Roles - FOSTER Project
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  AGRICULTURAL_SPECIALIST: 'agricultural_specialist',
  FIELD_OFFICER: 'field_officer',
  FARMER_MEMBER: 'farmer_member',
  FFS_FACILITATOR: 'ffs_facilitator',
  STAFF: 'staff',
  EXTENSION_OFFICER: 'extension_officer',
  LIVESTOCK_SPECIALIST: 'livestock_specialist',
  VSLA_COORDINATOR: 'vsla_coordinator',
};

// Training Session Status
export const TRAINING_STATUS = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
  RESCHEDULED: 'rescheduled',
};

// Member Status
export const MEMBER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ADMITTED: 'admitted',
  DISCHARGED: 'discharged',
  TRANSFERRED: 'transferred',
  DECEASED: 'deceased',
};

// Gender Options
export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

// Blood Type Options
export const BLOOD_TYPE_OPTIONS = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
];

// Marital Status Options
export const MARITAL_STATUS_OPTIONS = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
  { value: 'separated', label: 'Separated' },
];

// Department Options
export const DEPARTMENT_OPTIONS = [
  { value: 'emergency', label: 'Emergency' },
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'neurology', label: 'Neurology' },
  { value: 'orthopedics', label: 'Orthopedics' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'obstetrics', label: 'Obstetrics & Gynecology' },
  { value: 'radiology', label: 'Radiology' },
  { value: 'pathology', label: 'Pathology' },
  { value: 'pharmacy', label: 'Pharmacy' },
  { value: 'nursing', label: 'Nursing' },
  { value: 'administration', label: 'Administration' },
  { value: 'general_surgery', label: 'General Surgery' },
  { value: 'internal_medicine', label: 'Internal Medicine' },
  { value: 'psychiatry', label: 'Psychiatry' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'ophthalmology', label: 'Ophthalmology' },
];

// Specialization Options
export const SPECIALIZATION_OPTIONS = [
  { value: 'general_medicine', label: 'General Medicine' },
  { value: 'internal_medicine', label: 'Internal Medicine' },
  { value: 'family_medicine', label: 'Family Medicine' },
  { value: 'emergency_medicine', label: 'Emergency Medicine' },
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'neurology', label: 'Neurology' },
  { value: 'orthopedics', label: 'Orthopedics' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'obstetrics_gynecology', label: 'Obstetrics & Gynecology' },
  { value: 'psychiatry', label: 'Psychiatry' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'ophthalmology', label: 'Ophthalmology' },
  { value: 'radiology', label: 'Radiology' },
  { value: 'pathology', label: 'Pathology' },
  { value: 'anesthesiology', label: 'Anesthesiology' },
  { value: 'general_surgery', label: 'General Surgery' },
  { value: 'plastic_surgery', label: 'Plastic Surgery' },
  { value: 'urology', label: 'Urology' },
  { value: 'oncology', label: 'Oncology' },
  { value: 'endocrinology', label: 'Endocrinology' },
];

// Application States
export const APP_STATES = {
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error',
  UNAUTHORIZED: 'unauthorized',
  MAINTENANCE: 'maintenance',
};

// Form Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_MIN: 'Password must be at least 8 characters',
  PASSWORD_MATCH: 'Passwords must match',
  PHONE_INVALID: 'Please enter a valid phone number',
  DATE_INVALID: 'Please enter a valid date',
  NUMBER_INVALID: 'Please enter a valid number',
  MIN_LENGTH: 'Minimum length is {min} characters',
  MAX_LENGTH: 'Maximum length is {max} characters',
  FILE_SIZE_LIMIT: 'File size must be less than {size}MB',
  FILE_TYPE_INVALID: 'Invalid file type',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 1000,
};

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_SIZE_DOCUMENTS: 10 * 1024 * 1024, // 10MB for documents
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ACCEPTED_IMAGE_EXTENSIONS: '.jpg,.jpeg,.png,.gif,.webp',
  ACCEPTED_DOCUMENT_EXTENSIONS: '.pdf,.doc,.docx',
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  INPUT: 'YYYY-MM-DD',
  DATETIME: 'MMM DD, YYYY HH:mm',
  TIME: 'HH:mm',
  FULL_DATETIME: 'MMMM DD, YYYY h:mm A',
  SHORT_DATE: 'MM/DD/YYYY',
  ISO_DATE: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

// Theme Colors (matching our design system)
export const THEME_COLORS = {
  PRIMARY: '#0a1e34',
  ACCENT: '#f59e0b',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',
  TEXT_PRIMARY: '#1e293b',
  TEXT_SECONDARY: '#64748b',
  BACKGROUND: '#f8fafc',
  WHITE: '#ffffff',
  BORDER: '#e2e8f0',
  MUTED: '#f1f5f9',
  CARD: '#ffffff',
  DESTRUCTIVE: '#ef4444',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Priority Levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
  CRITICAL: 'critical',
};

// Time Zones (commonly used)
export const TIME_ZONES = [
  { value: 'UTC', label: 'UTC' },
  { value: 'Africa/Kampala', label: 'Africa/Kampala (EAT)' },
  { value: 'America/New_York', label: 'America/New_York (EST/EDT)' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles (PST/PDT)' },
  { value: 'Europe/London', label: 'Europe/London (GMT/BST)' },
  { value: 'Europe/Berlin', label: 'Europe/Berlin (CET/CEST)' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo (JST)' },
  { value: 'Asia/Shanghai', label: 'Asia/Shanghai (CST)' },
  { value: 'Australia/Sydney', label: 'Australia/Sydney (AEST/AEDT)' },
];

// Languages
export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'sw', label: 'Swahili' },
  { value: 'lg', label: 'Luganda' },
  { value: 'fr', label: 'French' },
  { value: 'es', label: 'Spanish' },
  { value: 'ar', label: 'Arabic' },
];

// Regular Expressions
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-()]{10,}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  NUMERIC: /^\d+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  NAME: /^[a-zA-Z\s]+$/,
};

// Local Storage Defaults
export const STORAGE_DEFAULTS = {
  THEME: 'light',
  LANGUAGE: 'en',
  TIMEZONE: 'UTC',
  CURRENCY: 'USD',
  DATE_FORMAT: 'YYYY-MM-DD',
  PAGINATION_SIZE: 20,
};
