"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function DataTableCard({
  children,
}: Props) {
  return (
    <div
      className="
      w-full
      rounded-2xl
      border
      border-slate-200
      bg-white
      shadow-sm shadow-slate-200/50
      overflow-hidden
      "
    >
      {children}
    </div>
  );
}