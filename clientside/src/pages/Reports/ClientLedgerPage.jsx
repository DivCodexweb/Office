import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const ClientLedgerPage = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ledgerData, setLedgerData] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ loading state

  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(`${API_URL}/clients/getClients`);
        const data = await res.json();
        setClients(data.users || []);
      } catch (err) {
        console.error("Error fetching clients:", err);
        alert("Error fetching clients");
      }
    };
    fetchClients();
  }, []);

  // Default current month
  useEffect(() => {
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .slice(0, 10);
    const to = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .slice(0, 10);
    setStartDate(from);
    setEndDate(to);
  }, []);

  const fetchLedger = async () => {
    if (!selectedClient) {
      alert("Please select a client");
      return;
    }

    setLoading(true); // ✅ start loading
    try {
      const url = `${API_URL}/dashboard/getClientLedger?clientId=${selectedClient}&startDate=${startDate}&endDate=${endDate}`;
      const res = await fetch(url);
      const data = await res.json();
      setLedgerData(data || []);
    } catch (err) {
      console.error("Error fetching ledger:", err);
      alert("Error fetching ledger");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="container mt-4">
      <h3>Client Ledger</h3>

      {/* Client Select */}
      <div className="mb-3">
        <label className="form-label">Select Client</label>
        <select
          className="form-select"
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
        >
          <option value="">-- Select Client --</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
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

      <button className="btn btn-primary mb-3" onClick={fetchLedger} disabled={loading}>
        {loading ? "Loading..." : "Get Ledger"}
      </button>

      {/* Ledger Table */}
      {loading ? (
        <div className="text-center mt-3">Loading ledger...</div> // ✅ show loading text
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Client</th>
              <th>Credit/Debit</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {ledgerData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No Records Found
                </td>
              </tr>
            ) : (
              ledgerData.map((row, i) => (
                <tr key={row.id}>
                  <td>{i + 1}</td>
                  <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                  <td>{row.clientName}</td>
                  <td>{row.Creditdebit}</td>
                  <td>{row.ammount}</td>
                  <td>{row.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientLedgerPage;
