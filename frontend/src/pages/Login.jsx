import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.message ||
        "Login Failed"
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
          width: "430px",
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
              Paper Trading Platform
            </p>

          </div>

          <form onSubmit={handleLogin}>

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
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>

            <button
              className="btn btn-primary btn-lg w-100"
            >
              Login
            </button>

          </form>

          <hr />

          <div className="text-center">

            <p>
              Don't have an account?
            </p>

            <Link
              className="btn btn-outline-success w-100"
              to="/register"
            >
              Create New Account
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;