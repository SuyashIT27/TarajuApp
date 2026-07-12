import React from "react";

function Header({ theme, toggleTheme }) {
  return (
    <header className="app-header">
      <div className="title-area">
        <span className="scale-icon animate-bounce">⚖️</span>
        <h1>Taraju Calc</h1>
      </div>
      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label="Toggle Theme"
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </header>
  );
}

export default Header;
