import React from 'react';

/**
 * Registry Summary Cards Component
 * Following design system guidelines - flat design, no shadows
 */
const RegistrySummaryCards = ({ data = [] }) => {
  // Calculate summary statistics
  const totalGroups = data.length;
  const activeGroups = data.filter(group => group.status === 'Active').length;
  const totalMembers = data.reduce((sum, group) => sum + (group.memberCount || 0), 0);
  const femaleMembers = data.reduce((sum, group) => sum + (group.femaleMembers || 0), 0);
  
  const groupsByType = data.reduce((acc, group) => {
    acc[group.type] = (acc[group.type] || 0) + 1;
    return acc;
  }, {});

  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '120px'
  };

  const titleStyle = {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '8px',
    fontWeight: '500'
  };

  const valueStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0a1e34',
    marginBottom: '4px'
  };

  const subtitleStyle = {
    fontSize: '12px',
    color: '#64748b'
  };

  const cards = [
    {
      title: 'Total Groups',
      value: totalGroups.toLocaleString(),
      subtitle: `${activeGroups} active groups`,
      color: '#0a1e34'
    },
    {
      title: 'Total Members',
      value: totalMembers.toLocaleString(),
      subtitle: `${Math.round((femaleMembers / totalMembers * 100) || 0)}% female members`,
      color: '#f59e0b'
    },
    {
      title: 'FFS Groups',
      value: (groupsByType.FFS || 0).toLocaleString(),
      subtitle: 'Farmer Field Schools',
      color: '#10b981'
    },
    {
      title: 'FBS Groups',
      value: (groupsByType.FBS || 0).toLocaleString(),
      subtitle: 'Farmer Business Schools',
      color: '#8b5cf6'
    },
    {
      title: 'VSLA Groups',
      value: (groupsByType.VSLA || 0).toLocaleString(),
      subtitle: 'Village Savings & Loan',
      color: '#06b6d4'
    },
    {
      title: 'Average Size',
      value: Math.round(totalMembers / totalGroups || 0).toString(),
      subtitle: 'members per group',
      color: '#ef4444'
    }
  ];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '16px',
      marginBottom: '24px'
    }}>
      {cards.map((card, index) => (
        <div key={index} style={cardStyle}>
          <div style={titleStyle}>{card.title}</div>
          <div style={{ ...valueStyle, color: card.color }}>{card.value}</div>
          <div style={subtitleStyle}>{card.subtitle}</div>
        </div>
      ))}
    </div>
  );
};

export default RegistrySummaryCards;
