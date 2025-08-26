import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const Income = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    clientId: "",
    clientName: "",   // ✅ clientName bhi add
    amount: "",
    description: "",
    Creditdebit: ""
  });

  // Backend se client list lana
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(`${API_URL}/clients/getClients`);
        const data = await res.json();
        setClients(data.users || []); // safe check
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  // Input handle karna
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Client dropdown ke liye alag handler (id + name dono set karega)
  const handleClientChange = (e) => {
    const selectedId = e.target.value;
    const selectedClient = clients.find((c) => String(c.id) === selectedId);

    setFormData({
      ...formData,
      clientId: selectedId,
      clientName: selectedClient ? selectedClient.companyName : ""
    });
  };

  // Form submit karna
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // ✅ dono jayenge

    try {
      const res = await fetch(`${API_URL}/incoms/addIncome`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData) // ✅ id + name dono send ho rhe hain
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
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Income</h3>
      <form onSubmit={handleSubmit}>
        {/* Client Name Dropdown */}
        <div className="mb-3">
          <label className="form-label">Client Name</label>
          <select
            name="clientId"
            className="form-control"
            value={formData.clientId}
            onChange={handleClientChange} // ✅ custom handler
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
            <option value="Debit">Debit</option>
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
          Save Income
        </button>
      </form>
    </div>
  );
};

export default Income;
