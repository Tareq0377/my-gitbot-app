import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const browserPref = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(localStorage.getItem("theme") || (browserPref ? "dark" : "light"));
  }, []);

  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <Header />
      <main role="main" className="p-4">
        <button onClick={toggleTheme} aria-pressed={theme === "dark"} aria-label="Toggle theme">
          Toggle theme
        </button>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
