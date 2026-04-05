import React, { useState } from "react";
import { useStore } from "../../store/useStore";
import Card from "../ui/Card";
import AddTransactionModal from "./AddTransactionalModal";
import AdminOnly from "../layout/AdminOnly";
import { Search, Trash2, IndianRupee } from "lucide-react";

const TransactionList = () => {
  const { transactions, deleteTransaction } = useStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTransactions = transactions.filter((t) =>
    t.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Card className="col-span-1 lg:col-span-2 flex flex-col h-full min-h-[400px]">
      {/* Header & Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Only Admins will see this "Add New" button! */}
          <AdminOnly>
            <button
              onClick={() => setIsModalOpen(true)}
              className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              + Add New
            </button>
          </AdminOnly>
        </div>
      </div>

      {/* Table / List Area */}
      <div className="flex-1 overflow-auto">
        {filteredTransactions.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2 py-8">
            <Search size={32} className="opacity-20" />
            <p>No transactions found matching "{searchTerm}"</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all bg-gray-50/50"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      tx.type === "income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {tx.category.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{tx.category}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`font-bold flex items-center gap-0.5 ${tx.type === "income" ? "text-green-600" : "text-gray-900"}`}
                  >
                    {tx.type === "income" ? "+" : "-"}
                    <IndianRupee size={16} />
                    {tx.amount.toLocaleString("en-IN")}
                  </span>

                  {/* Only Admins can delete transactions! */}
                  <AdminOnly>
                    <button
                      onClick={() => deleteTransaction(tx.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Transaction"
                    >
                      <Trash2 size={18} />
                    </button>
                  </AdminOnly>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Card>
  );
};

export default TransactionList;
