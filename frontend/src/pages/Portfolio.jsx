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

    if (!quantity || Number(quantity) <= 0) return;

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

  const totalInvestment = portfolio.reduce(
    (sum, item) => sum + item.totalInvestment,
    0
  );

  const totalStocks = portfolio.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <Layout>

      {/* Header */}

      <div className="card bg-success text-white shadow-lg border-0 mb-4">

        <div className="card-body">

          <h2>💼 My Portfolio</h2>

          <p className="mb-0">
            View and manage all your purchased stocks.
          </p>

        </div>

      </div>

      {/* Summary */}

      <div className="row mb-4">

        <div className="col-md-6">

          <div className="card shadow border-0">

            <div className="card-body text-center">

              <h5>Total Investment</h5>

              <h2 className="text-primary">
                ₹{totalInvestment.toLocaleString()}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow border-0">

            <div className="card-body text-center">

              <h5>Total Stocks Owned</h5>

              <h2 className="text-success">
                {totalStocks}
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* Portfolio Table */}

      <div className="card shadow-lg border-0">

        <div className="card-body">

          {portfolio.length === 0 ? (

            <div className="text-center py-5">

              <h3>📭 No Stocks Purchased Yet</h3>

              <p className="text-muted">
                Buy stocks from the Stocks page to build your portfolio.
              </p>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-success">

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

                      <td className="fw-bold">
                        {item.stock.companyName}
                      </td>

                      <td>
                        <span className="badge bg-dark">
                          {item.stock.symbol}
                        </span>
                      </td>

                      <td>{item.quantity}</td>

                      <td className="text-primary fw-bold">
                        ₹{item.averageBuyPrice}
                      </td>

                      <td className="text-success fw-bold">
                        ₹{item.totalInvestment}
                      </td>

                      <td>

                        <button
                          className="btn btn-danger btn-sm px-4"
                          onClick={() => sellStock(item.stock._id)}
                        >
                          Sell
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </Layout>
  );
}

export default Portfolio;