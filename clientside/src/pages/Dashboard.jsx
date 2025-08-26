import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [totals, setTotals] = useState({
    admins: 0,
    employees: 0,
    clients: 0,
  });

  const [finance, setFinance] = useState({
    income: 0,
    salary: 0,
    expense: 0,
  });

  const [dateFilter, setDateFilter] = useState({
    from: "",
    to: "",
  });

  // ✅ Load both APIs on first render
  useEffect(() => {
    fetchTotals();

    // By default current month finance load
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split("T")[0];
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .split("T")[0];

    setDateFilter({ from: firstDay, to: lastDay });
    fetchFinance(firstDay, lastDay);
  }, []);

  // ✅ API 1: Totals
  const fetchTotals = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/dashboard/totals`);
      const data = await res.json();
      setTotals(data);
    } catch (err) {
      console.error("Error fetching totals:", err);
    }
  };

  // ✅ API 2: Finance
  const fetchFinance = async (from, to) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/dashboard/finance?from=${from}&to=${to}`
      );
      const data = await res.json();
      setFinance(data);
    } catch (err) {
      console.error("Error fetching finance:", err);
    }
  };

  const handleFilterChange = (e) => {
    setDateFilter({ ...dateFilter, [e.target.name]: e.target.value });
  };

  const applyFilter = () => {
    fetchFinance(dateFilter.from, dateFilter.to);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Dashboard</h2>
        <button
          onClick={handleLogout}
          className="btn btn-danger px-4 py-2 fw-semibold shadow"
        >
          Logout
        </button>
      </div>

      {/* 🔹 Date Filter (Finance Only) */}
      <div className="card p-3 mb-4 shadow-sm">
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label fw-semibold">From Date</label>
            <input
              type="date"
              className="form-control"
              name="from"
              value={dateFilter.from}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-semibold">To Date</label>
            <input
              type="date"
              className="form-control"
              name="to"
              value={dateFilter.to}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-4">
            <button
              onClick={applyFilter}
              className="btn btn-primary w-100 fw-semibold"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Totals */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card text-center shadow p-3 bg-primary text-white">
            <h4>Total Admins</h4>
            <h2>{totals.admins}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow p-3 bg-success text-white">
            <h4>Total Employees</h4>
            <h2>{totals.employees}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow p-3 bg-warning text-dark">
            <h4>Total Clients</h4>
            <h2>{totals.clients}</h2>
          </div>
        </div>
      </div>

      {/* 🔹 Finance */}
      <div className="row g-4 mt-3">
        <div className="col-md-4">
          <div className="card text-center shadow p-3 bg-info text-white">
            <h4>Total Income</h4>
            <h3>RS:{finance.income}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow p-3 bg-danger text-white">
            <h4>Total Salary</h4>
            <h3>RS:{finance.salary}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center shadow p-3 bg-secondary text-white">
            <h4>Total Expense</h4>
            <h3>RS:{finance.expense}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
