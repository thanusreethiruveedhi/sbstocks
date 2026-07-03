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
    const quantity = prompt("Enter Quantity to Buy");

    if (!quantity || Number(quantity) <= 0) return;

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

      <div className="card border-0 shadow-lg mb-4 bg-primary text-white">
        <div className="card-body">
          <h2>📈 Stock Market</h2>
          <p className="mb-0">
            Browse available stocks and buy using your virtual balance.
          </p>
        </div>
      </div>

      <div className="input-group mb-4 shadow-sm">
        <span className="input-group-text">🔍</span>

        <input
          type="text"
          className="form-control"
          placeholder="Search Company or Symbol..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card border-0 shadow-lg">

        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-primary">

                <tr>

                  <th>Company</th>

                  <th>Symbol</th>

                  <th>Sector</th>

                  <th>Current Price</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {filteredStocks.length === 0 ? (

                  <tr>

                    <td colSpan="5" className="text-center py-4">

                      No stocks found.

                    </td>

                  </tr>

                ) : (

                  filteredStocks.map((stock) => (

                    <tr key={stock._id}>

                      <td className="fw-bold">

                        {stock.companyName}

                      </td>

                      <td>

                        <span className="badge bg-dark">

                          {stock.symbol}

                        </span>

                      </td>

                      <td>

                        {stock.sector}

                      </td>

                      <td className="text-success fw-bold">

                        ₹{stock.currentPrice}

                      </td>

                      <td>

                        <button
                          className="btn btn-success btn-sm px-4"
                          onClick={() => buyStock(stock._id)}
                        >
                          Buy
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Stocks;