import React from "react";
import { useWallet } from "../context/WalletContext";

const BalanceBreakdown = () => {
  const { getBalanceSummary, defaultCurrency } = useWallet();
  const summary = getBalanceSummary();

  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Balance Breakdown</h2>
        <span>Shown in {defaultCurrency}</span>
      </div>

      <div className="breakdown-list">
        {summary.map(({ currency, amount, convertedValue, share }) => (
          <div key={currency} className="breakdown-row">
            <div className="breakdown-meta">
              <strong>{currency}</strong>
              <span>{amount.toFixed(2)} available</span>
            </div>
            <div className="breakdown-value">
              <span>
                {convertedValue.toFixed(2)} {defaultCurrency}
              </span>
              <small>{share.toFixed(1)}%</small>
            </div>
            <div className="breakdown-bar">
              <span style={{ width: `${Math.min(share, 100)}%` }} />
            </div>
          </div>
        ))}

        {summary.length === 0 ? <p className="empty-state">No balances yet.</p> : null}
      </div>
    </section>
  );
};

export default BalanceBreakdown;
