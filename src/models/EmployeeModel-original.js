import apiService from "../services/api";

/**
 * Employee Model
 *
 * Represents an employee record from the admin_users table.
 * An employee is essentially a user with specific attributes and behaviors.
 *
 * Backend Model: User (App\Models\User)
 * Database Table: admin_users
 * API Endpoint: Uses basic api service with 'api/User' resource
 * Note: For dynamic Laravel routes, model name must include 'api/' prefix
 * Final URL pattern: /api/api/User (matches Laravel route api/{model})
 *
 * Features:
 * - CRUD operations via centralized API service
 * - Pagination, filtering, and sorting support
 * - Employee-specific business logic
 * - Validation methods
 * - Data transformation helpers
 *
 * @class EmployeeModel
 */
class EmployeeModel {
  constructor(data = {}) {
    // Primary ID
    this.id = data.id || null;

    // Core Laravel Admin User fields (from admin_users table)
    this.username = data.username || "";
    this.password = data.password || "";
    this.name = data.name || "";
    this.avatar = data.avatar || "";
    this.remember_token = data.remember_token || "";
    this.created_at = data.created_at || "";
    this.updated_at = data.updated_at || "";

    // Enterprise/Company Information (SAAS Support)
    this.enterprise_id = data.enterprise_id || "";
    this.company_id = data.company_id || "";

    // Personal Information
    this.first_name = data.first_name || "";
    this.last_name = data.last_name || "";
    this.date_of_birth = data.date_of_birth || "";
    this.dob = data.dob || ""; // Alternative DOB field
    this.place_of_birth = data.place_of_birth || "";
    this.sex = data.sex || "";
    this.nationality = data.nationality || "";
    this.religion = data.religion || "";
    this.marital_status = data.marital_status || "";
    this.given_name = data.given_name || "";

    // Contact Information
    this.home_address = data.home_address || "";
    this.current_address = data.current_address || "";
    this.phone_number_1 = data.phone_number_1 || "";
    this.phone_number_2 = data.phone_number_2 || "";
    this.email = data.email || "";

    // Family Information
    this.spouse_name = data.spouse_name || "";
    this.spouse_phone = data.spouse_phone || "";
    this.father_name = data.father_name || "";
    this.father_phone = data.father_phone || "";
    this.mother_name = data.mother_name || "";
    this.mother_phone = data.mother_phone || "";
    this.emergency_person_name = data.emergency_person_name || "";
    this.emergency_person_phone = data.emergency_person_phone || "";

    // Identification Documents
    this.national_id_number = data.national_id_number || "";
    this.passport_number = data.passport_number || "";
    this.tin = data.tin || "";
    this.nssf_number = data.nssf_number || "";

    // Banking Information
    this.bank_name = data.bank_name || "";
    this.bank_account_number = data.bank_account_number || "";

    // Educational Background
    this.primary_school_name = data.primary_school_name || "";
    this.primary_school_year_graduated =
      data.primary_school_year_graduated || "";
    this.seconday_school_name = data.seconday_school_name || ""; // Note: keeping original typo from DB
    this.seconday_school_year_graduated =
      data.seconday_school_year_graduated || "";
    this.high_school_name = data.high_school_name || "";
    this.high_school_year_graduated = data.high_school_year_graduated || "";
    this.certificate_school_name = data.certificate_school_name || "";
    this.certificate_year_graduated = data.certificate_year_graduated || "";
    this.diploma_school_name = data.diploma_school_name || "";
    this.diploma_year_graduated = data.diploma_year_graduated || "";
    this.degree_university_name = data.degree_university_name || "";
    this.degree_university_year_graduated =
      data.degree_university_year_graduated || "";
    this.masters_university_name = data.masters_university_name || "";
    this.masters_university_year_graduated =
      data.masters_university_year_graduated || "";
    this.phd_university_name = data.phd_university_name || "";
    this.phd_university_year_graduated =
      data.phd_university_year_graduated || "";

    // Work/Employee Information (some are integers in DB)
    this.user_type = data.user_type || "employee"; // Default to employee
    this.managed_by = data.managed_by || "";
    this.title = data.title || "";
    this.intro = data.intro || "";
    this.rate = data.rate || 0; // Integer field
    this.can_evaluate = data.can_evaluate || "";
    this.work_load_pending = data.work_load_pending || 0; // Integer field
    this.work_load_completed = data.work_load_completed || 0; // Integer field
    this.belongs_to_company = data.belongs_to_company || "";
    this.belongs_to_company_status = data.belongs_to_company_status || "";

    // Hospital Card Information (some are integers in DB)
    this.card_status = data.card_status || "";
    this.card_number = data.card_number || "";
    this.card_balance = data.card_balance || "";
    this.card_accepts_credit = data.card_accepts_credit || "";
    this.card_max_credit = data.card_max_credit || "";
    this.card_accepts_cash = data.card_accepts_cash || 0; // Integer field
    this.card_expiry = data.card_expiry || "";
    this.is_dependent = data.is_dependent || "";
    this.dependent_status = data.dependent_status || "";
    this.dependent_id = data.dependent_id || "";

    // System Fields (some are integers in DB)
    this.demo_id = data.demo_id || 0; // Integer field
    this.user_id = data.user_id || "";
    this.user_batch_importer_id = data.user_batch_importer_id || 0; // Integer field
    this.school_pay_account_id = data.school_pay_account_id || "";
    this.school_pay_payment_code = data.school_pay_payment_code || "";
    this.deleted_at = data.deleted_at || "";
    this.verification = data.verification || 0; // Integer field (0/1)
    this.status = data.status || 2; // Integer field (2 = active by default)
    this.parent_id = data.parent_id || "";
    this.main_role_id = data.main_role_id || "";
    this.stream_id = data.stream_id || "";
    this.account_id = data.account_id || "";
    this.current_class_id = data.current_class_id || 0; // Integer field
    this.current_theology_class_id = data.current_theology_class_id || 0; // Integer field

    // Information Status Flags
    this.has_personal_info = data.has_personal_info || "";
    this.has_educational_info = data.has_educational_info || "";
    this.has_account_info = data.has_account_info || "";

    // Additional Fields
    this.languages = data.languages || "";

    // Roles and Permissions (if using role-based access)
    this.roles = data.roles || [];
    this.permissions = data.permissions || [];

    // API Token (for authentication responses)
    this.token = data.token || "";
  }

