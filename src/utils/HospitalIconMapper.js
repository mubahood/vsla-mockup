// Safe Icon Mapping Utility for Hospital Management System
// Only uses verified react-feather icons to prevent compilation errors

import React from 'react';
import {
  // Core Navigation
  Home, Grid, Menu, Settings, HelpCircle,
  
  // Medical & Healthcare (using available icons)
  Activity, Heart, Eye, Calendar, Clock, 
  Thermometer, Shield, Award, Bookmark,
  
  // People & Users
  User, Users, UserCheck, UserPlus, UserMinus,
  
  // Documents & Records
  FileText, File, FilePlus, FileMinus, Folder, 
  FolderPlus, Archive, Clipboard, Book, BookOpen,
  
  // Finance & Payments
  DollarSign, CreditCard, TrendingUp, BarChart, 
  BarChart2, PieChart,
  
  // Inventory & Stock
  Package, Box, Truck, ShoppingBag, Database,
  
  // System & Communication
  Mail, Phone, MessageCircle, Bell, Search,
  Lock, Unlock, Key, Power, RefreshCw,
  
  // Actions & Controls
  Plus, Minus, Edit, Edit2, Trash, Trash2,
  Save, Upload, Download, Share, Star,
  
  // Directions & UI
  ChevronDown, ChevronRight, ChevronLeft, ChevronUp,
  ArrowRight, ArrowLeft, Circle, Square,
  
  // Status & Indicators
  Check, CheckCircle, X, XCircle, AlertCircle,
  Info, AlertTriangle, Loader
} from 'react-feather';

/**
 * Hospital Management System Icon Mapper
 * Maps menu items to appropriate professional icons
 */
class HospitalIconMapper {
  
  // Verified icon components (guaranteed to exist in react-feather)
  static iconComponents = {
    // Core Navigation
    Home, Grid, Menu, Settings, HelpCircle,
    
    // Medical & Healthcare
    Activity, Heart, Eye, Calendar, Clock, 
    Thermometer, Shield, Award, Bookmark,
    
    // People & Users  
    User, Users, UserCheck, UserPlus, UserMinus,
    
    // Documents & Records
    FileText, File, FilePlus, FileMinus, Folder, 
    FolderPlus, Archive, Clipboard, Book, BookOpen,
    
    // Finance & Payments
    DollarSign, CreditCard, TrendingUp, BarChart, 
    BarChart2, PieChart,
    
    // Inventory & Stock
    Package, Box, Truck, ShoppingBag, Database,
    
    // System & Communication
    Mail, Phone, MessageCircle, Bell, Search,
    Lock, Unlock, Key, Power, RefreshCw,
    
    // Actions & Controls
    Plus, Minus, Edit, Edit2, Trash, Trash2,
    Save, Upload, Download, Share, Star,
    
    // Directions & UI
    ChevronDown, ChevronRight, ChevronLeft, ChevronUp,
    ArrowRight, ArrowLeft, Circle, Square,
    
    // Status & Indicators
    Check, CheckCircle, X, XCircle, AlertCircle,
    Info, AlertTriangle, Loader
  };

  /**
   * Medical/Healthcare specific mappings
   */
  static medicalMappings = {
    // Core medical terms
    'patient': 'Users',
    'patients': 'Users',
    'doctor': 'UserCheck',
    'doctors': 'UserCheck',
    'physician': 'UserCheck',
    'nurse': 'UserCheck',
    'nurses': 'UserCheck',
    'staff': 'Users',
    'employee': 'User',
    'employees': 'Users',
    'medical': 'Activity',
    
    // Medical activities
    'consultation': 'Activity',
    'consultations': 'Activity',
    'appointment': 'Calendar',
    'appointments': 'Calendar',
    'schedule': 'Clock',
    'scheduling': 'Calendar',
    'diagnosis': 'Eye',
    'treatment': 'Heart',
    'therapy': 'Heart',
    'procedure': 'Activity',
    'surgery': 'Activity',
    'operation': 'Activity',
    'health': 'Heart',
    'vitals': 'Activity',
    'monitoring': 'Eye',
    'examination': 'Eye',
    'checkup': 'CheckCircle',
    
    // Medical records & documentation
    'record': 'FileText',
    'records': 'Archive',
    'history': 'Clock',
    'medical-history': 'Archive',
    'report': 'FileText',
    'reports': 'BarChart',
    'chart': 'BarChart2',
    'file': 'File',
    'document': 'FileText',
    'documents': 'Archive',
    'prescription': 'FileText',
    'prescriptions': 'Archive',
    
    // Departments & Specialties
    'emergency': 'AlertCircle',
    'er': 'AlertCircle',
    'icu': 'AlertTriangle',
    'surgical': 'Activity',
    'pharmacy': 'Package',
    'laboratory': 'Search',
    'lab': 'Search',
    'radiology': 'Eye',
    'cardiology': 'Heart',
    'ward': 'Home',
    'room': 'Square',
    'bed': 'Square',
    'department': 'Grid',
    'clinic': 'Home',
    
    // Medical supplies & equipment
    'drug': 'Package',
    'drugs': 'Package',
    'medicine': 'Package',
    'medication': 'Package',
    'dose': 'Package',
    'doses': 'Package',
    'supply': 'Package',
    'supplies': 'Package',
    'equipment': 'Package',
    'device': 'Package',
    'instrument': 'Package'
  };

