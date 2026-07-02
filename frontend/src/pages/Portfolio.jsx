import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/portfolio", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPortfolio(res.data);
    } catch (error) {
      alert("Failed to load portfolio");
    }
  };

  const sellStock = async (stockId) => {
    const quantity = prompt("Enter Quantity to Sell");

    if (!quantity || quantity <= 0) return;

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/portfolio/sell",
        {
          stockId,
          quantity: Number(quantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Stock Sold Successfully");

      fetchPortfolio();
    } catch (error) {
      alert(error.response?.data?.message || "Sell Failed");
    }
  };

  return (
    <Layout>
      <h2 className="mb-4">💼 My Portfolio</h2>

      <div className="card shadow">
        <div className="card-body">

          {portfolio.length === 0 ? (
            <h4 className="text-center">
              No Stocks Purchased Yet
            </h4>
          ) : (
            <table className="table table-hover table-striped">

              <thead className="table-dark">
                <tr>
                  <th>Company</th>
                  <th>Symbol</th>
                  <th>Quantity</th>
                  <th>Average Price</th>
                  <th>Total Investment</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {portfolio.map((item) => (
                  <tr key={item._id}>

                    <td>{item.stock.companyName}</td>

                    <td>{item.stock.symbol}</td>

                    <td>{item.quantity}</td>

                    <td>₹{item.averageBuyPrice}</td>

                    <td>₹{item.totalInvestment}</td>

                    <td>

                      <button
                        className="btn btn-danger"
                        onClick={() => sellStock(item.stock._id)}
                      >
                        Sell
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          )}

        </div>
      </div>
    </Layout>
  );
}

export default Portfolio;