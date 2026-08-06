"use client";

import { useMemo, useState } from "react";
import { Column } from "../types";
import { getValue } from "../utils";

interface Props<T> {
  data: T[];
  columns: Column<T>[];
}

export function useSorting<T>({
  data,
  columns,
}: Props<T>) {
  const [sortKey, setSortKey] =
    useState<string | null>(null);

  const [sortDirection, setSortDirection] =
    useState<"asc" | "desc">("asc");

  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    const column = columns.find(
      (c) => String(c.key) === sortKey
    );

    if (!column) return data;

    return [...data].sort((a, b) => {
      let aValue = column.sortAccessor
        ? column.sortAccessor(a)
        : getValue(a, sortKey);

      let bValue = column.sortAccessor
        ? column.sortAccessor(b)
        : getValue(b, sortKey);

      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (aValue instanceof Date)
        aValue = aValue.getTime();

      if (bValue instanceof Date)
        bValue = bValue.getTime();

      if (
        typeof aValue === "number" &&
        typeof bValue === "number"
      ) {
        return sortDirection === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      const result = String(aValue).localeCompare(
        String(bValue),
        undefined,
        {
          numeric: true,
          sensitivity: "base",
        }
      );

      return sortDirection === "asc"
        ? result
        : -result;
    });
  }, [data, columns, sortKey, sortDirection]);

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDirection((prev) =>
        prev === "asc" ? "desc" : "asc"
      );
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  return {
    sortedData,

    sortKey,
    sortDirection,

    handleSort,
  };
}