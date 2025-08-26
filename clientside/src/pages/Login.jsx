import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      
      sessionStorage.setItem("token", data.token);

   
      window.location.reload();
    } else {
      alert(data.message || "Invalid credentials");
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-gradient bg-primary bg-opacity-75">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        {/* Company Branding */}
        <div className="text-center mb-3">
          <h2 className="fw-bold text-dark">
            Divcodex <span className="text-primary">Private Limited</span>
          </h2>
          <p className="text-muted">Office Finance Management Login</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            Sign In
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            © {new Date().getFullYear()} Divcodex Private Limited. All Rights Reserved.
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
