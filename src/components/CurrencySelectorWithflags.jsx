import { useWallet } from "../context/WalletContext";
import CurrencySelect from "./CurrencySelect";
import "../styles/CurrencySelectorWithFlags.css";

const CurrencySelectorWithFlags = () => {
  const { defaultCurrency, setDefaultCurrency, supportedCurrencies } = useWallet();

  return (
    <div className="currency-selector-card">
      <div className="currency-selector-header">
        <h2>Set Default Currency</h2>
        <span>Changes the totals shown across the dashboard</span>
      </div>
      <CurrencySelect
        currencies={supportedCurrencies}
        value={defaultCurrency}
        onChange={setDefaultCurrency}
        getOptionLabel={({ flag, code }) => `${flag} ${code}`.trim()}
      />
    </div>
  );
};

export default CurrencySelectorWithFlags;
