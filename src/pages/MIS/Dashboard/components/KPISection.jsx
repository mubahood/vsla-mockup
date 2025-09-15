import React from 'react';
import { kpiMetrics } from '../config/dashboardConfig';

/**
 * KPI Section Component
 * Displays key performance indicators in flat design style
 */

const KPISection = ({ data }) => {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      padding: '20px',
      marginTop: '24px'
    }}>
      <h3 style={{
        margin: '0 0 20px 0',
        fontSize: '18px',
        fontWeight: '600',
        color: '#1e293b'
      }}>
        Key Performance Indicators
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px'
      }}>
        {kpiMetrics.map((kpi) => {
          const value = typeof kpi.getValue === 'function' ? kpi.getValue(data) : kpi.getValue;
          const percentage = typeof kpi.getPercentage === 'function' ? kpi.getPercentage(data) : null;
          const subtext = typeof kpi.getSubtext === 'function' ? kpi.getSubtext(data) : kpi.getSubtext;

          return (
            <div
              key={kpi.id}
              style={{
                textAlign: 'center',
                padding: '16px',
                border: '1px solid #f1f5f9',
                backgroundColor: '#f8fafc'
              }}
            >
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                color: kpi.color,
                marginBottom: '4px'
              }}>
                {typeof value === 'number' && value > 999 ? value.toLocaleString() : value}
                {percentage !== null && subtext !== '%' && (
                  <span style={{ fontSize: '18px', marginLeft: '4px' }}>
                    ({percentage}%)
                  </span>
                )}
                {subtext === '%' && (
                  <span style={{ fontSize: '18px' }}>%</span>
                )}
              </div>
              
              <div style={{
                fontSize: '14px',
                color: '#64748b',
                fontWeight: '500'
              }}>
                {kpi.title}
                {subtext && subtext !== '%' && (
                  <span style={{ marginLeft: '4px' }}>{subtext}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KPISection;
