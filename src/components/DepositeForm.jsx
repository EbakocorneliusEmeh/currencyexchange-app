import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";
import "../styles/DepositForm.css";


const DepositForm = () => {
  const { deposit } = useWallet();
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("");

  const handleDeposit = () => {
    const parsed = parseFloat(amount);
    if (parsed > 0) {
      deposit(currency, parsed);
      setAmount("");
    }
  };

  return (
    <div className="form-section">
      <h2>Deposit Funds</h2>
      <div className="form-row">
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option>USD</option>
          <option>EUR</option>
          <option>XAF</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>
    </div>
  );
};

export default DepositForm;
