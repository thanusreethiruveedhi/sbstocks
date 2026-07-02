import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Stocks from "./pages/Stocks";
import Portfolio from "./pages/Portfolio";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/stocks" element={<Stocks />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
}

export default App;