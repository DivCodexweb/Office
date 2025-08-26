import React, { useState, useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL;

const Settings = () => {
  const [activeTab, setActiveTab] = useState("expenses");

  const [expenseTypes, setExpenseTypes] = useState([]);
  const [newExpense, setNewExpense] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Loading states
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(null);

  const getExpancetype = async () => {
    try {
      const res = await fetch(`${API_URL}/expance/getExpancetype`);
      const data = await res.json();
      if (res.ok) setExpenseTypes(data.users);
      else alert(data.message || "Failed to fetch expense types");
    } catch (err) {
      console.error(err);
      alert("Error fetching expense types");
    }
  };

  useEffect(() => {
    getExpancetype();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newExpense) return alert("Enter expense type");
    setLoadingAdd(true);
    try {
      const res = await fetch(`${API_URL}/expance/addexpancetype`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expancetype: newExpense }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Expense added successfully!");
        setNewExpense("");
        getExpancetype();
      } else alert(data.message || "Failed to add expense");
    } catch (err) {
      console.error(err);
      alert("Error adding expense");
    } finally {
      setLoadingAdd(false);
    }
  };

  const handleEdit = (id, name) => {
    setEditId(id);
    setEditValue(name);
  };

  const handleUpdate = async () => {
    if (!editValue) return alert("Enter a value");
    setLoadingUpdate(true);
    try {
      const res = await fetch(`${API_URL}/expance/updateexpancetype/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expancetype: editValue }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Expense updated successfully!");
        getExpancetype();
      } else alert(data.message || "Failed to update expense");
    } catch (err) {
      console.error(err);
      alert("Error updating expense");
    } finally {
      setLoadingUpdate(false);
      setEditId(null);
      setEditValue("");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    setLoadingDelete(id);
    try {
      const res = await fetch(`${API_URL}/expance/deleteexpance/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) getExpancetype();
      else alert(data.message || "Failed to delete expense");
    } catch (err) {
      console.error(err);
      alert("Error deleting expense");
    } finally {
      setLoadingDelete(null);
    }
  };

  const handleDeactivate = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status === "Active" ? "suspend" : "activate"} this expense?`)) return;
    setLoadingStatus(id);
    try {
      const res = await fetch(`${API_URL}/expance/D_A_xpancetype/${id}/${status}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) getExpancetype();
      else alert(data.message || "Failed to update status");
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    } finally {
      setLoadingStatus(null);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Settings</h3>

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

      <div className="tab-content p-3 border border-top-0">
        {activeTab === "expenses" && (
          <div>
            <h5>Manage Expense Types</h5>

            <div className="mb-3 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Expense Type"
                value={newExpense}
                onChange={(e) => setNewExpense(e.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={handleAdd}
                disabled={loadingAdd}
              >
                {loadingAdd ? "Adding..." : "Add Expense"}
              </button>
            </div>

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
                        disabled={loadingUpdate}
                      >
                        {loadingUpdate ? "Updating..." : "Update"}
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
                      {exp.id} - {exp.expancetype} - {exp.status}
                      <div>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(exp.id, exp.expancetype)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => handleDelete(exp.id)}
                          disabled={loadingDelete === exp.id}
                        >
                          {loadingDelete === exp.id ? "Deleting..." : "Delete"}
                        </button>
                        <button
                          className={`btn btn-sm ${exp.status === "Active" ? "btn-danger" : "btn-success"}`}
                          onClick={() => handleDeactivate(exp.id, exp.status)}
                          disabled={loadingStatus === exp.id}
                        >
                          {loadingStatus === exp.id
                            ? exp.status === "Active"
                              ? "Suspending..."
                              : "Activating..."
                            : exp.status === "Active"
                            ? "Suspend"
                            : "Activate"}
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "other" && <div>Other settings content...</div>}
      </div>
    </div>
  );
};

export default Settings;
