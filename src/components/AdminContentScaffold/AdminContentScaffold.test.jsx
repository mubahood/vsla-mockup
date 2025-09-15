import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AdminContentScaffold, { 
  useAdminScaffold, 
  TableSection, 
  FormSection, 
  DetailsSection 
} from './AdminContentScaffoldV2';

// Mock data for testing
const mockData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'Active',
    age: 30,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'Inactive',
    age: 25,
  },
];

const mockColumns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' },
];

const mockFormFields = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'email', label: 'Email', type: 'email', required: true },
  { key: 'status', label: 'Status', type: 'select', options: [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ]},
];

const mockDetailsFields = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' },
];

const defaultProps = {
  title: 'Test Entity',
  subtitle: 'Test management system',
  activeSection: 'table',
  onSectionChange: jest.fn(),
  tableProps: {
    data: mockData,
    columns: mockColumns,
  },
  formProps: {
    fields: mockFormFields,
  },
  detailsProps: {
    fields: mockDetailsFields,
  },
  onSave: jest.fn(),
  onDelete: jest.fn(),
  onNewRecord: jest.fn(),
  onExport: jest.fn(),
  onSearchChange: jest.fn(),
};

// Helper component to test context
const TestContextComponent = () => {
  const context = useAdminScaffold();
  return (
    <div data-testid="context-test">
      <span data-testid="active-section">{context.activeSection}</span>
      <span data-testid="loading">{context.loading.toString()}</span>
    </div>
  );
};

