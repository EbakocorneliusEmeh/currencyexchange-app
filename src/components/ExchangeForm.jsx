import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";
import "../styles/ExchangeForm.css"

const ExchangeForm = () => {
  const { exchangeCurrency, supportedCurrencies } = useWallet();
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleExchange = () => {
    const parsed = parseFloat(amount);
    if (from !== to && parsed > 0) {
      const success = exchangeCurrency(from, to, parsed);
      setMessage(
        success
          ? "Currency converted successfully."
          : "Check your balance and try a smaller amount."
      );
      setAmount("");
      return;
    }
    setMessage("Choose two different currencies and enter a valid amount.");
  };

  return (
    <div className="action-form action-form--exchange">
      <div className="action-form__header">
        <h2>Exchange Currency</h2>
        <span>Move funds between balances</span>
      </div>

      <div className="action-form__row">
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          {supportedCurrencies.map(({ code }) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <span>→</span>
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          {supportedCurrencies.map(({ code }) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      <div className="amount-input-shell">
        <span className="amount-chip" aria-hidden="true">
          {from}
        </span>
        <input
          type="number"
          inputMode="decimal"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button className="action-button" onClick={handleExchange}>Convert</button>
      {message ? <p className="form-message">{message}</p> : null}
    </div>
  );
};

export default ExchangeForm;
