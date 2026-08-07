import { ReactNode } from "react";

export interface Column<T> {
  key: keyof T | string;
  title: string;

  render?: (row: T) => ReactNode;

  width?: number | string;

  headerClassName?: string;

  cellClassName?: string;

  searchable?: boolean;

  sortable?: boolean;

  sortAccessor?: (row: T) => string | number | Date;
}

export interface DataTableProps<T> {
  data: T[];

  columns: Column<T>[];

  /**
   * Unique identifier for each row.
   *
   * Example:
   * rowKey="id"
   *
   * or
   *
   * rowKey={(row) => row.employeeId}
   */
  rowKey?: keyof T | ((row: T) => string | number);

  searchable?: boolean;

  loading?: boolean;
}
