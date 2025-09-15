import React from 'react';

/**
 * Registry Table Actions Component
 * Following design system guidelines - flat design, no shadows
 */
const RegistryTableActions = ({ record, onView, onEdit, onDelete }) => {
  const buttonStyle = {
    padding: '4px 8px',
    fontSize: '12px',
    border: '1px solid',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    marginRight: '4px',
    fontWeight: '500'
  };

  const viewButtonStyle = {
    ...buttonStyle,
    color: '#0a1e34',
    borderColor: '#0a1e34'
  };

  const editButtonStyle = {
    ...buttonStyle,
    color: '#f59e0b',
    borderColor: '#f59e0b'
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    color: '#ef4444',
    borderColor: '#ef4444'
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button
        style={viewButtonStyle}
        onClick={() => onView(record)}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#0a1e34';
          e.target.style.color = '#ffffff';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = '#0a1e34';
        }}
      >
        View
      </button>
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
        Edit
      </button>
      <button
        style={deleteButtonStyle}
        onClick={() => onDelete(record)}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#ef4444';
          e.target.style.color = '#ffffff';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = '#ef4444';
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default RegistryTableActions;
