import { useWallet } from "../context/WalletContext";
import { formatCurrencyAmount, formatTotalAmount } from "../utils/exchangeRates";

const BalanceBreakdown = () => {
  const { balanceSummary, defaultCurrency } = useWallet();

  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Balance Breakdown</h2>
        <span>Shown in {defaultCurrency}</span>
      </div>

      <div className="breakdown-list">
        {balanceSummary.map(({ currency, amount, convertedValue, share }) => (
          <div key={currency} className="breakdown-row">
            <div className="breakdown-meta">
              <strong>{currency}</strong>
              <span>
                {formatCurrencyAmount(amount, currency)} available
              </span>
            </div>
            <div className="breakdown-value">
              <span>
                {formatTotalAmount(convertedValue, defaultCurrency)}{" "}
                {defaultCurrency}
              </span>
              <small>{share.toFixed(1)}%</small>
            </div>
            <div className="breakdown-bar">
              <span style={{ width: `${Math.min(share, 100)}%` }} />
            </div>
          </div>
        ))}

        {balanceSummary.length === 0 ? (
          <p className="empty-state">No balances yet.</p>
        ) : null}
      </div>
    </section>
  );
};

export default BalanceBreakdown;
