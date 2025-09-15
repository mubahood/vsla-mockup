// UI Components Library - Laravel-admin inspired minimalistic components
// Export all components for easy importing

export { default as Widget } from './Widget';
export { default as Box } from './Box';
export { default as InfoBox } from './InfoBox';
export { default as Input } from './Input';
export { default as Button } from './Button';
export { default as Table } from './Table';
export { default as Select } from './Select';
export { default as Alert } from './Alert';
export { default as Card } from './Card';
export { default as Form, FormRow, FormCol } from './Form';
export { default as Badge } from './Badge';
export { default as Pagination } from './Pagination';
export { default as Checkbox, CheckboxGroup } from './Checkbox';
export { default as Radio, RadioGroup } from './Radio';
export { default as Textarea } from './Textarea';
export { default as LogoutButton } from './LogoutButton';

// Component library info
export const ComponentLibrary = {
    name: 'Hospital Professional UI Components',
    version: '2.0.0',
    description: 'Professional hospital-grade UI components with geometric flat design, perfectly square corners, and clinical aesthetics',
    designPrinciples: [
        'Perfectly square corners (border-radius: 0) - No rounded edges',
        'Ultra-flat design - No shadows, gradients, or animations',
        'Professional hospital-grade color schemes',
        'Geometric precision - Clean lines and structured layouts',
        'Clinical typography - System fonts with precise letter spacing',
        'Consistent spacing - 12-16px padding, geometric margins',
        'Professional interaction states - Subtle but clear feedback'
    ],
    components: [
        { name: 'Widget', type: 'Container', description: 'Basic container with minimal styling' },
        { name: 'Box', type: 'Container', description: 'Container with header, body, and footer' },
        { name: 'InfoBox', type: 'Display', description: 'Information display box with icon and color variants' },
        { name: 'Card', type: 'Container', description: 'Card container with title and actions' },
        { name: 'Input', type: 'Form', description: 'Text input with label, prepend/append, validation' },
        { name: 'Textarea', type: 'Form', description: 'Multi-line text input with auto-resize' },
        { name: 'Select', type: 'Form', description: 'Dropdown select with search and multi-select' },
        { name: 'Checkbox', type: 'Form', description: 'Checkbox input with group support' },
        { name: 'Radio', type: 'Form', description: 'Radio button with group support' },
        { name: 'Button', type: 'Action', description: 'Button with variants, sizes, icons, loading states' },
        { name: 'Badge', type: 'Display', description: 'Small status/label badge with color variants' },
        { name: 'Alert', type: 'Feedback', description: 'Alert notification with dismissible option' },
        { name: 'Table', type: 'Data', description: 'Data table with sorting, selection, pagination' },
        { name: 'Pagination', type: 'Navigation', description: 'Page navigation with info display' },
        { name: 'Form', type: 'Layout', description: 'Form container with layout and action management' }
    ]
};
