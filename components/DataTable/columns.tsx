"use client";

import dayjs from "dayjs";
import { Column } from "@/components/DataTable";
import { Student } from "@/lib/fakeStudents";

export const columns: Column<Student>[] = [
  {
    key: "id",
    title: "ID",
    sortable: true,
    searchable: true,
  },
  {
    key: "name",
    title: "Name",
    sortable: true,
    searchable: true,
  },
  {
    key: "email",
    title: "Email",
    sortable: true,
    searchable: true,
  },
  {
    key: "age",
    title: "Age",
    sortable: true,
  },
  {
    key: "department.name",
    title: "Department",
    sortable: true,
    searchable: true,
  },
  {
    key: "status",
    title: "Status",
    sortable: true,
    searchable: true,

    render: (row) => (
      <span
        className={`px-2 py-1 rounded text-white ${
          row.status === "Active"
            ? "bg-green-600"
            : "bg-red-600"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "createdAt",
    title: "Created",
    sortable: true,

    render: (row) =>
      dayjs(row.createdAt).format(
        "DD MMM YYYY"
      ),

    sortAccessor: (row) =>
      new Date(row.createdAt),
  },
];