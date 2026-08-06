"use client";

import SearchInput from "./SearchInput";
import Pagination from "./Pagination";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import { useDataTable } from "./hooks/useDataTable";
import { DataTableProps } from "./types";

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

  if (loading)
    return <LoadingState />;

  return (
    <div className="space-y-4">

      {
    searchable && (
        <SearchInput
            onSearch={table.setSearch}
        />
    )
}

      <table className="w-full">

        <TableHeader
          columns={columns}
          sortKey={table.sortKey}
          sortDirection={table.sortDirection}
          onSort={table.handleSort}
        />

        <TableBody
    rows={table.rows}
    columns={columns}
    rowKey={rowKey}
/>

      </table>

      {table.rows.length === 0 && (
        <EmptyState />
      )}

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

    </div>
  );
}