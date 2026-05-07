import { useState } from "react";
import { useWallet } from "../context/WalletContext";
import AmountInput from "./AmountInput";
import CurrencySelect from "./CurrencySelect";
import { convertAmount, formatCurrencyAmount } from "../utils/exchangeRates";
import "../styles/ExchangeForm.css";

const ExchangeForm = () => {
  const { exchangeCurrency, supportedCurrencies } = useWallet();
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const previewAmount = Number.parseFloat(amount);
  const previewConverted =
    Number.isFinite(previewAmount) && previewAmount > 0 && from !== to
      ? convertAmount(previewAmount, from, to)
      : 0;

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
        <span>Move value from one currency to another</span>
      </div>

      <div className="action-form__row">
        <CurrencySelect
          className="exchange-select"
          currencies={supportedCurrencies}
          value={from}
          onChange={setFrom}
        />
        <span>→</span>
        <CurrencySelect
          className="exchange-select"
          currencies={supportedCurrencies}
          value={to}
          onChange={setTo}
        />
      </div>

      <AmountInput currency={from} amount={amount} onChange={setAmount} />

      {Number.isFinite(previewAmount) && previewAmount > 0 && from !== to ? (
        <p className="form-message">
          {formatCurrencyAmount(previewAmount, from)} {from} will convert to{" "}
          {formatCurrencyAmount(previewConverted, to)} {to}
        </p>
      ) : null}

      <button className="action-button" onClick={handleExchange}>
        Convert
      </button>
      {message ? <p className="form-message">{message}</p> : null}
    </div>
  );
};

export default ExchangeForm;
