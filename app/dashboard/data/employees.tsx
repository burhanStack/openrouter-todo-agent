"use client";

import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { Column } from "@/components/DataTable";

export interface Employee {
  employeeId: string;
  name: string;
  designation: string;
  salary: number;
  joiningDate: string;
}

export const employees: Employee[] = Array.from({ length: 150 }, () => ({
  employeeId: faker.string.uuid().slice(0, 8),
  name: faker.person.fullName(),
  designation: faker.person.jobTitle(),
  salary: faker.number.int({
    min: 30000,
    max: 200000,
  }),
  joiningDate: faker.date.past().toISOString(),
}));

export const employeeColumns: Column<Employee>[] = [
  {
    key: "employeeId",
    title: "Employee ID",
    searchable: true,
  },
  {
    key: "name",
    title: "Name",
    sortable: true,
    searchable: true,
  },
  {
    key: "designation",
    title: "Designation",
    sortable: true,
    searchable: true,
  },
  {
    key: "salary",
    title: "Salary",
    sortable: true,
    headerClassName: "text-right",
    cellClassName: "text-right font-semibold",
    render: (row) => `₹${row.salary.toLocaleString()}`,
  },
  {
    key: "joiningDate",
    title: "Joining",
    sortable: true,
    render: (row) => dayjs(row.joiningDate).format("DD MMM YYYY"),
    sortAccessor: (row) => new Date(row.joiningDate),
  },
];
