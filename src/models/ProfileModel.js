import Utils from '../utils/Utils';

class ProfileModel {
  constructor(data = {}) {
    // Core Laravel Admin fields
    this.id = data.id || null;
    this.username = data.username || '';
    this.password = data.password || '';
    this.name = data.name || '';
    this.avatar = data.avatar || '';
    this.remember_token = data.remember_token || '';
    this.created_at = data.created_at || '';
    this.updated_at = data.updated_at || '';
    this.enterprise_id = data.enterprise_id || 1;

    // Personal Information
    this.first_name = data.first_name || '';
    this.last_name = data.last_name || '';
    this.date_of_birth = data.date_of_birth || '';
    this.dob = data.dob || ''; // Alternative DOB field
    this.place_of_birth = data.place_of_birth || '';
    this.sex = data.sex || '';
    this.nationality = data.nationality || '';
    this.religion = data.religion || '';
    this.marital_status = data.marital_status || '';
    this.given_name = data.given_name || '';

    // Contact Information
    this.home_address = data.home_address || '';
    this.current_address = data.current_address || '';
    this.phone_number_1 = data.phone_number_1 || '';
    this.phone_number_2 = data.phone_number_2 || '';
    this.email = data.email || '';

    // Family Information
    this.spouse_name = data.spouse_name || '';
    this.spouse_phone = data.spouse_phone || '';
    this.father_name = data.father_name || '';
    this.father_phone = data.father_phone || '';
    this.mother_name = data.mother_name || '';
    this.mother_phone = data.mother_phone || '';
    this.emergency_person_name = data.emergency_person_name || '';
    this.emergency_person_phone = data.emergency_person_phone || '';

    // Identification Documents
    this.national_id_number = data.national_id_number || '';
    this.passport_number = data.passport_number || '';
    this.tin = data.tin || '';
    this.nssf_number = data.nssf_number || '';

    // Banking Information
    this.bank_name = data.bank_name || '';
    this.bank_account_number = data.bank_account_number || '';

    // Educational Background
    this.primary_school_name = data.primary_school_name || '';
    this.primary_school_year_graduated = data.primary_school_year_graduated || '';
    this.seconday_school_name = data.seconday_school_name || ''; // Note: keeping original typo from DB
    this.seconday_school_year_graduated = data.seconday_school_year_graduated || '';
    this.high_school_name = data.high_school_name || '';
    this.high_school_year_graduated = data.high_school_year_graduated || '';
    this.certificate_school_name = data.certificate_school_name || '';
    this.certificate_year_graduated = data.certificate_year_graduated || '';
    this.diploma_school_name = data.diploma_school_name || '';
    this.diploma_year_graduated = data.diploma_year_graduated || '';
    this.degree_university_name = data.degree_university_name || '';
    this.degree_university_year_graduated = data.degree_university_year_graduated || '';
    this.masters_university_name = data.masters_university_name || '';
    this.masters_university_year_graduated = data.masters_university_year_graduated || '';
    this.phd_university_name = data.phd_university_name || '';
    this.phd_university_year_graduated = data.phd_university_year_graduated || '';

    // Work Information
    this.user_type = data.user_type || 'employee';
    this.company_id = data.company_id || 1;
    this.managed_by = data.managed_by || null;
    this.title = data.title || '';
    this.intro = data.intro || '';
    this.rate = data.rate || 0;
    this.can_evaluate = data.can_evaluate || 'No';
    this.work_load_pending = data.work_load_pending || 0;
    this.work_load_completed = data.work_load_completed || 0;
    this.belongs_to_company = data.belongs_to_company || '';
    this.belongs_to_company_status = data.belongs_to_company_status || '';

    // Hospital Card Information
    this.card_status = data.card_status || 'Inactive';
    this.card_number = data.card_number || '';
    this.card_balance = data.card_balance || 0;
    this.card_accepts_credit = data.card_accepts_credit || '';
    this.card_max_credit = data.card_max_credit || 0;
    this.card_accepts_cash = data.card_accepts_cash || 0;
    this.card_expiry = data.card_expiry || '';
    this.is_dependent = data.is_dependent || 'No';
    this.dependent_status = data.dependent_status || '';
    this.dependent_id = data.dependent_id || null;

    // System Fields
    this.demo_id = data.demo_id || 0;
    this.user_id = data.user_id || '';
    this.user_batch_importer_id = data.user_batch_importer_id || 0;
    this.school_pay_account_id = data.school_pay_account_id || '';
    this.school_pay_payment_code = data.school_pay_payment_code || '';
    this.deleted_at = data.deleted_at || null;
    this.verification = data.verification || 0;
    this.status = data.status || 2; // Default status in DB
    this.parent_id = data.parent_id || null;
    this.main_role_id = data.main_role_id || null;
    this.stream_id = data.stream_id || null;
    this.account_id = data.account_id || null;
    this.current_class_id = data.current_class_id || 0;
    this.current_theology_class_id = data.current_theology_class_id || 0;

    // Information Status Flags
    this.has_personal_info = data.has_personal_info || 'No';
    this.has_educational_info = data.has_educational_info || 'No';
    this.has_account_info = data.has_account_info || 'No';

    // Additional Fields
    this.languages = data.languages || '';

    // Roles and Permissions (Laravel Admin compatibility)
    this.roles = data.roles || [];
    this.permissions = data.permissions || [];
    
    // For development: Add default roles if none exist and we're in development mode
    if (process.env.NODE_ENV === 'development' && (!this.roles || this.roles.length === 0)) {
      this.roles = [
        { id: 1, name: 'Admin', slug: 'admin' },
        { id: 2, name: 'Staff', slug: 'staff' }
      ];
    }

    // Token (for API responses)
    this.token = data.token || '';
  }

