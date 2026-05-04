import React, { createContext, useContext, useState, useEffect } from "react";
import data from "../data/data.json";

const WalletContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [balances, setBalances] = useState({});
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const [transactions, setTransactions] = useState([]);
  const supportedCurrencies =
    data.supportedCurrencies ??
    Object.keys(data.balances ?? {}).map((code) => ({
      code,
      name: code,
      flag: ""
    }));

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

  const exchangeCurrency = (from, to, amount) => {
    if (!exchangeRates[from] || !exchangeRates[from][to] || amount <= 0 || from === to) {
      return false;
    }

    if ((balances[from] ?? 0) < amount) {
      return false;
    }

    const rate = exchangeRates[from][to];
    const converted = amount * rate;
    setBalances((prev) => ({
      ...prev,
      [from]: prev[from] - amount,
      [to]: (prev[to] ?? 0) + converted
    }));
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
  };

  const deposit = (currency, amount) => {
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
  };

  const withdraw = (currency, amount) => {
    if (amount <= 0 || (balances[currency] ?? 0) < amount) {
      return false;
    }

    setBalances((prev) => ({
      ...prev,
      [currency]: prev[currency] - amount
    }));
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
  };

  const getTotalInDefault = () => {
    return Object.entries(balances).reduce((total, [currency, amount]) => {
      const rate = exchangeRates[currency]?.[defaultCurrency] || 1;
      return total + amount * rate;
    }, 0);
  };

  const getBalanceSummary = () => {
    const total = getTotalInDefault();

    return Object.entries(balances)
      .map(([currency, amount]) => {
        const rate = exchangeRates[currency]?.[defaultCurrency] || 1;
        const convertedValue = amount * rate;

        return {
          currency,
          amount,
          convertedValue,
          share: total > 0 ? (convertedValue / total) * 100 : 0
        };
      })
      .sort((a, b) => b.convertedValue - a.convertedValue);
  };

  const getLatestTransaction = () => transactions[0] ?? null;

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
        getTotalInDefault,
        getBalanceSummary,
        transactions,
        getLatestTransaction
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
