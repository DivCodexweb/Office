import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const ExpenseLedgerPage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ledgerData, setLedgerData] = useState([]);

  // Ledger fetch
  const fetchLedger = async () => {
    let url = `${API_URL}/dashboard/getExpenseLedger`;
    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }
    const res = await axios.get(url);
    setLedgerData(res.data);
  };

  return (
    <div className="container mt-4">
      <h3>Expense Ledger</h3>

      {/* Date Filters */}
      <div className="row mb-3">
        <div className="col">
          <input type="date" className="form-control"
            value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div className="col">
          <input type="date" className="form-control"
            value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
      </div>

      <button className="btn btn-primary mb-3" onClick={fetchLedger}>Get Ledger</button>

      {/* Ledger Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th><th>Amount</th><th>Credit/Debit</th><th>Description</th><th>Date</th><th>Expense Type</th>
          </tr>
        </thead>
        <tbody>
          {ledgerData.length === 0 ? (
            <tr><td colSpan="6" className="text-center">No Records Found</td></tr>
          ) : (
            ledgerData.map((row, i) => (
              <tr key={row.id}>
                <td>{i+1}</td>
                <td>{row.ammount}</td>
                <td>{row.Creditdebit}</td>
                <td>{row.description}</td>
                <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                <td>{row.expenseType}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseLedgerPage;
