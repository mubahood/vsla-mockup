// Test script to verify icon mappings
const HospitalIconMapper = require('./src/utils/HospitalIconMapper.js');

const testMenuItems = [
  { label: 'Dashboard', title: 'Dashboard' },
  { label: 'Patients', title: 'Patient Management' },
  { label: 'Appointments', title: 'Appointment Scheduling' },
  { label: 'Consultations', title: 'Medical Consultations' },
  { label: 'Employees', title: 'Staff Management' },
  { label: 'Billing', title: 'Financial Billing' },
  { label: 'Inventory', title: 'Medical Inventory' },
  { label: 'Reports', title: 'Analytics Reports' },
  { label: 'Settings', title: 'System Settings' },
  { label: 'Emergency', title: 'Emergency Department' }
];

console.log('Icon Mapping Test Results:');
console.log('==========================');

testMenuItems.forEach(item => {
  const icon = HospitalIconMapper.default.getIconForMenuItem(item);
  console.log(`${item.label.padEnd(15)} → ${icon}`);
});
