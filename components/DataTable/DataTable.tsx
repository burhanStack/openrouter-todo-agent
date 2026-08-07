"use client";

import SearchInput from "./SearchInput";
import Pagination from "./Pagination";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import { useDataTable } from "./hooks/useDataTable";
import { DataTableProps } from "./types";
import DataTableCard from "./DataTableCard";

export default function DataTable<T>({
  data,
  columns,
  rowKey,
  loading = false,
  searchable = true,
}: DataTableProps<T>) {
  const table = useDataTable({
    data,
    columns,
  });

  if (loading) return <LoadingState />;

  return (
    <DataTableCard>
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-200
          p-5
        "
      >
        <SearchInput onSearch={table.setSearch} />
      </div>

      <div className="overflow-x-auto">
        <table
          className="
            min-w-full
            border-collapse
          "
        >
          <TableHeader
            columns={columns}
            sortKey={table.sortKey}
            sortDirection={table.sortDirection}
            onSort={table.handleSort}
          />

          <tbody>
            {table.rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState />
                </td>
              </tr>
            ) : (
              <TableBody rows={table.rows} columns={columns} rowKey={rowKey} />
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={table.page}
        totalPages={table.totalPages}
        pageSize={table.pageSize}
        totalItems={table.totalItems}
        onNext={table.nextPage}
        onPrevious={table.previousPage}
        onPageChange={table.goToPage}
        onPageSizeChange={table.setPageSize}
      />
    </DataTableCard>
  );
}
