import { create } from "zustand";
import type { Transaction, UserRole } from "../types/index";
import { initialTransactions } from "../data/mockData";

interface DashboardState {
  role: UserRole;
  transactions: Transaction[];
  setRole: (role: UserRole) => void;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
}

export const useStore = create<DashboardState>((set) => ({
  role: "viewer",
  transactions: initialTransactions,

  setRole: (role) => set({ role }),

  addTransaction: (newTx) =>
    set((state) => ({
      transactions: [
        { ...newTx, id: crypto.randomUUID() },
        ...state.transactions,
      ],
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}));
