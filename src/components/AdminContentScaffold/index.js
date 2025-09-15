/**
 * AdminContentScaffold Component Library
 * 
 * A comprehensive layout system for admin panels providing
 * structured layouts for table, form, and details views.
 */

// Main component with advanced three-section architecture
import AdminContentScaffold, { 
  useAdminScaffold,
  TableSection,
  FormSection,
  DetailsSection
} from './AdminContentScaffold';

// Example component
import AdminContentScaffoldExample from './AdminContentScaffoldExample';

// Default export is the main component
export default AdminContentScaffold;

// Named exports
export { 
  AdminContentScaffold,
  useAdminScaffold,
  TableSection,
  FormSection,
  DetailsSection,
  AdminContentScaffoldExample
};

// Convenience exports
export { AdminContentScaffold as Scaffold };
export { useAdminScaffold as useScaffold };

// Version and metadata
export const version = '2.0.0';
export const author = 'FOSTER Project Development Team';
export const description = 'Comprehensive admin content scaffold for React applications';
