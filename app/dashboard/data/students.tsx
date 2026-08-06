"use client";

import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { Column } from "@/components/DataTable";

export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  status: "Active" | "Inactive";
  createdAt: string;
  department: {
    name: string;
  };
}

export const students: Student[] = Array.from(
  { length: 100 },
  (_, index) => ({
    id: index + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 30 }),
    status: faker.helpers.arrayElement([
      "Active",
      "Inactive",
    ]),
    createdAt: faker.date.past().toISOString(),
    department: {
      name: faker.helpers.arrayElement([
        "Computer Science",
        "Mechanical",
        "Civil",
        "Electronics",
      ]),
    },
  })
);

export const studentColumns: Column<Student>[] = [
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
        className={`rounded px-2 py-1 text-white ${
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
      dayjs(row.createdAt).format("DD MMM YYYY"),
    sortAccessor: (row) =>
      new Date(row.createdAt),
  },
];