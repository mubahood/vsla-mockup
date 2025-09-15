// Test script to verify token system
import tokenManager from './src/utils/TokenManager.js';

console.log('🧪 Testing Token System...');

// Test 1: Clear any existing tokens
tokenManager.removeToken();
console.log('✅ Token cleared');

// Test 2: Set a token with quotes (simulating the old problem)
const testToken = '"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.test"';
tokenManager.setToken(testToken);
console.log('✅ Token set with quotes:', testToken);

// Test 3: Retrieve token (should be without quotes)
const retrievedToken = tokenManager.getToken();
console.log('✅ Token retrieved (should be quote-free):', retrievedToken);
console.log('✅ Quotes removed?', !retrievedToken.startsWith('"') && !retrievedToken.endsWith('"'));

// Test 4: Check if token is valid
console.log('✅ Token is valid?', tokenManager.isTokenValid());

// Test 5: Test storage key
const directStorage = localStorage.getItem('DB_TOKEN');
console.log('✅ Storage key is DB_TOKEN?', directStorage !== null);

// Test 6: Migration test
localStorage.setItem('auth_token', '"old.token.here"');
tokenManager.migrateFromLegacyStorage();
const migratedToken = tokenManager.getToken();
console.log('✅ Migration works?', migratedToken === 'old.token.here');

console.log('🎉 All tests completed!');