  // ===== COMPUTED PROPERTIES =====

  /**
   * Get full name
   * @returns {string} Full name
   */
  get fullName() {
    const first = this.first_name?.trim() || "";
    const last = this.last_name?.trim() || "";

    if (first && last) {
      return `${first} ${last}`;
    }

    return this.name?.trim() || first || last || "Unknown";
  }

  /**
   * Get initials
   * @returns {string} User initials
   */
  get initials() {
    const first = this.first_name?.trim()?.charAt(0)?.toUpperCase() || "";
    const last = this.last_name?.trim()?.charAt(0)?.toUpperCase() || "";

    if (first && last) {
      return `${first}${last}`;
    }

    const name = this.name?.trim() || "";
    if (name) {
      const parts = name.split(" ");
      if (parts.length >= 2) {
        return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
      }
      return name.charAt(0).toUpperCase();
    }

    return "NA";
  }

  /**
   * Get primary phone number
   * @returns {string} Primary phone
   */
  get primaryPhone() {
    return this.phone_number_1?.trim() || "";
  }

  /**
   * Get secondary phone number
   * @returns {string} Secondary phone
   */
  get secondaryPhone() {
    return this.phone_number_2?.trim() || "";
  }

  /**
   * Check if employee is active
   * @returns {boolean} Is active
   */
  get isActive() {
    return this.status === 1 || this.status === 2; // Status 1 or 2 = active (integers)
  }

  /**
   * Check if employee is verified
   * @returns {boolean} Is verified
   */
  get isVerified() {
    return this.verification === 1; // Verification 1 = verified (integer)
  }

