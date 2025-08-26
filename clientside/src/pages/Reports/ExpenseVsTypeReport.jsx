import React, { useEffect, useState } from "react";

const ExpenseVsType = () => {
  const [rows, setRows] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);

    // Default to current month if dates are empty
    let from = startDate;
    let to = endDate;
    if (!startDate || !endDate) {
      const now = new Date();
      from = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .slice(0, 10);
      to = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        .toISOString()
        .slice(0, 10);
    }

    fetch(`${process.env.REACT_APP_API_URL}/dashboard/getExpenseVsType?startDate=${from}&endDate=${to}`)
      .then((res) => res.json())
      .then((result) => setRows(result || []))
      .catch((err) => console.error("Error fetching expense vs type:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(); // default load for current month
  }, []);

  return (
    <div className="container mt-4">
      <h2>Expense Vs Type</h2>

      {/* Date Filters */}
      <div className="row mb-3">
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={fetchData}>
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center mt-3">Loading data...</div>
      ) : rows.length === 0 ? (
        <div className="text-center mt-3">No Records Found</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Expense Type</th>
              <th>Total Expense</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.expenseType}</td>
                <td>{r.totalExpense}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseVsType;
