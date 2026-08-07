"use client";

import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

import { Column } from "./types";

interface Props<T> {
  columns: Column<T>[];
  sortKey: string | null;
  sortDirection: "asc" | "desc";
  onSort: (key: string) => void;
}

export default function TableHeader<T>({
  columns,
  sortKey,
  sortDirection,
  onSort,
}: Props<T>) {
  return (
    <thead className="bg-white">
      <tr className="border-b border-slate-200">
        {columns.map((column) => {
          const active = sortKey === String(column.key);

          return (
            <th
              key={String(column.key)}
              style={{ width: column?.width }}
              className={`
    px-6
    py-4
    text-left
    text-xs
    font-semibold
    uppercase
    tracking-wider
    text-slate-500
    whitespace-nowrap
    ${column?.headerClassName ?? ""}
  `}
            >
              {column.sortable ? (
                <button
                  type="button"
                  onClick={() => onSort(String(column.key))}
                  className="
                    flex
                    items-center
                    gap-2
                    transition-colors
                    hover:text-slate-900
                  "
                >
                  <span>{column.title}</span>

                  {!active && (
                    <ArrowUpDown size={14} className="text-slate-400" />
                  )}

                  {active && sortDirection === "asc" && (
                    <ArrowUp size={14} className="text-blue-600" />
                  )}

                  {active && sortDirection === "desc" && (
                    <ArrowDown size={14} className="text-blue-600" />
                  )}
                </button>
              ) : (
                column.title
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
