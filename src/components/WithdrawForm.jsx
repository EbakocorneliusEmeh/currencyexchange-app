import { useState } from "react";
import { useWallet } from "../context/WalletContext";
import AmountInput from "./AmountInput";
import CurrencySelect from "./CurrencySelect";
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
        <CurrencySelect
          className="withdraw-select"
          currencies={supportedCurrencies}
          value={currency}
          onChange={setCurrency}
        />
        <AmountInput currency={currency} amount={amount} onChange={setAmount} />
        <button className="action-button" onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>
      {message ? <p className="form-message">{message}</p> : null}
    </div>
  );
};

export default WithdrawForm;
