import React, { useEffect, useState } from "react";

const YearlyReportPage = () => {
  const [report, setReport] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/dashboard/yearly?year=${year}`)
      .then(res => res.json())
      .then(data => setReport(data))
      .catch(err => console.error(err));
  }, [year]);

  return (
    <div className="container mt-3">
      <h2>Yearly Report ({year})</h2>
      <select onChange={e => setYear(e.target.value)} value={year}>
        <option value={2025}>2025</option>
        <option value={2024}>2024</option>
        <option value={2023}>2023</option>
      </select>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Month</th>
            <th>Income</th>
            <th>Salary</th>
            <th>Expense</th>
            <th>Profit/Lose</th>
          </tr>
        </thead>
        <tbody>
          {report.map((r, i) => (
            <tr key={i}>
              <td>{new Date(0, r.month - 1).toLocaleString("default", { month: "long" })}</td>
              <td>{r.income}</td>
              <td>{r.salary}</td>
              <td>{r.expense}</td>
              <td>{r.pending}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YearlyReportPage;
