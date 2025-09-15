# Guidelines for Creating Models

## Prerequisites
- First, determine which database table the model fetches data from
- Research the model structure in the backend before creating it
- Use the artisan command below to access database schema information

## Model Requirements
- **Endpoint Strategy**: Determine if the model has its own endpoint or uses the generic endpoint
- **Core Features**: Ensure the model supports:
    - Pagination
    - Filtering
    - Sorting
    - CRUD operations (Create, Read, Update, Delete)
- **API Integration**: Use our centralized API service for all HTTP requests (GET, POST, PUT, DELETE)
- **Variable Initialization**: 
    - Apart from `id`, initialize every variable as an empty string
    - Handle JSON or array fields properly in the model structure
- **Naming Convention**: Name the model exactly as it appears in the backend

## Database Schema Investigation
Use this command to examine table structure:

```bash
cd /Applications/MAMP/htdocs/hospital && php -r "
require 'vendor/autoload.php';
\$app = require_once 'bootstrap/app.php';
\$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

try {
        \$columns = \Illuminate\Support\Facades\Schema::getColumnListing('admin_users');
        echo 'Columns in admin_users table:' . PHP_EOL;
        foreach(\$columns as \$column) {
                echo '- ' . \$column . PHP_EOL;
        }
} catch(Exception \$e) {
        echo 'Error: ' . \$e->getMessage() . PHP_EOL;
}
"
```

*Replace 'admin_users' with your target table name*