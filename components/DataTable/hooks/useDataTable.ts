"use client";

import { useMemo, useState, useEffect } from "react";
import { Column } from "../types";
import { usePagination } from "./usePagination";
import { useSearch } from "./useSearch";
import { useSorting } from "./useSorting";

interface UseDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function useDataTable<T>({
  data,
  columns,
}: UseDataTableProps<T>) {
  const search = useSearch({
    data,
    columns,
  });

  const sorting = useSorting({
    data: search.filteredData,
    columns,
  });

  const pagination = usePagination({
    data: sorting.sortedData,
  });

  useEffect(() => {
    pagination.resetPage();
  }, [
    search.search,
    sorting.sortKey,
    sorting.sortDirection,
  ]);

  return {

    ...search,
    ...sorting,
    ...pagination,
  };
}