  /**
   * Get employee display status
   * @returns {string} Status display
   */
  get statusDisplay() {
    if (this.isActive) return "Active";
    if (this.status === "3" || this.status === 3) return "Inactive";
    return "Pending";
  }

  /**
   * Get employee department/title display
   * @returns {string} Department or title
   */
  get departmentDisplay() {
    return (
      this.title?.trim() || this.belongs_to_company?.trim() || "No Department"
    );
  }

  /**
   * Calculate age from date of birth
   * @returns {number} Age in years
   */
  get age() {
    const birthDate = this.date_of_birth || this.dob;
    if (!birthDate) return 0;

    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  }

  // ===== STATIC API METHODS =====

  /**
   * Get all employees with pagination and filtering
   * @param {Object} params - Query parameters
   * @returns {Promise} API response
   */
  static async getAll(params = {}) {
    try {
      // Build parameter object for Laravel API with 20 per page default
      const employeeParams = {
        page: params.page || 1,
        per_page: params.per_page || 20, // Default to 20 per page
        search: params.search || "",
        search_by: params.search_by || "name,first_name,last_name,email,phone_number_1,title",
        sort_by: params.sort_by || "created_at",
        sort_order: params.sort_order || "desc",
        filter_user_type: params.filter_user_type || "employee", // Filter only employees
        filter_status: params.filter_status || [1, 2], // Active statuses
        ...params,
      };

      // Call the API using the correct endpoint structure: /api/User
      const response = await apiService.employees.getAll(employeeParams);

      // The backend returns data in format: { code: 1, message: "...", data: { data: [...], pagination: {...}, meta: {...} } }
      // Transform response data to EmployeeModel instances
      if (response.data?.data?.data) {
        response.data.data.data = response.data.data.data.map(
          (item) => new EmployeeModel(item)
        );
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        response.data.data = response.data.data.map(
          (item) => new EmployeeModel(item)
        );
      } else if (response.data && Array.isArray(response.data)) {
        response.data = response.data.map((item) => new EmployeeModel(item));
      }
 
      return response;
    } catch (error) {
      console.error("❌ Error fetching employees:", error);
      console.error("❌ Error details:", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config,
      });
      throw error;
    }
  }

  /**
   * Get employee by ID
   * @param {number|string} id - Employee ID
   * @returns {Promise<EmployeeModel>} Employee instance
   */
  static async getById(id) {
    try {
      const response = await apiService.employees.getById(id);
      return new EmployeeModel(response.data.data);
    } catch (error) {
      console.error("Error fetching employee:", error);
      throw error;
    }
  }

  /**
   * Create new employee
   * @param {Object} data - Employee data
   * @returns {Promise<EmployeeModel>} Created employee
   */
  static async create(data) {
    try {
      // Ensure user_type is set to employee
      const employeeData = {
        ...data,
        user_type: "employee",
      };

      const response = await apiService.employees.create(employeeData);
      return new EmployeeModel(response.data.data);
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  }

  /**
   * Update employee
   * @param {number|string} id - Employee ID
   * @param {Object} data - Updated data
   * @returns {Promise<EmployeeModel>} Updated employee
   */
  static async update(id, data) {
    try {
      const response = await apiService.employees.update(id, data);
      return new EmployeeModel(response.data.data);
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
  }

  /**
   * Delete employee
   * @param {number|string} id - Employee ID
   * @returns {Promise} API response
   */
  static async delete(id) {
    try {
      return await apiService.employees.delete(id);
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  }

  /**
   * Search employees by name, email, or phone
   * @param {string} query - Search query
   * @param {Object} additionalParams - Additional parameters
   * @returns {Promise} API response
   */
  static async search(query, additionalParams = {}) {
    try {
      const params = {
        ...additionalParams,
        q_user_type: "employee",
        global_search: query,
        search_fields: "first_name,last_name,name,email,phone_number_1",
      };

      return await this.getAll(params);
    } catch (error) {
      console.error("Error searching employees:", error);
      throw error;
    }
  }

  /**
   * Get employees by department/company
   * @param {string} department - Department or company
   * @param {Object} additionalParams - Additional parameters
   * @returns {Promise} API response
   */
  static async getByDepartment(department, additionalParams = {}) {
    try {
      const params = {
        ...additionalParams,
        q_user_type: "employee",
        q_belongs_to_company: department,
      };

      return await this.getAll(params);
    } catch (error) {
      console.error("Error fetching employees by department:", error);
      throw error;
    }
  }

  /**
   * Get active employees only
   * @param {Object} additionalParams - Additional parameters
   * @returns {Promise} API response
   */
  static async getActive(additionalParams = {}) {
    try {
      const params = {
        ...additionalParams,
        q_user_type: "employee",
        in_status: "1,2", // Status 1 and 2 are active (integers)
      };

      return await this.getAll(params);
    } catch (error) {
      console.error("Error fetching active employees:", error);
      throw error;
    }
  }

  // ===== INSTANCE METHODS =====

  /**
   * Save current employee (create or update)
   * @returns {Promise<EmployeeModel>} Saved employee
   */
  async save() {
    try {
      if (this.id) {
        // Update existing employee
        const updated = await EmployeeModel.update(this.id, this.toJson());
        Object.assign(this, updated);
        return this;
      } else {
        // Create new employee
        const created = await EmployeeModel.create(this.toJson());
        Object.assign(this, created);
        return this;
      }
    } catch (error) {
      console.error("Error saving employee:", error);
      throw error;
    }
  }

  /**
   * Delete current employee
   * @returns {Promise} API response
   */
  async delete() {
    try {
      if (!this.id) {
        throw new Error("Cannot delete employee without ID");
      }
      return await EmployeeModel.delete(this.id);
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  }

  /**
   * Refresh employee data from server
   * @returns {Promise<EmployeeModel>} Updated employee
   */
  async refresh() {
    try {
      if (!this.id) {
        throw new Error("Cannot refresh employee without ID");
      }
      const updated = await EmployeeModel.getById(this.id);
      Object.assign(this, updated);
      return this;
    } catch (error) {
      console.error("Error refreshing employee:", error);
      throw error;
    }
  }

  // ===== UTILITY METHODS =====

  /**
   * Get display name for the employee
   * @returns {string} Formatted display name
   */
  getDisplayName() {
    if (this.name) {
      return this.name;
    }

    const firstName = this.first_name || "";
    const lastName = this.last_name || "";

    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }

    if (firstName) {
      return firstName;
    }

    if (lastName) {
      return lastName;
    }

    return this.username || `Employee #${this.id}`;
  }

  /**
   * Get status text representation
   * @returns {string} Human-readable status
   */
  getStatusText() {
    switch (parseInt(this.status)) {
      case 2:
        return "Active";
      case 1:
        return "Pending";
      case 0:
        return "Inactive";
      default:
        return "Unknown";
    }
  }

  /**
   * Get formatted phone number
   * @returns {string} Primary phone or fallback
   */
  getPhoneNumber() {
    return this.phone_number_1 || this.phone_number_2 || "No Phone";
  }

  /**
   * Get employee type formatted
   * @returns {string} Formatted employee type
   */
  getEmployeeType() {
    if (!this.user_type) return "Employee";
    return this.user_type.charAt(0).toUpperCase() + this.user_type.slice(1);
  }

  /**
   * Convert to JSON object for API requests
   * @returns {Object} JSON representation
   */
  toJson() {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      name: this.name,
      avatar: this.avatar,
      remember_token: this.remember_token,
      created_at: this.created_at,
      updated_at: this.updated_at,
      enterprise_id: this.enterprise_id,
      company_id: this.company_id,
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
      home_address: this.home_address,
      current_address: this.current_address,
      phone_number_1: this.phone_number_1,
      phone_number_2: this.phone_number_2,
      email: this.email,
      spouse_name: this.spouse_name,
      spouse_phone: this.spouse_phone,
      father_name: this.father_name,
      father_phone: this.father_phone,
      mother_name: this.mother_name,
      mother_phone: this.mother_phone,
      emergency_person_name: this.emergency_person_name,
      emergency_person_phone: this.emergency_person_phone,
      national_id_number: this.national_id_number,
      passport_number: this.passport_number,
      tin: this.tin,
      nssf_number: this.nssf_number,
      bank_name: this.bank_name,
      bank_account_number: this.bank_account_number,
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
      user_type: this.user_type,
      managed_by: this.managed_by,
      title: this.title,
      intro: this.intro,
      rate: this.rate,
      can_evaluate: this.can_evaluate,
      work_load_pending: this.work_load_pending,
      work_load_completed: this.work_load_completed,
      belongs_to_company: this.belongs_to_company,
      belongs_to_company_status: this.belongs_to_company_status,
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
      has_personal_info: this.has_personal_info,
      has_educational_info: this.has_educational_info,
      has_account_info: this.has_account_info,
      languages: this.languages,
      roles: this.roles,
      permissions: this.permissions,
      token: this.token,
    };
  }

  /**
   * Create instance from JSON
   * @param {Object} json - JSON object
   * @returns {EmployeeModel} EmployeeModel instance
   */
  static fromJson(json) {
    return new EmployeeModel(json);
  }

  /**
   * Validate employee data
   * @returns {Object} Validation result
   */
  validate() {
    const errors = [];

    // Required fields
    if (!this.first_name?.trim()) {
      errors.push("First name is required");
    }

    if (!this.last_name?.trim()) {
      errors.push("Last name is required");
    }

    if (!this.email?.trim()) {
      errors.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.push("Valid email address is required");
    }

    if (!this.phone_number_1?.trim()) {
      errors.push("Primary phone number is required");
    }

    // Optional validations
    if (this.date_of_birth && isNaN(Date.parse(this.date_of_birth))) {
      errors.push("Valid date of birth is required");
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Get contact information
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
      emergencyContact: {
        name: this.emergency_person_name || "",
        phone: this.emergency_person_phone || "",
      },
    };
  }

  /**
   * Get work information
   * @returns {Object} Work info
   */
  getWorkInfo() {
    return {
      title: this.title,
      department: this.belongs_to_company,
      managedBy: this.managed_by,
      rate: this.rate,
      canEvaluate: this.can_evaluate,
      workLoadPending: this.work_load_pending,
      workLoadCompleted: this.work_load_completed,
      companyStatus: this.belongs_to_company_status,
    };
  }

  /**
   * Get educational background summary
   * @returns {Array} Education info
   */
  getEducationSummary() {
    const education = [];

    if (this.primary_school_name) {
      education.push({
        level: "Primary",
        school: this.primary_school_name,
        year: this.primary_school_year_graduated,
      });
    }

    if (this.seconday_school_name) {
      education.push({
        level: "Secondary",
        school: this.seconday_school_name,
        year: this.seconday_school_year_graduated,
      });
    }

    if (this.high_school_name) {
      education.push({
        level: "High School",
        school: this.high_school_name,
        year: this.high_school_year_graduated,
      });
    }

    if (this.certificate_school_name) {
      education.push({
        level: "Certificate",
        school: this.certificate_school_name,
        year: this.certificate_year_graduated,
      });
    }

    if (this.diploma_school_name) {
      education.push({
        level: "Diploma",
        school: this.diploma_school_name,
        year: this.diploma_year_graduated,
      });
    }

    if (this.degree_university_name) {
      education.push({
        level: "Degree",
        school: this.degree_university_name,
        year: this.degree_university_year_graduated,
      });
    }

    if (this.masters_university_name) {
      education.push({
        level: "Masters",
        school: this.masters_university_name,
        year: this.masters_university_year_graduated,
      });
    }

    if (this.phd_university_name) {
      education.push({
        level: "PhD",
        school: this.phd_university_name,
        year: this.phd_university_year_graduated,
      });
    }

    return education;
  }
}

export default EmployeeModel;
