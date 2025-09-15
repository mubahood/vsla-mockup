import React from 'react';
import { detailsFields } from '../config/registryConfig';

/**
 * Registry Details View Component
 * Following design system guidelines - flat design, no shadows
 */
const RegistryDetailsView = ({ record, onClose, onEdit }) => {
  if (!record) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '24px'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e2e8f0'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#0a1e34',
    margin: 0
  };

  const buttonStyle = {
    padding: '8px 16px',
    fontSize: '14px',
    border: '1px solid',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    marginLeft: '8px',
    fontWeight: '500'
  };

  const closeButtonStyle = {
    ...buttonStyle,
    color: '#64748b',
    borderColor: '#64748b'
  };

  const editButtonStyle = {
    ...buttonStyle,
    color: '#f59e0b',
    borderColor: '#f59e0b'
  };

  const sectionStyle = {
    marginBottom: '24px'
  };

  const sectionTitleStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#0a1e34',
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '1px solid #e2e8f0'
  };

  const fieldRowStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '12px'
  };

  const fieldStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const labelStyle = {
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '4px',
    fontWeight: '500'
  };

  const valueStyle = {
    fontSize: '14px',
    color: '#1e293b',
    fontWeight: '400'
  };

  const formatValue = (value, field) => {
    if (!value && value !== 0) return '-';
    
    if (field.type === 'date') {
      return new Date(value).toLocaleDateString();
    }
    
    if (field.type === 'array') {
      return Array.isArray(value) ? value.join(', ') : value;
    }
    
    if (field.suffix) {
      return `${value}${field.suffix}`;
    }
    
    return value;
  };

  const renderStatusBadge = (status) => (
    <span style={{
      backgroundColor: status === 'Active' ? '#10b981' : '#64748b',
      color: '#ffffff',
      padding: '2px 8px',
      fontSize: '11px',
      fontWeight: '500'
    }}>
      {status}
    </span>
  );

  const renderTypeBadge = (type) => {
    const colors = { 
      FFS: '#0a1e34', 
      FBS: '#f59e0b', 
      VSLA: '#10b981' 
    };
    return (
      <span style={{
        backgroundColor: colors[type] || '#64748b',
        color: '#ffffff',
        padding: '2px 8px',
        fontSize: '11px',
        fontWeight: '500'
      }}>
        {type}
      </span>
    );
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>{record.name}</h2>
          <div>
            <button
              style={editButtonStyle}
              onClick={() => onEdit(record)}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f59e0b';
                e.target.style.color = '#ffffff';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#f59e0b';
              }}
            >
              Edit Group
            </button>
            <button
              style={closeButtonStyle}
              onClick={onClose}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#64748b';
                e.target.style.color = '#ffffff';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#64748b';
              }}
            >
              Close
            </button>
          </div>
        </div>

        {detailsFields.map((section) => (
          <div key={section.key} style={sectionStyle}>
            <h3 style={sectionTitleStyle}>{section.label}</h3>
            <div style={fieldRowStyle}>
              {section.fields.map((field) => (
                <div key={field.key} style={fieldStyle}>
                  <label style={labelStyle}>{field.label}</label>
                  <div style={valueStyle}>
                    {field.key === 'status' ? renderStatusBadge(record[field.key]) :
                     field.key === 'type' ? renderTypeBadge(record[field.key]) :
                     formatValue(record[field.key], field)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistryDetailsView;
