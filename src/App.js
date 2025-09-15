import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./index.css"; // Our copied styles
import "./layouts.css"; // Layout and component styles including AppLoader
import "./styles/theme.css"; // Import theme variables globally
import "./styles/components.css"; // Import component styles globally

// Import core components and hooks
import { ProtectedRoute, AppLoader } from "./components";
import { useAuth, useManifest } from "./hooks";

// Import data initializer
import { initializeAppData } from "./utils/dataInitializer";

// Import contexts
import { ToastProvider } from "./contexts/ToastContext";

// Import layouts
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

// Import public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Team from "./pages/Doctors";
import Pricing from "./pages/Pricing";
import ConstantsExample from "./pages/ConstantsExample";
import FosterProject from "./pages/FosterProject";

// Import auth pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";

// Import admin pages
import Dashboard from "./pages/Admin/Dashboard";

// Import MIS modules for FOSTER Project
import MISDashboard from "./pages/MIS/MISDashboard";
import DigitalRegistry from "./pages/MIS/DigitalRegistry";
import UserManagement from "./pages/MIS/UserManagement";
import FinancialTracking from "./pages/MIS/FinancialTracking";
import Training from "./pages/MIS/Training";
import EAdvisoryHub from "./pages/MIS/EAdvisoryHub";
import EMarketplace from "./pages/MIS/EMarketplace";
import VSLALedger from "./pages/MIS/VSLALedger";
import MEDashboard from "./pages/MIS/MEDashboard";

// Import FOSTER Project specific admin components (legacy - to be replaced)
import GroupsList from "./pages/Admin/Groups/groups-list";
import TrainingSessionsList from "./pages/Admin/TrainingSessions/training-sessions-list";
import VslaTransactionsList from "./pages/Admin/VslaTransactions/vsla-transactions-list";
import MarketplaceList from "./pages/Admin/Marketplace/marketplace-list";
import AdvisoryContentList from "./pages/Admin/AdvisoryContent/advisory-content-list";

// Import employees (only non-hospital module kept)
import EmployeesList from "./pages/Admin/Employees/employees-list";

// Route Change Detector Component
function RouteChangeDetector() {
  const location = useLocation();
  const { authenticated, loading } = useAuth();

  React.useEffect(() => {
    // Update document title based on the route and authentication status
    let title = "FOSTER Project - Digital Agricultural MIS";
    
    if (location.pathname === '/') {
      title = "FOSTER Project - Digital Agricultural MIS for Karamoja";
    } else if (location.pathname === '/about') {
      title = "About FOSTER Project - FAO Digital MIS";
    } else if (location.pathname === '/foster-project') {
      title = "FOSTER Project Overview - FAO Uganda";
    } else if (location.pathname.startsWith('/admin')) {
      title = "Admin Dashboard - FOSTER Project MIS";
    } else if (location.pathname.startsWith('/auth')) {
      title = "Login - FOSTER Project MIS";
    }
    
    document.title = title;
  }, [location.pathname, authenticated, loading]);

  return null;
}

// App Content Component (inside Router context)
function AppContent() {
  const { loading } = useAuth();
  const { loading: manifestLoading } = useManifest();

  // Initialize data on app startup
  React.useEffect(() => {
    try {
      initializeAppData();
    } catch (error) {
      console.error('Failed to initialize app data:', error);
    }
  }, []);

  // Show loading screen while initializing
  if (loading || manifestLoading) {
    return <AppLoader />;
  }

  return (
    <>
      <RouteChangeDetector />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="foster-project" element={<FosterProject />} />
          <Route path="contact" element={<Contact />} />
          <Route path="team" element={<Team />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="constants-example" element={<ConstantsExample />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              roles={["admin", "super_admin", "doctor", "nurse", "staff"]}
            >
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MISDashboard />} />
          <Route path="dashboard" element={<MISDashboard />} />

          {/* FOSTER Project MIS Core Modules */}
          <Route path="registry" element={<DigitalRegistry />} />
          <Route path="registry/create" element={<DigitalRegistry />} />
          <Route path="registry/edit/:id" element={<DigitalRegistry />} />
          <Route path="registry/view/:id" element={<DigitalRegistry />} />
          
          <Route path="users" element={<UserManagement />} />
          <Route path="users/create" element={<UserManagement />} />
          <Route path="users/edit/:id" element={<UserManagement />} />
          <Route path="users/view/:id" element={<UserManagement />} />
          
          <Route path="financial" element={<FinancialTracking />} />
          <Route path="financial/create" element={<FinancialTracking />} />
          <Route path="financial/edit/:id" element={<FinancialTracking />} />
          <Route path="financial/view/:id" element={<FinancialTracking />} />
          
          <Route path="training" element={<Training />} />
          <Route path="training/create" element={<Training />} />
          <Route path="training/edit/:id" element={<Training />} />
          <Route path="training/view/:id" element={<Training />} />
          <Route path="advisory" element={<EAdvisoryHub />} />
          <Route path="marketplace" element={<EMarketplace />} />
          <Route path="vsla-ledger" element={<VSLALedger />} />
          <Route path="vsla-ledger/create" element={<VSLALedger />} />
          <Route path="vsla-ledger/edit/:id" element={<VSLALedger />} />
          <Route path="vsla-ledger/view/:id" element={<VSLALedger />} />
          <Route path="monitoring" element={<MEDashboard />} />

          {/* Legacy routes (backward compatibility) */}
          <Route path="groups" element={<GroupsList />} />
          <Route path="training-sessions" element={<TrainingSessionsList />} />
          <Route path="vsla-transactions" element={<VslaTransactionsList />} />
          <Route path="advisory-content" element={<AdvisoryContentList />} />

          {/* System Administration - Employees Only */}
          <Route path="employees" element={<EmployeesList />} />
          <Route path="employees/create" element={<EmployeesList />} />
          <Route path="employees/edit/:id" element={<EmployeesList />} />
          <Route path="employees/view/:id" element={<EmployeesList />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <ToastProvider>
      <Router>
        <AppContent />
      </Router>
    </ToastProvider>
  );
}

export default App;
