import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const EmployeeLedgerPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ledgerData, setLedgerData] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ loading state

  // Employees fetch
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`${API_URL}/employees/getEmployees`);
        const data = await res.json();
        setEmployees(data.users || []);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  // Ledger fetch
  const fetchLedger = async () => {
    if (!selectedEmployee) {
      alert("Please select an employee");
      return;
    }

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

    setLoading(true); // ✅ start loading
    try {
      const res = await fetch(
        `${API_URL}/dashboard/getEmployeeLedger?employeeId=${selectedEmployee}&startDate=${from}&endDate=${to}`
      );
      const data = await res.json();
      setLedgerData(data || []);
    } catch (err) {
      console.error("Error fetching ledger:", err);
      alert("Error fetching ledger data");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="container mt-4">
      <h3>Employee Ledger</h3>

      <div className="mb-3">
        <label className="form-label">Select Employee</label>
        <select
          className="form-select"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">-- Select Employee --</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date Filters */}
      <div className="row mb-3">
        <div className="col">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <button className="btn btn-primary mb-3" onClick={fetchLedger}>
        Get Ledger
      </button>

      {/* Ledger Table */}
      {loading ? (
        <div className="text-center mt-3">Loading ledger data...</div>
      ) : ledgerData.length === 0 ? (
        <div className="text-center mt-3">No Records Found</div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Credit/Debit</th>
              <th>Description</th>
              <th>Date</th>
              <th>Employee</th>
            </tr>
          </thead>
          <tbody>
            {ledgerData.map((row, i) => (
              <tr key={row.id}>
                <td>{i + 1}</td>
                <td>{row.ammount}</td>
                <td>{row.Creditdebit}</td>
                <td>{row.description}</td>
                <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                <td>{row.employeeName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeLedgerPage;
