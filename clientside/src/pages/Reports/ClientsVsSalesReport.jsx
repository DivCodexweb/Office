import React, { useEffect, useState } from "react";

const ClientsVsSales = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/dashboard/getClientsVsSales`);
        const result = await res.json();
        setRows(result || []);
      } catch (err) {
        console.error("Error fetching clients vs sales:", err);
        alert("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Clients Vs Sales</h2>

      {loading ? (
        <div className="text-center mt-3">Loading data...</div> // ✅ loading indicator
      ) : rows.length === 0 ? (
        <div className="text-center mt-3">No records found</div> // ✅ empty state
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Client</th>
              <th>Total Debit</th>
              <th>Total Credit</th>
              <th>Pending RS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.clientname}</td>
                <td>RS: {r.totalDebit}</td>
                <td>RS: {r.totalCredit}</td>
                <td>RS: {r.netTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientsVsSales;
