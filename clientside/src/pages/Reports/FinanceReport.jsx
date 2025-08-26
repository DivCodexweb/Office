import React, { useEffect, useState } from "react";

const FinanceReport = () => {
  const [finance, setFinance] = useState({ income: 0, salary: 0, expense: 0 });
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fetchFinance = () => {
    if (!from || !to) return;
    fetch(`${process.env.REACT_APP_API_URL}/dashboard/finance?from=${from}&to=${to}`)
      .then(res => res.json())
      .then(result => setFinance(result))
      .catch(err => console.error("Error fetching finance:", err));
  };

  return (
    <div className="container mt-4">
      <h2>Finance Report</h2>

      <div className="row mb-3">
        <div className="col-md-3">
          <input type="date" className="form-control" value={from} onChange={e => setFrom(e.target.value)} />
        </div>
        <div className="col-md-3">
          <input type="date" className="form-control" value={to} onChange={e => setTo(e.target.value)} />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={fetchFinance}>Filter</button>
        </div>
      </div>

      <div className="row text-center">
        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>Income</h5>
            <p className="fs-4 fw-bold">{finance.income}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>Salary</h5>
            <p className="fs-4 fw-bold">{finance.salary}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>Expense</h5>
            <p className="fs-4 fw-bold">{finance.expense}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceReport;
