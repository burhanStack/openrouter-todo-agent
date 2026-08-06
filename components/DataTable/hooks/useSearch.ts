"use client";

import { useMemo, useState } from "react";
import { Column } from "../types";
import { getValue } from "../utils";
import { filterRows } from "../utils/search";

interface Props<T> {
  data: T[];
  columns: Column<T>[];
}

export function useSearch<T>({
  data,
  columns,
}: Props<T>) {
  const [search, setSearch] = useState("");

  /* const filteredData = useMemo(() => {
    if (!search.trim()) return data;

    const query = search.toLowerCase();

    return data.filter((row) =>
      columns
        .filter((c) => c.searchable)
        .some((c) => {
          const value = getValue(row, String(c.key));

          return String(value ?? "")
            .toLowerCase()
            .includes(query);
        })
    );
  }, [search, data, columns]); */

  const filteredData = useMemo(
  () => filterRows(data, columns, search),
  [data, columns, search]
);

  return {
    search,
    setSearch,
    filteredData,
  };
}