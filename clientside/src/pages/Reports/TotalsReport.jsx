import React, { useEffect, useState } from "react";

const TotalsReport = () => {
  const [data, setData] = useState({ admins: 0, employees: 0, clients: 0 });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/dashboard/totals`)
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.error("Error fetching totals:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>System Totals</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow p-3 text-center">
            <h5>Admins</h5>
            <p className="fs-4 fw-bold">{data.admins}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow p-3 text-center">
            <h5>Employees</h5>
            <p className="fs-4 fw-bold">{data.employees}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow p-3 text-center">
            <h5>Clients</h5>
            <p className="fs-4 fw-bold">{data.clients}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalsReport;
