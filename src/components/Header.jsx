import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const flagMap = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  XAF: "🇨🇲",
};

const Header = () => {
  const { defaultCurrency, getTotalInDefault } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="header-left">
        <h1>🌍 Currency Wallet</h1>
      </div>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`header-right ${menuOpen ? "open" : ""}`}>
        <div className="default-currency">
          {flagMap[defaultCurrency]} {defaultCurrency}
        </div>
        <div className="total-value">
          {getTotalInDefault().toFixed(2)} {defaultCurrency}
        </div>

        <nav className="nav-links">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
