import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container">

        <Link className="navbar-brand fw-bold fs-3" to="/dashboard">
          <FaChartLine className="me-2" />
          SB Stocks
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/dashboard" ? "active fw-bold" : ""
                }`}
                to="/dashboard"
              >
                🏠 Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/stocks" ? "active fw-bold" : ""
                }`}
                to="/stocks"
              >
                📈 Stocks
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/portfolio" ? "active fw-bold" : ""
                }`}
                to="/portfolio"
              >
                💼 Portfolio
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/transactions"
                    ? "active fw-bold"
                    : ""
                }`}
                to="/transactions"
              >
                📜 Transactions
              </Link>
            </li>

            <li className="nav-item ms-3">
              <span
                className="badge bg-light text-dark rounded-pill px-3 py-2"
                style={{ fontSize: "15px" }}
              >
                👤 {user?.name}
              </span>
            </li>

            <li className="nav-item ms-3">
              <button
                className="btn btn-danger rounded-pill px-4"
                onClick={logout}
              >
                🚪 Logout
              </button>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;