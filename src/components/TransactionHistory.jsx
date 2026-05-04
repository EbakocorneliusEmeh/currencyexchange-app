import React from "react";
import { useWallet } from "../context/WalletContext";

const TransactionHistory = () => {
  const { transactions } = useWallet();

  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Recent Activity</h2>
        <span>{transactions.length} entries</span>
      </div>

      <div className="activity-list">
        {transactions.map((transaction) => (
          <article key={transaction.id} className="activity-item">
            <div className="activity-main">
              <strong>{transaction.type}</strong>
              <span>{transaction.note}</span>
            </div>
            <div className="activity-side">
              <span>{new Date(transaction.createdAt).toLocaleDateString()}</span>
              <strong>
                {transaction.direction === "out" ? "-" : "+"}
                {transaction.amount.toFixed(2)} {transaction.currency}
              </strong>
            </div>
          </article>
        ))}

        {transactions.length === 0 ? (
          <p className="empty-state">No activity yet. Try a deposit or exchange.</p>
        ) : null}
      </div>
    </section>
  );
};

export default TransactionHistory;
