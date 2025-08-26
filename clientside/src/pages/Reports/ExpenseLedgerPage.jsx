import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ExpenseLedgerPage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ledgerData, setLedgerData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ledger fetch
  const fetchLedger = async () => {
    setLoading(true); // start loading
    let url = `${API_URL}/dashboard/getExpenseLedger`;
    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }

    try {
      const res = await axios.get(url);
      setLedgerData(res.data || []);
    } catch (err) {
      console.error("Error fetching expense ledger:", err);
      alert("Error fetching ledger data");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="container mt-4">
      <h3>Expense Ledger</h3>

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
        <div className="text-center mt-3">Loading data...</div>
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
              <th>Expense Type</th>
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
                <td>{row.expenseType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseLedgerPage;
