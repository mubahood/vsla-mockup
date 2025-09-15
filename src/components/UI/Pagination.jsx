// Pagination Component - Laravel-admin style pagination
import React from 'react';
import Button from './Button';

/**
 * Pagination Component
 * 
 * Features:
 * - Previous/Next navigation
 * - Page number display
 * - Configurable page size
 * - Total records display
 * - Minimalistic design
 */
export default function Pagination({ 
    currentPage = 1,
    totalPages = 1,
    totalRecords = 0,
    pageSize = 10,
    onPageChange,
    showInfo = true,
    size = 'default',
    className = '',
    style = {},
    ...props 
}) {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0',
        fontSize: '14px',
        gap: '8px',
        flexWrap: 'wrap',
        ...style
    };

    const paginationStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '2px'
    };

    const infoStyle = {
        fontSize: '13px',
        color: '#666666'
    };

    const pageButtonStyle = {
        minWidth: '32px',
        height: '32px',
        padding: '0',
        fontSize: '13px'
    };

    const activePageStyle = {
        ...pageButtonStyle,
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        color: '#ffffff'
    };

    // Calculate visible page numbers
    const getVisiblePages = () => {
        const delta = 2; // Number of pages to show around current page
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, currentPage - delta); 
             i <= Math.min(totalPages - 1, currentPage + delta); 
             i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    const handlePageChange = (page) => {
        if (page !== currentPage && page >= 1 && page <= totalPages && onPageChange) {
            onPageChange(page);
        }
    };

    const visiblePages = getVisiblePages();
    const startRecord = ((currentPage - 1) * pageSize) + 1;
    const endRecord = Math.min(currentPage * pageSize, totalRecords);

    return (
        <div 
            className={`pagination-container ${className}`}
            style={containerStyle}
            {...props}
        >
            {showInfo && (
                <div style={infoStyle}>
                    Showing {startRecord} to {endRecord} of {totalRecords} entries
                </div>
            )}
            
            <div style={paginationStyle}>
                <Button
                    variant="default"
                    size={size}
                    style={pageButtonStyle}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    ‹
                </Button>
                
                {visiblePages.map((page, index) => (
                    page === '...' ? (
                        <span 
                            key={index}
                            style={{ 
                                padding: '8px 4px',
                                fontSize: '13px',
                                color: '#666666'
                            }}
                        >
                            ...
                        </span>
                    ) : (
                        <Button
                            key={index}
                            variant={page === currentPage ? 'primary' : 'default'}
                            size={size}
                            style={page === currentPage ? activePageStyle : pageButtonStyle}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </Button>
                    )
                ))}
                
                <Button
                    variant="default"
                    size={size}
                    style={pageButtonStyle}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    ›
                </Button>
            </div>
        </div>
    );
}
