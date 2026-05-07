import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import Header from "./components/Header";
import WalletPage from "./Pages/WalletPage";
import AboutPage from "./Pages/AboutPage";
import "./styles/WalletApp.css";
import Footer from "./components/Footer";


export default function App() {
  return (
    <WalletProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<WalletPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </Router>
    </WalletProvider>
  );
}
