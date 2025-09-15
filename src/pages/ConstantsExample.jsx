import React from 'react';
import { 
  BASE_URL, 
  API_URL, 
  COUNTRIES, 
  GENDER_OPTIONS, 
  BLOOD_TYPE_OPTIONS, 
  DEPARTMENT_OPTIONS,
  USER_ROLES, 
  VALIDATION_MESSAGES,
  THEME_COLORS
} from '../constants/Constants';

/**
 * Example component demonstrating usage of constants
 */
const ConstantsExample = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6" style={{ color: THEME_COLORS.PRIMARY }}>
        Constants Usage Examples
      </h1>

      {/* API Configuration */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-3">API Configuration</h2>
        <div className="space-y-2 text-sm">
          <p><strong>Base URL:</strong> {BASE_URL}</p>
          <p><strong>API URL:</strong> {API_URL}</p>
        </div>
      </div>

      {/* Countries Dropdown */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-3">Countries Dropdown</h2>
        <select className="w-full p-2 border rounded">
          <option value="">Select Country</option>
          {COUNTRIES.slice(0, 10).map(country => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-600 mt-2">
          Total countries available: {COUNTRIES.length}
        </p>
      </div>

      {/* Hospital-specific Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Gender Options */}
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Gender Options</h3>
          <div className="space-y-1">
            {GENDER_OPTIONS.map(option => (
              <label key={option.value} className="flex items-center">
                <input type="radio" name="gender" value={option.value} className="mr-2" />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        {/* Blood Type Options */}
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Blood Type</h3>
          <select className="w-full p-2 border rounded">
            <option value="">Select Blood Type</option>
            {BLOOD_TYPE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Departments */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-3">Departments</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {DEPARTMENT_OPTIONS.map(dept => (
            <div key={dept.value} className="p-2 bg-gray-100 rounded text-sm">
              {dept.label}
            </div>
          ))}
        </div>
      </div>

      {/* User Roles */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-3">User Roles</h2>
        <div className="flex flex-wrap gap-2">
          {Object.values(USER_ROLES).map(role => (
            <span 
              key={role} 
              className="px-3 py-1 rounded-full text-sm text-white"
              style={{ backgroundColor: THEME_COLORS.ACCENT }}
            >
              {role.replace('_', ' ').toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Appointment Status */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-3">Appointment Status</h2>
        <div className="flex flex-wrap gap-2">
         
        </div>
      </div>

      {/* Validation Messages */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-3">Validation Messages</h2>
        <div className="space-y-2">
          <div className="text-sm text-red-600">
            <strong>Required Field:</strong> {VALIDATION_MESSAGES.REQUIRED}
          </div>
          <div className="text-sm text-red-600">
            <strong>Invalid Email:</strong> {VALIDATION_MESSAGES.EMAIL_INVALID}
          </div>
          <div className="text-sm text-red-600">
            <strong>Password Length:</strong> {VALIDATION_MESSAGES.PASSWORD_MIN}
          </div>
        </div>
      </div>

      {/* Theme Colors */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-3">Theme Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(THEME_COLORS).map(([name, color]) => (
            <div key={name} className="text-center">
              <div 
                className="w-16 h-16 rounded mx-auto mb-2 border"
                style={{ backgroundColor: color }}
              ></div>
              <div className="text-xs">
                <div className="font-semibold">{name}</div>
                <div className="text-gray-600">{color}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>All constants are imported from <code>../constants/Constants.js</code></p>
        <p>These can be used throughout the entire application for consistency.</p>
      </div>
    </div>
  );
};

export default ConstantsExample;
