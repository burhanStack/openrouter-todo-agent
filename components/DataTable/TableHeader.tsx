"use client";

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
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={String(column.key)}
            className="border p-3"
          >
            <button
              type="button"
              disabled={!column.sortable}
              onClick={() =>
                column.sortable &&
                onSort(String(column.key))
              }
              className="flex items-center gap-2"
            >
              {column.title}

              {column.sortable &&
                sortKey === String(column.key) &&
                (sortDirection === "asc"
                  ? "▲"
                  : "▼")}
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
}