import React from 'react';
import { useStore } from './store/useStore';
import type { Transaction } from './store/useStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { LayoutDashboard, Receipt, TrendingUp, Sun, Moon, Shield, Plus } from 'lucide-react';
import { TransactionModal } from './components/TransactionModal';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7'];

export default function App() {
  const { role, setRole, transactions, deleteTransaction } = useStore();
  const [darkMode, setDarkMode] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('dashboard');

  // Transactions Tab States
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterType, setFilterType] = React.useState('all');

  // Modal States
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingTransaction, setEditingTransaction] = React.useState<Transaction | null>(null);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddClick = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (t: Transaction) => {
    setEditingTransaction(t);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-primary">
            <TrendingUp className="w-6 h-6" /> FinDash
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button onClick={() => setActiveTab('transactions')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'transactions' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}>
            <Receipt className="w-5 h-5" /> Transactions
          </button>
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium flex items-center gap-2">
              <Shield className="w-4 h-4" /> Role
            </span>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value as any)}
              className="bg-input text-foreground text-sm rounded px-2 py-1 outline-none"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-accent rounded-lg hover:bg-accent/80 transition"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-background/50 relative">
        <header className="px-8 py-6 border-b border-border flex justify-between items-center bg-card">
          <h2 className="text-2xl font-semibold capitalize">{activeTab}</h2>
          {role === 'admin' && (
            <button onClick={handleAddClick} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition">
              <Plus className="w-4 h-4" /> Add Transaction
            </button>
          )}
        </header>

        <main className="p-8">
          {activeTab === 'dashboard' ? (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Balance</h3>
                  <div className="text-3xl font-bold">₹{balance.toLocaleString()}</div>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Income</h3>
                  <div className="text-3xl font-bold text-green-500">₹{totalIncome.toLocaleString()}</div>
                </div>
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Expenses</h3>
                  <div className="text-3xl font-bold text-red-500">₹{totalExpense.toLocaleString()}</div>
                </div>
              </div>

              {/* Charts area */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm min-h-[300px]">
                  <h3 className="text-lg font-semibold mb-6">Spending by Category</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border shadow-sm min-h-[300px]">
                  <h3 className="text-lg font-semibold mb-6">Recent Transactions Overview</h3>
                  <div className="space-y-4">
                    {transactions.slice(-5).reverse().map(t => (
                      <div key={t.id} className="flex justify-between items-center p-4 rounded-lg bg-accent/50 hover:bg-accent/80 transition">
                        <div>
                          <p className="font-medium">{t.description}</p>
                          <p className="text-sm text-muted-foreground">{t.category} • {t.date}</p>
                        </div>
                        <div className={`font-semibold ${t.type === 'income' ? 'text-green-500' : 'text-foreground'}`}>
                          {t.type === 'income' ? '+' : '-'}₹{t.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden animate-in fade-in duration-300">
              <div className="p-4 border-b border-border flex gap-4">
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-input text-foreground px-4 py-2 rounded-lg outline-none flex-1 focus:ring-2 focus:ring-primary/50 transition" 
                />
                <select 
                  value={filterType}
                  onChange={e => setFilterType(e.target.value)}
                  className="bg-input text-foreground px-4 py-2 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-primary/50 transition"
                >
                  <option value="all">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-6 py-4 font-medium text-muted-foreground">Date</th>
                    <th className="px-6 py-4 font-medium text-muted-foreground">Description</th>
                    <th className="px-6 py-4 font-medium text-muted-foreground">Category</th>
                    <th className="px-6 py-4 font-medium text-muted-foreground">Amount</th>
                    {role === 'admin' && <th className="px-6 py-4 font-medium text-muted-foreground text-right">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No transactions found matching your criteria.</td>
                    </tr>
                  ) : filteredTransactions.map(t => (
                    <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition">
                      <td className="px-6 py-4">{t.date}</td>
                      <td className="px-6 py-4 font-medium">{t.description}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs bg-accent text-accent-foreground border border-border">
                          {t.category}
                        </span>
                      </td>
                      <td className={`px-6 py-4 font-medium ${t.type === 'income' ? 'text-green-500' : 'text-foreground'}`}>
                        {t.type === 'income' ? '+' : '-'}₹{t.amount}
                      </td>
                      {role === 'admin' && (
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleEditClick(t)} className="text-blue-500 hover:underline mr-4 text-sm font-medium">Edit</button>
                          <button onClick={() => deleteTransaction(t.id)} className="text-red-500 hover:underline text-sm font-medium">Delete</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        transactionToEdit={editingTransaction} 
      />
    </div>
  );
}
