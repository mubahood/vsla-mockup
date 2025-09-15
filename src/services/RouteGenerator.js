import MenuService from './MenuService';

/**
 * Route Generator - Creates route definitions and component mappings
 */
class RouteGenerator {
  /**
   * Generate all route definitions from menu structure
   * @returns {Array} Route definitions with components
   */
  static async generateRoutes() {
    // Initialize menu service to get the latest menu structure
    await MenuService.initialize();
    
    const routes = MenuService.getAllRoutes();
    
    // Silent route generation
    
    return routes.map(route => ({
      ...route,
      componentPath: RouteGenerator.getComponentPath(route.component),
      componentExists: RouteGenerator.componentExists(route.component)
    }));
  }

  /**
   * Get the file path for a component
   * @param {string} componentName - Component name
   * @returns {string} Component file path
   */
  static getComponentPath(componentName) {
    return `/src/pages/Admin/${componentName}.jsx`;
  }

  /**
   * Check if a component file exists (mock check for now)
   * @param {string} componentName - Component name
   * @returns {boolean} Whether component exists
   */
  static componentExists(componentName) {
    // For now, we'll assume these components need to be created
    const existingComponents = [
      'Dashboard',
      'Patients', 
      'Components',
      'ApiTest'
    ];
    
    return existingComponents.includes(componentName);
  }

  /**
   * Generate component templates for missing components
   * @returns {Array} Component templates
   */
  static async generateComponentTemplates() {
    const routes = await RouteGenerator.generateRoutes();
    
    const templates = [];
    
    for (const route of routes) {
      if (!route.componentExists) {
        templates.push({
          name: route.component,
          path: route.componentPath,
          content: RouteGenerator.generateComponentContent(route)
        });
      }
    }
    
    return templates;
  }

  /**
   * Generate React component content
   * @param {Object} route - Route definition
   * @returns {string} Component content
   */
  static generateComponentContent(route) {
    const componentName = route.component;
    const pageTitle = route.title;
    const iconName = MenuService.convertIcon(route.icon || 'fa-circle');
    
    return `import React, { useState, useEffect } from 'react';
import { Card } from '../../components/UI';
import { Button } from '../../components/UI';
import { ${iconName}, Plus, Search, Filter } from 'lucide-react';

/**
 * ${componentName} Page Component
 * Auto-generated from Laravel Admin menu structure
 * URI: ${route.uri}
 * Path: ${route.path}
 */
const ${componentName} = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await api.get('${route.uri}');
      // setData(response.data);
      // Silent data fetch
    } catch (error) {
      console.error('Error fetching ${componentName} data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    // Silent create action
  };

  const handleEdit = (id) => {
    // Silent edit action
  };

  const handleDelete = (id) => {
    // Silent delete action
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <${iconName} className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">${pageTitle}</h1>
            <p className="text-muted-foreground mt-2">
              Manage ${pageTitle.toLowerCase()} in the system
            </p>
          </div>
        </div>
        <Button onClick={handleCreate} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add New</span>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card 
          title="Total"
          className="stats-card"
        >
          <div className="p-4">
            <div className="text-2xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">Total items</p>
          </div>
        </Card>
        
        <Card 
          title="Active"
          className="stats-card"
        >
          <div className="p-4">
            <div className="text-2xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">Active items</p>
          </div>
        </Card>
        
        <Card 
          title="Pending"
          className="stats-card"
        >
          <div className="p-4">
            <div className="text-2xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">Pending items</p>
          </div>
        </Card>
        
        <Card 
          title="This Month"
          className="stats-card"
        >
          <div className="p-4">
            <div className="text-2xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">New this month</p>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Card 
        title={\`\${pageTitle} Management\`}
        subtitle={\`View and manage all \${pageTitle.toLowerCase()} in the system\`}
        actions={[
          <Button key="search" variant="outline" size="sm" className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Button>,
          <Button key="filter" variant="outline" size="sm" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        ]}
      >
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading ${pageTitle.toLowerCase()}...</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <${iconName} className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <h3 className="text-lg font-medium mb-2">No ${pageTitle.toLowerCase()} found</h3>
              <p className="text-sm mb-6">Get started by adding your first ${pageTitle.toLowerCase().slice(0, -1)}.</p>
              <Button 
                onClick={handleCreate} 
                variant="primary"
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add First ${pageTitle.slice(0, -1)}</span>
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ${componentName};
`;
  }

  /**
   * Generate route configuration for React Router
   * @returns {string} Route configuration code
   */
  static async generateRouteConfig() {
    const routes = await RouteGenerator.generateRoutes();
    
    const imports = routes
      .map(route => `import ${route.component} from '../pages/Admin/${route.component}';`)
      .join('\n');
    
    const routeElements = routes
      .map(route => `            <Route path="${route.path.replace('/admin/', '')}" element={<${route.component} />} />`)
      .join('\n');
    
    return `${imports}

// Auto-generated route configuration
export const adminRoutes = [
${routeElements}
];
`;
  }
}

export default RouteGenerator;
