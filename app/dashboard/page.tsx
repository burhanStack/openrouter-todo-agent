"use client";

import { useMemo, useState } from "react";
import Sidebar, { TableType } from "./Sidebar";

import { DataTable } from "@/components/DataTable";

import {
  students,
  studentColumns,
} from "./data/students";

import {
  employees,
  employeeColumns,
} from "./data/employees";

import {
  orders,
  orderColumns,
} from "./data/orders";

import {
  departments,
  departmentColumns,
} from "./data/departments";

export default function Page() {
  const [selected, setSelected] =
    useState<TableType>("students");

  const table = useMemo(() => {
    switch (selected) {
      case "employees":
        return {
          data: employees,
          columns: employeeColumns,
        };

      case "orders":
        return {
          data: orders,
          columns: orderColumns,
        };

      case "departments":
        return {
          data: departments,
          columns: departmentColumns,
        };

      default:
        return {
          data: students,
          columns: studentColumns,
        };
    }
  }, [selected]);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        selected={selected}
        onChange={setSelected}
      />

      {/* <main className="flex-1 p-8">
        <DataTable
          data={table.data as any}
          columns={table.columns as any}
          rowKey={(row) =>
                crypto.randomUUID()
            }
        />
      </main> */}
      <main className="flex-1 p-6">

      {selected === "students" && (
        <DataTable
          data={students}
          columns={studentColumns}
          rowKey={(row) =>
                crypto.randomUUID()
            }
        />
      )}

      {selected === "employees" && (
        <DataTable
          data={employees}
          columns={employeeColumns}
          rowKey={(row) =>
                crypto.randomUUID()
            }
        />
      )}

      {selected === "orders" && (
        <DataTable
          data={orders}
          columns={orderColumns}
          rowKey={(row) =>
                crypto.randomUUID()
            }
        />
      )}

      {selected === "departments" && (
        <DataTable
          data={departments}
          columns={departmentColumns}
          rowKey={(row) =>
                crypto.randomUUID()
            }
        />
      )}

    </main>
    </div>
  );
}
