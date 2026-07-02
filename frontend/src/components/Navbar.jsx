import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/dashboard">
          📈 SB Stocks
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>

          <Link className="nav-link" to="/stocks">
            Stocks
          </Link>

          <Link className="nav-link" to="/portfolio">
            Portfolio
          </Link>

          <Link className="nav-link" to="/transactions">
            Transactions
          </Link>

          <span className="nav-link text-warning">
            {user?.name}
          </span>

          <button
            className="btn btn-danger ms-3"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
