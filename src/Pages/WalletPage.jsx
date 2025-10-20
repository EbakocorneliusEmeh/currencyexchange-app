import React from "react";
import { useWallet } from "../context/WalletContext";
import CurrencyCard from "../components/CurrencyCard";
import CurrencySelectorWithFlags from "../components/CurrencySelectorWithflags";
import TotalValue from "../components/TotalValue";
import ExchangeForm from "../components/ExchangeForm";
import DepositForm from "../components/DepositeForm";
import "../styles/WalletApp.css";

const WalletPage = () => {
  const { balances } = useWallet();

  return (
    <div className="wallet-app">
      <h2>Your Wallet</h2>

      <div className="currency-cards">
        {Object.entries(balances).map(([currency, amount]) => (
          <CurrencyCard key={currency} currency={currency} amount={amount} />
        ))}
      </div>

      <CurrencySelectorWithFlags />

      <TotalValue />

      <div className="forms-container">
        <ExchangeForm />
        <DepositForm />
      </div>
    </div>
  );
};

export default WalletPage;
