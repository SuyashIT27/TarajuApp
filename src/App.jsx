import React, { useState } from "react";
import Header from "./components/Header";
import CalculatorForm from "./components/CalculatorForm";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`app-container ${theme}`}>
      <div className="app-card animate-fade-in">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <CalculatorForm />
        <Footer />
      </div>
    </div>
  );
}

export default App;
