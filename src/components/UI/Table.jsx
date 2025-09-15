// Table Component - Laravel-admin style data table
import React from 'react';

/**
 * Table Component - Professional Hospital Data Grid
 * 
 * Features:
 * - Clinical data presentation
 * - Geometric grid design
 * - Professional typography
 * - Hospital-grade interaction states
 */
export default function Table({ 
    columns = [],
    data = [],
    pagination = null,
    selectable = false,
    striped = true,
    bordered = true,
    hover = true,
    size = 'default',
    className = '',
    style = {},
    onRowSelect,
    onSort,
    currentSort = null,
    ...props 
}) {
    const sizes = {
        sm: { padding: '6px 8px', fontSize: '11px' },
        default: { padding: '8px 10px', fontSize: '12px' },
        lg: { padding: '10px 12px', fontSize: '13px' }
    };

    const sizeStyle = sizes[size] || sizes.default;

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: sizeStyle.fontSize,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#fdfdfd',
        border: bordered ? '1px solid #e0e0e0' : 'none',
        borderRadius: '0', // Perfectly square
        ...style
    };

    const theadStyle = {
        backgroundColor: '#f0f0f0',
        borderBottom: '2px solid #d0d0d0'
    };

    const thStyle = {
        padding: sizeStyle.padding,
        textAlign: 'left',
        fontWeight: '600',
        color: '#1a1a1a',
        borderRight: bordered ? '1px solid #e0e0e0' : 'none',
        borderBottom: '1px solid #d0d0d0',
        letterSpacing: '-0.01em',
        textTransform: 'uppercase',
        fontSize: '11px'
    };

    const tbodyStyle = {
        backgroundColor: '#fdfdfd'
    };

    const tdStyle = {
        padding: sizeStyle.padding,
        color: '#2c2c2c',
        borderRight: bordered ? '1px solid #e8e8e8' : 'none',
        borderBottom: '1px solid #e8e8e8',
        verticalAlign: 'middle',
        fontWeight: '400'
    };

    const rowStyle = (index) => ({
        backgroundColor: striped && index % 2 === 1 ? '#f8f8f8' : '#fdfdfd'
    });

    const hoverStyle = {
        backgroundColor: hover ? '#f0f0f0' : 'inherit'
    };

    const checkboxStyle = {
        width: '14px',
        height: '14px',
        margin: '0',
        accentColor: '#2563eb'
    };

    const sortableStyle = {
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative'
    };

    const sortIconStyle = {
        marginLeft: '4px',
        fontSize: '10px',
        color: '#666666',
        fontWeight: '400'
    };

    const renderCell = (row, column, rowIndex) => {
        if (column.render) {
            return column.render(row, rowIndex);
        }
        return row[column.key] || row[column.title] || '';
    };

    const handleSort = (column) => {
        if (column.sortable && onSort) {
            onSort(column.key || column.title);
        }
    };

    const getSortIcon = (column) => {
        if (!column.sortable || !currentSort) {
            return column.sortable ? <span style={sortIconStyle}>↕</span> : null;
        }
        
        const columnKey = column.key || column.title;
        if (currentSort.field !== columnKey) {
            return <span style={sortIconStyle}>↕</span>;
        }
        
        return (
            <span style={{...sortIconStyle, color: '#2563eb'}}>
                {currentSort.direction === 'asc' ? '↑' : '↓'}
            </span>
        );
    };

    const Pagination = ({ pagination }) => {
        if (!pagination || pagination.total <= pagination.per_page) return null;

        const { current_page, last_page, from, to, total } = pagination;
        
        const getPageNumbers = () => {
            const pages = [];
            const maxVisible = 5;
            
            let start = Math.max(1, current_page - Math.floor(maxVisible / 2));
            let end = Math.min(last_page, start + maxVisible - 1);
            
            if (end - start + 1 < maxVisible) {
                start = Math.max(1, end - maxVisible + 1);
            }
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            
            return pages;
        };

        const navigateToPage = (page) => {
            if (page < 1 || page > last_page || page === current_page) return;
            
            const url = new URL(window.location);
            url.searchParams.set('page', page);
            window.location.href = url.toString();
        };

        const paginationContainerStyle = {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            borderTop: '1px solid #e0e0e0',
            backgroundColor: '#f8f8f8',
            fontSize: '12px'
        };

        const paginationInfoStyle = {
            color: '#666666',
            fontWeight: '400'
        };

        const paginationButtonsStyle = {
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
        };

        const buttonStyle = {
            padding: '6px 12px',
            fontSize: '11px',
            fontWeight: '500',
            border: '1px solid #d0d0d0',
            backgroundColor: '#ffffff',
            color: '#333333',
            cursor: 'pointer',
            borderRadius: '0',
            outline: 'none'
        };

        const activeButtonStyle = {
            ...buttonStyle,
            backgroundColor: '#2563eb',
            color: '#ffffff',
            borderColor: '#2563eb'
        };

        const disabledButtonStyle = {
            ...buttonStyle,
            opacity: '0.5',
            cursor: 'not-allowed'
        };

        return (
            <div style={paginationContainerStyle}>
                <div style={paginationInfoStyle}>
                    Showing {from} to {to} of {total} results
                </div>
                
                <div style={paginationButtonsStyle}>
                    <button
                        onClick={() => navigateToPage(current_page - 1)}
                        disabled={current_page <= 1}
                        style={current_page <= 1 ? disabledButtonStyle : buttonStyle}
                    >
                        Previous
                    </button>
                    
                    {getPageNumbers().map(page => (
                        <button
                            key={page}
                            onClick={() => navigateToPage(page)}
                            style={page === current_page ? activeButtonStyle : buttonStyle}
                        >
                            {page}
                        </button>
                    ))}
                    
                    <button
                        onClick={() => navigateToPage(current_page + 1)}
                        disabled={current_page >= last_page}
                        style={current_page >= last_page ? disabledButtonStyle : buttonStyle}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    };

    const handleRowSelect = (row, index, selected) => {
        if (onRowSelect) {
            onRowSelect(row, index, selected);
        }
    };

    return (
        <div className={`table-container ${className}`}>
            <table style={tableStyle} {...props}>
                <thead style={theadStyle}>
                    <tr>
                        {selectable && (
                            <th style={{ ...thStyle, width: '40px' }}>
                                <input 
                                    type="checkbox" 
                                    style={checkboxStyle}
                                    onChange={(e) => {
                                        // Handle select all logic
                                        const checked = e.target.checked;
                                        data.forEach((row, index) => {
                                            handleRowSelect(row, index, checked);
                                        });
                                    }}
                                />
                            </th>
                        )}
                        {columns.map((column, index) => (
                            <th 
                                key={index}
                                style={{
                                    ...thStyle,
                                    ...(column.sortable ? sortableStyle : {}),
                                    width: column.width || 'auto'
                                }}
                                onClick={() => handleSort(column)}
                            >
                                {column.title || column.header}
                                {getSortIcon(column)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody style={tbodyStyle}>
                    {data.map((row, rowIndex) => (
                        <tr 
                            key={rowIndex}
                            style={rowStyle(rowIndex)}
                            onMouseEnter={(e) => {
                                if (hover) {
                                    e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (hover) {
                                    e.currentTarget.style.backgroundColor = rowStyle(rowIndex).backgroundColor;
                                }
                            }}
                        >
                            {selectable && (
                                <td style={tdStyle}>
                                    <input 
                                        type="checkbox" 
                                        style={checkboxStyle}
                                        onChange={(e) => handleRowSelect(row, rowIndex, e.target.checked)}
                                    />
                                </td>
                            )}
                            {columns.map((column, colIndex) => (
                                <td 
                                    key={colIndex}
                                    style={{
                                        ...tdStyle,
                                        textAlign: column.align || 'left'
                                    }}
                                >
                                    {renderCell(row, column, rowIndex)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {data.length === 0 && (
                <div style={{ 
                    padding: '20px', 
                    textAlign: 'center', 
                    color: '#666666',
                    fontSize: '14px' 
                }}>
                    No data available
                </div>
            )}
            
            {pagination && <Pagination pagination={pagination} />}
        </div>
    );
}
