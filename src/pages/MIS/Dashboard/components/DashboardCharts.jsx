import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

/**
 * Dashboard Charts Component
 * Renders various chart types following design system guidelines
 */

const DashboardCharts = ({ data, config }) => {
  const renderChart = (chartConfig) => {
    const chartData = data[chartConfig.data];
    
    if (!chartData || !Array.isArray(chartData)) {
      return (
        <div style={{ 
          height: chartConfig.height, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#64748b',
          fontSize: '14px'
        }}>
          No data available
        </div>
      );
    }

    switch (chartConfig.type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={chartConfig.height}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="none" stroke="#e2e8f0" />
              <XAxis 
                dataKey={chartConfig.xAxis} 
                fontSize={12}
                stroke="#64748b"
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                fontSize={12}
                stroke="#64748b"
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0',
                  fontSize: '12px'
                }}
              />
              <Legend />
              {chartConfig.lines?.map((line, index) => (
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  stroke={line.color}
                  name={line.name}
                  strokeWidth={2}
                  dot={{ fill: line.color, strokeWidth: 0, r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={chartConfig.height}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="none" stroke="#e2e8f0" />
              <XAxis 
                dataKey={chartConfig.xAxis}
                fontSize={12}
                stroke="#64748b"
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                fontSize={12}
                stroke="#64748b"
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0',
                  fontSize: '12px'
                }}
              />
              <Legend />
              {chartConfig.bars?.map((bar, index) => (
                <Bar
                  key={bar.key}
                  dataKey={bar.key}
                  fill={bar.color}
                  name={bar.name}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={chartConfig.height}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelStyle={{ fontSize: '12px' }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartConfig.colors[index % chartConfig.colors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={chartConfig.height}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="none" stroke="#e2e8f0" />
              <XAxis 
                dataKey={chartConfig.xAxis}
                fontSize={12}
                stroke="#64748b"
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                fontSize={12}
                stroke="#64748b"
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0',
                  fontSize: '12px'
                }}
                formatter={(value) => [formatCurrency(value), chartConfig.area.name]}
              />
              <Area
                type="monotone"
                dataKey={chartConfig.area.key}
                stroke={chartConfig.area.color}
                fill={chartConfig.area.color}
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return <div>Unsupported chart type: {chartConfig.type}</div>;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '16px',
      marginTop: '24px'
    }}>
      {config.map((chartConfig) => (
        <div
          key={chartConfig.id}
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            padding: '16px'
          }}
        >
          <h3 style={{
            margin: '0 0 16px 0',
            fontSize: '16px',
            fontWeight: '600',
            color: '#1e293b'
          }}>
            {chartConfig.title}
          </h3>
          {renderChart(chartConfig)}
        </div>
      ))}
    </div>
  );
};

export default DashboardCharts;
