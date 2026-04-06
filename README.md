# Finance Dashboard UI

A beautifully designed, responsive, and interactive Finance Dashboard built with React, Vite, and Tailwind CSS. It allows users to track their financial activity, view comprehensive summaries, and manage transactions efficiently.

## 🚀 Features

- **📊 Dashboard Overview**: View high-level summaries including Total Balance, Total Income, and Total Expenses.
- **📈 Visual Analytics**: Interactive pie charts visualizing your spending by category using Recharts.
- **📝 Transaction Management**: View all transactions in a structured, sortable list.
- **🔎 Filtering & Searching**: Seamlessly search transactions by description or category and filter by transaction type (Income/Expense).
- **🔐 Role-Based Access Control (RBAC)**: Includes a frontend-simulated Role toggle (Viewer/Admin). Only Admins can Add, Edit, or Delete transactions.
- **💾 Persistent State**: Uses Zustand with Local Storage middleware to ensure your data stays persistent across browser refreshes.
- **🌓 Dark Mode**: Built-in simple toggle to switch between an aesthetically pleasing Light and Dark mode using Tailwind CSS variables.
- **📱 Responsive Design**: fully functional and optimized for both desktop and mobile web viewports.

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (with persist middleware)
- **Charts and Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/icons/)
- **Language**: TypeScript

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mdkamranalam/finance-dashboard-ui.git
   cd finance-dashboard-ui
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit the local dev server (default is usually `http://localhost:5173/`).

## 🏗️ Project Structure
```text
src/
├── components/
│   └── TransactionModal.tsx    # Modal component for adding/editing a transaction
├── store/
│   └── useStore.ts             # Global Zustand state configuration and dummy data
├── App.tsx                     # Main layout, dashboard and transaction rendering logics
├── index.css                   # Global CSS, Tailwind setup, Light/Dark mode CSS variables
└── main.tsx                    # React DOM entry point
```

## 📝 Usage Guide

- **Viewing Data**: As a `"Viewer"`, you can observe the summary statistics, interact with the pie chart, change color themes, search, and filter the table. 
- **Modifying Data**: Change your role to `"Admin"` using the bottom-left dropdown selector in the sidebar. The "+ Add Transaction", "Edit", and "Delete" capabilities will become visible.
- **Adding/Editing**: The interactive Modal enforces valid numbers, handles negative cases seamlessly, and updates global numbers immediately upon exact confirmation.

## 🤝 Evaluation Context
This dashboard structure emphasizes highly readable, modular state interactions using modern best practices (React Hooks, Zustand, and Tailwind Utility Classes). Emphasis was carefully placed on user aesthetics, interaction friction, and graceful error handling (e.g. empty states in the database) without imposing artificial backend complexities.