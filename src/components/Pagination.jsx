import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            currentPage === page
              ? 'bg-primary text-white'
              : 'bg-white text-text-primary hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
