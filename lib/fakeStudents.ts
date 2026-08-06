import { faker } from "@faker-js/faker";

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
    age: faker.number.int({
      min: 18,
      max: 35,
    }),
    status: faker.helpers.arrayElement([
      "Active",
      "Inactive",
    ]),
    createdAt: faker.date
      .between({
        from: "2023-01-01",
        to: "2025-12-31",
      })
      .toISOString(),
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