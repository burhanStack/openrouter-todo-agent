"use client";

import { useMemo, useState } from "react";
import Sidebar, { TableType } from "./Sidebar";

import { DataTable } from "@/components/DataTable";

import { students, studentColumns } from "./data/students";

import { employees, employeeColumns } from "./data/employees";

import { orders, orderColumns } from "./data/orders";

import { departments, departmentColumns } from "./data/departments";

export default function Page() {
  const [selected, setSelected] = useState<TableType>("students");

  return (
    <div className="flex min-h-screen">
      <Sidebar selected={selected} onChange={setSelected} />
      <main className="flex-1 p-6">
        <div className="bg-slate-50 min-h-screen p-8">
          {selected === "students" && (
            <DataTable
              data={students}
              columns={studentColumns}
              rowKey={(row) => crypto.randomUUID()}
            />
          )}

          {selected === "employees" && (
            <DataTable
              data={employees}
              columns={employeeColumns}
              rowKey={(row) => crypto.randomUUID()}
            />
          )}

          {selected === "orders" && (
            <DataTable
              data={orders}
              columns={orderColumns}
              rowKey={(row) => crypto.randomUUID()}
            />
          )}

          {selected === "departments" && (
            <DataTable
              data={departments}
              columns={departmentColumns}
              rowKey={(row) => crypto.randomUUID()}
            />
          )}
        </div>
      </main>
    </div>
  );
}
