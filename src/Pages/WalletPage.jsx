import React from "react";
import { useWallet } from "../context/WalletContext";
import CurrencyCard from "../components/CurrencyCard";
import CurrencySelectorWithFlags from "../components/CurrencySelectorWithflags";
import TotalValue from "../components/TotalValue";
import ExchangeForm from "../components/ExchangeForm";
import DepositForm from "../components/DepositeForm";
import WithdrawForm from "../components/WithdrawForm";
import WalletStats from "../components/WalletStats";
import BalanceBreakdown from "../components/BalanceBreakdown";
import TransactionHistory from "../components/TransactionHistory";
import "../styles/WalletApp.css";

const WalletPage = () => {
  const { balances } = useWallet();

  return (
    <main className="wallet-app">
      <section className="wallet-hero panel">
        <div>
          <p className="eyebrow">Multi-currency dashboard</p>
          <h2>Your Wallet</h2>
          <p className="wallet-intro">
            Track balances, convert funds, and review recent activity from one place.
          </p>
        </div>

        <WalletStats />
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h2>Currency Cards</h2>
          <span>{Object.keys(balances).length} balances tracked</span>
        </div>
        <div className="currency-cards">
          {Object.entries(balances).map(([currency, amount]) => (
            <CurrencyCard key={currency} currency={currency} amount={amount} />
          ))}
        </div>
      </section>

      <div className="wallet-grid">
        <BalanceBreakdown />
        <TransactionHistory />
      </div>

      <section className="panel">
        <div className="panel-heading">
          <h2>Wallet Tools</h2>
          <span>Manage your default currency and balances</span>
        </div>

        <CurrencySelectorWithFlags />
        <TotalValue />

        <div className="forms-container">
          <ExchangeForm />
          <DepositForm />
          <WithdrawForm />
        </div>
      </section>
    </main>
  );
};

export default WalletPage;
