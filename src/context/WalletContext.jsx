import React, { createContext, useContext, useState, useEffect } from "react";
import data from "../data/data.json";

const WalletContext = createContext();
export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [balances, setBalances] = useState({});
  const [defaultCurrency, setDefaultCurrency] = useState("USD");

  const exchangeRates = {
    USD: { USD: 1, EUR: 1 / 1.24, XAF: 610 },
    EUR: { EUR: 1, USD: 1.24, XAF: 655 },
    XAF: { XAF: 1, USD: 1 / 610, EUR: 1 / 655 }
  };

  useEffect(() => {
    const stored = localStorage.getItem("walletData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setBalances(parsed.balances);
      setDefaultCurrency(parsed.defaultCurrency);
    } else {
      setBalances(data.balances);
      setDefaultCurrency(data.defaultCurrency);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(balances).length > 0) {
      localStorage.setItem("walletData", JSON.stringify({ balances, defaultCurrency }));
    }
  }, [balances, defaultCurrency]);

  const exchangeCurrency = (from, to, amount) => {
    const rate = exchangeRates[from][to];
    const converted = amount * rate;
    setBalances(prev => ({
      ...prev,
      [from]: prev[from] - amount,
      [to]: prev[to] + converted
    }));
  };

  const deposit = (currency, amount) => {
    setBalances(prev => ({
      ...prev,
      [currency]: prev[currency] + amount
    }));
  };

  const getTotalInDefault = () => {
    return Object.entries(balances).reduce((total, [currency, amount]) => {
      const rate = exchangeRates[currency][defaultCurrency] || 1;
      return total + amount * rate;
    }, 0);
  };

  return (
    <WalletContext.Provider
      value={{
        balances,
        defaultCurrency,
        setDefaultCurrency,
        exchangeCurrency,
        deposit,
        getTotalInDefault
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
