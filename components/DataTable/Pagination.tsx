"use client";

import { generatePagination } from "./utils/pagination";

interface PaginationProps {
  page: number;

  totalPages: number;

  totalItems: number;

  pageSize: number;

  onNext: () => void;

  onPrevious: () => void;

  onPageChange: (page: number) => void;

  onPageSizeChange: (size: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onNext,
  onPrevious,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const pages = generatePagination(page, totalPages);
  return (
    <div className="flex items-center justify-between mt-6">
      <div>
        Showing {(page - 1) * pageSize + 1}
        {" - "}
        {Math.min(page * pageSize, totalItems)}
        {" of "}
        {totalItems}
      </div>

      <div className="flex items-center gap-2">
        <button onClick={onPrevious} disabled={page === 1}>
          Previous
        </button>

        {pages.map((item, index) => {
          if (item === "...") {
            return <span  key={`ellipsis-${index}`}>...</span>;
          }

          return (
            <button
              key={`${item}-${index}`}
              onClick={() => onPageChange(item)}
              className={item === page ? "font-bold" : ""}
            >
              {item}
            </button>
          );
        })}

        <button onClick={onNext} disabled={page === totalPages}>
          Next
        </button>
      </div>

      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        <option>10</option>
        <option>20</option>
        <option>50</option>
        <option>100</option>
      </select>
    </div>
  );
}
