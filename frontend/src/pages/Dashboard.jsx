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
      console.log(error);
    }
  };

  return (
    <Layout>
      <h2 className="mb-4">Welcome, {user?.name} 👋</h2>

      <div className="row">

        <div className="col-md-4 mb-4">
          <div className="card text-white bg-primary shadow">
            <div className="card-body">
              <h5>Balance</h5>
              <h2>₹{user?.balance}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card text-white bg-success shadow">
            <div className="card-body">
              <h5>Portfolio</h5>
              <h2>{portfolioCount}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card text-white bg-warning shadow">
            <div className="card-body">
              <h5>Transactions</h5>
              <h2>{transactionCount}</h2>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;