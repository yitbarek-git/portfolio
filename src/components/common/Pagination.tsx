import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  return (
    <nav className={`flex items-center justify-center gap-2 mt-8 select-none ${className}`} aria-label="Pagination Navigation">
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        leftIcon={<ChevronLeft className="w-4 h-4" />}
        aria-label="Previous Page"
      >
        Prev
      </Button>

      <div className="flex items-center gap-1 font-mono text-xs text-[var(--color-muted)] px-3">
        <span className="text-[var(--color-text)] font-semibold">{currentPage}</span>
        <span>/</span>
        <span>{totalPages}</span>
      </div>

      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        rightIcon={<ChevronRight className="w-4 h-4" />}
        aria-label="Next Page"
      >
        Next
      </Button>
    </nav>
  );
};
