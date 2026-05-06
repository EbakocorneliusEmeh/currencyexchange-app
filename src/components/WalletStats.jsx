import { useWallet } from "../context/WalletContext";

const WalletStats = () => {
  const {
    defaultCurrency,
    totalInDefault,
    transactionCount,
    latestTransaction,
    currencyCount
  } = useWallet();

  return (
    <section className="wallet-stats">
      <article className="stat-card accent">
        <span className="stat-label">Total value</span>
        <strong>
          {totalInDefault.toFixed(2)} {defaultCurrency}
        </strong>
      </article>
      <article className="stat-card">
        <span className="stat-label">Currencies held</span>
        <strong>{currencyCount}</strong>
      </article>
      <article className="stat-card">
        <span className="stat-label">Transactions</span>
        <strong>{transactionCount}</strong>
      </article>
      <article className="stat-card">
        <span className="stat-label">Latest activity</span>
        <strong>
          {latestTransaction ? latestTransaction.type : "No activity yet"}
        </strong>
      </article>
    </section>
  );
};

export default WalletStats;
