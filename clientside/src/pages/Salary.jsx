import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const Salary = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    amount: "",
    description: "",
    Creditdebit: ""
  });
  const [loading, setLoading] = useState(false); // ✅ loading state

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`${API_URL}/employees/getEmployees`);
        const data = await res.json();
        setEmployees(data.users || []);
      } catch (error) {
        console.error("Error fetching employees:", error);
        alert("Error fetching employees");
      }
    };
    fetchEmployees();
  }, []);

  // Input handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Employee selection handler
  const handleEmployeeChange = (e) => {
    const selectedId = e.target.value;
    const selectedEmployee = employees.find((emp) => String(emp.id) === selectedId);

    setFormData({
      ...formData,
      employeeId: selectedId,
      employeeName: selectedEmployee ? selectedEmployee.name : ""
    });
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ start loading

    try {
      const res = await fetch(`${API_URL}/expance/addsalery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        alert("Salary Added Successfully");
        setFormData({
          employeeId: "",
          employeeName: "",
          amount: "",
          description: "",
          Creditdebit: ""
        });
      } else {
        alert(data.message || "Failed to add Salary");
      }
    } catch (error) {
      console.error("Error submitting Salary:", error);
      alert("Error submitting Salary");
    } finally {
      setLoading(false); // ✅ end loading
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Salary</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Employee</label>
          <select
            name="employeeId"
            className="form-control"
            value={formData.employeeId}
            onChange={handleEmployeeChange}
            required
          >
            <option value="">-- Select Employee --</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.id} - {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Credit / Debit</label>
          <select
            name="Creditdebit"
            className="form-control"
            value={formData.Creditdebit}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Type --</option>
            <option value="Credit">Credit</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            name="amount"
            className="form-control"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Salary"} {/* ✅ Loading text */}
        </button>
      </form>
    </div>
  );
};

export default Salary;
