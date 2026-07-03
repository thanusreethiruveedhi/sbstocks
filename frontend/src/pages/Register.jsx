import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          width: "450px",
          borderRadius: "20px",
        }}
      >
        <div className="card-body p-5">

          <div className="text-center mb-4">
            <h1
              className="fw-bold"
              style={{ color: "#2563eb" }}
            >
              📈 SB Stocks
            </h1>

            <p className="text-muted">
              Create Your Account
            </p>
          </div>

          <form onSubmit={handleRegister}>

            <div className="mb-3">
              <label className="form-label fw-bold">
                Full Name
              </label>

              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                Email
              </label>

              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">
                Password
              </label>

              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              className="btn btn-success btn-lg w-100"
            >
              Register
            </button>

          </form>

          <hr />

          <div className="text-center">

            <p>
              Already have an account?
            </p>

            <Link
              to="/login"
              className="btn btn-outline-primary w-100"
            >
              Login Here
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;