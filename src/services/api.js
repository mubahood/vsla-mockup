/**
 * MOCK API SERVICE - COMPLETE DUMMY IMPLEMENTATION
 * This replaces all backend API calls with mock data
 * No internet or backend connection required
 */

import {
  MOCK_USERS,
  MOCK_FARMER_MEMBERS,
  MOCK_TRAINING_SESSIONS,
  MOCK_AGRICULTURAL_RECORDS,
  MOCK_DEPARTMENTS,
  MOCK_SERVICES,
  MOCK_DASHBOARD_STATS,
  MOCK_MANIFEST,
  generateMockFarmerMembers,
  generateMockStaff
} from '../data/mockData';

// Simulate network delay
const simulateNetworkDelay = (min = 200, max = 800) => {
  return new Promise(resolve => {
    const delay = Math.random() * (max - min) + min;
    setTimeout(resolve, delay);
  });
};

// Mock localStorage for persistent data (simulates database)
class MockStorage {
  static prefix = 'foster_mock_';

  static get(key) {
    try {
      const data = localStorage.getItem(this.prefix + key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  static remove(key) {
    localStorage.removeItem(this.prefix + key);
  }

  static clear() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }
}

// Initialize mock data in storage if not exists
const initializeMockData = () => {
  if (!MockStorage.get('users')) {
    MockStorage.set('users', generateMockStaff(25));
  }
  if (!MockStorage.get('farmer_members')) {
    MockStorage.set('farmer_members', generateMockFarmerMembers(100));
  }
  if (!MockStorage.get('training_sessions')) {
    MockStorage.set('training_sessions', MOCK_TRAINING_SESSIONS);
  }
  if (!MockStorage.get('agricultural_records')) {
    MockStorage.set('agricultural_records', MOCK_AGRICULTURAL_RECORDS);
  }
  if (!MockStorage.get('departments')) {
    MockStorage.set('departments', MOCK_DEPARTMENTS);
  }
  if (!MockStorage.get('services')) {
    MockStorage.set('services', MOCK_SERVICES);
  }
  if (!MockStorage.get('manifest')) {
    MockStorage.set('manifest', MOCK_MANIFEST);
  }
};

// Initialize data on module load
initializeMockData();

// Mock Authentication API
export const authAPI = {
  login: async (credentials) => {
    await simulateNetworkDelay();
    
    const users = MockStorage.get('users') || MOCK_USERS;
    const user = users.find(u => 
      (u.email === credentials.email || 
       u.username === credentials.email ||
       u.phone_number_1 === credentials.email ||
       u.id.toString() === credentials.email) &&
      u.status === 1
    );
    
    if (user && credentials.password === 'password123') {
      const userWithToken = { ...user };
      userWithToken.token = `mock_token_${Date.now()}_${user.id}`;
      userWithToken.remember_token = userWithToken.token;
      
      return {
        data: {
          user: userWithToken,
          token: userWithToken.token
        }
      };
    } else {
      throw new Error('Invalid credentials');
    }
  },

  register: async (userData) => {
    await simulateNetworkDelay();
    
    const users = MockStorage.get('users') || [];
    const existingUser = users.find(u => u.email === userData.email);
    
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    const newUser = {
      id: users.length + 1,
      name: userData.name,
      first_name: userData.name.split(' ')[0],
      last_name: userData.name.split(' ').slice(1).join(' '),
      email: userData.email,
      username: userData.email.split('@')[0],
      phone_number_1: userData.phone || '',
      role: 'agricultural_specialist',
      department: 'Field Operations',
      status: 1,
      avatar: null,
      created_at: new Date().toISOString()
    };
    
    users.push(newUser);
    MockStorage.set('users', users);
    
    const token = `mock_token_${Date.now()}_${newUser.id}`;
    newUser.token = token;
    
    return {
      data: {
        user: newUser,
        token: token
      }
    };
  },

  logout: async () => {
    await simulateNetworkDelay(100, 300);
    return { data: { message: 'Logged out successfully' } };
  },

  user: async () => {
    await simulateNetworkDelay(100, 400);
    
    const token = localStorage.getItem('auth_token') || localStorage.getItem('DB_TOKEN');
    
    if (token && token.startsWith('mock_token_')) {
      const tokenParts = token.split('_');
      const userId = tokenParts.length > 2 ? parseInt(tokenParts[2]) : 1;
      
      const users = MockStorage.get('users') || MOCK_USERS;
      const user = users.find(u => u.id === userId) || users[0];
      
      return {
        data: {
          user: user
        }
      };
    } else {
      throw new Error('Unauthenticated');
    }
  },

  forgotPassword: async (email) => {
    await simulateNetworkDelay();
    return {
      data: {
        message: 'Password reset email sent successfully (Mock)'
      }
    };
  }
};

// Mock Farmer Members API
export const farmerMembersAPI = {
  getAll: async (params = {}) => {
    await simulateNetworkDelay();
    
    let farmerMembers = MockStorage.get('farmer_members') || generateMockFarmerMembers(100);
    
    // Apply search filter
    if (params.search) {
      const search = params.search.toLowerCase();
      farmerMembers = farmerMembers.filter(m => 
        m.first_name.toLowerCase().includes(search) ||
        m.last_name.toLowerCase().includes(search) ||
        m.email.toLowerCase().includes(search) ||
        m.member_number.toLowerCase().includes(search)
      );
    }
    
    // Apply pagination
    const page = parseInt(params.page) || 1;
    const perPage = parseInt(params.per_page) || 10;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    
    const paginatedMembers = farmerMembers.slice(startIndex, endIndex);
    
    return {
      data: {
        data: paginatedMembers,
        current_page: page,
        last_page: Math.ceil(farmerMembers.length / perPage),
        per_page: perPage,
        total: farmerMembers.length
      }
    };
  },

  getById: async (id) => {
    await simulateNetworkDelay();
    
    const farmerMembers = MockStorage.get('farmer_members') || [];
    const member = farmerMembers.find(m => m.id === parseInt(id));
    
    if (!member) {
      throw new Error('Member not found');
    }
    
    return { data: member };
  },

  create: async (data) => {
    await simulateNetworkDelay();
    
    const farmerMembers = MockStorage.get('farmer_members') || [];
    const newMember = {
      id: farmerMembers.length + 1,
      member_number: `FM${String(farmerMembers.length + 1).padStart(3, '0')}`,
      ...data,
      status: 'active',
      created_at: new Date().toISOString()
    };
    
    farmerMembers.push(newMember);
    MockStorage.set('farmer_members', farmerMembers);
    
    return { data: newMember };
  },

  update: async (id, data) => {
    await simulateNetworkDelay();
    
    const farmerMembers = MockStorage.get('farmer_members') || [];
    const index = farmerMembers.findIndex(m => m.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Member not found');
    }
    
    farmerMembers[index] = { ...farmerMembers[index], ...data, updated_at: new Date().toISOString() };
    MockStorage.set('farmer_members', farmerMembers);
    
    return { data: farmerMembers[index] };
  },

  delete: async (id) => {
    await simulateNetworkDelay();
    
    const farmerMembers = MockStorage.get('farmer_members') || [];
    const index = farmerMembers.findIndex(m => m.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Member not found');
    }
    
    farmerMembers.splice(index, 1);
    MockStorage.set('farmer_members', farmerMembers);
    
    return { data: { message: 'Member deleted successfully' } };
  }
};

// Mock Staff API
export const staffAPI = {
  getAll: async (params = {}) => {
    await simulateNetworkDelay();
    
    let staff = MockStorage.get('users') || generateMockStaff(25);
    
    // Apply search filter
    if (params.search) {
      const search = params.search.toLowerCase();
      staff = staff.filter(s => 
        s.name.toLowerCase().includes(search) ||
        s.email.toLowerCase().includes(search) ||
        s.department.toLowerCase().includes(search) ||
        s.role.toLowerCase().includes(search)
      );
    }
    
    // Apply pagination
    const page = parseInt(params.page) || 1;
    const perPage = parseInt(params.per_page) || 10;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    
    const paginatedStaff = staff.slice(startIndex, endIndex);
    
    return {
      data: {
        data: paginatedStaff,
        current_page: page,
        last_page: Math.ceil(staff.length / perPage),
        per_page: perPage,
        total: staff.length
      }
    };
  },

  getById: async (id) => {
    await simulateNetworkDelay();
    
    const staff = MockStorage.get('users') || [];
    const member = staff.find(s => s.id === parseInt(id));
    
    if (!member) {
      throw new Error('Staff member not found');
    }
    
    return { data: member };
  },

  create: async (data) => {
    await simulateNetworkDelay();
    
    const staff = MockStorage.get('users') || [];
    const newStaff = {
      id: staff.length + 1,
      name: `${data.first_name} ${data.last_name}`,
      ...data,
      status: 1,
      created_at: new Date().toISOString()
    };
    
    staff.push(newStaff);
    MockStorage.set('users', staff);
    
    return { data: newStaff };
  },

  update: async (id, data) => {
    await simulateNetworkDelay();
    
    const staff = MockStorage.get('users') || [];
    const index = staff.findIndex(s => s.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Staff member not found');
    }
    
    staff[index] = { ...staff[index], ...data, updated_at: new Date().toISOString() };
    MockStorage.set('users', staff);
    
    return { data: staff[index] };
  },

  delete: async (id) => {
    await simulateNetworkDelay();
    
    const staff = MockStorage.get('users') || [];
    const index = staff.findIndex(s => s.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Staff member not found');
    }
    
    staff.splice(index, 1);
    MockStorage.set('users', staff);
    
    return { data: { message: 'Staff member deleted successfully' } };
  }
};

// Mock Training Sessions API
export const trainingSessionsAPI = {
  getAll: async (params = {}) => {
    await simulateNetworkDelay();
    
    let trainingSessions = MockStorage.get('training_sessions') || MOCK_TRAINING_SESSIONS;
    
    // Apply filters
    if (params.search) {
      const search = params.search.toLowerCase();
      trainingSessions = trainingSessions.filter(s => 
        s.member?.first_name?.toLowerCase().includes(search) ||
        s.facilitator?.name?.toLowerCase().includes(search) ||
        s.topic?.toLowerCase().includes(search)
      );
    }
    
    if (params.status) {
      trainingSessions = trainingSessions.filter(s => s.status === params.status);
    }
    
    if (params.date) {
      trainingSessions = trainingSessions.filter(s => s.session_date === params.date);
    }
    
    return { data: trainingSessions };
  },

  getById: async (id) => {
    await simulateNetworkDelay();
    
    const trainingSessions = MockStorage.get('training_sessions') || [];
    const session = trainingSessions.find(s => s.id === parseInt(id));
    
    if (!session) {
      throw new Error('Training session not found');
    }
    
    return { data: session };
  },

  create: async (data) => {
    await simulateNetworkDelay();
    
    const trainingSessions = MockStorage.get('training_sessions') || [];
    const farmerMembers = MockStorage.get('farmer_members') || [];
    const staff = MockStorage.get('users') || [];
    
    const member = farmerMembers.find(m => m.id === parseInt(data.member_id));
    const facilitator = staff.find(s => s.id === parseInt(data.facilitator_id));
    
    const newSession = {
      id: trainingSessions.length + 1,
      ...data,
      member,
      facilitator,
      status: 'scheduled',
      created_at: new Date().toISOString()
    };
    
    trainingSessions.push(newSession);
    MockStorage.set('training_sessions', trainingSessions);
    
    return { data: newSession };
  },

  update: async (id, data) => {
    await simulateNetworkDelay();
    
    const trainingSessions = MockStorage.get('training_sessions') || [];
    const index = trainingSessions.findIndex(s => s.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Training session not found');
    }
    
    trainingSessions[index] = { ...trainingSessions[index], ...data, updated_at: new Date().toISOString() };
    MockStorage.set('training_sessions', trainingSessions);
    
    return { data: trainingSessions[index] };
  },

  delete: async (id) => {
    await simulateNetworkDelay();
    
    const trainingSessions = MockStorage.get('training_sessions') || [];
    const index = trainingSessions.findIndex(s => s.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Training session not found');
    }
    
    trainingSessions.splice(index, 1);
    MockStorage.set('training_sessions', trainingSessions);
    
    return { data: { message: 'Training session deleted successfully' } };
  }
};

// Mock Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    await simulateNetworkDelay();
    
    // Calculate real-time stats from mock data
    const farmerMembers = MockStorage.get('farmer_members') || [];
    const staff = MockStorage.get('users') || [];
    const trainingSessions = MockStorage.get('training_sessions') || [];
    
    const today = new Date().toISOString().split('T')[0];
    const sessionsToday = trainingSessions.filter(s => s.session_date === today);
    
    const stats = {
      ...MOCK_DASHBOARD_STATS,
      total_members: farmerMembers.length,
      total_staff: staff.length,
      training_sessions_today: sessionsToday.length,
      total_training_sessions: trainingSessions.length,
      pending_sessions: trainingSessions.filter(s => s.status === 'scheduled').length,
      completed_sessions_today: sessionsToday.filter(s => s.status === 'completed').length
    };
    
    return { data: stats };
  },

