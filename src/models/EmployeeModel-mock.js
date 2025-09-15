/**
 * MOCK EMPLOYEE MODEL - NO BACKEND CONNECTIONS
 * Complete dummy implementation for employee management
 */

import { staffAPI } from "../services/api";

/**
 * Employee Model (Mock Implementation)
 * Uses mock data instead of backend API calls
 */
class EmployeeModel {
  constructor(data = {}) {
    // Primary ID
    this.id = data.id || null;

    // Core User fields
    this.username = data.username || "";
    this.password = data.password || "";
    this.name = data.name || "";
    this.avatar = data.avatar || "";
    this.remember_token = data.remember_token || "";
    this.created_at = data.created_at || "";
    this.updated_at = data.updated_at || "";

    // Personal Information
    this.first_name = data.first_name || "";
    this.last_name = data.last_name || "";
    this.date_of_birth = data.date_of_birth || "";
    this.dob = data.dob || "";
    this.place_of_birth = data.place_of_birth || "";
    this.sex = data.sex || data.gender || "";
    this.nationality = data.nationality || "";
    this.religion = data.religion || "";
    this.marital_status = data.marital_status || "";
    this.given_name = data.given_name || "";

    // Contact Information
    this.home_address = data.home_address || "";
    this.current_address = data.current_address || data.address || "";
    this.phone_number_1 = data.phone_number_1 || "";
    this.phone_number_2 = data.phone_number_2 || "";
    this.email = data.email || "";

    // Professional Information
    this.role = data.role || "";
    this.department = data.department || "";
    this.status = data.status || 1;
    this.specialization = data.specialization || "";
    this.years_of_experience = data.years_of_experience || 0;

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
    this.primary_school_year_graduated = data.primary_school_year_graduated || "";
    this.secondary_school_name = data.secondary_school_name || data.seconday_school_name || "";
    this.secondary_school_year_graduated = data.secondary_school_year_graduated || data.seconday_school_year_graduated || "";
    this.high_school_name = data.high_school_name || "";
    this.high_school_year_graduated = data.high_school_year_graduated || "";
    this.certificate_school_name = data.certificate_school_name || "";
    this.certificate_year_graduated = data.certificate_year_graduated || "";
    this.diploma_school_name = data.diploma_school_name || "";
    this.diploma_year_graduated = data.diploma_year_graduated || "";
    this.degree_university_name = data.degree_university_name || "";
    this.degree_university_year_graduated = data.degree_university_year_graduated || "";
    this.masters_university_name = data.masters_university_name || "";
    this.masters_university_year_graduated = data.masters_university_year_graduated || "";
    this.phd_university_name = data.phd_university_name || "";
    this.phd_university_year_graduated = data.phd_university_year_graduated || "";

    // Enterprise/Company Information
    this.enterprise_id = data.enterprise_id || "";
    this.company_id = data.company_id || "";

    // Additional fields
    this.deleted_at = data.deleted_at || "";
  }

