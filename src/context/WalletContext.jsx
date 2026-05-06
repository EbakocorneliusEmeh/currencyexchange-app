import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import data from "../data/data.json";

const WalletContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useWallet = () => useContext(WalletContext);

const exchangeRates = {
  USD: { USD: 1, EUR: 1 / 1.24, XAF: 610 },
  EUR: { EUR: 1, USD: 1.24, XAF: 655 },
  XAF: { XAF: 1, USD: 1 / 610, EUR: 1 / 655 }
};

const createTransaction = ({
  type,
  currency,
  amount,
  direction,
  note,
  fromCurrency,
  toCurrency,
  convertedAmount
}) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  type,
  currency,
  amount,
  direction,
  note,
  fromCurrency,
  toCurrency,
  convertedAmount,
  createdAt: new Date().toISOString()
});

export const WalletProvider = ({ children }) => {
  const [balances, setBalances] = useState({});
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const [transactions, setTransactions] = useState([]);
  const supportedCurrencies = useMemo(
    () =>
      data.supportedCurrencies ??
      Object.keys(data.balances ?? {}).map((code) => ({
        code,
        name: code,
        flag: ""
      })),
    []
  );

  useEffect(() => {
    const stored = localStorage.getItem("walletData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setBalances(parsed.balances);
      setDefaultCurrency(parsed.defaultCurrency);
      setTransactions(parsed.transactions ?? []);
    } else {
      setBalances(data.balances);
      setDefaultCurrency(data.defaultCurrency);
      setTransactions(data.transactions ?? []);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(balances).length > 0) {
      localStorage.setItem(
        "walletData",
        JSON.stringify({ balances, defaultCurrency, transactions })
      );
    }
  }, [balances, defaultCurrency, transactions]);

  const totalInDefault = useMemo(
    () =>
      Object.entries(balances).reduce((total, [currency, amount]) => {
        const rate = exchangeRates[currency]?.[defaultCurrency] || 1;
        return total + amount * rate;
      }, 0),
    [balances, defaultCurrency]
  );

  const balanceSummary = useMemo(
    () =>
      Object.entries(balances)
        .map(([currency, amount]) => {
          const rate = exchangeRates[currency]?.[defaultCurrency] || 1;
          const convertedValue = amount * rate;

          return {
            currency,
            amount,
            convertedValue,
            share: totalInDefault > 0 ? (convertedValue / totalInDefault) * 100 : 0
          };
        })
        .sort((a, b) => b.convertedValue - a.convertedValue),
    [balances, defaultCurrency, totalInDefault]
  );

  const latestTransaction = useMemo(() => transactions[0] ?? null, [transactions]);
  const currencyCount = useMemo(
    () => Object.values(balances).filter((value) => value > 0).length,
    [balances]
  );

  const exchangeCurrency = useCallback((from, to, amount) => {
    if (!exchangeRates[from] || !exchangeRates[from][to] || amount <= 0 || from === to) {
      return false;
    }

    const rate = exchangeRates[from][to];
    const converted = amount * rate;
    let success = false;

    setBalances((prev) => {
      if ((prev[from] ?? 0) < amount) {
        return prev;
      }

      success = true;
      return {
        ...prev,
        [from]: prev[from] - amount,
        [to]: (prev[to] ?? 0) + converted
      };
    });

    if (!success) {
      return false;
    }

    setTransactions((prev) => [
      createTransaction({
        type: "exchange",
        currency: from,
        amount,
        direction: "out",
        note: `Converted ${amount.toFixed(2)} ${from} to ${converted.toFixed(2)} ${to}`,
        fromCurrency: from,
        toCurrency: to,
        convertedAmount: converted
      }),
      ...prev
    ]);
    return true;
  }, []);

  const deposit = useCallback((currency, amount) => {
    if (amount <= 0) {
      return false;
    }

    setBalances((prev) => ({
      ...prev,
      [currency]: (prev[currency] ?? 0) + amount
    }));
    setTransactions((prev) => [
      createTransaction({
        type: "deposit",
        currency,
        amount,
        direction: "in",
        note: `Deposited ${amount.toFixed(2)} ${currency}`
      }),
      ...prev
    ]);
    return true;
  }, []);

  const withdraw = useCallback((currency, amount) => {
    if (amount <= 0) {
      return false;
    }

    let success = false;

    setBalances((prev) => {
      if ((prev[currency] ?? 0) < amount) {
        return prev;
      }

      success = true;
      return {
        ...prev,
        [currency]: prev[currency] - amount
      };
    });

    if (!success) {
      return false;
    }

    setTransactions((prev) => [
      createTransaction({
        type: "withdraw",
        currency,
        amount,
        direction: "out",
        note: `Withdrew ${amount.toFixed(2)} ${currency}`
      }),
      ...prev
    ]);
    return true;
  }, []);

  return (
    <WalletContext.Provider
      value={{
        balances,
        defaultCurrency,
        setDefaultCurrency,
        supportedCurrencies,
        exchangeCurrency,
        deposit,
        withdraw,
        totalInDefault,
        balanceSummary,
        transactions,
        latestTransaction,
        currencyCount,
        transactionCount: transactions.length
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
