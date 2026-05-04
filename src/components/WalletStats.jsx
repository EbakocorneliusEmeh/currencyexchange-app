import React from "react";
import { useWallet } from "../context/WalletContext";

const WalletStats = () => {
  const {
    defaultCurrency,
    getTotalInDefault,
    transactions,
    getLatestTransaction,
    balances
  } = useWallet();

  const total = getTotalInDefault();
  const currencyCount = Object.values(balances).filter((value) => value > 0).length;
  const latestTransaction = getLatestTransaction();

  return (
    <section className="wallet-stats">
      <article className="stat-card accent">
        <span className="stat-label">Total value</span>
        <strong>
          {total.toFixed(2)} {defaultCurrency}
        </strong>
      </article>
      <article className="stat-card">
        <span className="stat-label">Currencies held</span>
        <strong>{currencyCount}</strong>
      </article>
      <article className="stat-card">
        <span className="stat-label">Transactions</span>
        <strong>{transactions.length}</strong>
      </article>
      <article className="stat-card">
        <span className="stat-label">Latest activity</span>
        <strong>{latestTransaction ? latestTransaction.type : "No activity yet"}</strong>
      </article>
    </section>
  );
};

export default WalletStats;
