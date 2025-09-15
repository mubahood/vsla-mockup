import React from 'react';

/**
 * Summary Cards Component
 * Displays key metrics following flat design principles
 */

const SummaryCards = ({ data, config }) => {
  const getIcon = (iconName) => {
    const iconStyle = {
      width: '24px',
      height: '24px',
      color: '#ffffff'
    };

    switch (iconName) {
      case 'group':
        return (
          <svg style={iconStyle} fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.996 1.996 0 0 0 18.04 7h-.08c-1.66 0-3.06 1.15-3.43 2.75L16 13.5V20h4zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zm1.5 1h-3C9.57 12.5 8.5 13.57 8.5 15v5h7v-5c0-1.43-1.07-2.5-2.5-2.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm1.5 2h-3C2.57 8 1.5 9.07 1.5 10.5V16h4v-4.5c0-.68.27-1.32.75-1.78V10c0 .89.44 1.67 1.11 2.14l-.41 1.53A1.996 1.996 0 0 0 8.88 16H7.5v4h3v-3c0-.83-.34-1.58-.88-2.12L9.5 14.5V12c0-1.43-1.07-2.5-2.5-2.5z"/>
          </svg>
        );
      case 'person':
        return (
          <svg style={iconStyle} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        );
      case 'bank':
        return (
          <svg style={iconStyle} fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.5 1L2 6v2h20V6l-9.5-5zM4 8v6h2.5v-6H4zm3.5 0v6h2v-6h-2zm3 0v6h2v-6h-2zm3.5 0v6H16V8h-2zm3.5 0v6h2.5V8H20zM2 20h20v-2H2v2z"/>
          </svg>
        );
      case 'school':
        return (
          <svg style={iconStyle} fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
          </svg>
        );
      default:
        return (
          <svg style={iconStyle} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    }}>
      {config.map((card) => {
        const value = typeof card.getValue === 'function' ? card.getValue(data) : card.getValue;
        const subtext = typeof card.getSubtext === 'function' ? card.getSubtext(data) : card.getSubtext;

        return (
          <div
            key={card.id}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: card.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {getIcon(card.icon)}
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '12px',
                color: '#64748b',
                marginBottom: '4px',
                fontWeight: '500'
              }}>
                {card.title}
              </div>
              
              <div style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '2px'
              }}>
                {typeof value === 'number' && value > 999 ? value.toLocaleString() : value}
              </div>
              
              {subtext && (
                <div style={{
                  fontSize: '11px',
                  color: '#64748b'
                }}>
                  {subtext}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
