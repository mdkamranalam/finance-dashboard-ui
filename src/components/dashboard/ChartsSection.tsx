import React, { useMemo } from "react";
import { useStore } from "../../store/useStore";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as PieTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as BarTooltip,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f43f5e",
  "#f59e0b",
  "#8b5cf6",
  "#06b6d4",
];

const ChartsSection: React.FC = () => {
  const transactions = useStore((state) => state.transactions);

  const expenseData = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const grouped = expenses.reduce(
      (acc, curr) => {
        const existing = acc.find((item) => item.name === curr.category);
        if (existing) {
          existing.value += curr.amount;
        } else {
          acc.push({ name: curr.category, value: curr.amount });
        }
        return acc;
      },
      [] as { name: string; value: number }[],
    );

    return grouped.sort((a, b) => b.value - a.value);
  }, [transactions]);

  const timeData = useMemo(() => {
    const groupedByDate = transactions.reduce(
      (acc, curr) => {
        if (!acc[curr.date]) {
          acc[curr.date] = { date: curr.date, income: 0, expense: 0 };
        }
        if (curr.type === "income") acc[curr.date].income += curr.amount;
        if (curr.type === "expense") acc[curr.date].expense += curr.amount;
        return acc;
      },
      {} as Record<string, { date: string; income: number; expense: number }>,
    );

    return Object.values(groupedByDate).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [transactions]);

  const formatTooltip = (value: number) => {
    return `₹ ${value.toLocaleString("en-IN")}`;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Financial Insights
      </h3>

      <div className="flex-1 flex flex-col gap-10">
        {/* DONUT CHART */}
        <div className="min-h-[250px] flex flex-col">
          <h4 className="text-sm font-medium text-gray-500 mb-4">
            Spending by Category
          </h4>
          {expenseData.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
              No expense data
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <PieTooltip formatter={formatTooltip} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <hr className="border-gray-100" />

        {/* BAR CHART */}
        <div className="min-h-[250px] flex flex-col">
          <h4 className="text-sm font-medium text-gray-500 mb-4">
            Cash Flow Trend
          </h4>
          {timeData.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
              No timeline data
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={timeData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `₹${val}`}
                />
                <BarTooltip
                  cursor={{ fill: "#f9fafb" }}
                  formatter={formatTooltip}
                />
                <Bar
                  dataKey="income"
                  name="Income"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expense"
                  name="Expense"
                  fill="#f43f5e"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;