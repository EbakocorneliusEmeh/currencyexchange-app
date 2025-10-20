import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <p>© {year} Currency Wallet App. All rights reserved.</p>
      <div className="footer-links">
        <a href="#!" onClick={(e) => e.preventDefault()}>
          Docs
        </a>
        {" | "}
        <a href="#!" onClick={(e) => e.preventDefault()}>
          GitHub
        </a>
        {" | "}
        <a href="#!" onClick={(e) => e.preventDefault()}>
          Contact
        </a>
      </div>
      <p className="version">v1.0.0</p>
    </footer>
  );
};

export default Footer;
