import "../styles/AboutPage.css";

const AboutPage = () => {
  return (
    <main className="about-page">
      <section className="about-card">
        <p className="about-eyebrow">Currency Exchange Project</p>
        <h2>About Currency Wallet</h2>
        <p>
          Currency Wallet is a simple React app that helps users manage balances
          in USD, EUR, and XAF from one place.
        </p>
        <p>
          The app supports deposits, exchanges, default currency selection, and a
          totalized wallet value calculated across all balances.
        </p>
        <p>
          It is built with reusable components, local state management, and a
          responsive layout designed for quick wallet simulation.
        </p>
        <p>
          Version: <strong>1.0.0</strong>
        </p>
      </section>
    </main>
  );
};

export default AboutPage;
