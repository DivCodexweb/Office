import React, { useEffect, useState } from "react";

const IncomeReport = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/dashboard/getIncomeReport`)
      .then((res) => res.json())
      .then((result) => setRows(result || []))
      .catch((err) => console.error("Error fetching income report:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(); // initial load
  }, []);

  return (
    <div className="container mt-4">
      <h2>Income Report</h2>

      {loading ? (
        <div className="text-center mt-3">Loading...</div>
      ) : rows.length === 0 ? (
        <div className="text-center mt-3">No Records Found</div>
      ) : (
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
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td>{r.totalIncome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IncomeReport;
