import React from "react";
import { useWallet } from "../context/WalletContext";
import "../styles/CurrencySelectorWithFlags.css"

const CurrencySelectorWithFlags = () => {
  const { defaultCurrency, setDefaultCurrency, supportedCurrencies } = useWallet();

  return (
    <div className="currency-selector-card">
      <div className="currency-selector-header">
        <h2>Set Default Currency</h2>
        <span>Changes the totals shown across the dashboard</span>
      </div>
      <select
        value={defaultCurrency}
        onChange={(e) => setDefaultCurrency(e.target.value)}
      >
        {supportedCurrencies.map(({ code, flag }) => (
          <option key={code} value={code}>
            {flag} {code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelectorWithFlags;
