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

  return (
    <Layout>
      <h2 className="mb-4">📜 Transaction History</h2>

      <div className="card shadow">
        <div className="card-body">

          {transactions.length === 0 ? (
            <h4 className="text-center">
              No Transactions Found
            </h4>
          ) : (
            <table className="table table-hover table-striped">

              <thead className="table-dark">
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

                    <td>{item.stock.companyName}</td>

                    <td>{item.stock.symbol}</td>

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

                    <td>₹{item.price}</td>

                    <td>₹{item.totalAmount}</td>

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

export default Transactions;