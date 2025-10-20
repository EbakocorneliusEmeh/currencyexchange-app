import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";
import "../styles/ExchangeForm.css"

const ExchangeForm = () => {
  const { exchangeCurrency } = useWallet();
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState("");

  const handleExchange = () => {
    const parsed = parseFloat(amount);
    if (from !== to && parsed > 0) {
      exchangeCurrency(from, to, parsed);
      setAmount("");
    }
  };

  return (
    <div className="form-section">
      <h2>Exchange Currency</h2>

      <div className="form-row">
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          <option>USD</option>
          <option>EUR</option>
          <option>XAF</option>
        </select>
        <span>→</span>
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          <option>USD</option>
          <option>EUR</option>
          <option>XAF</option>
        </select>
      </div>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="name-btn" onClick={handleExchange}>Convert</button>
    </div>
  );
};

export default ExchangeForm;