  /**
   * Check if user has a specific role
   * @param {string} role - Role slug to check
   * @returns {boolean} Has role
   */
  hasRole(role) {
    if (!role) return false;
    
    // For development: If no roles defined, allow access for any role check
    if (process.env.NODE_ENV === 'development' && (!this.roles || this.roles.length === 0)) {
      console.warn(`Role check for '${role}' allowed due to development mode and no roles defined`);
      return true;
    }
    
    // Handle both array of role objects and array of role slugs
    if (Array.isArray(this.roles)) {
      return this.roles.some(r => {
        if (typeof r === 'string') return r === role;
        return r.slug === role || r.name === role || r.name?.toLowerCase() === role?.toLowerCase();
      });
    }
    
    return false;
  }

  /**
   * Check if user has any of the specified roles
   * @param {Array<string>} roles - Array of role slugs to check
   * @returns {boolean} Has any role
   */
  hasAnyRole(roles) {
    if (!Array.isArray(roles) || roles.length === 0) return true;
    
    // For development: If no roles defined, allow access
    if (process.env.NODE_ENV === 'development' && (!this.roles || this.roles.length === 0)) {
      console.warn(`Role check for [${roles.join(', ')}] allowed due to development mode and no roles defined`);
      return true;
    }
    
    return roles.some(role => this.hasRole(role));
  }

  /**
   * Check if user has all specified roles
   * @param {Array<string>} roles - Array of role slugs to check
   * @returns {boolean} Has all roles
   */
  hasAllRoles(roles) {
    if (!Array.isArray(roles) || roles.length === 0) return true;
    
    return roles.every(role => this.hasRole(role));
  }

  /**
   * Check if user has a specific permission
   * @param {string} permission - Permission slug to check
   * @returns {boolean} Has permission
   */
  hasPermission(permission) {
    if (!permission) return false;
    
    // Check direct permissions
    if (Array.isArray(this.permissions)) {
      const hasDirectPermission = this.permissions.some(p => {
        if (typeof p === 'string') return p === permission;
        return p.slug === permission || p.name === permission;
      });
      
      if (hasDirectPermission) return true;
    }
    
    // Check role-based permissions
    if (Array.isArray(this.roles)) {
      return this.roles.some(role => {
        if (role.permissions && Array.isArray(role.permissions)) {
          return role.permissions.some(p => {
            if (typeof p === 'string') return p === permission;
            return p.slug === permission || p.name === permission;
          });
        }
        return false;
      });
    }
    
    return false;
  }

