import React, { useEffect, useState } from "react";

const EmployeesVsSalary = () => {
  const [rows, setRows] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

  const fetchData = async () => {
    setLoading(true); // start loading
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/dashboard/getEmployeesVsSalary?startDate=${startDate}&endDate=${endDate}`
      );
      const result = await res.json();
      setRows(result || []);
    } catch (err) {
      console.error("Error fetching employees vs salary:", err);
      alert("Error fetching data");
    } finally {
      setLoading(false); // stop loading
    }
  };

  useEffect(() => {
    fetchData(); // initial load
  }, []);

  return (
    <div className="container mt-4">
      <h2>Employees Vs Salary</h2>
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

      {loading ? (
        <div className="text-center mt-3">Loading data...</div>
      ) : rows.length === 0 ? (
        <div className="text-center mt-3">No Records Found</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Total Salary</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.employeeName}</td>
                <td>{r.totalSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeesVsSalary;
