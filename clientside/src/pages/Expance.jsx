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
  const [loading, setLoading] = useState(false); // ✅ Loading state

  // Fetch active expense types
  useEffect(() => {
    const fetchExpTypes = async () => {
      try {
        const res = await fetch(`${API_URL}/expance/getexpancetype`);
        const data = await res.json();
        setExpTypes(data.users || []);
      } catch (error) {
        console.error("Error fetching expense types:", error);
        alert("Error fetching expense types");
      }
    };
    fetchExpTypes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExpTypeChange = (e) => {
    const selectedId = e.target.value;
    const selectedType = expTypes.find((t) => String(t.id) === selectedId);

    setFormData({
      ...formData,
      expanceTypeId: selectedId,
      expanceTypeName: selectedType ? selectedType.expancetype : ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading

    try {
      const res = await fetch(`${API_URL}/expance/addexpance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
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
      alert("Error submitting Expense");
    } finally {
      setLoading(false); // ✅ Stop loading
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
              .filter((t) => t.status === "Active")
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

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Expense"} {/* ✅ Feedback */}
        </button>
      </form>
    </div>
  );
};

export default Expance;
