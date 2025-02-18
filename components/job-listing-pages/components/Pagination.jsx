import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5; // Number of page numbers to show
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page if not included
    if (startPage > 1) {
      items.push(
        <li key={1}>
          <span onClick={() => onPageChange(1)}>1</span>
        </li>
      );
      if (startPage > 2) {
        items.push(
          <li key="ellipsis1" className="disabled">
            <span>...</span>
          </li>
        );
      }
    }

    // Add page numbers
    for (let page = startPage; page <= endPage; page++) {
      const isCurrentPage = page === currentPage;
      items.push(
        <li key={page}>
          <span 
            className={isCurrentPage ? "current-page" : ""} 
            onClick={() => !isCurrentPage && onPageChange(page)}
          >
            {page}
          </span>
        </li>
      );
    }

    // Add last page if not included
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <li key="ellipsis2" className="disabled">
            <span>...</span>
          </li>
        );
      }
      items.push(
        <li key={totalPages}>
          <span onClick={() => onPageChange(totalPages)}>{totalPages}</span>
        </li>
      );
    }

    return items;
  };

  return (
    <nav className="ls-pagination">
      <ul>
        <li className={`prev ${currentPage === 1 ? 'disabled' : ''}`}>
          <span onClick={handlePrevClick}>
            <i className="fa fa-arrow-left"></i>
          </span>
        </li>
        {renderPaginationItems()}
        <li className={`next ${currentPage === totalPages ? 'disabled' : ''}`}>
          <span onClick={handleNextClick}>
            <i className="fa fa-arrow-right"></i>
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;