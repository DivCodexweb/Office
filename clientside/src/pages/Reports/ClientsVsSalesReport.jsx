import React, { useEffect, useState } from "react";

const ClientsVsSales = () => {
  const [rows, setRows] = useState([]);

useEffect(() => {
  fetch(`${process.env.REACT_APP_API_URL}/dashboard/getClientsVsSales`)
    .then(res => res.json())
    .then(result => setRows(result))
    .catch(err => console.error("Error fetching clients vs sales:", err));
}, []);


  return (
    <div className="container mt-4">
      <h2>Clients Vs Sales</h2>
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
              <td>RS:{r.totalDebit}</td>
              <td>RS:{r.totalCredit}</td>
              <td>RS:{r.netTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsVsSales;
