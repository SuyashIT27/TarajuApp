import React, { useState, useEffect } from "react";
import ResultDisplay from "./resultDisplay";

function CalculatorForm() {
  // Mode toggle: 'amountToQty' (Price -> Weight) or 'qtyToAmount' (Weight -> Price)
  const [calcMode, setCalcMode] = useState("amountToQty");

  const [basePrice, setBasePrice] = useState("");
  const [baseUnit, setBaseUnit] = useState("kg");

  // Inputs for Mode 1 (Price -> Weight)
  const [targetAmount, setTargetAmount] = useState("");

  // Inputs for Mode 2 (Weight -> Price)
  const [inputQuantity, setInputQuantity] = useState("");
  const [inputUnit, setInputUnit] = useState("gm"); // Defaulting to grams since customers ask for it often

  const [result, setResult] = useState("Enter values to calculate");

  useEffect(() => {
    const price = parseFloat(basePrice);
    if (!price || price <= 0) {
      setResult("Enter values to calculate");
      return;
    }

    if (calcMode === "amountToQty") {
      // --- MODE 1: Target Budget -> Calculate Weight ---
      const amount = parseFloat(targetAmount);
      if (!amount || amount <= 0) {
        setResult("Enter values to calculate");
        return;
      }

      const rawQuantity = amount / price;

      if (baseUnit === "kg") {
        const grams = rawQuantity * 1000;
        setResult(
          grams < 1000
            ? `${grams.toFixed(0)} grams`
            : `${rawQuantity.toFixed(3)} kg`,
        );
      } else if (baseUnit === "liter") {
        const ml = rawQuantity * 1000;
        setResult(
          ml < 1000 ? `${ml.toFixed(0)} ml` : `${rawQuantity.toFixed(3)} L`,
        );
      } else {
        setResult(`${rawQuantity.toFixed(2)} ${baseUnit}`);
      }
    } else {
      // --- MODE 2: Target Weight -> Calculate Price ---
      const qty = parseFloat(inputQuantity);
      if (!qty || qty <= 0) {
        setResult("Enter values to calculate");
        return;
      }

      let finalPrice = 0;

      // Normalize everything based on the selected Base Unit row
      if (baseUnit === "kg") {
        // If price is per KG, but customer wants Grams
        if (inputUnit === "gm") {
          finalPrice = (qty / 1000) * price;
        } else {
          finalPrice = qty * price;
        }
      } else if (baseUnit === "liter") {
        // If price is per Liter, but customer wants ML
        if (inputUnit === "ml") {
          finalPrice = (qty / 1000) * price;
        } else {
          finalPrice = qty * price;
        }
      } else {
        // For plain grams or pieces
        finalPrice = qty * price;
      }

      setResult(`₹${finalPrice.toFixed(2)}`);
    }
  }, [basePrice, baseUnit, targetAmount, inputQuantity, inputUnit, calcMode]);

  return (
    <div className="form-container">
      {/* Mode Switcher Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <button
          className={`theme-toggle-btn ${calcMode === "amountToQty" ? "active-tab" : ""}`}
          style={{
            flex: 1,
            borderRadius: "8px",
            padding: "10px",
            background:
              calcMode === "amountToQty"
                ? "var(--accent)"
                : "var(--border-color)",
            color: calcMode === "amountToQty" ? "#fff" : "var(--text-main)",
          }}
          onClick={() => setCalcMode("amountToQty")}
        >
          💰 Find Weight
        </button>
        <button
          className={`theme-toggle-btn ${calcMode === "qtyToAmount" ? "active-tab" : ""}`}
          style={{
            flex: 1,
            borderRadius: "8px",
            padding: "10px",
            background:
              calcMode === "qtyToAmount"
                ? "var(--accent)"
                : "var(--border-color)",
            color: calcMode === "qtyToAmount" ? "#fff" : "var(--text-main)",
          }}
          onClick={() => setCalcMode("qtyToAmount")}
        >
          ⚖️ Find Price
        </button>
      </div>

      {/* Common Base Price Fields */}
      <div className="input-group">
        <label>Base Price (₹)</label>
        <input
          type="number"
          placeholder="e.g., 60"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Base Unit Rate</label>
        <select value={baseUnit} onChange={(e) => setBaseUnit(e.target.value)}>
          <option value="kg">Per Kilogram (kg)</option>
          <option value="gm">Per Gram (g)</option>
          <option value="liter">Per Liter (L)</option>
          <option value="pc">Per Piece (pc)</option>
        </select>
      </div>

      {/* Dynamic Conditional Fields based on Mode */}
      {calcMode === "amountToQty" ? (
        <div className="input-group animate-fade-in">
          <label>Customer Budget (₹)</label>
          <input
            type="number"
            placeholder="e.g., 15"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
          />
        </div>
      ) : (
        <div
          style={{ display: "flex", gap: "10px" }}
          className="animate-fade-in"
        >
          <div className="input-group" style={{ flex: 2 }}>
            <label>Customer Wants Quantity</label>
            <input
              type="number"
              placeholder="e.g., 250"
              value={inputQuantity}
              onChange={(e) => setInputQuantity(e.target.value)}
            />
          </div>
          <div className="input-group" style={{ flex: 1 }}>
            <label>Unit</label>
            <select
              value={inputUnit}
              onChange={(e) => setInputUnit(e.target.value)}
            >
              {baseUnit === "kg" && <option value="gm">grams</option>}
              {baseUnit === "kg" && <option value="kg">kg</option>}
              {baseUnit === "liter" && <option value="ml">ml</option>}
              {baseUnit === "liter" && <option value="liter">L</option>}
              {baseUnit === "gm" && <option value="gm">g</option>}
              {baseUnit === "pc" && <option value="pc">pieces</option>}
            </select>
          </div>
        </div>
      )}

      <ResultDisplay result={result} isPrice={calcMode === "qtyToAmount"} />
    </div>
  );
}

export default CalculatorForm;