  /**
   * Business/Administrative mappings
   */
  static businessMappings = {
    // Dashboard & Analytics
    'dashboard': 'Grid',
    'analytics': 'BarChart',
    'chart': 'BarChart2',
    'graph': 'TrendingUp',
    'metric': 'Activity',
    'statistics': 'PieChart',
    
    // Finance & Billing
    'payment': 'DollarSign',
    'payments': 'CreditCard',
    'billing': 'DollarSign',
    'invoice': 'FileText',
    'finance': 'DollarSign',
    'revenue': 'TrendingUp',
    'cost': 'DollarSign',
    'budget': 'BarChart',
    'card': 'CreditCard',
    'cards': 'CreditCard',
    
    // Inventory & Stock
    'inventory': 'Package',
    'stock': 'Box',
    'item': 'Package',
    'items': 'Package',
    'supply': 'Truck',
    'supplies': 'Truck',
    'equipment': 'Package',
    'drug': 'Package',
    'drugs': 'Package',
    'medicine': 'Package',
    'dose': 'Package',
    'doses': 'Package',
    
    // Organization
    'department': 'Grid',
    'service': 'Star',
    'services': 'Grid',
    'company': 'Home',
    'companies': 'Grid',
    'organization': 'Grid'
  };

  /**
   * System/Technical mappings
   */
  static systemMappings = {
    // Core system
    'setting': 'Settings',
    'settings': 'Settings',
    'configuration': 'Settings',
    'admin': 'Shield',
    'system': 'Settings',
    'profile': 'User',
    'account': 'User',
    
    // Communication
    'message': 'MessageCircle',
    'messages': 'Mail',
    'notification': 'Bell',
    'notifications': 'Bell',
    'alert': 'AlertCircle',
    'alerts': 'Bell',
    
    // Security & Access
    'permission': 'Shield',
    'permissions': 'Shield',
    'role': 'Key',
    'roles': 'Key',
    'access': 'Lock',
    'security': 'Shield',
    'auth': 'Key',
    'login': 'Lock',
    'logout': 'Power',
    
    // Actions
    'create': 'Plus',
    'add': 'Plus',
    'new': 'Plus',
    'edit': 'Edit',
    'update': 'Edit2',
    'delete': 'Trash',
    'remove': 'Trash2',
    'save': 'Save',
    'export': 'Upload',
    'import': 'Download',
    'share': 'Share',
    'search': 'Search'
  };

  /**
   * Get icon for menu item based on intelligent analysis
   * @param {Object} menuItem - Menu item with label, title, path, etc.
   * @returns {string} Icon component name
   */
  static getIconForMenuItem(menuItem) {
    if (!menuItem) {
      console.warn('HospitalIconMapper: No menu item provided');
      return 'Circle';
    }
    
    // Priority order for text analysis
    const textSources = [
      menuItem.label,
      menuItem.title, 
      menuItem.path,
      menuItem.uri,
      menuItem.slug,
      menuItem.icon // Check if icon is already specified
    ].filter(Boolean);
    
    // If icon is explicitly set and valid, use it
    if (menuItem.icon && this.iconComponents[menuItem.icon]) {
      return menuItem.icon;
    }
    
    // Analyze each text source
    for (const text of textSources) {
      const icon = this.analyzeText(text);
      if (icon !== 'Circle') { // Found a specific match
        // Debug logging in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`HospitalIconMapper: "${text}" → ${icon}`);
        }
        return icon;
      }
    }
    
    // Check if it's a parent item (has children) - use container icons
    if (menuItem.children && menuItem.children.length > 0) {
      return 'Folder';
    }
    
    // Default fallback
    if (process.env.NODE_ENV === 'development') {
      console.log(`HospitalIconMapper: No match found for menu item:`, menuItem);
    }
    return 'Circle';
  }

  /**
   * Analyze text and return best matching icon
   * @param {string} text - Text to analyze
   * @returns {string} Icon component name
   */
  static analyzeText(text) {
    if (!text || typeof text !== 'string') return 'Circle';
    
    const normalizedText = text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special characters
      .trim();
    
    // Check all mapping categories
    const allMappings = {
      ...this.medicalMappings,
      ...this.businessMappings,
      ...this.systemMappings
    };
    
    // Exact match first
    if (allMappings[normalizedText]) {
      return allMappings[normalizedText];
    }
    
    // Partial match (contains keyword)
    for (const [keyword, icon] of Object.entries(allMappings)) {
      if (normalizedText.includes(keyword)) {
        return icon;
      }
    }
    
    // No match found
    return 'Circle';
  }

  /**
   * Get React component for icon name
   * @param {string} iconName - Icon component name
   * @returns {React.Component} Icon component
   */
  static getIconComponent(iconName) {
    return this.iconComponents[iconName] || this.iconComponents.Circle;
  }

  /**
   * Render icon for menu item
   * @param {Object} menuItem - Menu item
   * @param {Object} props - Icon props (size, className, etc.)
   * @returns {React.Element} Rendered icon
   */
  static renderIcon(menuItem, props = {}) {
    try {
      const iconName = this.getIconForMenuItem(menuItem);
      const IconComponent = this.getIconComponent(iconName);
      
      if (!IconComponent) {
        console.warn(`HospitalIconMapper: Icon component not found for "${iconName}"`);
        const FallbackIcon = this.iconComponents.Circle;
        return React.createElement(FallbackIcon, { ...this.getDefaultProps(), ...props });
      }
      
      return React.createElement(IconComponent, { ...this.getDefaultProps(), ...props });
    } catch (error) {
      console.error('HospitalIconMapper: Error rendering icon:', error);
      const FallbackIcon = this.iconComponents.Circle;
      return React.createElement(FallbackIcon, { ...this.getDefaultProps(), ...props });
    }
  }

  /**
   * Get default props for icons
   * @returns {Object} Default props
   */
  static getDefaultProps() {
    return {
      size: 14,
      className: 'text-gray-400',
      style: { 
        minWidth: '14px',
        minHeight: '14px'
      }
    };
  }
}

export default HospitalIconMapper;
