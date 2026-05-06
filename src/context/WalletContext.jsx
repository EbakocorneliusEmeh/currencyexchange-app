import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import data from "../data/data.json";
import {
  CURRENCY_ORDER,
  convertAmount,
  getCurrencyMeta,
  SUPPORTED_CURRENCIES
} from "../utils/exchangeRates";

const WalletContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useWallet = () => useContext(WalletContext);

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

const normalizeBalances = (balances = {}) =>
  CURRENCY_ORDER.reduce((acc, currency) => {
    acc[currency] = Number(balances[currency] ?? 0);
    return acc;
  }, {});

export const WalletProvider = ({ children }) => {
  const [balances, setBalances] = useState(() => normalizeBalances(data.balances));
  const [defaultCurrency, setDefaultCurrency] = useState(
    data.defaultCurrency ?? "USD"
  );
  const [transactions, setTransactions] = useState([]);
  const supportedCurrencies = useMemo(
    () => data.supportedCurrencies ?? Object.values(SUPPORTED_CURRENCIES),
    []
  );

  useEffect(() => {
    const stored = localStorage.getItem("walletData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setBalances(normalizeBalances(parsed.balances));
        setDefaultCurrency(
          SUPPORTED_CURRENCIES[parsed.defaultCurrency] ? parsed.defaultCurrency : "USD"
        );
        setTransactions(parsed.transactions ?? []);
      } catch {
        setBalances(normalizeBalances(data.balances));
        setDefaultCurrency(data.defaultCurrency ?? "USD");
        setTransactions([]);
      }
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
        return total + convertAmount(amount, currency, defaultCurrency);
      }, 0),
    [balances, defaultCurrency]
  );

  const balanceSummary = useMemo(
    () =>
      Object.entries(balances)
        .map(([currency, amount]) => {
          const convertedValue = convertAmount(amount, currency, defaultCurrency);

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
    if (
      !SUPPORTED_CURRENCIES[from] ||
      !SUPPORTED_CURRENCIES[to] ||
      amount <= 0 ||
      from === to
    ) {
      return false;
    }

    const converted = convertAmount(amount, from, to);
    let success = false;

    setBalances((prev) => {
      if ((prev[from] ?? 0) < amount) {
        return prev;
      }

      success = true;
      return {
        ...prev,
        [from]: Number(prev[from] ?? 0) - amount,
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
    if (!SUPPORTED_CURRENCIES[currency] || amount <= 0) {
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
    if (!SUPPORTED_CURRENCIES[currency] || amount <= 0) {
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
        [currency]: Number(prev[currency] ?? 0) - amount
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
      transactionCount: transactions.length,
      getCurrencyMeta
    }}
    >
      {children}
    </WalletContext.Provider>
  );
};
