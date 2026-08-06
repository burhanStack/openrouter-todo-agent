"use client";

import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { Column } from "@/components/DataTable";

export interface Order {
  orderNo: string;
  customer: string;
  amount: number;
  paymentStatus: string;
  orderDate: string;
}

export const orders: Order[] = Array.from(
  { length: 250 },
  () => ({
    orderNo: faker.string.alphanumeric(8),
    customer: faker.person.fullName(),
    amount: faker.number.int({
      min: 100,
      max: 50000,
    }),
    paymentStatus: faker.helpers.arrayElement([
      "Paid",
      "Pending",
      "Cancelled",
    ]),
    orderDate: faker.date.recent().toISOString(),
  })
);

export const orderColumns: Column<Order>[] = [
  {
    key: "orderNo",
    title: "Order No",
    searchable: true,
  },
  {
    key: "customer",
    title: "Customer",
    sortable: true,
    searchable: true,
  },
  {
    key: "amount",
    title: "Amount",
    sortable: true,
    render: (row) =>
      `₹${row.amount.toLocaleString()}`,
  },
  {
    key: "paymentStatus",
    title: "Payment",
    sortable: true,
    searchable: true,
  },
  {
    key: "orderDate",
    title: "Order Date",
    sortable: true,
    render: (row) =>
      dayjs(row.orderDate).format("DD MMM YYYY"),
    sortAccessor: (row) =>
      new Date(row.orderDate),
  },
];