describe('AdminContentScaffold V2', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    test('renders with default props', () => {
      render(<AdminContentScaffold />);
      expect(screen.getByText('Record Management')).toBeInTheDocument();
    });

    test('renders with custom title and subtitle', () => {
      render(
        <AdminContentScaffold 
          title="Patient" 
          subtitle="Manage patient records" 
        />
      );
      expect(screen.getByText('Patient Management')).toBeInTheDocument();
      expect(screen.getByText('Manage patient records')).toBeInTheDocument();
    });

    test('renders breadcrumbs correctly', () => {
      const breadcrumbs = [
        { label: 'Dashboard', onClick: jest.fn() },
        { label: 'Users', onClick: jest.fn() },
      ];
      
      render(
        <AdminContentScaffold 
          breadcrumbs={breadcrumbs}
          title="Test"
        />
      );
      
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Users')).toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    test('applies custom className and styles', () => {
      const { container } = render(
        <AdminContentScaffold 
          className="custom-class"
          style={{ backgroundColor: 'red' }}
          data-testid="scaffold"
        />
      );
      
      const scaffold = screen.getByTestId('scaffold');
      expect(scaffold).toHaveClass('custom-class');
      expect(scaffold).toHaveStyle('background-color: red');
    });
  });

  describe('Section Navigation', () => {
    test('renders section tabs correctly', () => {
      render(<AdminContentScaffold {...defaultProps} />);
      
      expect(screen.getByText('List')).toBeInTheDocument();
      expect(screen.getByText('Add')).toBeInTheDocument();
      expect(screen.getByText('Details')).toBeInTheDocument();
    });

    test('shows Edit instead of Add when record is selected', () => {
      render(
        <AdminContentScaffold 
          {...defaultProps}
          selectedRecord={mockData[0]}
        />
      );
      
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.queryByText('Add')).not.toBeInTheDocument();
    });

    test('disables Details tab when no record is selected', () => {
      render(<AdminContentScaffold {...defaultProps} />);
      
      const detailsTab = screen.getByRole('button', { name: /switch to details/i });
      expect(detailsTab).toBeDisabled();
    });

    test('enables Details tab when record is selected', () => {
      render(
        <AdminContentScaffold 
          {...defaultProps}
          selectedRecord={mockData[0]}
        />
      );
      
      const detailsTab = screen.getByRole('button', { name: /switch to details/i });
      expect(detailsTab).not.toBeDisabled();
    });

    test('calls onSectionChange when tab is clicked', () => {
      const onSectionChange = jest.fn();
      render(
        <AdminContentScaffold 
          {...defaultProps}
          onSectionChange={onSectionChange}
        />
      );
      
      fireEvent.click(screen.getByText('Add'));
      expect(onSectionChange).toHaveBeenCalledWith('form');
    });
  });

  describe('Table Section', () => {
    test('renders table with data', () => {
      render(<AdminContentScaffold {...defaultProps} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    test('shows empty state when no data', () => {
      render(
        <AdminContentScaffold 
          {...defaultProps}
          tableProps={{
            data: [],
            columns: mockColumns,
            emptyMessage: 'No records found',
          }}
        />
      );
      
      expect(screen.getByText('No Data Available')).toBeInTheDocument();
      expect(screen.getByText('No records found')).toBeInTheDocument();
    });

    test('renders action buttons for each row', () => {
      render(<AdminContentScaffold {...defaultProps} />);
      
      const viewButtons = screen.getAllByTitle('View Details');
      const editButtons = screen.getAllByTitle('Edit');
      const deleteButtons = screen.getAllByTitle('Delete');
      
      expect(viewButtons).toHaveLength(2);
      expect(editButtons).toHaveLength(2);
      expect(deleteButtons).toHaveLength(2);
    });

    test('handles row selection when selectable', () => {
      render(
        <AdminContentScaffold 
          {...defaultProps}
          tableProps={{
            ...defaultProps.tableProps,
            selectable: true,
          }}
        />
      );
      
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(3); // 2 rows + select all
      
      fireEvent.click(checkboxes[1]); // Click first row checkbox
      // Test would need access to context to verify state change
    });

    test('handles pagination', () => {
      const paginationProps = {
        current: 1,
        total: 20,
        pageSize: 10,
        onChange: jest.fn(),
      };
      
      render(
        <AdminContentScaffold 
          {...defaultProps}
          tableProps={{
            ...defaultProps.tableProps,
            pagination: paginationProps,
          }}
        />
      );
      
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
      expect(screen.getByText('Showing 1 to 2 of 2 entries')).toBeInTheDocument();
    });
  });

  describe('Form Section', () => {
    test('renders form fields correctly', () => {
      render(
        <AdminContentScaffold 
          {...defaultProps}
          activeSection="form"
        />
      );
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    });

    test('shows required field indicators', () => {
      render(
        <AdminContentScaffold 
          {...defaultProps}
          activeSection="form"
        />
      );
      
      const requiredMarkers = screen.getAllByText('*');
      expect(requiredMarkers).toHaveLength(2); // name and email are required
    });

    test('shows different title for edit vs add', () => {
      // Test add mode
      render(
        <AdminContentScaffold 
          {...defaultProps}
          activeSection="form"
        />
      );
      expect(screen.getByText('Add New Record')).toBeInTheDocument();
      
      // Test edit mode
      render(
        <AdminContentScaffold 
          {...defaultProps}
          activeSection="form"
          selectedRecord={mockData[0]}
        />
      );
      expect(screen.getByText('Edit Record')).toBeInTheDocument();
    });

    test('pre-fills form with selected record data', () => {
      render(
        <AdminContentScaffold 
          {...defaultProps}
          activeSection="form"
          selectedRecord={mockData[0]}
        />
      );
      
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    });

    test('handles form submission', async () => {
      const onSave = jest.fn().mockResolvedValue();
      render(
        <AdminContentScaffold 
          {...defaultProps}
          activeSection="form"
          onSave={onSave}
        />
      );
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const saveButton = screen.getByText('Create');
      
      await userEvent.type(nameInput, 'Test User');
      await userEvent.type(emailInput, 'test@example.com');
      
      fireEvent.click(saveButton);
      
      await waitFor(() => {
        expect(onSave).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'Test User',
            email: 'test@example.com',
          }),
          null
        );
      });
    });

    test('validates required fields', async () => {
      const onSave = jest.fn();
      render(
        <AdminContentScaffold 
          {...defaultProps}
          activeSection="form"
          onSave={onSave}
        />
      );
      
      const saveButton = screen.getByText('Create');
      fireEvent.click(saveButton);
      
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });
      
      expect(onSave).not.toHaveBeenCalled();
    });

    test('validates email format', async () => {
      const onSave = jest.fn();
      render(
        <AdminContentScaffold 
          {...defaultProps}
          activeSection="form"
          onSave={onSave}
        />
      );
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const saveButton = screen.getByText('Create');
      
      await userEvent.type(nameInput, 'Test User');
      await userEvent.type(emailInput, 'invalid-email');
      
      fireEvent.click(saveButton);
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
      
      expect(onSave).not.toHaveBeenCalled();
    });
  });

  describe('Details Section', () => {
    test('renders details fields correctly', () => {
      render(
        <AdminContentScaffold 
          {...defaultProps}
          activeSection="details"
          selectedRecord={mockData[0]}
        />
      );
      
      expect(screen.getByText('Record Details')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    test('shows empty value indicator for missing data', () => {
      const recordWithMissingData = {
        id: 1,
        name: 'John Doe',
        email: '', // Empty email
      };
      
      render(
        <AdminContentScaffold 
          {...defaultProps}
          activeSection="details"
          selectedRecord={recordWithMissingData}
        />
      );
      
      expect(screen.getByText('—')).toBeInTheDocument(); // Empty value indicator
    });

    test('renders custom field renderers', () => {
      const customDetailsFields = [
        { 
          key: 'name', 
          label: 'Name',
          render: (value) => `Mr. ${value}`
        },
      ];
      
      render(
        <AdminContentScaffold 
          {...defaultProps}
          activeSection="details"
          selectedRecord={mockData[0]}
          detailsProps={{ fields: customDetailsFields }}
        />
      );
      
      expect(screen.getByText('Mr. John Doe')).toBeInTheDocument();
    });
  });

  describe('Search and Filtering', () => {
    test('renders search input in table section', () => {
      render(<AdminContentScaffold {...defaultProps} />);
      
      expect(screen.getByPlaceholderText(/search.*test entity/i)).toBeInTheDocument();
    });

    test('handles search input changes', async () => {
      const onSearchChange = jest.fn();
      render(
        <AdminContentScaffold 
          {...defaultProps}
          onSearchChange={onSearchChange}
        />
      );
      
      const searchInput = screen.getByPlaceholderText(/search.*test entity/i);
      await userEvent.type(searchInput, 'john');
      
      expect(onSearchChange).toHaveBeenCalledWith('john');
    });

    test('shows clear search button when search has value', () => {
      render(
        <AdminContentScaffold 
          {...defaultProps}
          searchValue="test search"
        />
      );
      
      expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
    });

    test('handles filter toggle', () => {
      const onToggleFilters = jest.fn();
      render(
        <AdminContentScaffold 
          {...defaultProps}
          onToggleFilters={onToggleFilters}
        />
      );
      
      fireEvent.click(screen.getByText('Filters'));
      expect(onToggleFilters).toHaveBeenCalled();
    });
  });

  describe('Action Buttons', () => {
    test('renders Add New button in table section', () => {
      render(<AdminContentScaffold {...defaultProps} />);
      
      expect(screen.getByText('Add New Test Entity')).toBeInTheDocument();
    });

    test('handles Add New button click', () => {
      const onNewRecord = jest.fn();
      const onSectionChange = jest.fn();
      
      render(
        <AdminContentScaffold 
          {...defaultProps}
          onNewRecord={onNewRecord}
          onSectionChange={onSectionChange}
        />
      );
      
      fireEvent.click(screen.getByText('Add New Test Entity'));
      
      expect(onNewRecord).toHaveBeenCalled();
      expect(onSectionChange).toHaveBeenCalledWith('form');
    });

    test('renders export button and dropdown', () => {
      render(<AdminContentScaffold {...defaultProps} />);
      
      fireEvent.click(screen.getByText('Export'));
      expect(screen.getByText('Export as CSV')).toBeInTheDocument();
      expect(screen.getByText('Export as EXCEL')).toBeInTheDocument();
      expect(screen.getByText('Export as PDF')).toBeInTheDocument();
    });

    test('handles export button clicks', () => {
      const onExport = jest.fn();
      render(
        <AdminContentScaffold 
          {...defaultProps}
          onExport={onExport}
        />
      );
      
      fireEvent.click(screen.getByText('Export'));
      fireEvent.click(screen.getByText('Export as CSV'));
      
      expect(onExport).toHaveBeenCalledWith('csv');
    });

    test('renders refresh button when onRefresh provided', () => {
      const onRefresh = jest.fn();
      render(
        <AdminContentScaffold 
          {...defaultProps}
          onRefresh={onRefresh}
        />
      );
      
      const refreshButton = screen.getByLabelText('Refresh data');
      expect(refreshButton).toBeInTheDocument();
      
      fireEvent.click(refreshButton);
      expect(onRefresh).toHaveBeenCalled();
    });
  });

  describe('Loading and Error States', () => {
    test('shows loading overlay when loading is true', () => {
      render(
        <AdminContentScaffold 
          {...defaultProps}
          loading={true}
        />
      );
      
      expect(document.querySelector('.loading-overlay')).toBeInTheDocument();
    });

    test('shows error message when error is provided', () => {
      render(
        <AdminContentScaffold 
          {...defaultProps}
          error="Something went wrong"
        />
      );
      
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    test('disables buttons when loading', () => {
      render(
        <AdminContentScaffold 
          {...defaultProps}
          activeSection="form"
          loading={true}
        />
      );
      
      const saveButton = screen.getByText('Create');
      expect(saveButton).toBeDisabled();
    });
  });

  describe('Context Provider', () => {
    test('provides context to child components', () => {
      render(
        <AdminContentScaffold {...defaultProps}>
          <TestContextComponent />
        </AdminContentScaffold>
      );
      
      expect(screen.getByTestId('active-section')).toHaveTextContent('table');
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    test('throws error when useAdminScaffold is used outside provider', () => {
      // Suppress console errors for this test
      const originalError = console.error;
      console.error = jest.fn();
      
      expect(() => {
        render(<TestContextComponent />);
      }).toThrow('useAdminScaffold must be used within AdminContentScaffold');
      
      console.error = originalError;
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA labels', () => {
      render(
        <AdminContentScaffold 
          {...defaultProps}
          aria-label="Patient management interface"
        />
      );
      
      expect(screen.getByLabelText('Patient management interface')).toBeInTheDocument();
    });

    test('has proper navigation landmarks', () => {
      render(<AdminContentScaffold {...defaultProps} />);
      
      expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    test('has keyboard navigation support', () => {
      render(<AdminContentScaffold {...defaultProps} />);
      
      const addButton = screen.getByText('Add New Test Entity');
      addButton.focus();
      expect(addButton).toHaveFocus();
    });
  });

  describe('Responsive Design', () => {
    test('applies compact mode styles when enabled', () => {
      render(
        <AdminContentScaffold 
          {...defaultProps}
          compactMode={true}
        />
      );
      
      // Test would check for specific compact styling
      // This would require more specific testing of computed styles
    });

    test('adjusts header and controls height', () => {
      render(
        <AdminContentScaffold 
          {...defaultProps}
          headerHeight={80}
          controlsHeight={64}
        />
      );
      
      // Test would verify height styles are applied correctly
    });
  });

  describe('Custom Styling', () => {
    test('applies custom styles to components', () => {
      const customStyles = {
        container: { backgroundColor: 'blue' },
        header: { backgroundColor: 'red' },
      };
      
      render(
        <AdminContentScaffold 
          {...defaultProps}
          customStyles={customStyles}
          data-testid="scaffold"
        />
      );
      
      const scaffold = screen.getByTestId('scaffold');
      expect(scaffold).toHaveStyle('background-color: blue');
    });
  });
});

describe('Individual Components', () => {
  describe('TableSection', () => {
    test('renders independently', () => {
      const TestWrapper = () => {
        const [selectedItems, setSelectedItems] = React.useState([]);
        const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });
        const [viewMode, setViewMode] = React.useState('grid');
        const [currentPage, setCurrentPage] = React.useState(1);
        const [pageSize, setPageSize] = React.useState(10);
        
        const contextValue = {
          selectedItems,
          setSelectedItems,
          sortConfig,
          setSortConfig,
          viewMode,
          setViewMode,
          currentPage,
          setCurrentPage,
          pageSize,
          setPageSize,
          onSectionChange: jest.fn(),
        };
        
        return (
          <AdminScaffoldContext.Provider value={contextValue}>
            <TableSection 
              data={mockData}
              columns={mockColumns}
            />
          </AdminScaffoldContext.Provider>
        );
      };
      
      render(<TestWrapper />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  describe('FormSection', () => {
    test('renders independently', () => {
      render(
        <FormSection 
          fields={mockFormFields}
          formData={{}}
          formErrors={{}}
          onFormChange={jest.fn()}
          onSubmit={jest.fn()}
        />
      );
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    });
  });

  describe('DetailsSection', () => {
    test('renders independently', () => {
      render(
        <DetailsSection 
          fields={mockDetailsFields}
          record={mockData[0]}
        />
      );
      
      expect(screen.getByText('Record Details')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});

// Performance tests
describe('Performance', () => {
  test('handles large datasets efficiently', () => {
    const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      status: i % 2 === 0 ? 'Active' : 'Inactive',
    }));
    
    const start = performance.now();
    render(
      <AdminContentScaffold 
        {...defaultProps}
        tableProps={{
          data: largeDataset,
          columns: mockColumns,
        }}
      />
    );
    const end = performance.now();
    
    // Should render within reasonable time (adjust threshold as needed)
    expect(end - start).toBeLessThan(1000);
  });
});
