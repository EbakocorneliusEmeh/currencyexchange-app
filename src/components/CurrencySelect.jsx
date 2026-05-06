import React from "react";

const CurrencySelect = ({
  currencies,
  value,
  onChange,
  className = "",
  getOptionLabel = ({ code }) => code
}) => {
  return (
    <select
      className={className}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {currencies.map((currency) => (
        <option key={currency.code} value={currency.code}>
          {getOptionLabel(currency)}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelect;
