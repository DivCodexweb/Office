import React, { useEffect, useState } from "react";

const IncomeReport = () => {
  const [rows, setRows] = useState([]);

useEffect(() => {
  fetch(`${process.env.REACT_APP_API_URL}/dashboard/getIncomeReport`)
    .then(res => res.json())
    .then(result => setRows(result))
    .catch(err => console.error("Error fetching income report:", err));
}, []);


  return (
    <div className="container mt-4">
      <h2>Income Report</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Income</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.date}</td>
              <td>{r.totalIncome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeReport;
