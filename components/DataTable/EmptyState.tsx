"use client";

import { FileSearch } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "No records found",
  description = "There are no records to display. Try adjusting your search.",
}: EmptyStateProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        px-6
        py-16
        text-center
      "
    >
      <div
        className="
          mb-4
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-slate-100
        "
      >
        <FileSearch
          size={32}
          className="text-slate-400"
        />
      </div>

      <h3
        className="
          text-lg
          font-semibold
          text-slate-900
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          max-w-sm
          text-sm
          leading-6
          text-slate-500
        "
      >
        {description}
      </p>
    </div>
  );
}