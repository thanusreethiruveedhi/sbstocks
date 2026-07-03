import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function Dashboard() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [portfolioCount, setPortfolioCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const portfolio = await api.get("/portfolio", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const transactions = await api.get("/portfolio/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPortfolioCount(portfolio.data.length);
      setTransactionCount(transactions.data.length);

      const latestUser = JSON.parse(localStorage.getItem("user"));
      setUser(latestUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="dashboard-header">
        <h2>Welcome, {user?.name} 👋</h2>
        <p>Welcome back to SB Stocks Paper Trading Platform.</p>
      </div>

      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card bg-primary text-white shadow-lg dashboard-card">
            <div className="card-body text-center">
              <h1>💵</h1>
              <h5>Balance</h5>
              <h2>₹{user?.balance ?? 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card bg-success text-white shadow-lg dashboard-card">
            <div className="card-body text-center">
              <h1>📊</h1>
              <h5>Portfolio</h5>
              <h2>{portfolioCount}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card bg-warning text-dark shadow-lg dashboard-card">
            <div className="card-body text-center">
              <h1>🧾</h1>
              <h5>Transactions</h5>
              <h2>{transactionCount}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card bg-dark text-white shadow-lg dashboard-card">
            <div className="card-body text-center">
              <h1>👨‍💼</h1>
              <h5>User</h5>
              <h4>{user?.name}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-6 mb-4">
          <div className="card shadow-lg quick-card">
            <div className="card-body">
              <h4 className="text-primary mb-3">🚀 Quick Actions</h4>

              <ul className="list-group">
                <li className="list-group-item">📈 Buy Stocks</li>
                <li className="list-group-item">💼 View Portfolio</li>
                <li className="list-group-item">🧾 View Transactions</li>
                <li className="list-group-item">💰 Sell Stocks</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card shadow-lg tip-card">
            <div className="card-body">
              <h4 className="text-success mb-3">💡 Trading Tips</h4>

              <ul>
                <li>Research before buying stocks.</li>
                <li>Diversify your investments.</li>
                <li>Track your portfolio regularly.</li>
                <li>Practice with paper trading before investing real money.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;