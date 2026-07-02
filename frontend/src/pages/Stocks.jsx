import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const res = await api.get("/stocks");
      setStocks(res.data);
    } catch (error) {
      alert("Failed to fetch stocks");
    }
  };

  const buyStock = async (stockId) => {
    const quantity = prompt("Enter Quantity");

    if (!quantity || quantity <= 0) return;

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/portfolio/buy",
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

      alert("✅ Stock Purchased Successfully");

      fetchStocks();
    } catch (error) {
      alert(error.response?.data?.message || "Purchase Failed");
    }
  };

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.companyName.toLowerCase().includes(search.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <h2 className="mb-4">📈 Stock Market</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Company or Symbol..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card shadow">
        <div className="card-body">

          <table className="table table-hover table-striped">

            <thead className="table-dark">
              <tr>
                <th>Company</th>
                <th>Symbol</th>
                <th>Sector</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredStocks.map((stock) => (
                <tr key={stock._id}>
                  <td>{stock.companyName}</td>

                  <td>{stock.symbol}</td>

                  <td>{stock.sector}</td>

                  <td>₹{stock.currentPrice}</td>

                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => buyStock(stock._id)}
                    >
                      Buy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </Layout>
  );
}

export default Stocks;