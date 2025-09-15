# Hospital Management System - HTTP Request Guidelines

## 📋 Table of Contents
1. [Overview](#overview)
2. [Centralized API System](#centralized-api-system)
3. [Request Methods](#request-methods)
4. [Authentication Headers](#authentication-headers)
5. [Response Format](#response-format)
6. [Error Handling](#error-handling)
7. [Usage Examples](#usage-examples)
8. [Best Practices](#best-practices)
9. [Common Patterns](#common-patterns)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This system uses a **CENTRALIZED HTTP REQUEST ARCHITECTURE** with only **TWO methods** (GET and POST) for all API communications. This ensures consistency, security, and maintainability across the entire application.

### 🔥 CRITICAL RULES
- ✅ **ONLY use `http_get()` and `http_post()` from `utils/Api.js`**
- ❌ **NEVER use fetch(), axios directly, or any other HTTP methods**
- ✅ **ALL requests automatically include required authentication headers**
- ✅ **ALL responses follow the same standardized format**

---

## 🏗️ Centralized API System

### Import Statement
```javascript
// ✅ CORRECT - Use centralized API functions
import { http_get, http_post } from '../utils/Api';

// ❌ WRONG - Don't use these
import axios from 'axios';
import { GET, POST } from '../services/api'; // Deprecated
```

### File Structure
```
src/
├── utils/
│   └── Api.js              # ✅ MAIN centralized API (USE THIS)
├── services/
│   ├── api.js              # ❌ Deprecated (DO NOT USE)
│   ├── AuthService.js      # ✅ Uses centralized API
│   └── ManifestService.js  # ✅ Uses centralized API
└── utils/
    └── Utils.js            # ✅ Uses centralized API
```

---

## 🔗 Request Methods

### 1. GET Requests (Read Operations)
```javascript
import { http_get } from '../utils/Api';

// Basic GET request
const response = await http_get('users/me');

// GET with query parameters
const response = await http_get('patients', { 
  page: 1, 
  limit: 10,
  search: 'john'
});

// GET single resource
const response = await http_get('patients/123');
```

### 2. POST Requests (All Write Operations)
```javascript
import { http_post } from '../utils/Api';

// Create new resource
const response = await http_post('patients', {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890'
});

// Update resource (converted to POST with _method)
const response = await http_post('patients/123', {
  name: 'John Smith',
  _method: 'PUT'  // Laravel will treat this as PUT
});

// Delete resource (converted to POST with _method)
const response = await http_post('patients/123', {
  _method: 'DELETE'  // Laravel will treat this as DELETE
});

// Login request
const response = await http_post('users/login', {
  username: 'user@example.com',
  password: 'password123'
});
```

---

## 🔐 Authentication Headers

**ALL requests automatically include these headers:**

```javascript
// Automatically added by the centralized API
{
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  'Cache-Control': 'no-cache',
  'Authorization': 'Bearer {token}',
  'Token': 'Bearer {token}',
  'Tok': 'Bearer {token}',
  'tok': 'Bearer {token}'
}
```

### Token Management
```javascript
// Token is automatically retrieved from localStorage
const token = localStorage.getItem('auth_token');

// No need to manually add headers - they're added automatically!
// ❌ Don't do this:
const response = await fetch('/api/users/me', {
  headers: { 'Authorization': `Bearer ${token}` }
});

// ✅ Do this instead:
const response = await http_get('users/me');
```

---

## 📨 Response Format

**ALL API responses follow this standardized format:**

### Success Response
```javascript
{
  "code": 1,                    // 1 = success, 0 = failure
  "message": "Success message", // Human-readable message
  "data": {                     // Actual response data
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
    // ... other data
  },
  "status": 200                 // HTTP status code
}
```

### Error Response
```javascript
{
  "code": 0,                    // 0 = failure
  "message": "Error message",   // Human-readable error message
  "data": null,                 // No data on error
  "errors": {                   // Validation errors (if any)
    "email": ["Email is required"],
    "password": ["Password must be at least 8 characters"]
  },
  "status": 400                 // HTTP status code
}
```

### Network Error Response
```javascript
{
  "code": 0,
  "message": "Network error. Please try again.",
  "data": null,
  "status": 500,
  "error": "Network Error"     // Technical error details
}
```

---

## ⚠️ Error Handling

### Standard Error Handling Pattern
```javascript
import { http_get, http_post } from '../utils/Api';

const handleApiCall = async () => {
  try {
    const response = await http_get('patients');
    
    // Check if request was successful
    if (response.code === 1) {
      // ✅ Success - use response.data
      console.log('Patients:', response.data);
      return response.data;
    } else {
      // ❌ API returned error
      console.error('API Error:', response.message);
      
      // Handle validation errors if present
      if (response.errors) {
        Object.keys(response.errors).forEach(field => {
          console.error(`${field}: ${response.errors[field].join(', ')}`);
        });
      }
      
      return null;
    }
  } catch (error) {
    // ❌ Network or other error
    console.error('Request failed:', error.message);
    return null;
  }
};
```

### HTTP Status Code Handling
The centralized API automatically handles:
- **401 Unauthorized**: Redirects to login page
- **403 Forbidden**: Shows permission denied message
- **500 Server Error**: Returns structured error response
- **Network Errors**: Returns consistent error format

---

## 🎯 Usage Examples

### 1. Authentication Examples
```javascript
import { http_post } from '../utils/Api';

// Login
const login = async (email, password) => {
  try {
    const response = await http_post('users/login', {
      username: email,  // Backend expects 'username'
      password
    });
    
    if (response.code === 1) {
      // Save token to localStorage
      localStorage.setItem('auth_token', response.data.token);
      return { success: true, user: response.data };
    } else {
      return { success: false, message: response.message };
    }
  } catch (error) {
    return { success: false, message: 'Login failed' };
  }
};

// Get current user
const getCurrentUser = async () => {
  try {
    const response = await http_get('users/me');
    return response.code === 1 ? response.data : null;
  } catch (error) {
    return null;
  }
};

// Logout
const logout = async () => {
  try {
    await http_post('auth/logout', {});
    localStorage.removeItem('auth_token');
    return true;
  } catch (error) {
    // Clear local storage even if API call fails
    localStorage.removeItem('auth_token');
    return true;
  }
};
```

### 2. CRUD Operations Examples
```javascript
import { http_get, http_post } from '../utils/Api';

// CREATE - Add new patient
const createPatient = async (patientData) => {
  const response = await http_post('patients', patientData);
  
  if (response.code === 1) {
    console.log('Patient created:', response.data);
    return response.data;
  } else {
    console.error('Failed to create patient:', response.message);
    return null;
  }
};

// READ - Get all patients with pagination
const getPatients = async (page = 1, limit = 10) => {
  const response = await http_get('patients', { page, limit });
  
  if (response.code === 1) {
    return {
      patients: response.data.data,      // Array of patients
      pagination: response.data.meta     // Pagination info
    };
  }
  return { patients: [], pagination: null };
};

// READ - Get single patient
const getPatient = async (id) => {
  const response = await http_get(`patients/${id}`);
  return response.code === 1 ? response.data : null;
};

// UPDATE - Update patient
const updatePatient = async (id, patientData) => {
  const response = await http_post(`patients/${id}`, {
    ...patientData,
    _method: 'PUT'  // Tell Laravel this is an update
  });
  
  return response.code === 1 ? response.data : null;
};

// DELETE - Delete patient
const deletePatient = async (id) => {
  const response = await http_post(`patients/${id}`, {
    _method: 'DELETE'  // Tell Laravel this is a delete
  });
  
  return response.code === 1;
};
```

### 3. File Upload Example
```javascript
import { http_upload } from '../utils/Api';

const uploadPatientPhoto = async (patientId, file) => {
  const formData = new FormData();
  formData.append('photo', file);
  formData.append('patient_id', patientId);
  
  try {
    const response = await http_upload('patients/upload-photo', formData);
    
    if (response.code === 1) {
      console.log('Photo uploaded:', response.data.photo_url);
      return response.data.photo_url;
    } else {
      console.error('Upload failed:', response.message);
      return null;
    }
  } catch (error) {
    console.error('Upload error:', error);
    return null;
  }
};
```

### 4. Search and Filter Example
```javascript
const searchPatients = async (searchParams) => {
  const {
    search = '',
    status = '',
    page = 1,
    limit = 10
  } = searchParams;
  
  const response = await http_get('patients/search', {
    q: search,
    status,
    page,
    limit
  });
  
  if (response.code === 1) {
    return {
      results: response.data.data,
      total: response.data.total,
      hasMore: response.data.has_more_pages
    };
  }
  
  return { results: [], total: 0, hasMore: false };
};
```

---

## ✅ Best Practices

### 1. **Always Check Response Code**
```javascript
// ✅ GOOD
const response = await http_get('patients');
if (response.code === 1) {
  // Handle success
} else {
  // Handle error
}

// ❌ BAD
const response = await http_get('patients');
const patients = response.data; // Might be null on error!
```

### 2. **Use Proper Error Handling**
```javascript
// ✅ GOOD
try {
  const response = await http_post('patients', patientData);
  if (response.code === 1) {
    return { success: true, data: response.data };
  } else {
    return { success: false, message: response.message, errors: response.errors };
  }
} catch (error) {
  return { success: false, message: 'Network error occurred' };
}

// ❌ BAD
const response = await http_post('patients', patientData);
return response.data; // No error handling!
```

### 3. **Handle Loading States**
```javascript
const [loading, setLoading] = useState(false);

const fetchPatients = async () => {
  setLoading(true);
  try {
    const response = await http_get('patients');
    if (response.code === 1) {
      setPatients(response.data);
    }
  } finally {
    setLoading(false);
  }
};
```

### 4. **Use Consistent Endpoint Naming**
```javascript
// ✅ GOOD - REST-like endpoints
http_get('patients')           // GET /api/patients
http_get('patients/123')       // GET /api/patients/123
http_post('patients', data)    // POST /api/patients
http_post('patients/123', {...data, _method: 'PUT'})    // PUT /api/patients/123
http_post('patients/123', {_method: 'DELETE'})          // DELETE /api/patients/123

// ❌ BAD - Inconsistent naming
http_get('getAllPatients')
http_post('createNewPatient', data)
```

---

## 🔄 Common Patterns

### 1. **Service Layer Pattern**
```javascript
// services/PatientService.js
import { http_get, http_post } from '../utils/Api';

class PatientService {
  static async getAll(params = {}) {
    const response = await http_get('patients', params);
    return response.code === 1 ? response.data : [];
  }
  
  static async getById(id) {
    const response = await http_get(`patients/${id}`);
    return response.code === 1 ? response.data : null;
  }
  
  static async create(data) {
    const response = await http_post('patients', data);
    return {
      success: response.code === 1,
      data: response.data,
      message: response.message,
      errors: response.errors
    };
  }
  
  static async update(id, data) {
    const response = await http_post(`patients/${id}`, {
      ...data,
      _method: 'PUT'
    });
    return {
      success: response.code === 1,
      data: response.data,
      message: response.message
    };
  }
  
  static async delete(id) {
    const response = await http_post(`patients/${id}`, {
      _method: 'DELETE'
    });
    return {
      success: response.code === 1,
      message: response.message
    };
  }
}

export default PatientService;
```

### 2. **Custom Hook Pattern**
```javascript
// hooks/usePatients.js
import { useState, useEffect } from 'react';
import PatientService from '../services/PatientService';

const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchPatients = async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await PatientService.getAll(params);
      setPatients(data);
    } catch (err) {
      setError('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };
  
  const createPatient = async (patientData) => {
    const result = await PatientService.create(patientData);
    if (result.success) {
      await fetchPatients(); // Refresh list
    }
    return result;
  };
  
  useEffect(() => {
    fetchPatients();
  }, []);
  
  return {
    patients,
    loading,
    error,
    fetchPatients,
    createPatient,
    // ... other methods
  };
};

export default usePatients;
```

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. **Missing Headers Error**
```
Error: "Tok header missing"
```
**Solution**: Make sure you're using `http_get` or `http_post` from `utils/Api.js`, not other HTTP methods.

#### 2. **401 Unauthorized**
```
Error: "Token expired or invalid"
```
**Solutions**:
- Check if token exists: `localStorage.getItem('auth_token')`
- Re-login to get fresh token
- Ensure token format is correct (should be JWT string)

#### 3. **CORS Issues**
```
Error: "CORS policy: No 'Access-Control-Allow-Origin' header"
```
**Solution**: This is handled on the backend. Contact backend team if this occurs.

#### 4. **Network Timeout**
```
Error: "timeout of 30000ms exceeded"
```
**Solutions**:
- Check internet connection
- Verify API server is running
- Check if endpoint exists

#### 5. **Validation Errors**
```javascript
// Response with validation errors
{
  "code": 0,
  "message": "Validation failed",
  "errors": {
    "email": ["Email is required"],
    "password": ["Password must be at least 8 characters"]
  }
}
```
**Solution**: Handle errors in UI:
```javascript
if (response.errors) {
  Object.keys(response.errors).forEach(field => {
    showFieldError(field, response.errors[field][0]);
  });
}
```

### Debug Checklist
1. ✅ Using `http_get` or `http_post` from `utils/Api.js`?
2. ✅ Token exists in localStorage?
3. ✅ API server running and accessible?
4. ✅ Endpoint URL correct?
5. ✅ Request data format correct?
6. ✅ Checking `response.code === 1` for success?

---

## 📚 API Endpoint Reference

### Authentication Endpoints
- `POST users/login` - User login
- `POST auth/logout` - User logout
- `POST users/register` - User registration
- `GET users/me` - Get current user profile
- `POST auth/password/change` - Change password
- `POST auth/password/email` - Forgot password
- `POST auth/password/reset` - Reset password

### Patient Management
- `GET patients` - List all patients
- `GET patients/{id}` - Get single patient
- `POST patients` - Create new patient
- `POST patients/{id}` + `_method: 'PUT'` - Update patient
- `POST patients/{id}` + `_method: 'DELETE'` - Delete patient

### Staff Management
- `GET staff` - List all staff
- `GET staff/{id}` - Get single staff member
- `POST staff` - Create new staff
- `POST staff/{id}` + `_method: 'PUT'` - Update staff
- `POST staff/{id}` + `_method: 'DELETE'` - Delete staff

### Appointment Management
- `GET appointments` - List appointments
- `GET appointments/{id}` - Get single appointment
- `POST appointments` - Create appointment
- `POST appointments/{id}` + `_method: 'PUT'` - Update appointment
- `POST appointments/{id}` + `_method: 'DELETE'` - Cancel appointment

### System Endpoints
- `GET manifest` - Get application manifest (menus, permissions, etc.)

---

## 🎯 Summary

**Remember the Golden Rules:**

1. **📍 ONLY USE**: `http_get()` and `http_post()` from `utils/Api.js`
2. **🔐 HEADERS**: Automatically included - don't add manually
3. **📨 RESPONSES**: Always check `response.code === 1` for success
4. **⚠️ ERRORS**: Always handle both API errors and network errors
5. **🔄 CONSISTENCY**: Follow the patterns shown in this guide

This centralized approach ensures:
- ✅ **Consistent authentication** across all requests
- ✅ **Standardized error handling** throughout the app
- ✅ **Maintainable code** with single source of truth
- ✅ **Security compliance** with proper headers
- ✅ **Easy debugging** with predictable request/response format

**Need help?** Refer to this guide or check existing service implementations like `AuthService.js` for real examples.
