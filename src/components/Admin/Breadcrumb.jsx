import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items = [] }) => {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    
                    return (
                        <li key={item.id || index} className="inline-flex items-center">
                            {index > 0 && (
                                <i className="fas fa-chevron-right text-gray-400 text-xs mx-2" />
                            )}
                            
                            {isLast ? (
                                <span className="text-sm font-medium text-gray-500 truncate">
                                    {item.title}
                                </span>
                            ) : (
                                <Link
                                    to={item.uri || '#'}
                                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                                >
                                    {item.icon && (
                                        <i className={`${item.icon} mr-2 text-gray-400`} />
                                    )}
                                    {item.title}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
