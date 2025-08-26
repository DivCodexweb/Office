import React, { useState, useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL;
const Settings = () => {
  const [activeTab, setActiveTab] = useState("expenses");

  const [expenseTypes, setExpenseTypes] = useState([]);
  const [newExpense, setNewExpense] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
      const getExpancetype= async () => {
    try {
      const res = await fetch(`${API_URL}/expance/getExpancetype`);
      const data = await res.json();
      if (res.ok) {
        setExpenseTypes(data.users);
      } else {
        alert(data.message || "Failed to fetch clients");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching clients");
    }
  };
  useEffect(() => {

   getExpancetype();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/expance/addexpancetype`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({expancetype: newExpense}) 
      });

      const data = await res.json();

      if (res.ok) {
        alert("Income Added Successfully");
       setNewExpense("");
          getExpancetype();
      } else {
        alert(data.message || "Failed to add income");
      }
    } catch (error) {
      console.error("Error submitting income:", error);
    }
  };
  const handleEdit = (id, name) => {
    setEditId(id);
    setEditValue(name);
  };

  // Update Expense Type
  const handleUpdate = async () => {
    try {
    const res = await fetch(`${API_URL}/expance/updateexpancetype/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expancetype: editValue })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Expense Updated Successfully");
      setNewExpense("");
    } else {
      alert(data.message || "Failed to update Expense");
    }
  } catch (error) {
    console.error("Error updating Expense:", error);
  }
    setEditId(null);
    setEditValue("");
     getExpancetype();
  };

  // Delete Expense Type
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      const res = await fetch(`${API_URL}/expance/deleteexpance/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        alert("Expancetype deleted successfully!");
        getExpancetype();
      } else {
        alert(data.message || "Failed to delete Expancetype");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting Expancetype");
    }
  };
  const handleDeactivate = async (id,status) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      const res = await fetch(`${API_URL}/expance/D_A_xpancetype/${id}/${status}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        alert("Expancetype Update successfully!");
        getExpancetype();
      } else {
        alert(data.message || "Failed to delete Expancetype");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting Expancetype");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Settings</h3>

      {/* Tabs */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "expenses" ? "active" : ""}`}
            onClick={() => setActiveTab("expenses")}
          >
            Expenses
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "other" ? "active" : ""}`}
            onClick={() => setActiveTab("other")}
          >
            Other Settings
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content p-3 border border-top-0">
        {/* Expenses Tab */}
        {activeTab === "expenses" && (
          <div>
            <h5>Manage Expense Types</h5>

            {/* Add Expense */}
            <div className="mb-3 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Expense Type"
                value={newExpense}
                onChange={(e) => setNewExpense(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleAdd}>
                Add Expense
              </button>
            </div>

            {/* Expense List */}
            <ul className="list-group">
              {expenseTypes.map((exp) => (
                <li
                  key={exp.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {editId === exp.id ? (
                    <>
                      <input
                        type="text"
                        className="form-control me-2"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {exp.id} -
                      {exp.expancetype}
                       -    {exp.status}
                      <div>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(exp.id, exp.name)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => handleDelete(exp.id)}
                        >
                          Delete
                        </button>
<button
  className={`btn btn-sm ${exp.status === "Active" ? "btn-danger" : "btn-success"}`}
  onClick={() => handleDeactivate(exp.id, exp.status)}
>
  {exp.status === "Active" ? "Suspend" : "Active"}
</button>


                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Other Settings Tab */}
        {activeTab === "other" && <div>Other settings content...</div>}
      </div>
    </div>
  );
};

export default Settings;
