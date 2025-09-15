import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks';
import MenuService from '../services/MenuService';
import SidebarMenu from '../components/Admin/SidebarMenu';

export default function AdminLayout({ title = 'Admin Dashboard' }) {
    const location = useLocation();
    const { user } = useAuth();
    
    // Enhanced state management
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showPageLoader, setShowPageLoader] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [menuData, setMenuData] = useState([]);
    
    // User Profile Dropdown State
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const dropdownRef = useRef(null);
    
    const { logout } = useAuth();

    // Initialize MenuService and load menu data
    useEffect(() => {
        const initializeMenu = async () => {
            try { 
                await MenuService.initialize();
                const menu = MenuService.getMenuTree(); 
                setMenuData(menu);
            } catch (error) {
                console.error('Error initializing menu service:', error);
                // Fallback to static menu data
                console.log('Using fallback menu data');
                setMenuData([
                    {
                        id: 1,
                        title: 'Dashboard',
                        icon: 'fa-tachometer-alt',
                        uri: '/admin/dashboard',
                        children: []
                    },
                    {
                        id: 2,
                        title: 'Consultations',
                        icon: 'fa-calendar-plus',
                        uri: '/admin/consultations',
                        children: []
                    },
                    {
                        id: 3,
                        title: 'Patients',
                        icon: 'fa-users',
                        uri: '/admin/patients',
                        children: []
                    },
                    {
                        id: 4,
                        title: 'Medical Services',
                        icon: 'fa-stethoscope',
                        uri: '/admin/medical-services',
                        children: []
                    },
                    {
                        id: 5,
                        title: 'Departments',
                        icon: 'fa-hospital',
                        uri: '/admin/departments',
                        children: []
                    },
                    {
                        id: 6,
                        title: 'Staff',
                        icon: 'fa-user-md',
                        uri: '/admin/staff',
                        children: []
                    },
                    {
                        id: 7,
                        title: 'Billing',
                        icon: 'fa-money-bill',
                        uri: '/admin/billing',
                        children: []
                    },
                    {
                        id: 8,
                        title: 'Reports',
                        icon: 'fa-chart-bar',
                        uri: '/admin/reports',
                        children: []
                    },
                    {
                        id: 9,
                        title: 'Settings',
                        icon: 'fa-cogs',
                        uri: '/admin/settings',
                        children: []
                    }
                ]);
            }
        };

        initializeMenu();
    }, []);

    // Page transition loader
    useEffect(() => {
        const handleStart = () => setShowPageLoader(true);
        const handleFinish = () => {
            setTimeout(() => setShowPageLoader(false), 300);
        };

        // Listen for Inertia page transitions
        document.addEventListener('inertia:start', handleStart);
        document.addEventListener('inertia:finish', handleFinish);

        return () => {
            document.removeEventListener('inertia:start', handleStart);
            document.removeEventListener('inertia:finish', handleFinish);
        };
    }, []);

    // Enhanced responsive detection
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsTablet(width >= 768 && width < 1024);
            
            // Auto-close sidebar on mobile resize
            if (width >= 768) {
                setIsSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Enhanced scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Add admin class to body to override global padding
    useEffect(() => {
        document.body.setAttribute('data-admin', 'true');
        return () => {
            document.body.removeAttribute('data-admin');
        };
    }, []);

    // Time update effect
    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        
        return () => clearInterval(timeInterval);
    }, []);

    // Enhanced keyboard navigation
    useEffect(() => {
        const handleKeydown = (e) => {
            // ESC to close sidebar on mobile
            if (e.key === 'Escape' && isMobile && isSidebarOpen) {
                setIsSidebarOpen(false);
                e.preventDefault();
            }
            
            // Alt + M to toggle mobile menu
            if (e.altKey && e.key === 'm') {
                e.preventDefault();
                setIsSidebarOpen(!isSidebarOpen);
            }
        };

        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    }, [isMobile, isSidebarOpen]);

    // Dropdown click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // User Profile Functions
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogoutClick = () => {
        setIsDropdownOpen(false);
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        setShowLogoutModal(false);
        logout();
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    // eslint-disable-next-line no-unused-vars
    const closeSidebar = () => {
        if (isMobile) setIsSidebarOpen(false);
    };

    // eslint-disable-next-line no-unused-vars
    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <>
            
            {/* CSS for animations */}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                
                .admin-page-header {
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #E5E7EB;
                }
                
                .admin-page-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: #0A1E34;
                    margin: 0 0 5px 0;
                }
                
                .admin-page-subtitle {
                    font-size: 14px;
                    color: #6B7280;
                    margin: 0;
                }
                
                .admin-card {
                    background: white;
                    border-radius: 0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    border: 1px solid #E5E7EB;
                    overflow: hidden;
                }
                
                .admin-card-header {
                    padding: 16px;
                    background: #F9FAFB;
                    border-bottom: 1px solid #E5E7EB;
                }
                
                .admin-card-body {
                    padding: 16px;
                }
                
                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>

            <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                {/* ENHANCED ADMIN HEADER */}
                <header style={{
                    backgroundColor: '#0A1E34',
                    borderBottom: `2px solid ${isScrolled ? '#F59E0B' : '#1a2e44'}`,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '40px',
                    zIndex: 1000,
                    transition: 'all 0.3s ease',
                    boxShadow: isScrolled ? '0 2px 10px rgba(10, 30, 52, 0.3)' : 'none'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '100%',
                        padding: '0 12px'
                    }}>
                        {/* Left Section */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {/* Mobile Hamburger */}
                            {isMobile && (
                                <button
                                    onClick={toggleSidebar}
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'white',
                                        fontSize: '16px',
                                        marginRight: '8px',
                                        cursor: 'pointer',
                                        padding: '4px'
                                    }}
                                >
                                    ☰
                                </button>
                            )}
                            
                            {/* Hospital Logo/Brand */}
                            <Link to="admin/dashboard" style={{
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                color: 'white'
                            }}>
                                <span style={{
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    color: '#F59E0B',
                                    marginRight: '6px'
                                }}>
                                    ⚕
                                </span>
                                <span style={{ fontSize: '12px', fontWeight: 600 }}>
                                    {isMobile ? 'FOSTER' : 'FOSTER Admin'}
                                </span>
                            </Link>
                        </div>

                        {/* Right Section */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {/* Time Display */}
                            {!isMobile && (
                                <div style={{
                                    fontSize: '10px',
                                    color: 'rgba(255,255,255,0.8)',
                                    marginRight: '8px'
                                }}>
                                    {currentTime.toLocaleTimeString()}
                                </div>
                            )}
                            
                            {/* User Profile Dropdown */}
                            <div style={{ position: 'relative' }} ref={dropdownRef}>
                                <button
                                    onClick={toggleDropdown}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        backgroundColor: 'transparent',
                                        border: '1px solid rgba(245, 158, 11, 0.3)',
                                        borderRadius: '0',
                                        padding: '4px 8px',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontSize: '10px',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = 'rgba(245, 158, 11, 0.1)';
                                        e.target.style.borderColor = '#F59E0B';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                                    }}
                                >
                                    {/* User Avatar */}
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        backgroundColor: '#F59E0B',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '8px',
                                        fontWeight: 'bold',
                                        color: '#0A1E34'
                                    }}>
                                        {(user?.name || 'A').charAt(0).toUpperCase()}
                                    </div>
                                    
                                    {/* User Name */}
                                    {!isMobile && (
                                        <span style={{ fontWeight: '500' }}>
                                            {user?.name || 'Admin User'}
                                        </span>
                                    )}
                                    
                                    {/* Dropdown Arrow */}
                                    <span style={{
                                        fontSize: '8px',
                                        transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.2s ease'
                                    }}>
                                        ▼
                                    </span>
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        right: '0',
                                        marginTop: '4px',
                                        backgroundColor: 'white',
                                        borderRadius: '0',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                        border: '1px solid #e5e7eb',
                                        minWidth: '180px',
                                        zIndex: 1001,
                                        overflow: 'hidden'
                                    }}>
                                        {/* User Info Header */}
                                        <div style={{
                                            padding: '12px 16px',
                                            borderBottom: '1px solid #f3f4f6',
                                            backgroundColor: '#f8f9fa'
                                        }}>
                                            <div style={{ fontWeight: '600', color: '#374151', fontSize: '12px' }}>
                                                {user?.name || 'Admin User'}
                                            </div>
                                            <div style={{ color: '#6b7280', fontSize: '10px', marginTop: '2px' }}>
                                                {user?.email || 'admin@fao-foster.org'}
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div style={{ padding: '4px 0' }}>
                                            <Link
                                                to="/admin/profile"
                                                onClick={() => setIsDropdownOpen(false)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    padding: '8px 16px',
                                                    color: '#374151',
                                                    textDecoration: 'none',
                                                    fontSize: '11px',
                                                    transition: 'background-color 0.15s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.backgroundColor = '#f3f4f6';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.backgroundColor = 'transparent';
                                                }}
                                            >
                                                <i className="fas fa-user" style={{ width: '12px', color: '#6b7280' }}></i>
                                                Update Profile
                                            </Link>
                                            
                                            <button
                                                onClick={handleLogoutClick}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    padding: '8px 16px',
                                                    width: '100%',
                                                    border: 'none',
                                                    backgroundColor: 'transparent',
                                                    color: '#dc2626',
                                                    textAlign: 'left',
                                                    fontSize: '11px',
                                                    cursor: 'pointer',
                                                    transition: 'background-color 0.15s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.backgroundColor = '#fef2f2';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.backgroundColor = 'transparent';
                                                }}
                                            >
                                                <i className="fas fa-sign-out-alt" style={{ width: '12px' }}></i>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* ENHANCED LAYOUT WRAPPER */}
                <div style={{ display: 'flex', marginTop: '40px', marginBottom: '0' }}>
                    {/* CREATIVE RESPONSIVE SIDEBAR */}
                    <aside style={{
                        width: isMobile ? '280px' : (isTablet ? '220px' : '240px'),
                        backgroundColor: '#0A1E34',
                        borderRight: '2px solid #1a2e44',
                        position: 'fixed',
                        left: isMobile ? (isSidebarOpen ? '0' : '-280px') : '0',
                        top: '40px',
                        bottom: '30px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        zIndex: 900,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: isMobile && isSidebarOpen ? '5px 0 20px rgba(0,0,0,0.3)' : 'none',
                        background: 'linear-gradient(180deg, #0A1E34 0%, #0f2339 50%, #0A1E34 100%)'
                    }}>
                        {/* Enhanced Mobile Sidebar Overlay */}
                        {isMobile && isSidebarOpen && (
                            <div
                                onClick={toggleSidebar}
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                    zIndex: -1,
                                    backdropFilter: 'blur(2px)',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        )}
                        <SidebarMenu menuData={menuData} currentPath={location.pathname} onNavigate={closeSidebar} />
                    </aside>

                    {/* ENHANCED RESPONSIVE MAIN CONTENT */}
                    <main style={{
                        flex: 1,
                        marginLeft: isMobile ? '0' : (isTablet ? '220px' : '240px'),
                        padding: '0',
                        minHeight: 'calc(100vh - 70px)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        backgroundColor: '#f8fafc',
                        position: 'relative',
                        overflow: 'auto'
                    }}>
                        {/* Page Transition Loader - Non-blocking top loader */}
                        {showPageLoader && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '3px',
                                backgroundColor: '#F59E0B',
                                zIndex: 1000,
                                animation: 'slideInRight 0.3s ease-out',
                                boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)'
                            }} />
                        )}

                        {/* MAIN CONTENT AREA - Clear white background with margins */}
                        <div className="admin-main-content" style={{
                            backgroundColor: '#f8fafc',
                            border: 'none',
                            borderRadius: '0',
                            position: 'relative',
                            overflow: 'visible',
                            padding: '0',
                            minHeight: 'calc(100vh - 70px)'
                        }}>
                            <Outlet />
                        </div>
                    </main>
                </div>

                {/* Logout Confirmation Modal */}
                {showLogoutModal && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2000
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '0',
                            padding: '24px',
                            maxWidth: '400px',
                            width: '90%',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                            animation: 'fadeInScale 0.3s ease-out'
                        }}>
                            {/* Modal Header */}
                            <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    backgroundColor: '#fef2f2',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 12px'
                                }}>
                                    <i className="fas fa-sign-out-alt" style={{
                                        fontSize: '20px',
                                        color: '#dc2626'
                                    }}></i>
                                </div>
                                <h3 style={{
                                    margin: '0 0 8px 0',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    color: '#111827'
                                }}>
                                    Confirm Logout
                                </h3>
                                <p style={{
                                    margin: 0,
                                    fontSize: '14px',
                                    color: '#6b7280',
                                    lineHeight: '1.5'
                                }}>
                                    Are you sure you want to logout? You will need to sign in again to access the admin panel.
                                </p>
                            </div>

                            {/* Modal Actions */}
                            <div style={{
                                display: 'flex',
                                gap: '12px',
                                justifyContent: 'flex-end'
                            }}>
                                <button
                                    onClick={cancelLogout}
                                    style={{
                                        padding: '8px 16px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0',
                                        backgroundColor: 'white',
                                        color: '#374151',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#f9fafb';
                                        e.target.style.borderColor = '#9ca3af';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'white';
                                        e.target.style.borderColor = '#d1d5db';
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmLogout}
                                    style={{
                                        padding: '8px 16px',
                                        border: 'none',
                                        borderRadius: '0',
                                        backgroundColor: '#dc2626',
                                        color: 'white',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#b91c1c';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = '#dc2626';
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ENHANCED RESPONSIVE FOOTER */}
                <footer style={{
                    height: '30px',
                    backgroundColor: '#0A1E34',
                    borderTop: `2px solid ${isScrolled ? '#F59E0B' : '#1a2e44'}`,
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    transition: 'all 0.3s ease',
                    boxShadow: isScrolled ? '0 -2px 10px rgba(10, 30, 52, 0.3)' : 'none',
                    background: 'linear-gradient(90deg, #0A1E34 0%, #0f2339 50%, #0A1E34 100%)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '100%',
                        padding: '0 16px',
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '10px'
                    }}>
                        {/* Left: Copyright */}
                        <div>
                            © 2025 FOSTER Project - Agricultural MIS
                        </div>
                        
                        {/* Right: Version & Support */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ color: 'rgba(255,255,255,0.5)' }}>
                                v1.0.0
                            </span>
                            <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                            <a 
                                href="#support" 
                                style={{ 
                                    color: '#F59E0B', 
                                    textDecoration: 'none',
                                    transition: 'color 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#fbbf24'}
                                onMouseLeave={(e) => e.target.style.color = '#F59E0B'}
                            >
                                Support
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
