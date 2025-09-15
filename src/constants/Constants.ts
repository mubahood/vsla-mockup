// Base configuration - MOCKUP MODE (No Backend)
export const BASE_URL = "";
export const API_URL = "";
export const TIMEOUT = 5000;
export const MAX_RETRIES = 3;
export const DATE_FORMAT = "YYYY-MM-DD";
export const CURRENCY = "UGX";

// Storage Keys
export const LOCAL_MANIFEST = "LOCAL_MANIFEST";
export const LOCAL_DISTRICTS = "LOCAL_DISTRICTS";
export const LOCAL_FOSTER_MANIFEST = "LOCAL_FOSTER_MANIFEST";
export const DB_TOKEN = "DB_TOKEN";
export const DB_LOGGED_IN_PROFILE = "DB_LOGGED_IN_PROFILE";
export const DB_MANIFEST = "DB_MANIFEST";

// Assets - Using local/placeholder assets
export const LOGO = "/logo192.png";
export const DEFAULT_AVATAR = "data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23ddd'/%3e%3ctext x='50' y='50' font-size='18' text-anchor='middle' dy='7'%3eUser%3c/text%3e%3c/svg%3e";
export const DEFAULT_IMAGE = "data:image/svg+xml,%3csvg width='300' height='200' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='300' height='200' fill='%23f0f0f0'/%3e%3ctext x='150' y='100' font-size='18' text-anchor='middle' dy='7'%3eImage%3c/text%3e%3c/svg%3e";

// Employment Status Options
export const EMPLOYMENT_STATUS_OPTIONS = [
  { value: "Full Time", label: "Full Time" },
  { value: "Part Time", label: "Part Time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
] as const;

// Types for better TypeScript support
export type EmploymentStatus = typeof EMPLOYMENT_STATUS_OPTIONS[number]['value'];

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
] as const;

export type CountryCode = typeof COUNTRIES[number]['value'];

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: 'auth/login',
  REGISTER: 'auth/register',
  LOGOUT: 'auth/logout',
  REFRESH: 'auth/refresh',
  FORGOT_PASSWORD: 'auth/forgot-password',
  RESET_PASSWORD: 'auth/reset-password',
  VERIFY_EMAIL: 'auth/verify-email',
  
  // User management
  PROFILE: 'auth/profile',
  UPDATE_PROFILE: 'auth/profile/update',
  CHANGE_PASSWORD: 'auth/change-password',
  UPLOAD_AVATAR: 'auth/profile/avatar',
  
  // Core data
  MANIFEST: 'manifest',
  USERS: 'users',
  
  // Agricultural management
  FARMER_MEMBERS: 'farmer-members',
  AGRICULTURAL_SPECIALISTS: 'agricultural-specialists',
  TRAINING_SESSIONS: 'training-sessions',
  AGRICULTURAL_RECORDS: 'agricultural-records',
  DEPARTMENTS: 'departments',
  STAFF: 'staff',
  
  // Billing and pharmacy
  BILLING: 'billing',
  INVOICES: 'billing/invoices',
  PAYMENTS: 'billing/payments',
  PHARMACY: 'pharmacy',
  INVENTORY: 'pharmacy/inventory',
  PRESCRIPTIONS: 'prescriptions',
  
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
} as const;

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
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Training Session Status
export const TRAINING_STATUS = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
  RESCHEDULED: 'rescheduled',
} as const;

export type TrainingStatus = typeof TRAINING_STATUS[keyof typeof TRAINING_STATUS];

// Member Status
export const MEMBER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ENROLLED: 'enrolled',
  GRADUATED: 'graduated',
  TRANSFERRED: 'transferred',
  DROPPED_OUT: 'dropped_out',
} as const;

export type MemberStatus = typeof MEMBER_STATUS[keyof typeof MEMBER_STATUS];

// Gender Options
export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
] as const;

export type Gender = typeof GENDER_OPTIONS[number]['value'];

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
] as const;

export type BloodType = typeof BLOOD_TYPE_OPTIONS[number]['value'];

// Marital Status Options
export const MARITAL_STATUS_OPTIONS = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
  { value: 'separated', label: 'Separated' },
] as const;

export type MaritalStatus = typeof MARITAL_STATUS_OPTIONS[number]['value'];

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
] as const;

export type Department = typeof DEPARTMENT_OPTIONS[number]['value'];

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
] as const;

export type Specialization = typeof SPECIALIZATION_OPTIONS[number]['value'];

// Application States
export const APP_STATES = {
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error',
  UNAUTHORIZED: 'unauthorized',
  MAINTENANCE: 'maintenance',
} as const;

export type AppState = typeof APP_STATES[keyof typeof APP_STATES];

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
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 1000,
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_SIZE_DOCUMENTS: 10 * 1024 * 1024, // 10MB for documents
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ACCEPTED_IMAGE_EXTENSIONS: '.jpg,.jpeg,.png,.gif,.webp',
  ACCEPTED_DOCUMENT_EXTENSIONS: '.pdf,.doc,.docx',
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  INPUT: 'YYYY-MM-DD',
  DATETIME: 'MMM DD, YYYY HH:mm',
  TIME: 'HH:mm',
  FULL_DATETIME: 'MMMM DD, YYYY h:mm A',
  SHORT_DATE: 'MM/DD/YYYY',
  ISO_DATE: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
} as const;

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
} as const;

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
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];

// Priority Levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
  CRITICAL: 'critical',
} as const;

export type PriorityLevel = typeof PRIORITY_LEVELS[keyof typeof PRIORITY_LEVELS];

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
] as const;

export type TimeZone = typeof TIME_ZONES[number]['value'];

// Languages
export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'sw', label: 'Swahili' },
  { value: 'lg', label: 'Luganda' },
  { value: 'fr', label: 'French' },
  { value: 'es', label: 'Spanish' },
  { value: 'ar', label: 'Arabic' },
] as const;

export type Language = typeof LANGUAGES[number]['value'];

// Regular Expressions
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]{10,}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  NUMERIC: /^\d+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  NAME: /^[a-zA-Z\s]+$/,
} as const;

// Local Storage Defaults
export const STORAGE_DEFAULTS = {
  THEME: 'light',
  LANGUAGE: 'en',
  TIMEZONE: 'UTC',
  CURRENCY: 'USD',
  DATE_FORMAT: 'YYYY-MM-DD',
  PAGINATION_SIZE: 20,
} as const;

// Interface definitions for better type safety
export interface SelectOption {
  value: string;
  label: string;
}

export interface Country extends SelectOption {
  value: CountryCode;
}

export interface APIResponse<T = any> {
  code: number;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T = any> extends APIResponse<T[]> {
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}