  /**
   * Check if user is administrator
   * @returns {boolean} Is administrator
   */
  isAdministrator() {
    return this.hasRole('administrator') || this.hasRole('admin');
  }

  /**
   * Check if user is in any of the specified roles (alias for hasAnyRole)
   * @param {Array<string>} roles - Array of role slugs
   * @returns {boolean} In roles
   */
  inRoles(roles) {
    return this.hasAnyRole(roles);
  }

  /**
   * Add development roles for testing (only works in development mode)
   * @param {Array<string>} roleNames - Array of role names to add
   */
  addDevelopmentRoles(roleNames = ['admin', 'staff', 'doctor', 'nurse']) {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('addDevelopmentRoles only works in development mode');
      return;
    }
    
    const devRoles = roleNames.map((name, index) => ({
      id: index + 1,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      slug: name.toLowerCase()
    }));
    
    this.roles = [...(this.roles || []), ...devRoles];
    // Silent add of development roles
  }

  /**
   * Get user roles as array of slugs
   * @returns {Array<string>} Role slugs
   */
  getRoleSlugs() {
    if (!Array.isArray(this.roles)) return [];
    
    return this.roles.map(role => {
      if (typeof role === 'string') return role;
      return role.slug || role.name || '';
    }).filter(slug => slug);
  }

  /**
   * Get user permissions as array of slugs
   * @returns {Array<string>} Permission slugs
   */
  getPermissionSlugs() {
    const permissions = new Set();
    
    // Add direct permissions
    if (Array.isArray(this.permissions)) {
      this.permissions.forEach(p => {
        if (typeof p === 'string') {
          permissions.add(p);
        } else if (p.slug) {
          permissions.add(p.slug);
        }
      });
    }
    
    // Add role-based permissions
    if (Array.isArray(this.roles)) {
      this.roles.forEach(role => {
        if (role.permissions && Array.isArray(role.permissions)) {
          role.permissions.forEach(p => {
            if (typeof p === 'string') {
              permissions.add(p);
            } else if (p.slug) {
              permissions.add(p.slug);
            }
          });
        }
      });
    }
    
    return Array.from(permissions);
  }

  /**
   * Get full name
   * @returns {string} Full name
   */
  get fullName() {
    if (this.name) return this.name;
    if (this.given_name) return this.given_name;
    return `${this.first_name} ${this.last_name}`.trim();
  }

  /**
   * Get initials
   * @returns {string} User initials
   */
  get initials() {
    return Utils.initials(this.fullName);
  }

  /**
   * Get avatar URL
   * @returns {string} Avatar image URL
   */
  get avatarUrl() {
    return Utils.img(this.avatar);
  }

  /**
   * Get primary phone number
   * @returns {string} Phone number
   */
  get primaryPhone() {
    return this.phone_number_1 || this.phone_number_2 || '';
  }

  /**
   * Get secondary phone number
   * @returns {string} Secondary phone number
   */
  get secondaryPhone() {
    return this.phone_number_2 || '';
  }

  /**
   * Get gender (using 'sex' field from database)
   * @returns {string} Gender
   */
  get gender() {
    return this.sex || '';
  }

  /**
   * Get primary address
   * @returns {string} Address
   */
  get primaryAddress() {
    return this.current_address || this.home_address || '';
  }

  /**
   * Get formatted date of birth
   * @returns {string} Formatted date
   */
  get formattedDateOfBirth() {
    const dateField = this.date_of_birth || this.dob;
    return Utils.formatDate(dateField);
  }

  /**
   * Get formatted created at date
   * @returns {string} Formatted datetime
   */
  get formattedCreatedAt() {
    return Utils.formatDateTime(this.created_at);
  }

  /**
   * Get formatted updated at date
   * @returns {string} Formatted datetime
   */
  get formattedUpdatedAt() {
    return Utils.formatDateTime(this.updated_at);
  }

  /**
   * Get age from date of birth
   * @returns {number} Age in years
   */
  get age() {
    const birthDate = this.date_of_birth || this.dob;
    if (!birthDate) return 0;
    
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * Get formatted card balance
   * @returns {string} Formatted currency
   */
  get formattedCardBalance() {
    return Utils.formatCurrency(this.card_balance);
  }

  /**
   * Get formatted card max credit
   * @returns {string} Formatted currency
   */
  get formattedCardMaxCredit() {
    return Utils.formatCurrency(this.card_max_credit);
  }

  /**
   * Check if user has active card
   * @returns {boolean} Has active card
   */
  get hasActiveCard() {
    return this.card_status === 'Active';
  }

  /**
   * Check if user accepts cash payments
   * @returns {boolean} Accepts cash
   */
  get acceptsCash() {
    return this.card_accepts_cash === 1;
  }

  /**
   * Check if user accepts credit
   * @returns {boolean} Accepts credit
   */
  get acceptsCredit() {
    return this.card_accepts_credit === 'Yes' || this.card_accepts_credit === '1';
  }

  /**
   * Check if user is a dependent
   * @returns {boolean} Is dependent
   */
  get isDependent() {
    return this.is_dependent === 'Yes';
  }

  /**
   * Check if user is active (status = 1 or 2)
   * @returns {boolean} Is active
   */
  get isActive() {
    return this.status === 1 || this.status === 2;
  }

  /**
   * Check if user is deleted (status = 3)
   * @returns {boolean} Is deleted
   */
  get isDeleted() {
    return this.status === 3;
  }

  /**
   * Check if user is verified
   * @returns {boolean} Is verified
   */
  get isVerified() {
    return this.verification === 1;
  }

  /**
   * Check if user is employee type
   * @returns {boolean} Is employee
   */
  get isEmployee() {
    return this.user_type === 'employee';
  }

  /**
   * Check if user is patient type
   * @returns {boolean} Is patient
   */
  get isPatient() {
    return this.user_type === 'patient';
  }

  /**
   * Get user type display name
   * @returns {string} User type display
   */
  get userTypeDisplay() {
    const typeMap = {
      'employee': 'Employee',
      'patient': 'Patient',
      'admin': 'Administrator',
      'doctor': 'Doctor',
      'nurse': 'Nurse'
    };
    return typeMap[this.user_type] || Utils.capitalize(this.user_type);
  }

  /**
   * Get complete address
   * @returns {string} Complete address
   */
  get completeAddress() {
    const current = this.current_address?.trim();
    const home = this.home_address?.trim();
    
    if (current && home && current !== home) {
      return `Current: ${current}, Home: ${home}`;
    }
    
    return current || home || '';
  }

  /**
   * Get emergency contact
   * @returns {Object} Emergency contact info
   */
  get emergencyContact() {
    return {
      name: this.emergency_person_name || '',
      phone: this.emergency_person_phone || ''
    };
  }

  /**
   * Get banking information
   * @returns {Object} Banking info
   */
  get bankingInfo() {
    return {
      bankName: this.bank_name || '',
      accountNumber: this.bank_account_number || ''
    };
  }

  /**
   * Convert to JSON object
   * @returns {Object} JSON representation
   */
  toJson() {
    return {
      // Core Laravel Admin fields
      id: this.id,
      username: this.username,
      password: this.password,
      name: this.name,
      avatar: this.avatar,
      remember_token: this.remember_token,
      created_at: this.created_at,
      updated_at: this.updated_at,
      enterprise_id: this.enterprise_id,

      // Personal Information
      first_name: this.first_name,
      last_name: this.last_name,
      date_of_birth: this.date_of_birth,
      dob: this.dob,
      place_of_birth: this.place_of_birth,
      sex: this.sex,
      nationality: this.nationality,
      religion: this.religion,
      marital_status: this.marital_status,
      given_name: this.given_name,

      // Contact Information
      home_address: this.home_address,
      current_address: this.current_address,
      phone_number_1: this.phone_number_1,
      phone_number_2: this.phone_number_2,
      email: this.email,

      // Family Information
      spouse_name: this.spouse_name,
      spouse_phone: this.spouse_phone,
      father_name: this.father_name,
      father_phone: this.father_phone,
      mother_name: this.mother_name,
      mother_phone: this.mother_phone,
      emergency_person_name: this.emergency_person_name,
      emergency_person_phone: this.emergency_person_phone,

      // Identification Documents
      national_id_number: this.national_id_number,
      passport_number: this.passport_number,
      tin: this.tin,
      nssf_number: this.nssf_number,

      // Banking Information
      bank_name: this.bank_name,
      bank_account_number: this.bank_account_number,

      // Educational Background
      primary_school_name: this.primary_school_name,
      primary_school_year_graduated: this.primary_school_year_graduated,
      seconday_school_name: this.seconday_school_name,
      seconday_school_year_graduated: this.seconday_school_year_graduated,
      high_school_name: this.high_school_name,
      high_school_year_graduated: this.high_school_year_graduated,
      certificate_school_name: this.certificate_school_name,
      certificate_year_graduated: this.certificate_year_graduated,
      diploma_school_name: this.diploma_school_name,
      diploma_year_graduated: this.diploma_year_graduated,
      degree_university_name: this.degree_university_name,
      degree_university_year_graduated: this.degree_university_year_graduated,
      masters_university_name: this.masters_university_name,
      masters_university_year_graduated: this.masters_university_year_graduated,
      phd_university_name: this.phd_university_name,
      phd_university_year_graduated: this.phd_university_year_graduated,

      // Work Information
      user_type: this.user_type,
      company_id: this.company_id,
      managed_by: this.managed_by,
      title: this.title,
      intro: this.intro,
      rate: this.rate,
      can_evaluate: this.can_evaluate,
      work_load_pending: this.work_load_pending,
      work_load_completed: this.work_load_completed,
      belongs_to_company: this.belongs_to_company,
      belongs_to_company_status: this.belongs_to_company_status,

      // Hospital Card Information
      card_status: this.card_status,
      card_number: this.card_number,
      card_balance: this.card_balance,
      card_accepts_credit: this.card_accepts_credit,
      card_max_credit: this.card_max_credit,
      card_accepts_cash: this.card_accepts_cash,
      card_expiry: this.card_expiry,
      is_dependent: this.is_dependent,
      dependent_status: this.dependent_status,
      dependent_id: this.dependent_id,

      // System Fields
      demo_id: this.demo_id,
      user_id: this.user_id,
      user_batch_importer_id: this.user_batch_importer_id,
      school_pay_account_id: this.school_pay_account_id,
      school_pay_payment_code: this.school_pay_payment_code,
      deleted_at: this.deleted_at,
      verification: this.verification,
      status: this.status,
      parent_id: this.parent_id,
      main_role_id: this.main_role_id,
      stream_id: this.stream_id,
      account_id: this.account_id,
      current_class_id: this.current_class_id,
      current_theology_class_id: this.current_theology_class_id,

      // Information Status Flags
      has_personal_info: this.has_personal_info,
      has_educational_info: this.has_educational_info,
      has_account_info: this.has_account_info,

      // Additional Fields
      languages: this.languages,
      
      // Roles and Permissions
      roles: this.roles,
      permissions: this.permissions,
      
      // Token
      token: this.token
    };
  }

  /**
   * Create instance from JSON
   * @param {Object} json - JSON object
   * @returns {ProfileModel} ProfileModel instance
   */
  static fromJson(json) {
    return new ProfileModel(json);
  }

  /**
   * Validate profile data
   * @returns {Object} Validation result
   */
  validate() {
    const errors = {};

    // Username is required
    if (!this.username || this.username.trim().length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }

    // Name is required
    if (!this.name && (!this.first_name || !this.last_name)) {
      if (!this.name) {
        errors.name = 'Name is required';
      }
      if (!this.first_name) {
        errors.first_name = 'First name is required';
      }
      if (!this.last_name) {
        errors.last_name = 'Last name is required';
      }
    }

    // Email validation (if provided)
    if (this.email && !Utils.isValidEmail(this.email)) {
      errors.email = 'Invalid email format';
    }

    // Phone number validation (phone_number_1 is usually required)
    if (this.phone_number_1 && !Utils.isValidPhone(this.phone_number_1)) {
      errors.phone_number_1 = 'Invalid phone number format';
    }

    if (this.phone_number_2 && !Utils.isValidPhone(this.phone_number_2)) {
      errors.phone_number_2 = 'Invalid phone number format';
    }

    // Date of birth validation
    if (this.date_of_birth) {
      const birthDate = new Date(this.date_of_birth);
      const today = new Date();
      if (birthDate > today) {
        errors.date_of_birth = 'Date of birth cannot be in the future';
      }
    }

    // Card balance validation (must be numeric)
    if (this.card_balance && isNaN(this.card_balance)) {
      errors.card_balance = 'Card balance must be a valid number';
    }

    // Card max credit validation (must be numeric)
    if (this.card_max_credit && isNaN(this.card_max_credit)) {
      errors.card_max_credit = 'Card max credit must be a valid number';
    }

    // Rate validation (must be numeric)
    if (this.rate && isNaN(this.rate)) {
      errors.rate = 'Rate must be a valid number';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Update profile data
   * @param {Object} data - Data to update
   */
  update(data) {
    Object.keys(data).forEach(key => {
      if (this.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    });
  }

  /**
   * Get display card data for lists
   * @returns {Object} Card display data
   */
  getCardData() {
    return {
      id: this.id,
      name: this.fullName,
      email: this.email,
      phone: this.primaryPhone,
      avatar: this.avatarUrl,
      userType: this.userTypeDisplay,
      cardStatus: this.card_status,
      status: this.status,
      isActive: this.isActive,
      isPatient: this.isPatient,
      isEmployee: this.isEmployee
    };
  }

  /**
   * Get basic contact information
   * @returns {Object} Contact info
   */
  getContactInfo() {
    return {
      name: this.fullName,
      email: this.email,
      primaryPhone: this.primaryPhone,
      secondaryPhone: this.secondaryPhone,
      currentAddress: this.current_address,
      homeAddress: this.home_address,
      emergencyContact: this.emergencyContact
    };
  }

  /**
   * Get educational background summary
   * @returns {Object} Education info
   */
  getEducationSummary() {
    const education = [];
    
    if (this.primary_school_name) {
      education.push({
        level: 'Primary',
        school: this.primary_school_name,
        year: this.primary_school_year_graduated
      });
    }
    
    if (this.seconday_school_name) {
      education.push({
        level: 'Secondary',
        school: this.seconday_school_name,
        year: this.seconday_school_year_graduated
      });
    }
    
    if (this.high_school_name) {
      education.push({
        level: 'High School',
        school: this.high_school_name,
        year: this.high_school_year_graduated
      });
    }
    
    if (this.certificate_school_name) {
      education.push({
        level: 'Certificate',
        school: this.certificate_school_name,
        year: this.certificate_year_graduated
      });
    }
    
    if (this.diploma_school_name) {
      education.push({
        level: 'Diploma',
        school: this.diploma_school_name,
        year: this.diploma_year_graduated
      });
    }
    
    if (this.degree_university_name) {
      education.push({
        level: 'Degree',
        school: this.degree_university_name,
        year: this.degree_university_year_graduated
      });
    }
    
    if (this.masters_university_name) {
      education.push({
        level: 'Masters',
        school: this.masters_university_name,
        year: this.masters_university_year_graduated
      });
    }
    
    if (this.phd_university_name) {
      education.push({
        level: 'PhD',
        school: this.phd_university_name,
        year: this.phd_university_year_graduated
      });
    }
    
    return education;
  }
}

export default ProfileModel;
