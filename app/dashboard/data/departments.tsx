"use client";

import { faker } from "@faker-js/faker";
import { Column } from "@/components/DataTable";

export interface Department {
  id: number;
  department: string;
  manager: string;
  budget: number;
  location: string;
}

export const departments: Department[] =
  Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    department: faker.commerce.department(),
    manager: faker.person.fullName(),
    budget: faker.number.int({
      min: 100000,
      max: 1000000,
    }),
    location: faker.location.city(),
  }));

export const departmentColumns: Column<Department>[] = [
  {
    key: "id",
    title: "ID",
    sortable: true,
  },
  {
    key: "department",
    title: "Department",
    sortable: true,
    searchable: true,
  },
  {
    key: "manager",
    title: "Manager",
    sortable: true,
    searchable: true,
  },
  {
    key: "budget",
    title: "Budget",
    sortable: true,
    render: (row) =>
      `₹${row.budget.toLocaleString()}`,
  },
  {
    key: "location",
    title: "Location",
    sortable: true,
    searchable: true,
  },
];