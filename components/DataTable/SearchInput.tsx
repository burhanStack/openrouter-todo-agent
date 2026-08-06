"use client";

import { useEffect, useState } from "react";

interface SearchInputProps {
  onSearch: (value: string) => void;
}

export default function SearchInput({
  onSearch,
}: SearchInputProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="border rounded-md px-3 py-2 w-80"
    />
  );
}