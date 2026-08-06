import { Key } from "react";

export function getRowKey<T>(
  row: T,
  index: number,
  rowKey?: keyof T | ((row: T) => Key)
): Key {
  if (!rowKey) return index;

  if (typeof rowKey === "function") {
    return rowKey(row);
  }

  return row[rowKey] as Key;
}