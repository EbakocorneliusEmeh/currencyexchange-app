import { useState } from "react";
import { useWallet } from "../context/WalletContext";
import AmountInput from "./AmountInput";
import CurrencySelect from "./CurrencySelect";
import "../styles/DepositForm.css";


const DepositForm = () => {
  const { deposit, supportedCurrencies } = useWallet();
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleDeposit = () => {
    const parsed = parseFloat(amount);
    if (parsed > 0) {
      const success = deposit(currency, parsed);
      setMessage(success ? "Deposit added to your wallet." : "Enter a valid deposit amount.");
      setAmount("");
      return;
    }
    setMessage("Enter a valid deposit amount.");
  };

  return (
    <div className="action-form action-form--deposit">
      <div className="action-form__header">
        <h2>Deposit Funds</h2>
        <span>Add money to a selected currency</span>
      </div>
      <div className="action-form__row">
        <CurrencySelect
          className="deposit-select"
          currencies={supportedCurrencies}
          value={currency}
          onChange={setCurrency}
        />
        <AmountInput currency={currency} amount={amount} onChange={setAmount} />
        <button className="action-button" onClick={handleDeposit}>
          Deposit
        </button>
      </div>
      {message ? <p className="form-message">{message}</p> : null}
    </div>
  );
};

export default DepositForm;
