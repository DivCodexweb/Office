import React, { useEffect, useState } from "react";

const YearlyReportPage = () => {
  const [report, setReport] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);

  const fetchReport = (selectedYear) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/dashboard/yearly?year=${selectedYear}`)
      .then(res => res.json())
      .then(data => setReport(data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReport(year);
  }, [year]);

  // Generate last 5 years dynamically
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="container mt-3">
      <h2>Yearly Report ({year})</h2>
      <select onChange={e => setYear(e.target.value)} value={year} className="form-select w-auto mb-3">
        {years.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : report.length === 0 ? (
        <div className="text-center">No Records Found</div>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Month</th>
              <th>Income</th>
              <th>Salary</th>
              <th>Expense</th>
              <th>Profit/Loss</th>
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
      )}
    </div>
  );
};

export default YearlyReportPage;
