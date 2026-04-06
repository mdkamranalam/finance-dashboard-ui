import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import type { Transaction } from '../store/useStore';
import { X } from 'lucide-react';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionToEdit?: Transaction | null;
}

export function TransactionModal({ isOpen, onClose, transactionToEdit }: TransactionModalProps) {
  const { addTransaction, editTransaction } = useStore();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (transactionToEdit) {
      setDescription(transactionToEdit.description);
      setAmount(transactionToEdit.amount.toString());
      setCategory(transactionToEdit.category);
      setType(transactionToEdit.type);
      setDate(transactionToEdit.date);
    } else {
      setDescription('');
      setAmount('');
      setCategory('');
      setType('expense');
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [transactionToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      description,
      amount: parseFloat(amount) || 0,
      category,
      type,
      date,
    };

    if (transactionToEdit) {
      editTransaction(transactionToEdit.id, payload);
    } else {
      addTransaction(payload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-card w-full max-w-md rounded-xl border border-border shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-lg font-semibold">{transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-full transition">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input required type="text" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-input text-foreground px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. Groceries" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Amount (₹)</label>
              <input required type="number" min="0" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-input text-foreground px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-primary/50" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-input text-foreground px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input required type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-input text-foreground px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. Food" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select value={type} onChange={e => setType(e.target.value as 'income' | 'expense')} className="w-full bg-input text-foreground px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-primary/50">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition font-medium">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition font-medium">
              {transactionToEdit ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
