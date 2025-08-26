import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const Income = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    clientId: "",
    clientName: "",
    amount: "",
    description: "",
    Creditdebit: ""
  });
  const [loading, setLoading] = useState(false); // ✅ loading state

  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(`${API_URL}/clients/getClients`);
        const data = await res.json();
        setClients(data.users || []);
      } catch (error) {
        console.error("Error fetching clients:", error);
        alert("Error fetching clients");
      }
    };
    fetchClients();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClientChange = (e) => {
    const selectedId = e.target.value;
    const selectedClient = clients.find((c) => String(c.id) === selectedId);
    setFormData({
      ...formData,
      clientId: selectedId,
      clientName: selectedClient ? selectedClient.companyName : ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ start loading

    try {
      const res = await fetch(`${API_URL}/incoms/addIncome`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        alert("Income Added Successfully");
        setFormData({
          clientId: "",
          clientName: "",
          amount: "",
          description: "",
          Creditdebit: ""
        });
      } else {
        alert(data.message || "Failed to add income");
      }
    } catch (error) {
      console.error("Error submitting income:", error);
      alert("Error submitting income");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Income</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Client Name</label>
          <select
            name="clientId"
            className="form-control"
            value={formData.clientId}
            onChange={handleClientChange}
            required
          >
            <option value="">-- Select Client --</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.companyName}
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
            <option value="Debit">Debit</option>
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
          {loading ? "Saving..." : "Save Income"} {/* ✅ Loading feedback */}
        </button>
      </form>
    </div>
  );
};

export default Income;
