export const SUPPORTED_CURRENCIES = {
  USD: {
    code: "USD",
    name: "US Dollar",
    flag: "🇺🇸",
    decimals: 2
  },
  EUR: {
    code: "EUR",
    name: "Euro",
    flag: "🇪🇺",
    decimals: 2
  },
  XAF: {
    code: "XAF",
    name: "CFA Franc",
    flag: "🇨🇲",
    decimals: 0
  }
};

// The app uses USD as the reference currency to keep conversions predictable.
// 1 EUR = 1.24 USD and 1 USD = 600 XAF.
export const TO_USD_RATE = {
  USD: 1,
  EUR: 1.24,
  XAF: 1 / 600
};

export const CURRENCY_ORDER = ["USD", "EUR", "XAF"];

export const getCurrencyMeta = (currency) =>
  SUPPORTED_CURRENCIES[currency] ?? {
    code: currency,
    name: currency,
    flag: "",
    decimals: 2
  };

export const convertAmount = (amount, fromCurrency, toCurrency) => {
  if (!Number.isFinite(amount) || amount < 0) {
    return 0;
  }

  if (fromCurrency === toCurrency) {
    return amount;
  }

  const fromRate = TO_USD_RATE[fromCurrency];
  const toRate = TO_USD_RATE[toCurrency];

  if (!fromRate || !toRate) {
    return 0;
  }

  return (amount * fromRate) / toRate;
};

export const formatCurrencyAmount = (amount, currency, decimals) => {
  const fractionDigits =
    decimals ?? getCurrencyMeta(currency).decimals ?? 2;

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(Number(amount) || 0);
};

export const formatTotalAmount = (amount, currency) => {
  const fractionDigits = currency === "XAF" ? 0 : 3;

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(Number(amount) || 0);
};
