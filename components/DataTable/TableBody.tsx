"use client";

import { Column } from "./types";
import { getRowKey } from "./utils/getRowKey";
import { getValue } from "./utils/getValue";

interface Props<T> {
  rows: T[];

  columns: Column<T>[];

  rowKey?: keyof T | ((row: T) => string | number);
}

export default function TableBody<T>({ rows, columns, rowKey }: Props<T>) {
  return (
    <>
      {rows.map((row, index) => (
        <tr
          key={getRowKey(row, index, rowKey)}
          className="
            border-b
            border-slate-100
            transition-colors
            hover:bg-slate-50
          "
        >
          {columns.map((column) => (
            <td
              key={String(column.key)}
              className={`
                px-6
                py-4
                align-middle
                text-sm
                text-slate-700
                whitespace-nowrap
                ${column.cellClassName ?? ""}
              `}
            >
              {column.render
                ? column.render(row)
                : String(getValue(row, String(column.key)) ?? "")}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
