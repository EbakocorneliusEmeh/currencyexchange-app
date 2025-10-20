import React from "react";
import { useWallet } from "../context/WalletContext";
import "../styles/CurrencySelectorWithFlags.css"

const CurrencySelectorWithFlags = () => {
  const { defaultCurrency, setDefaultCurrency } = useWallet();

  const options = [
    { code: "USD", flag: "🇺🇸" },
    { code: "EUR", flag: "🇪🇺" },
    { code: "XAF", flag: "🇨🇲" }
  ];

  return (
    <div className="form-section">
      <h2>Set Default Currency</h2>
      <select
        value={defaultCurrency}
        onChange={(e) => setDefaultCurrency(e.target.value)}
      >
        {options.map(({ code, flag }) => (
          <option key={code} value={code}>
            {flag} {code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelectorWithFlags;
