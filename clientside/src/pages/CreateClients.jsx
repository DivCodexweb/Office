import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL;

const CreateClient = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]);

  // Client form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");

  // Fetch clients
  const getClients = async () => {
    try {
      const res = await fetch(`${API_URL}/clients/getClients`);
      const data = await res.json();
      if (res.ok) {
        setClients(data.users);
      } else {
        alert(data.message || "Failed to fetch clients");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching clients");
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  // Open edit modal
  const handleEdit = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  // Add Client
  const handleAddClient = async () => {
    if (!name || !email || !companyName) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/clients/addClient`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, companyName }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Client added successfully!");
        setName("");
        setEmail("");
        setCompanyName("");
        getClients();
      } else {
        alert(data.message || "Failed to add client");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding client");
    }
  };

  // Delete Client
  const handleDeleteClient = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      const res = await fetch(`${API_URL}/clients/deleteClient/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        alert("Client deleted successfully!");
        getClients();
      } else {
        alert(data.message || "Failed to delete client");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting client");
    }
  };

  // Update Client
  const handleUpdateClient = async () => {
    try {
      const res = await fetch(`${API_URL}/clients/updateClient/${selectedClient.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selectedClient.name || undefined,
          email: selectedClient.email || undefined,
          companyName: selectedClient.companyName || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Client updated successfully!");
        setShowModal(false);
        getClients();
      } else {
        alert(data.message || "Failed to update client");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating client");
    }
  };

  return (
    <div className="container mt-4">
      {/* Tabs */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "add" ? "active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            Add Client
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "update" ? "active" : ""}`}
            onClick={() => setActiveTab("update")}
          >
            Manage Clients
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="p-3 border border-top-0">
        {/* Add Client */}
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
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" className="mt-3" onClick={handleAddClient}>
              Add Client
            </Button>
          </Form>
        )}

        {/* Manage Clients */}
        {activeTab === "update" && (
          <div>
            <input
              type="text"
              placeholder="Search client..."
              className="form-control mb-3"
            />
            <ul className="list-group">
              {clients.map((client) => (
                <li
                  key={client.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    {client.name} - {client.email} - {client.companyName}
                  </div>
                  <div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(client)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteClient(client.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Modal for Update */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedClient && (
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedClient.name}
                  onChange={(e) =>
                    setSelectedClient({ ...selectedClient, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedClient.email}
                  onChange={(e) =>
                    setSelectedClient({ ...selectedClient, email: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedClient.companyName}
                  onChange={(e) =>
                    setSelectedClient({
                      ...selectedClient,
                      companyName: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateClient}>
            Update Client
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateClient;
