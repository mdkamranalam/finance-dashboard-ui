import { Transaction } from "../types";

export const initialTransactions: Transaction[] = [
  {
    id: "1",
    date: "2023-10-01",
    amount: 4000,
    category: "Salary",
    type: "income",
  },
  {
    id: "2",
    date: "2023-10-02",
    amount: 1200,
    category: "Rent",
    type: "expense",
  },
  {
    id: "3",
    date: "2023-10-05",
    amount: 150,
    category: "Groceries",
    type: "expense",
  },
  {
    id: "4",
    date: "2023-10-08",
    amount: 60,
    category: "Utilities",
    type: "expense",
  },
  {
    id: "5",
    date: "2023-10-12",
    amount: 200,
    category: "Freelance",
    type: "income",
  },
  {
    id: "6",
    date: "2023-10-15",
    amount: 45,
    category: "Dining",
    type: "expense",
  },
];