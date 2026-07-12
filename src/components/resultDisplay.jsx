import React from "react";

function ResultDisplay({ result, isPrice }) {
  const isPlaceholder = result === "Enter values to calculate";

  return (
    <div className={`result-box ${isPlaceholder ? "" : "animate-pop"}`}>
      <h3>{isPrice ? "Total Bill Amount:" : "Quantity to Give:"}</h3>
      <p className="result-text">{result}</p>
    </div>
  );
}

export default ResultDisplay;
//this is the test
