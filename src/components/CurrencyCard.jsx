import "../styles/CurrencyCard.css";
import { formatCurrencyAmount } from "../utils/exchangeRates";


const CurrencyCard = ({ currency, amount }) => {
  const flags = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    XAF: "🇨🇲"
  };

  return (
    <div className="currency-card">
      <span className="flag">{flags[currency]}</span>
      <div className="currency-info">
        <h3>{currency} balance</h3>
        <p>
          {formatCurrencyAmount(amount, currency)} {currency}
        </p>
      </div>
    </div>
  );
};

export default CurrencyCard;
