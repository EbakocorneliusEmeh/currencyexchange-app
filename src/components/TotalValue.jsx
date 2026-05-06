import { useWallet } from "../context/WalletContext";
import { formatTotalAmount } from "../utils/exchangeRates";

const TotalValue = () => {
  const { totalInDefault, defaultCurrency } = useWallet();

  return (
    <div className="wallet-total-value">
      <h2>
        Totalised value in {defaultCurrency}:{" "}
        {formatTotalAmount(totalInDefault, defaultCurrency)} {defaultCurrency}
      </h2>
    </div>
  );
};

export default TotalValue;
