import React, { useEffect, useState } from "react";

const ExpenseVsType = () => {
  const [rows, setRows] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = () => {
  fetch(`${process.env.REACT_APP_API_URL}/dashboard/getExpenseVsType?startDate=${startDate}&endDate=${endDate}`)
    .then(res => res.json())
    .then(result => setRows(result))
    .catch(err => console.error("Error fetching expense vs type:", err));
};


  useEffect(() => {
    fetchData(); // default current month load
  }, []);

  return (
    <div className="container mt-4">
      <h2>Expense Vs Type</h2>
      <div className="row mb-3">
        <div className="col-md-3">
          <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div className="col-md-3">
          <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={fetchData}>Filter</button>
        </div>
      </div>

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
    </div>
  );
};

export default ExpenseVsType;
