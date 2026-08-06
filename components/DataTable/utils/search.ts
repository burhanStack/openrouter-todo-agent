import { Column } from "../types";
import { getValue } from "./getValue";

export function filterRows<T>(
  rows: T[],
  columns: Column<T>[],
  search: string
): T[] {
  if (!search.trim()) {
    return rows;
  }

  const query = search.toLowerCase();

  return rows.filter((row) =>
    columns
      .filter((column) => column.searchable)
      .some((column) => {
        const value = getValue(
          row,
          String(column.key)
        );

        return String(value ?? "")
          .toLowerCase()
          .includes(query);
      })
  );
}