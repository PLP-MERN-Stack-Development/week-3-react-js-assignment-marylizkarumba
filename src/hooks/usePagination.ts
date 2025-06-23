
import { useState } from 'react';

interface UsePaginationProps {
  initialPage?: number;
  itemsPerPage?: number;
}

export const usePagination = ({ initialPage = 1, itemsPerPage = 10 }: UsePaginationProps = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const reset = () => {
    setCurrentPage(initialPage);
  };

  return {
    currentPage,
    totalPages,
    totalItems,
    hasNextPage,
    hasPrevPage,
    itemsPerPage,
    goToPage,
    nextPage,
    prevPage,
    reset,
    setTotalItems
  };
};
