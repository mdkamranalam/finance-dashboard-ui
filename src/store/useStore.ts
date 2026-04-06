import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export type Role = 'viewer' | 'admin';

interface AppState {
  role: Role;
  transactions: Transaction[];
  setRole: (role: Role) => void;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
}

const initialTransactions: Transaction[] = [
  { id: '1', date: '2023-10-01', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: '2', date: '2023-10-02', amount: 1200, category: 'Housing', type: 'expense', description: 'Rent' },
  { id: '3', date: '2023-10-05', amount: 300, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: '4', date: '2023-10-10', amount: 150, category: 'Utilities', type: 'expense', description: 'Electricity Bill' },
  { id: '5', date: '2023-10-15', amount: 200, category: 'Entertainment', type: 'expense', description: 'Movie Night' },
  { id: '6', date: '2023-10-20', amount: 1000, category: 'Freelance', type: 'income', description: 'Project Work' },
  { id: '7', date: '2023-10-25', amount: 50, category: 'Transport', type: 'expense', description: 'Gas' },
  { id: '8', date: '2023-10-28', amount: 400, category: 'Food', type: 'expense', description: 'Dining Out' },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      role: 'admin',
      transactions: initialTransactions,
      setRole: (role) => set({ role }),
      addTransaction: (tx) => set((state) => ({
        transactions: [...state.transactions, { ...tx, id: crypto.randomUUID() }]
      })),
      editTransaction: (id, tx) => set((state) => ({
        transactions: state.transactions.map((t) => (t.id === id ? { ...t, ...tx } : t))
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),
    }),
    {
      name: 'finance-dashboard-storage',
    }
  )
);
