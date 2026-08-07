"use client";

import { Search } from "lucide-react";
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
    <div className="relative w-full max-w-sm">
      <Search
        size={18}
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-slate-400
          pointer-events-none
        "
      />

      <input
        type="text"
        value={value}
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
        className="
          h-10
          w-full
          rounded-lg
          border
          border-slate-300
          bg-white
          pl-10
          pr-4
          text-sm
          text-slate-700
          placeholder:text-slate-400
          outline-none
          transition-all
          duration-200
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
        "
      />
    </div>
  );
}