import React from "react";
import { useWallet } from "../context/WalletContext";

const TotalValue = () => {
  const { getTotalInDefault, defaultCurrency } = useWallet();

  return (
    <div className="total-value">
      <h2>
        Total Value in {defaultCurrency}:{" "}
        {getTotalInDefault().toFixed(2)} {defaultCurrency}
      </h2>
    </div>
  );
};

export default TotalValue;
