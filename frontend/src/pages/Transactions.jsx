import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/portfolio/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(res.data);
    } catch (error) {
      alert("Failed to load transactions");
    }
  };

  const buyCount = transactions.filter(
    (t) => t.type === "BUY"
  ).length;

  const sellCount = transactions.filter(
    (t) => t.type === "SELL"
  ).length;

  return (
    <Layout>

      {/* Header */}

      <div className="card bg-warning shadow-lg border-0 mb-4">

        <div className="card-body">

          <h2>📜 Transaction History</h2>

          <p className="mb-0">
            View all your stock buying and selling activities.
          </p>

        </div>

      </div>

      {/* Summary */}

      <div className="row mb-4">

        <div className="col-md-4">

          <div className="card border-0 shadow">

            <div className="card-body text-center">

              <h5>Total Transactions</h5>

              <h2 className="text-primary">
                {transactions.length}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card border-0 shadow">

            <div className="card-body text-center">

              <h5>Total BUY</h5>

              <h2 className="text-success">
                {buyCount}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card border-0 shadow">

            <div className="card-body text-center">

              <h5>Total SELL</h5>

              <h2 className="text-danger">
                {sellCount}
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="card shadow-lg border-0">

        <div className="card-body">

          {transactions.length === 0 ? (

            <div className="text-center py-5">

              <h3>📭 No Transactions Found</h3>

              <p className="text-muted">
                Buy or sell stocks to see your history.
              </p>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-warning">

                  <tr>

                    <th>Company</th>

                    <th>Symbol</th>

                    <th>Type</th>

                    <th>Quantity</th>

                    <th>Price</th>

                    <th>Total</th>

                  </tr>

                </thead>

                <tbody>

                  {transactions.map((item) => (

                    <tr key={item._id}>

                      <td className="fw-bold">
                        {item.stock.companyName}
                      </td>

                      <td>
                        <span className="badge bg-dark">
                          {item.stock.symbol}
                        </span>
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            item.type === "BUY"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {item.type}
                        </span>

                      </td>

                      <td>{item.quantity}</td>

                      <td className="text-primary fw-bold">
                        ₹{item.price}
                      </td>

                      <td className="text-success fw-bold">
                        ₹{item.totalAmount}
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

export default Transactions;