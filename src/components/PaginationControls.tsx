import React from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export interface PaginationControlsProps {
  CurrentPage: number;
  TotalPages: number;
  HasPrivous: boolean;
  HasNext: boolean;
  onPageChange: (page: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  CurrentPage,
  TotalPages,
  HasNext,
  onPageChange,
}) => {
  return (
    <div className="flex gap-2 items-center mt-4 justify-end ml-3">
      <button
        onClick={() => onPageChange(CurrentPage - 1)}
        disabled={CurrentPage <= 1 }
        className="px-3 py-1 bg-gray-300 hover:bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
      >
        <MdKeyboardDoubleArrowRight />
      </button>

      <span className="text-sm">
        الصفحة {CurrentPage} من {TotalPages}
      </span>

      <button
        onClick={() => onPageChange(CurrentPage + 1)}
        disabled={!HasNext}
        className="px-3 py-1 bg-gray-300 hover:bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
      >
        <MdKeyboardDoubleArrowLeft />
      </button>
    </div>
  );
};
