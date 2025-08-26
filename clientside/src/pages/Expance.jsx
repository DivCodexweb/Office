import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const Expance = () => {
  const [expTypes, setExpTypes] = useState([]);
  const [formData, setFormData] = useState({
    expanceTypeId: "",
    expanceTypeName: "",
    amount: "",
    description: "",
    Creditdebit: ""
  });

  // Backend se Expense Types lana
  useEffect(() => {
    const fetchExpTypes = async () => {
      try {
        const res = await fetch(`${API_URL}/expance/getexpancetype`);
        const data = await res.json();
        setExpTypes(data.users || []); // safe check
      } catch (error) {
        console.error("Error fetching expense types:", error);
      }
    };
    fetchExpTypes();
  }, []);

  // Input handle karna
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ExpenseType dropdown ke liye handler (id + name dono set)
  const handleExpTypeChange = (e) => {
    const selectedId = e.target.value;
    const selectedType = expTypes.find((t) => String(t.id) === selectedId);

    setFormData({
      ...formData,
      expanceTypeId: selectedId,
      expanceTypeName: selectedType ? selectedType.expancetype : ""
    });
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Expense Form Data:", formData); // ✅ dono jayenge

    try {
      const res = await fetch(`${API_URL}/expance/addexpance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData) // ✅ id + name dono send ho rhe hain
      });

      const data = await res.json();

      if (res.ok) {
        alert("Expense Added Successfully");
        setFormData({
          expanceTypeId: "",
          expanceTypeName: "",
          amount: "",
          description: "",
          Creditdebit: ""
        });
      } else {
        alert(data.message || "Failed to add Expense");
      }
    } catch (error) {
      console.error("Error submitting Expense:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        {/* Expense Type Dropdown */}
        <div className="mb-3">
          <label className="form-label">Expense Type</label>
          <select
            name="expanceTypeId"
            className="form-control"
            value={formData.expanceTypeId}
            onChange={handleExpTypeChange}
            required
          >
            <option value="">-- Select Expense Type --</option>
   {expTypes
  .filter((t) => t.status === "Active") // ✅ sirf active dikhayega
  .map((t) => (
    <option key={t.id} value={t.id}>
      {t.expancetype}
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
          Save Expense
        </button>
      </form>
    </div>
  );
};

export default Expance;
