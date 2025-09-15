import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'react-feather';
import { useNavigate, useLocation } from 'react-router-dom';
import HospitalIconMapper from '../../utils/HospitalIconMapper';

const DynamicMenu = ({ menuData, userRole, userPermissions, onNavigate }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // Debug logging
  console.log('DynamicMenu: menuData =', menuData);
  console.log('DynamicMenu: menuData type =', typeof menuData);
  console.log('DynamicMenu: menuData isArray =', Array.isArray(menuData));

  const toggleExpand = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleNavigation = (path) => {
    if (path && path !== '#') {
      navigate(path);
      if (onNavigate) {
        onNavigate();
      }
    }
  };

  const renderIcon = (item) => {
    return (
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:from-blue-400 group-hover:to-blue-500">
        {HospitalIconMapper.renderIcon(item, {
          size: 18,
          className: "text-white drop-shadow-sm",
          style: { 
            minWidth: '18px',
            minHeight: '18px'
          }
        })}
      </div>
    );
  };

  const renderMenuItem = (item, isSubItem = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.id];
    const isActive = location.pathname === item.path;

    return (
      <div key={item.id} className="menu-item">
        <div 
          className={`flex items-center justify-between cursor-pointer transition-all duration-300 group relative ${
            isSubItem 
              ? `px-4 py-3 ml-6 rounded-lg my-1 border-l-4 border-transparent hover:border-l-blue-400 hover:bg-white hover:bg-opacity-5 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-l-blue-300 shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }` 
              : `px-4 py-4 mx-2 rounded-xl my-1 hover:bg-white hover:bg-opacity-8 hover:shadow-lg ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl border border-blue-400 border-opacity-30' 
                    : 'text-gray-200 hover:text-white border border-transparent hover:border-white hover:border-opacity-10'
                }`
          }`}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.id);
            } else {
              handleNavigation(item.path);
            }
          }}
        >
          <div className="flex items-center space-x-4">
            {!isSubItem && renderIcon(item)}
            {isSubItem && (
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 shadow-sm"></div>
                <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-transparent rounded-full opacity-50"></div>
              </div>
            )}
            <span className={`font-medium transition-all duration-200 ${
              isSubItem 
                ? `text-sm ${isActive ? 'text-white font-semibold' : 'text-gray-300 group-hover:text-white'}`
                : `text-base ${isActive ? 'text-white font-semibold' : 'text-gray-200 group-hover:text-white'}`
            }`}>
              {item.label || item.title}
            </span>
            {!isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"></div>
            )}
          </div>
          
          {hasChildren && (
            <div className={`transition-all duration-300 ${
              isActive ? 'text-white' : 'text-blue-400 group-hover:text-blue-300'
            } ${isExpanded ? 'rotate-180' : ''}`}>
              <ChevronDown size={16} className="drop-shadow-sm" />
            </div>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-1 relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400 via-blue-300 to-transparent opacity-30"></div>
            {item.children.map(child => renderMenuItem(child, true))}
          </div>
        )}
      </div>
    );
  };

  if (!menuData || !Array.isArray(menuData)) {
    console.log('DynamicMenu: No valid menu data, showing fallback');
    return (
      <div className="dynamic-menu py-4">
        <div className="space-y-2">
          <div className="menu-item">
            <div className="flex items-center justify-between px-4 py-4 mx-2 rounded-xl my-1 text-gray-200 hover:bg-white hover:bg-opacity-8 hover:shadow-lg cursor-pointer transition-all duration-300 group border border-transparent hover:border-white hover:border-opacity-10">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:from-blue-400 group-hover:to-blue-500">
                  <span className="text-white text-sm font-semibold drop-shadow-sm">D</span>
                </div>
                <span className="text-base font-medium text-gray-200 group-hover:text-white transition-all duration-200">Dashboard</span>
              </div>
            </div>
          </div>
          <div className="menu-item">
            <div className="flex items-center justify-between px-4 py-4 mx-2 rounded-xl my-1 text-gray-200 hover:bg-white hover:bg-opacity-8 hover:shadow-lg cursor-pointer transition-all duration-300 group border border-transparent hover:border-white hover:border-opacity-10">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:from-blue-400 group-hover:to-blue-500">
                  <span className="text-white text-sm font-semibold drop-shadow-sm">P</span>
                </div>
                <span className="text-base font-medium text-gray-200 group-hover:text-white transition-all duration-200">Patients</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dynamic-menu py-4">
      <div className="space-y-2">
        {menuData.map(item => renderMenuItem(item))}
      </div>
    </div>
  );
};

export default DynamicMenu;
