"use client";

export type TableType =
  | "students"
  | "employees"
  | "orders"
  | "departments";

interface SidebarProps {
  selected: TableType;
  onChange: (value: TableType) => void;
}

const menus: {
  label: string;
  value: TableType;
}[] = [
  {
    label: "📚 Students",
    value: "students",
  },
  {
    label: "👨 Employees",
    value: "employees",
  },
  {
    label: "📦 Orders",
    value: "orders",
  },
  {
    label: "🏢 Departments",
    value: "departments",
  },
];

export default function Sidebar({
  selected,
  onChange,
}: SidebarProps) {
  return (
    <aside className="w-64 border-r bg-gray-50 p-4">
      <h2 className="mb-6 text-lg font-bold">
        Data Sets
      </h2>

      <div className="space-y-2">
        {menus.map((menu) => (
          <button
            key={menu.value}
            onClick={() => onChange(menu.value)}
            className={`w-full rounded-md px-4 py-2 text-left transition ${
              selected === menu.value
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {menu.label}
          </button>
        ))}
      </div>
    </aside>
  );
}