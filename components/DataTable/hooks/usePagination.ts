"use client";

import { useMemo, useState, useEffect } from "react";

interface UsePaginationProps<T> {
  data: T[];
  initialPageSize?: number;
}

export function usePagination<T>({
  data,
  initialPageSize = 10,
}: UsePaginationProps<T>) {
  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalItems = data.length;

  useEffect(() => {
    //setPage(1);
}, [pageSize]);

  const totalPages = useMemo(() => {
  return Math.max(
    1,
    Math.ceil(data.length / pageSize)
  );
}, [data.length, pageSize]);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return data.slice(start, end);
  }, [data, page, pageSize]);

  function nextPage() {
    setPage((p) => Math.min(p + 1, totalPages));
  }

  function previousPage() {
    setPage((p) => Math.max(1, p - 1));
  }

  function goToPage(pageNumber: number) {
    setPage(Math.min(Math.max(pageNumber, 1), totalPages));
  }

  function resetPage() {
    setPage(1);
}

  return {
    rows: paginatedRows,

    page,
    pageSize,

    totalItems,
    totalPages,

    setPage,
    setPageSize,

    nextPage,
    previousPage,
    goToPage,
    resetPage
  };
}