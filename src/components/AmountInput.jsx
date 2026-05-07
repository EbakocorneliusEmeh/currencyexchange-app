import React from "react";

const AmountInput = ({ currency, amount, onChange, placeholder = "Enter amount" }) => {
  return (
    <div className="amount-input-shell">
      <span className="amount-chip" aria-hidden="true">
        {currency}
      </span>
      <input
        type="number"
        inputMode="decimal"
        placeholder={placeholder}
        value={amount}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default AmountInput;
