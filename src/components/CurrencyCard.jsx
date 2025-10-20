import React from "react";
import "../styles/CurrencyCard.css";


const CurrencyCard = ({ currency, amount }) => {
  const flags = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    XAF: "🇨🇲"
  };

  return (
    <div className="currency-card">
      <span className="flag">{flags[currency]}</span>
      <div className="currency-info">
        <h3>{currency}</h3>
        <p>{amount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CurrencyCard;
