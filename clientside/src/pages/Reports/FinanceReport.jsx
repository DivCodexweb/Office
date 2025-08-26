import React, { useEffect, useState } from "react";

const FinanceReport = () => {
  const [finance, setFinance] = useState({ income: 0, salary: 0, expense: 0 });
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFinance = () => {
    setLoading(true);

    // Default to current month if dates are empty
    let start = from;
    let end = to;
    if (!from || !to) {
      const now = new Date();
      start = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .slice(0, 10);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        .toISOString()
        .slice(0, 10);
      setFrom(start);
      setTo(end);
    }

    fetch(`${process.env.REACT_APP_API_URL}/dashboard/finance?from=${start}&to=${end}`)
      .then((res) => res.json())
      .then((result) => setFinance(result || { income: 0, salary: 0, expense: 0 }))
      .catch((err) => console.error("Error fetching finance:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFinance(); // initial load for current month
  }, []);

  return (
    <div className="container mt-4">
      <h2>Finance Report</h2>

      {/* Date Filters */}
      <div className="row mb-3">
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={fetchFinance}>
            Filter
          </button>
        </div>
      </div>

      {/* Finance Cards */}
      {loading ? (
        <div className="text-center mt-3">Loading...</div>
      ) : (
        <div className="row text-center">
          <div className="col-md-4">
            <div className="card shadow p-3">
              <h5>Income</h5>
              <p className="fs-4 fw-bold">{finance.income || 0}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow p-3">
              <h5>Salary</h5>
              <p className="fs-4 fw-bold">{finance.salary || 0}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow p-3">
              <h5>Expense</h5>
              <p className="fs-4 fw-bold">{finance.expense || 0}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceReport;
