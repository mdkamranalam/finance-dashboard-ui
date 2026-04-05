import React from "react";
import { useStore } from "../../store/useStore";
import Card from "../ui/Card";
import { IndianRupee, TrendingUp, TrendingDown } from "lucide-react";

const SummaryCards = () => {
  const transactions = useStore((state) => state.transactions);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Balanced Card */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Balance</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {formatMoney(totalBalance)}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <IndianRupee size={24} />
          </div>
        </div>
      </Card>

      {/* Income Card */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Income</p>
            <h3 className="text-2xl font-bold text-green-600 mt-1">
              {formatMoney(totalIncome)}
            </h3>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-full">
            <TrendingUp size={24} />
          </div>
        </div>
      </Card>

      {/* Expenses Card */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Expenses</p>
            <h3 className="text-2xl font-bold text-red-600 mt-1">
              {formatMoney(totalExpenses)}
            </h3>
          </div>
          <div className="p-3 bg-red-50 text-red-600 rounded-full">
            <TrendingDown size={24} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SummaryCards;
