export function compareValues(
  aValue: unknown,
  bValue: unknown,
  direction: "asc" | "desc"
): number {
  if (aValue == null && bValue == null) return 0;
  if (aValue == null) return 1;
  if (bValue == null) return -1;

  if (aValue instanceof Date) {
    aValue = aValue.getTime();
  }

  if (bValue instanceof Date) {
    bValue = bValue.getTime();
  }

  if (
    typeof aValue === "number" &&
    typeof bValue === "number"
  ) {
    return direction === "asc"
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

  return direction === "asc"
    ? result
    : -result;
}