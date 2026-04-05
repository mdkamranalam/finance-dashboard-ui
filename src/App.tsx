import React from "react";
import { useStore } from "./store/useStore";
import SummaryCards from "./components/dashboard/SummaryCards";
import TransactionList from "./components/dashboard/TransactionList";
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Settings,
  IndianRupee,
} from "lucide-react";

function App() {
  const { role, setRole } = useStore();

  return (
    <div>
      {/* SIDEBAR */}
      <aside>
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <IndianRupee size={20} />
            </div>
            FinDash
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {/* Fake navigation items for visual completeness */}
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-medium"
          >
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            <Receipt size={20} /> Transactions
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            <PieChart size={20} /> Insights
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* HEADER */}
        <header className="h-20 bg-white border-b flex items-center justify-between px-8 shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">Overview</h2>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500">Role:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "viewer" | "admin")}
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:border-blue-500 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center ml-4">
              <Settings size={20} className="text-gray-500" />
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8 pb-12">
            <SummaryCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px] flex items-center justify-center text-gray-400 border-dashed">
                <TransactionList />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px] flex items-center justify-center text-gray-400 border-dashed">
                [ Charts Will Go Here ]
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
