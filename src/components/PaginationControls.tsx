import React from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  onPageChange: (page: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  hasPrevious,
  hasNext,
  onPageChange,
}) => {
  return (
    <div className="flex gap-2 items-center mt-4 justify-end">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 }
        className="px-3 py-1 bg-gray-300 hover:bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
      >
        <MdKeyboardDoubleArrowRight />
      </button>

      <span className="text-sm">
        الصفحة {currentPage} من {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="px-3 py-1 bg-gray-300 hover:bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
      >
        <MdKeyboardDoubleArrowLeft />
      </button>
    </div>
  );
};
