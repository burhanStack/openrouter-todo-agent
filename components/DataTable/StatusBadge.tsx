"use client";

interface StatusBadgeProps {
  status: string;
}

const variants: Record<
  string,
  {
    bg: string;
    text: string;
    dot: string;
  }
> = {
  Active: {
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-500",
  },

  Inactive: {
    bg: "bg-red-100",
    text: "text-red-700",
    dot: "bg-red-500",
  },

  Pending: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    dot: "bg-yellow-500",
  },

  Cancelled: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    dot: "bg-gray-500",
  },

  Paid: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const variant =
    variants[status] ?? {
      bg: "bg-slate-100",
      text: "text-slate-700",
      dot: "bg-slate-500",
    };

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${variant.bg}
        ${variant.text}
      `}
    >
      <span
        className={`
          h-2
          w-2
          rounded-full
          ${variant.dot}
        `}
      />

      {status}
    </span>
  );
}