  getRecentActivity: async () => {
    await simulateNetworkDelay();
    
    const activities = [
      {
        id: 1,
        type: 'training_session',
        message: 'New training session scheduled with Mary Akello',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        user: 'Alice Akiru'
      },
      {
        id: 2,
        type: 'member',
        message: 'New farmer member registered: Robert Lokoro',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        user: 'System'
      },
      {
        id: 3,
        type: 'staff',
        message: 'Sarah Nakoit completed field consultation',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        user: 'Sarah Nakoit'
      }
    ];
    
    return { data: activities };
  }
};

// Mock Generic Scaffold API
export const scaffoldAPI = {
  getAll: async (resource, params = {}) => {
    await simulateNetworkDelay();
    
    switch (resource) {
      case 'farmer_members':
        return farmerMembersAPI.getAll(params);
      case 'staff':
        return staffAPI.getAll(params);
      case 'training_sessions':
        return trainingSessionsAPI.getAll(params);
      case 'departments':
        return { data: MockStorage.get('departments') || MOCK_DEPARTMENTS };
      case 'services':
        return { data: MockStorage.get('services') || MOCK_SERVICES };
      default:
        return { data: [] };
    }
  },

  getById: async (resource, id) => {
    await simulateNetworkDelay();
    
    switch (resource) {
      case 'farmer_members':
        return farmerMembersAPI.getById(id);
      case 'staff':
        return staffAPI.getById(id);
      case 'training_sessions':
        return trainingSessionsAPI.getById(id);
      default:
        throw new Error('Resource not found');
    }
  },

  create: async (resource, data) => {
    await simulateNetworkDelay();
    
    switch (resource) {
      case 'farmer_members':
        return farmerMembersAPI.create(data);
      case 'staff':
        return staffAPI.create(data);
      case 'training_sessions':
        return trainingSessionsAPI.create(data);
      default:
        throw new Error('Resource not supported');
    }
  },

  update: async (resource, id, data) => {
    await simulateNetworkDelay();
    
    switch (resource) {
      case 'farmer_members':
        return farmerMembersAPI.update(id, data);
      case 'staff':
        return staffAPI.update(id, data);
      case 'training_sessions':
        return trainingSessionsAPI.update(id, data);
      default:
        throw new Error('Resource not supported');
    }
  },

  delete: async (resource, id) => {
    await simulateNetworkDelay();
    
    switch (resource) {
      case 'farmer_members':
        return farmerMembersAPI.delete(id);
      case 'staff':
        return staffAPI.delete(id);
      case 'training_sessions':
        return trainingSessionsAPI.delete(id);
      default:
        throw new Error('Resource not supported');
    }
  }
};

// Mock Manifest API
export const manifestAPI = {
  get: async () => {
    await simulateNetworkDelay();
    return { data: MockStorage.get('manifest') || MOCK_MANIFEST };
  }
};

// Export individual APIs and a combined api object
const api = {
  auth: authAPI,
  farmerMembers: farmerMembersAPI,
  staff: staffAPI,
  trainingSessions: trainingSessionsAPI,
  dashboard: dashboardAPI,
  scaffold: scaffoldAPI,
  manifest: manifestAPI
};

export default api;
