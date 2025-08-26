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

  // Backend se Employee list lana
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`${API_URL}/employees/getEmployees`);
        const data = await res.json();
        setEmployees(data.users || []); // ✅ safe check
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Input handle karna
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Employee dropdown ke liye handler (id + name dono set)
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
    console.log("Salary Form Data:", formData); // ✅ dono jayenge

    try {
      const res = await fetch(`${API_URL}/expance/addsalery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData) // ✅ id + name dono send ho rhe hain
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
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Salary</h3>
      <form onSubmit={handleSubmit}>
        {/* Employee Dropdown */}
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
            {employees
              .map((emp) => (
                <option key={emp.id} value={emp.id}>
                {emp.id} -   {emp.name} 
                </option>
              ))}
          </select>
        </div>

        {/* Credit / Debit */}
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
            {/* <option value="Debit">Debit</option> */}
          </select>
        </div>

        {/* Amount */}
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

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Salary
        </button>
      </form>
    </div>
  );
};

export default Salary;
