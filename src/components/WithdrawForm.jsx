import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";
import "../styles/WithdrawForm.css";

const WithdrawForm = () => {
  const { withdraw, supportedCurrencies } = useWallet();
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleWithdraw = () => {
    const parsed = parseFloat(amount);

    if (parsed > 0) {
      const success = withdraw(currency, parsed);
      setMessage(
        success ? "Withdrawal completed." : "You do not have enough balance."
      );
      setAmount("");
      return;
    }

    setMessage("Enter a valid withdrawal amount.");
  };

  return (
    <div className="action-form action-form--withdraw">
      <div className="action-form__header">
        <h2>Withdraw Funds</h2>
        <span>Remove money from a balance</span>
      </div>
      <div className="action-form__row">
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          {supportedCurrencies.map(({ code }) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <div className="amount-input-shell">
          <span className="amount-chip" aria-hidden="true">
            {currency}
          </span>
          <input
            type="number"
            inputMode="decimal"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className="action-button" onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>
      {message ? <p className="form-message">{message}</p> : null}
    </div>
  );
};

export default WithdrawForm;
