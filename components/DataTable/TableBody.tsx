"use client";

import { Column } from "./types";
import { getRowKey } from "./utils/getRowKey";
import { getValue } from "./utils/getValue";

interface Props<T> {
  rows: T[];

  columns: Column<T>[];

  rowKey?: keyof T | ((row: T) => string | number);
}

export default function TableBody<T>({
  rows,
  columns,
  rowKey,
}: Props<T>) {

 

  
  return (
    <tbody>
      {rows.map((row, index) => (
        <tr key={getRowKey(row, index, rowKey)}>
          {columns.map((column) => (
            <td
              key={String(column.key)}
              className="border p-3"
            >
              {column.render
                ? column.render(row)
                : String(
                    getValue(
                      row,
                      String(column.key)
                    ) ?? ""
                  )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}