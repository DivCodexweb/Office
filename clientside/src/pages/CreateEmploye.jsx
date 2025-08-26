import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL;

const CreateEmploye = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);

  // Loading states
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(null); // store id
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  // Employee form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  // Fetch employees
  const getEmployees = async () => {
    try {
      const res = await fetch(`${API_URL}/employees/getEmployees`);
      const data = await res.json();
      if (res.ok) setEmployees(data.users);
      else alert(data.message || "Failed to fetch employees");
    } catch (err) {
      console.error(err);
      alert("Error fetching employees");
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Add Employee
  const handleAddEmployee = async () => {
    if (!name || !email || !number) {
      alert("Please fill all fields");
      return;
    }
    setLoadingAdd(true);
    try {
      const res = await fetch(`${API_URL}/employees/addEmployee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, number }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Employee added successfully!");
        setName("");
        setEmail("");
        setNumber("");
        getEmployees();
      } else alert(data.message || "Failed to add employee");
    } catch (err) {
      console.error(err);
      alert("Error adding employee");
    } finally {
      setLoadingAdd(false);
    }
  };

  // Delete Employee
  const handleDeleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    setLoadingDelete(id);
    try {
      const res = await fetch(`${API_URL}/employees/deleteEmployee/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        alert("Employee deleted successfully!");
        getEmployees();
      } else alert(data.message || "Failed to delete employee");
    } catch (err) {
      console.error(err);
      alert("Error deleting employee");
    } finally {
      setLoadingDelete(null);
    }
  };

  // Update Employee
  const handleUpdateEmployee = async () => {
    if (!selectedEmployee) return;

    setLoadingUpdate(true);
    try {
      const res = await fetch(`${API_URL}/employees/updateEmployee/${selectedEmployee.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selectedEmployee.name,
          email: selectedEmployee.email,
          number: selectedEmployee.number,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Employee updated successfully!");
        setShowModal(false);
        getEmployees();
      } else alert(data.message || "Failed to update employee");
    } catch (err) {
      console.error(err);
      alert("Error updating employee");
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "add" ? "active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            Add Employee
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "update" ? "active" : ""}`}
            onClick={() => setActiveTab("update")}
          >
            Manage Employees
          </button>
        </li>
      </ul>

      <div className="p-3 border border-top-0">
        {activeTab === "add" && (
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" className="mt-3" onClick={handleAddEmployee} disabled={loadingAdd}>
              {loadingAdd && <Spinner animation="border" size="sm" className="me-2" />}
              {loadingAdd ? "Adding..." : "Add Employee"}
            </Button>
          </Form>
        )}

        {activeTab === "update" && (
          <div>
            <input type="text" placeholder="Search employee..." className="form-control mb-3" />
            <ul className="list-group">
              {employees.map((employee) => (
                <li
                  key={employee.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    {employee.name} - {employee.email} - {employee.number}
                  </div>
                  <div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(employee)}
                      disabled={loadingUpdate}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteEmployee(employee.id)}
                      disabled={loadingDelete === employee.id}
                    >
                      {loadingDelete === employee.id && <Spinner animation="border" size="sm" className="me-2" />}
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedEmployee.name}
                  onChange={(e) =>
                    setSelectedEmployee({ ...selectedEmployee, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedEmployee.email}
                  onChange={(e) =>
                    setSelectedEmployee({ ...selectedEmployee, email: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedEmployee.number}
                  onChange={(e) =>
                    setSelectedEmployee({ ...selectedEmployee, number: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} disabled={loadingUpdate}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateEmployee} disabled={loadingUpdate}>
            {loadingUpdate && <Spinner animation="border" size="sm" className="me-2" />}
            {loadingUpdate ? "Updating..." : "Update Employee"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateEmploye;
