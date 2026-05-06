import { useWallet } from "../context/WalletContext";

const TotalValue = () => {
  const { totalInDefault, defaultCurrency } = useWallet();

  return (
    <div className="wallet-total-value">
      <h2>
        Total Value in {defaultCurrency}:{" "}
        {totalInDefault.toFixed(2)} {defaultCurrency}
      </h2>
    </div>
  );
};

export default TotalValue;
