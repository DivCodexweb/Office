import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL;

const Adduser = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]); // ✅ safe initial state

  // Add User form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");

  // Fetch users
  const Getuser = async () => {
    try {
      const res = await fetch(`${API_URL}/users/getUser`);
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
      } else {
        alert(data.message || "Failed to fetch users");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching users");
    }
  };

  useEffect(() => {
    Getuser();
  }, []);

  // Open edit modal
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Add User API
  const handleAddUser = async () => {
    if (!name || !email || !password || !role) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("User added successfully!");
        setName("");
        setEmail("");
        setPassword("");
        setRole("staff");
        Getuser(); // ✅ refresh list
      } else {
        alert(data.message || "Failed to add user");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding user");
    }
  };
// Delete User API
const handleDeleteUser = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    const res = await fetch(`${API_URL}/users/deleteUser/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      alert("User deleted successfully!");
      Getuser(); // ✅ refresh list
    } else {
      alert(data.message || "Failed to delete user");
    }
  } catch (err) {
    console.error(err);
    alert("Error deleting user");
  }
};

  // Update User API
  const handleUpdateUser = async () => {
    try {
      const res = await fetch(`${API_URL}/users/updateuser/${selectedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selectedUser.name || undefined,
          email: selectedUser.email || undefined,
          password: selectedUser.password || undefined,
          role: selectedUser.role || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("User updated successfully!");
        setShowModal(false);
        Getuser(); // ✅ refresh after update
      } else {
        alert(data.message || "Failed to update user");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating user");
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
            Add User
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "update" ? "active" : ""}`}
            onClick={() => setActiveTab("update")}
          >
            Update User
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="p-3 border border-top-0">
        {/* Add User */}
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" className="mt-3" onClick={handleAddUser}>
              Add User
            </Button>
          </Form>
        )}

        {/* Update User */}
        {activeTab === "update" && (
          <div>
            <input
              type="text"
              placeholder="Search user..."
              className="form-control mb-3"
            />
           <ul className="list-group">
  {users.map((user) => (
    <li
      key={user.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <div>
        {user.name} - {user.email}
      </div>
      <div>
        <Button
          variant="outline-primary"
          size="sm"
          className="me-2"
          onClick={() => handleEdit(user)}
        >
          Edit
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => handleDeleteUser(user.id)}
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
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={selectedUser.email} disabled />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={selectedUser.password || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      password: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={selectedUser.role}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, role: e.target.value })
                  }
                >
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateUser}>
            Update User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Adduser;
