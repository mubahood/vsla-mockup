/**
 * SIMPLIFIED EMPLOYEE MODEL - STATIC DATA IMPLEMENTATION
 * Focused on essential fields for FOSTER Project team management
 */

// Generate 100 dummy employee records for FOSTER Project
const MOCK_EMPLOYEES = [
  { id: 1, name: "Dr. Agnes Nakakande", email: "agnes@foster.org", phone: "+256701234567", role: "Project Coordinator", department: "Management", status: "Active", avatar: "", created_at: "2024-01-15" },
  { id: 2, name: "James Lomuria", email: "james@foster.org", phone: "+256702234567", role: "FFS Technical Specialist", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-01-16" },
  { id: 3, name: "Mary Akello", email: "mary@foster.org", phone: "+256703234567", role: "VSLA Coordinator", department: "Finance", status: "Active", avatar: "", created_at: "2024-01-17" },
  { id: 4, name: "Peter Lokomol", email: "peter@foster.org", phone: "+256704234567", role: "Digital Systems Specialist", department: "Technology", status: "Active", avatar: "", created_at: "2024-01-18" },
  { id: 5, name: "Grace Atyang", email: "grace@foster.org", phone: "+256705234567", role: "M&E Officer", department: "Monitoring", status: "Active", avatar: "", created_at: "2024-01-19" },
  { id: 6, name: "Samuel Lokiru", email: "samuel@foster.org", phone: "+256706234567", role: "Community Mobilizer", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-01-20" },
  { id: 7, name: "Catherine Anyeko", email: "catherine@foster.org", phone: "+256707234567", role: "Training Coordinator", department: "Capacity Building", status: "Active", avatar: "", created_at: "2024-01-21" },
  { id: 8, name: "Joseph Odongo", email: "joseph@foster.org", phone: "+256708234567", role: "Agricultural Extension Officer", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-01-22" },
  { id: 9, name: "Sarah Auma", email: "sarah@foster.org", phone: "+256709234567", role: "Gender & Social Inclusion Officer", department: "Social Development", status: "Active", avatar: "", created_at: "2024-01-23" },
  { id: 10, name: "David Okello", email: "david@foster.org", phone: "+256710234567", role: "Financial Officer", department: "Finance", status: "Active", avatar: "", created_at: "2024-01-24" },
  { id: 11, name: "Joyce Adero", email: "joyce@foster.org", phone: "+256711234567", role: "Administrative Assistant", department: "Administration", status: "Active", avatar: "", created_at: "2024-01-25" },
  { id: 12, name: "Emmanuel Ochieng", email: "emmanuel@foster.org", phone: "+256712234567", role: "Field Assistant", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-01-26" },
  { id: 13, name: "Rose Akot", email: "rose@foster.org", phone: "+256713234567", role: "Communications Officer", department: "Communications", status: "Active", avatar: "", created_at: "2024-01-27" },
  { id: 14, name: "Patrick Okwang", email: "patrick@foster.org", phone: "+256714234567", role: "Procurement Officer", department: "Administration", status: "Active", avatar: "", created_at: "2024-01-28" },
  { id: 15, name: "Margaret Akello", email: "margaret@foster.org", phone: "+256715234567", role: "Nutrition Specialist", department: "Technical", status: "Active", avatar: "", created_at: "2024-01-29" },
  { id: 16, name: "Francis Olwedo", email: "francis@foster.org", phone: "+256716234567", role: "Climate Adaptation Officer", department: "Technical", status: "Active", avatar: "", created_at: "2024-01-30" },
  { id: 17, name: "Alice Achan", email: "alice@foster.org", phone: "+256717234567", role: "Market Linkage Officer", department: "Marketing", status: "Active", avatar: "", created_at: "2024-02-01" },
  { id: 18, name: "Moses Okumu", email: "moses@foster.org", phone: "+256718234567", role: "Seed Production Officer", department: "Technical", status: "Active", avatar: "", created_at: "2024-02-02" },
  { id: 19, name: "Helen Apio", email: "helen@foster.org", phone: "+256719234567", role: "Women Empowerment Officer", department: "Social Development", status: "Active", avatar: "", created_at: "2024-02-03" },
  { id: 20, name: "John Oketayot", email: "john@foster.org", phone: "+256720234567", role: "Youth Coordinator", department: "Social Development", status: "Active", avatar: "", created_at: "2024-02-04" },
  { id: 21, name: "Beatrice Atim", email: "beatrice@foster.org", phone: "+256721234567", role: "Data Analyst", department: "Technology", status: "Active", avatar: "", created_at: "2024-02-05" },
  { id: 22, name: "Robert Ongom", email: "robert@foster.org", phone: "+256722234567", role: "Livestock Officer", department: "Technical", status: "Active", avatar: "", created_at: "2024-02-06" },
  { id: 23, name: "Lucy Aber", email: "lucy@foster.org", phone: "+256723234567", role: "Community Health Officer", department: "Health", status: "Active", avatar: "", created_at: "2024-02-07" },
  { id: 24, name: "Charles Odong", email: "charles@foster.org", phone: "+256724234567", role: "Irrigation Specialist", department: "Technical", status: "Active", avatar: "", created_at: "2024-02-08" },
  { id: 25, name: "Janet Akello", email: "janet@foster.org", phone: "+256725234567", role: "Field Coordinator - Kotido", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-02-09" },
  { id: 26, name: "Paul Lokwang", email: "paul@foster.org", phone: "+256726234567", role: "Field Coordinator - Moroto", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-02-10" },
  { id: 27, name: "Mary Adong", email: "maryadong@foster.org", phone: "+256727234567", role: "Field Coordinator - Napak", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-02-11" },
  { id: 28, name: "Simon Lomonyang", email: "simon@foster.org", phone: "+256728234567", role: "Field Coordinator - Amudat", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-02-12" },
  { id: 29, name: "Christine Akiru", email: "christine@foster.org", phone: "+256729234567", role: "Field Coordinator - Kaabong", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-02-13" },
  { id: 30, name: "Timothy Lokol", email: "timothy@foster.org", phone: "+256730234567", role: "Field Coordinator - Abim", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-02-14" },
  { id: 31, name: "Florence Nakiru", email: "florence@foster.org", phone: "+256731234567", role: "Field Coordinator - Karenga", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-02-15" },
  { id: 32, name: "Vincent Opio", email: "vincent@foster.org", phone: "+256732234567", role: "Field Coordinator - Nabilatuk", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-02-16" },
  { id: 33, name: "Esther Akello", email: "esther@foster.org", phone: "+256733234567", role: "Field Coordinator - Nakapiripirit", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-02-17" },
  { id: 34, name: "George Lokuru", email: "george@foster.org", phone: "+256734234567", role: "FFS Facilitator", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-02-18" },
  { id: 35, name: "Betty Aceng", email: "betty@foster.org", phone: "+256735234567", role: "FFS Facilitator", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-02-19" },
  { id: 36, name: "Michael Lokeris", email: "michael@foster.org", phone: "+256736234567", role: "FFS Facilitator", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-02-20" },
  { id: 37, name: "Judith Akello", email: "judith@foster.org", phone: "+256737234567", role: "FFS Facilitator", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-02-21" },
  { id: 38, name: "Andrew Lomuria", email: "andrew@foster.org", phone: "+256738234567", role: "FFS Facilitator", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-02-22" },
  { id: 39, name: "Susan Atyang", email: "susan@foster.org", phone: "+256739234567", role: "VSLA Facilitator", department: "Finance", status: "Active", avatar: "", created_at: "2024-02-23" },
  { id: 40, name: "Peter Okello", email: "peterokello@foster.org", phone: "+256740234567", role: "VSLA Facilitator", department: "Finance", status: "Active", avatar: "", created_at: "2024-02-24" },
  { id: 41, name: "Agnes Adong", email: "agnesadong@foster.org", phone: "+256741234567", role: "VSLA Facilitator", department: "Finance", status: "Active", avatar: "", created_at: "2024-02-25" },
  { id: 42, name: "Joseph Lokwang", email: "josephlokwang@foster.org", phone: "+256742234567", role: "VSLA Facilitator", department: "Finance", status: "Active", avatar: "", created_at: "2024-02-26" },
  { id: 43, name: "Catherine Akello", email: "catherineakello@foster.org", phone: "+256743234567", role: "VSLA Facilitator", department: "Finance", status: "Active", avatar: "", created_at: "2024-02-27" },
  { id: 44, name: "Daniel Lomonyang", email: "daniel@foster.org", phone: "+256744234567", role: "Agronomist", department: "Technical", status: "Active", avatar: "", created_at: "2024-02-28" },
  { id: 45, name: "Rachel Akiru", email: "rachel@foster.org", phone: "+256745234567", role: "Agronomist", department: "Technical", status: "Active", avatar: "", created_at: "2024-03-01" },
  { id: 46, name: "Isaac Okello", email: "isaac@foster.org", phone: "+256746234567", role: "Agronomist", department: "Technical", status: "Active", avatar: "", created_at: "2024-03-02" },
  { id: 47, name: "Mercy Adero", email: "mercy@foster.org", phone: "+256747234567", role: "Food Security Analyst", department: "Technical", status: "Active", avatar: "", created_at: "2024-03-03" },
  { id: 48, name: "William Lokol", email: "william@foster.org", phone: "+256748234567", role: "Value Chain Specialist", department: "Marketing", status: "Active", avatar: "", created_at: "2024-03-04" },
  { id: 49, name: "Diana Akello", email: "diana@foster.org", phone: "+256749234567", role: "Post-Harvest Specialist", department: "Technical", status: "Active", avatar: "", created_at: "2024-03-05" },
  { id: 50, name: "Benjamin Okumu", email: "benjamin@foster.org", phone: "+256750234567", role: "Cooperative Development Officer", department: "Social Development", status: "Active", avatar: "", created_at: "2024-03-06" },
  { id: 51, name: "Stella Apio", email: "stella@foster.org", phone: "+256751234567", role: "Digital Literacy Trainer", department: "Technology", status: "Active", avatar: "", created_at: "2024-03-07" },
  { id: 52, name: "Mark Oketayot", email: "mark@foster.org", phone: "+256752234567", role: "Equipment Technician", department: "Technology", status: "Active", avatar: "", created_at: "2024-03-08" },
  { id: 53, name: "Lillian Atim", email: "lillian@foster.org", phone: "+256753234567", role: "Solar Technician", department: "Technology", status: "Active", avatar: "", created_at: "2024-03-09" },
  { id: 54, name: "James Ongom", email: "jamesongom@foster.org", phone: "+256754234567", role: "Water Systems Engineer", department: "Technical", status: "Active", avatar: "", created_at: "2024-03-10" },
  { id: 55, name: "Patricia Aber", email: "patricia@foster.org", phone: "+256755234567", role: "Environmental Officer", department: "Technical", status: "Active", avatar: "", created_at: "2024-03-11" },
  { id: 56, name: "Stephen Odong", email: "stephen@foster.org", phone: "+256756234567", role: "Soil Scientist", department: "Technical", status: "Active", avatar: "", created_at: "2024-03-12" },
  { id: 57, name: "Nancy Akello", email: "nancy@foster.org", phone: "+256757234567", role: "Entomologist", department: "Technical", status: "Active", avatar: "", created_at: "2024-03-13" },
  { id: 58, name: "Geoffrey Lokwang", email: "geoffrey@foster.org", phone: "+256758234567", role: "Plant Pathologist", department: "Technical", status: "Active", avatar: "", created_at: "2024-03-14" },
  { id: 59, name: "Caroline Adong", email: "caroline@foster.org", phone: "+256759234567", role: "Research Assistant", department: "Technical", status: "Active", avatar: "", created_at: "2024-03-15" },
  { id: 60, name: "Eric Lomonyang", email: "eric@foster.org", phone: "+256760234567", role: "Data Collector", department: "Monitoring", status: "Active", avatar: "", created_at: "2024-03-16" },
  { id: 61, name: "Grace Akiru", email: "graceakiru@foster.org", phone: "+256761234567", role: "Survey Coordinator", department: "Monitoring", status: "Active", avatar: "", created_at: "2024-03-17" },
  { id: 62, name: "Richard Okello", email: "richard@foster.org", phone: "+256762234567", role: "GIS Specialist", department: "Technology", status: "Active", avatar: "", created_at: "2024-03-18" },
  { id: 63, name: "Doreen Adero", email: "doreen@foster.org", phone: "+256763234567", role: "Remote Sensing Analyst", department: "Technology", status: "Active", avatar: "", created_at: "2024-03-19" },
  { id: 64, name: "Kenneth Lokol", email: "kenneth@foster.org", phone: "+256764234567", role: "Database Administrator", department: "Technology", status: "Active", avatar: "", created_at: "2024-03-20" },
  { id: 65, name: "Winnie Akello", email: "winnie@foster.org", phone: "+256765234567", role: "IT Support Specialist", department: "Technology", status: "Active", avatar: "", created_at: "2024-03-21" },
  { id: 66, name: "Tom Okumu", email: "tom@foster.org", phone: "+256766234567", role: "Network Administrator", department: "Technology", status: "Active", avatar: "", created_at: "2024-03-22" },
  { id: 67, name: "Irene Apio", email: "irene@foster.org", phone: "+256767234567", role: "Content Developer", department: "Communications", status: "Active", avatar: "", created_at: "2024-03-23" },
  { id: 68, name: "Alfred Oketayot", email: "alfred@foster.org", phone: "+256768234567", role: "Video Producer", department: "Communications", status: "Active", avatar: "", created_at: "2024-03-24" },
  { id: 69, name: "Brenda Atim", email: "brenda@foster.org", phone: "+256769234567", role: "Graphic Designer", department: "Communications", status: "Active", avatar: "", created_at: "2024-03-25" },
  { id: 70, name: "Ronald Ongom", email: "ronald@foster.org", phone: "+256770234567", role: "Photographer", department: "Communications", status: "Active", avatar: "", created_at: "2024-03-26" },
  { id: 71, name: "Eunice Aber", email: "eunice@foster.org", phone: "+256771234567", role: "Social Media Manager", department: "Communications", status: "Active", avatar: "", created_at: "2024-03-27" },
  { id: 72, name: "Brian Odong", email: "brian@foster.org", phone: "+256772234567", role: "Driver", department: "Administration", status: "Active", avatar: "", created_at: "2024-03-28" },
  { id: 73, name: "Sylvia Akello", email: "sylvia@foster.org", phone: "+256773234567", role: "Office Assistant", department: "Administration", status: "Active", avatar: "", created_at: "2024-03-29" },
  { id: 74, name: "Jackson Lokwang", email: "jackson@foster.org", phone: "+256774234567", role: "Security Guard", department: "Administration", status: "Active", avatar: "", created_at: "2024-03-30" },
  { id: 75, name: "Violet Adong", email: "violet@foster.org", phone: "+256775234567", role: "Cleaner", department: "Administration", status: "Active", avatar: "", created_at: "2024-03-31" },
  { id: 76, name: "Henry Lomonyang", email: "henry@foster.org", phone: "+256776234567", role: "Maintenance Officer", department: "Administration", status: "Active", avatar: "", created_at: "2024-04-01" },
  { id: 77, name: "Gladys Akiru", email: "gladys@foster.org", phone: "+256777234567", role: "Receptionist", department: "Administration", status: "Active", avatar: "", created_at: "2024-04-02" },
  { id: 78, name: "Moses Okello", email: "mosesokello@foster.org", phone: "+256778234567", role: "Storeman", department: "Administration", status: "Active", avatar: "", created_at: "2024-04-03" },
  { id: 79, name: "Josephine Adero", email: "josephine@foster.org", phone: "+256779234567", role: "Accountant", department: "Finance", status: "Active", avatar: "", created_at: "2024-04-04" },
  { id: 80, name: "Christopher Lokol", email: "christopher@foster.org", phone: "+256780234567", role: "Auditor", department: "Finance", status: "Active", avatar: "", created_at: "2024-04-05" },
  { id: 81, name: "Priscilla Akello", email: "priscilla@foster.org", phone: "+256781234567", role: "Budget Officer", department: "Finance", status: "Active", avatar: "", created_at: "2024-04-06" },
  { id: 82, name: "Fred Okumu", email: "fred@foster.org", phone: "+256782234567", role: "Cashier", department: "Finance", status: "Active", avatar: "", created_at: "2024-04-07" },
  { id: 83, name: "Millicent Apio", email: "millicent@foster.org", phone: "+256783234567", role: "Payroll Officer", department: "Finance", status: "Active", avatar: "", created_at: "2024-04-08" },
  { id: 84, name: "Lawrence Oketayot", email: "lawrence@foster.org", phone: "+256784234567", role: "Contract Officer", department: "Administration", status: "Active", avatar: "", created_at: "2024-04-09" },
  { id: 85, name: "Christine Atim", email: "christineatim@foster.org", phone: "+256785234567", role: "Legal Advisor", department: "Administration", status: "Active", avatar: "", created_at: "2024-04-10" },
  { id: 86, name: "Samuel Ongom", email: "samuelongom@foster.org", phone: "+256786234567", role: "Compliance Officer", department: "Administration", status: "Active", avatar: "", created_at: "2024-04-11" },
  { id: 87, name: "Ruth Aber", email: "ruth@foster.org", phone: "+256787234567", role: "Quality Assurance Officer", department: "Technical", status: "Active", avatar: "", created_at: "2024-04-12" },
  { id: 88, name: "Dennis Odong", email: "dennis@foster.org", phone: "+256788234567", role: "Health & Safety Officer", department: "Administration", status: "Active", avatar: "", created_at: "2024-04-13" },
  { id: 89, name: "Jennifer Akello", email: "jennifer@foster.org", phone: "+256789234567", role: "Training Assistant", department: "Capacity Building", status: "Active", avatar: "", created_at: "2024-04-14" },
  { id: 90, name: "Paul Lokwang", email: "paullokwang@foster.org", phone: "+256790234567", role: "Workshop Facilitator", department: "Capacity Building", status: "Active", avatar: "", created_at: "2024-04-15" },
  { id: 91, name: "Mercy Adong", email: "mercyadong@foster.org", phone: "+256791234567", role: "Learning Coordinator", department: "Capacity Building", status: "Active", avatar: "", created_at: "2024-04-16" },
  { id: 92, name: "Simon Lomonyang", email: "simonlomonyang@foster.org", phone: "+256792234567", role: "Curriculum Developer", department: "Capacity Building", status: "Active", avatar: "", created_at: "2024-04-17" },
  { id: 93, name: "Esther Akiru", email: "estherakiru@foster.org", phone: "+256793234567", role: "Assessment Officer", department: "Capacity Building", status: "Active", avatar: "", created_at: "2024-04-18" },
  { id: 94, name: "James Okello", email: "jamesokello@foster.org", phone: "+256794234567", role: "Field Supervisor", department: "Field Operations", status: "Active", avatar: "", created_at: "2024-04-19" },
  { id: 95, name: "Sandra Adero", email: "sandra@foster.org", phone: "+256795234567", role: "Logistics Coordinator", department: "Administration", status: "Active", avatar: "", created_at: "2024-04-20" },
  { id: 96, name: "Emmanuel Lokol", email: "emmanuellokol@foster.org", phone: "+256796234567", role: "Supply Chain Officer", department: "Administration", status: "Active", avatar: "", created_at: "2024-04-21" },
  { id: 97, name: "Grace Akello", email: "graceakello@foster.org", phone: "+256797234567", role: "Inventory Manager", department: "Administration", status: "Active", avatar: "", created_at: "2024-04-22" },
  { id: 98, name: "Robert Okumu", email: "robertokumu@foster.org", phone: "+256798234567", role: "Transport Coordinator", department: "Administration", status: "Active", avatar: "", created_at: "2024-04-23" },
  { id: 99, name: "Mary Apio", email: "maryapio@foster.org", phone: "+256799234567", role: "Event Coordinator", department: "Communications", status: "Active", avatar: "", created_at: "2024-04-24" },
  { id: 100, name: "John Oketayot", email: "johnoketayot@foster.org", phone: "+256800234567", role: "Partnership Officer", department: "Management", status: "Active", avatar: "", created_at: "2024-04-25" }
];

/**
 * Simplified Employee Model for FOSTER Project
 * Essential fields only for efficient management
 */
class EmployeeModel {
  constructor(data = {}) {
    // Essential fields only
    this.id = data.id || null;
    this.name = data.name || "";
    this.email = data.email || "";
    this.phone = data.phone || "";
    this.role = data.role || "";
    this.department = data.department || "";
    this.status = data.status || "Active";
    this.avatar = data.avatar || "";
    this.created_at = data.created_at || new Date().toISOString();
  }

  /**
   * Convert model to JSON
   */
  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      role: this.role,
      department: this.department,
      status: this.status,
      avatar: this.avatar,
      created_at: this.created_at
    };
  }

  /**
   * Get display name
   */
  getDisplayName() {
    return this.name || this.email || 'Unknown User';
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
   * Check if employee is active
   */
  isActive() {
    return this.status === 'Active';
  }

  /**
   * Simulate API delay
   */
  static async simulateDelay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get all employees (static method) - Static implementation
   */
  static async getAll(params = {}) {
    await this.simulateDelay();
    
    try {
      let employees = [...MOCK_EMPLOYEES];
      const { search = '', page = 1, per_page = 20 } = params;
      
      // Filter by search if provided
      if (search.trim()) {
        const searchTerm = search.toLowerCase();
        employees = employees.filter(emp => 
          emp.name.toLowerCase().includes(searchTerm) ||
          emp.email.toLowerCase().includes(searchTerm) ||
          emp.role.toLowerCase().includes(searchTerm) ||
          emp.department.toLowerCase().includes(searchTerm) ||
          emp.phone.includes(searchTerm)
        );
      }
      
      // Pagination
      const total = employees.length;
      const startIndex = (page - 1) * per_page;
      const endIndex = startIndex + per_page;
      const paginatedEmployees = employees.slice(startIndex, endIndex);
      
      return {
        data: {
          data: paginatedEmployees,
          pagination: {
            current_page: page,
            per_page: per_page,
            total: total,
            last_page: Math.ceil(total / per_page),
            from: startIndex + 1,
            to: Math.min(endIndex, total)
          }
        }
      };
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }

  /**
   * Get employee by ID (static method) - Static implementation
   */
  static async getById(id) {
    await this.simulateDelay();
    
    try {
      const employee = MOCK_EMPLOYEES.find(emp => emp.id === parseInt(id));
      
      if (!employee) {
        throw new Error('Employee not found');
      }
      
      return {
        data: employee
      };
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw error;
    }
  }

  /**
   * Create new employee (static method) - Static implementation
   */
  static async create(employeeData) {
    await this.simulateDelay();
    
    try {
      const newEmployee = {
        id: Math.max(...MOCK_EMPLOYEES.map(e => e.id)) + 1,
        name: employeeData.name || "",
        email: employeeData.email || "",
        phone: employeeData.phone || "",
        role: employeeData.role || "",
        department: employeeData.department || "",
        status: employeeData.status || "Active",
        avatar: employeeData.avatar || "",
        created_at: new Date().toISOString()
      };
      
      MOCK_EMPLOYEES.push(newEmployee);
      
      return {
        data: {
          data: newEmployee
        }
      };
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  }

  /**
   * Update employee (static method) - Static implementation
   */
  static async update(id, data) {
    await this.simulateDelay();
    
    try {
      const index = MOCK_EMPLOYEES.findIndex(emp => emp.id === parseInt(id));
      
      if (index === -1) {
        throw new Error('Employee not found');
      }
      
      MOCK_EMPLOYEES[index] = {
        ...MOCK_EMPLOYEES[index],
        ...data,
        id: parseInt(id) // Ensure ID doesn't change
      };
      
      return {
        data: {
          data: MOCK_EMPLOYEES[index]
        }
      };
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  }

  /**
   * Delete employee (static method) - Static implementation
   */
  static async delete(id) {
    await this.simulateDelay();
    
    try {
      const index = MOCK_EMPLOYEES.findIndex(emp => emp.id === parseInt(id));
      
      if (index === -1) {
        throw new Error('Employee not found');
      }
      
      MOCK_EMPLOYEES.splice(index, 1);
      
      return {
        data: {
          message: 'Employee deleted successfully'
        }
      };
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

    if (!this.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!this.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.email = 'Invalid email format';
    }

    if (!this.role.trim()) {
      errors.role = 'Role is required';
    }

    if (!this.department.trim()) {
      errors.department = 'Department is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors: errors
    };
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
      phone: this.phone,
      role: this.role,
      department: this.department,
      status: this.status,
      avatar: this.avatar
    };
  }
}

export default EmployeeModel;