  /**
   * Convert model to JSON
   */
  toJson() {
    return {
      id: this.id,
      username: this.username,
      name: this.name,
      avatar: this.avatar,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone_number_1: this.phone_number_1,
      phone_number_2: this.phone_number_2,
      role: this.role,
      department: this.department,
      status: this.status,
      date_of_birth: this.date_of_birth,
      sex: this.sex,
      nationality: this.nationality,
      address: this.current_address,
      specialization: this.specialization,
      years_of_experience: this.years_of_experience,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }

  /**
   * Get display name
   */
  getDisplayName() {
    if (this.name) return this.name;
    if (this.first_name && this.last_name) {
      return `${this.first_name} ${this.last_name}`;
    }
    return this.email || this.username || 'Unknown User';
  }

  /**
   * Get initials
   */
  getInitials() {
    const name = this.getDisplayName();
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }

  /**
   * Calculate age from date of birth
   */
  getAge() {
    if (!this.date_of_birth && !this.dob) return null;
    
    const birthDate = new Date(this.date_of_birth || this.dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * Check if employee is active
   */
  isActive() {
    return this.status === 1 || this.status === 'active';
  }

  /**
   * Get all employees (static method) - Mock implementation
   */
  static async getAll(params = {}) {
    try {
      const response = await staffAPI.getAll(params);
      
      // Convert response data to EmployeeModel instances
      if (response.data && response.data.data) {
        response.data.data = response.data.data.map(item => new EmployeeModel(item));
      }
      
      return response;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }

  /**
   * Get employee by ID (static method) - Mock implementation
   */
  static async getById(id) {
    try {
      const response = await staffAPI.getById(id);
      
      if (response.data) {
        return new EmployeeModel(response.data);
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw error;
    }
  }

  /**
   * Create new employee (static method) - Mock implementation
   */
  static async create(employeeData) {
    try {
      const response = await staffAPI.create(employeeData);
      
      if (response.data) {
        return new EmployeeModel(response.data);
      }
      
      return null;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  }

  /**
   * Update employee (static method) - Mock implementation
   */
  static async update(id, data) {
    try {
      const response = await staffAPI.update(id, data);
      
      if (response.data) {
        return new EmployeeModel(response.data);
      }
      
      return null;
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  }

  /**
   * Delete employee (static method) - Mock implementation
   */
  static async delete(id) {
    try {
      return await staffAPI.delete(id);
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  }

  /**
   * Search employees - Mock implementation
   */
  static async search(searchTerm, params = {}) {
    try {
      const searchParams = {
        ...params,
        search: searchTerm
      };
      return await this.getAll(searchParams);
    } catch (error) {
      console.error('Error searching employees:', error);
      throw error;
    }
  }

  /**
   * Get employees by department - Mock implementation
   */
  static async getByDepartment(department, params = {}) {
    try {
      const searchParams = {
        ...params,
        department: department
      };
      return await this.getAll(searchParams);
    } catch (error) {
      console.error('Error fetching employees by department:', error);
      throw error;
    }
  }

  /**
   * Get employees by role - Mock implementation
   */
  static async getByRole(role, params = {}) {
    try {
      const searchParams = {
        ...params,
        role: role
      };
      return await this.getAll(searchParams);
    } catch (error) {
      console.error('Error fetching employees by role:', error);
      throw error;
    }
  }

  /**
   * Save current instance - Mock implementation
   */
  async save() {
    try {
      if (this.id) {
        // Update existing employee
        const response = await EmployeeModel.update(this.id, this.toJson());
        if (response) {
          Object.assign(this, response.toJson());
        }
        return response;
      } else {
        // Create new employee
        const response = await EmployeeModel.create(this.toJson());
        if (response) {
          Object.assign(this, response.toJson());
        }
        return response;
      }
    } catch (error) {
      console.error('Error saving employee:', error);
      throw error;
    }
  }

  /**
   * Delete current instance - Mock implementation
   */
  async remove() {
    try {
      if (!this.id) {
        throw new Error('Cannot delete employee without ID');
      }
      return await EmployeeModel.delete(this.id);
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  }

  /**
   * Validate employee data
   */
  validate() {
    const errors = {};

    if (!this.name && (!this.first_name || !this.last_name)) {
      errors.name = 'Name is required';
    }

    if (!this.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.email = 'Invalid email format';
    }

    if (!this.role) {
      errors.role = 'Role is required';
    }

    if (!this.department) {
      errors.department = 'Department is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors: errors
    };
  }

  /**
   * Clone current instance
   */
  clone() {
    return new EmployeeModel(this.toJson());
  }

  /**
   * Get formatted data for display
   */
  getDisplayData() {
    return {
      id: this.id,
      name: this.getDisplayName(),
      initials: this.getInitials(),
      email: this.email,
      phone: this.phone_number_1,
      role: this.role,
      department: this.department,
      status: this.isActive() ? 'Active' : 'Inactive',
      age: this.getAge(),
      avatar: this.avatar,
      specialization: this.specialization,
      experience: this.years_of_experience ? `${this.years_of_experience} years` : 'N/A'
    };
  }
}

export default EmployeeModel;
