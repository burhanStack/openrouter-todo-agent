"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { generatePagination } from "./utils/pagination";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;

  onNext: () => void;
  onPrevious: () => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function Pagination({
  page,
  pageSize,
  totalPages,
  totalItems,
  onNext,
  onPrevious,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const pages = generatePagination(
    page,
    totalPages
  );

  const from =
    totalItems === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const to = Math.min(
    page * pageSize,
    totalItems
  );

  return (
    <div
      className="
        flex
        flex-col
        gap-4
        border-t
        border-slate-200
        bg-white
        px-6
        py-4
        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      {/* Left */}

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500">
          Rows per page
        </span>

        <select
          value={pageSize}
          onChange={(e) =>
            onPageSizeChange(
              Number(e.target.value)
            )
          }
          className="
            rounded-md
            border
            border-slate-300
            px-3
            py-1.5
            text-sm
            outline-none
            focus:border-blue-500
          "
        >
          {[10, 20, 50, 100].map((size) => (
            <option
              key={size}
              value={size}
            >
              {size}
            </option>
          ))}
        </select>

        <span className="text-sm text-slate-500">
          Showing {from}-{to} of {totalItems}
        </span>
      </div>

      {/* Right */}

      <div className="flex items-center gap-1">
        <button
          onClick={onPrevious}
          disabled={page === 1}
          className="
            rounded-md
            p-2
            transition
            hover:bg-slate-100
            disabled:opacity-40
            cursor-pointer
          "
        >
          <ChevronLeft size={18} />
        </button>

        {pages.map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-slate-400"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={`${item}-${index}`}
              onClick={() => onPageChange(item)}
              className={`
                h-9
                w-9
                rounded-md
                text-sm
                transition
                cursor-pointer
                ${
                  item === page
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-100"
                }
              `}
            >
              {item}
            </button>
          );
        })}

        <button
          onClick={onNext}
          disabled={page === totalPages}
          className="
            rounded-md
            p-2
            transition
            hover:bg-slate-100
            disabled:opacity-40
            cursor-pointer
          "
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}