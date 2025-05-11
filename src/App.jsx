import React, { useEffect, useState } from "react";
import CurrenciesOpt from "./CurrenciesOpt";

const App = () => {
  const [converted, setConverted] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_API_KEY;

  function handleChange(e) {
    const prevValue = e.target.value.replace(",", ".");
    const value = prevValue === "" ? "" : parseFloat(prevValue);
    if (prevValue === "" || !isNaN(value)) {
      setAmount(prevValue);
    }
  }

  useEffect(() => {
    async function convert() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`
        );

        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        setConverted(data.conversion_rate);
      } finally {
        setIsLoading(false);
      }
    }

    convert();
  }, [fromCurrency, toCurrency, API_KEY]);
  return (
    <main className="content">
      <div className="xchange">
        <h1>XchangePro</h1>
        <label>
          Amount
          <input type="text" value={amount} onChange={handleChange} />
        </label>
        <CurrenciesOpt
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          setToCurrency={setToCurrency}
          setFromCurrency={setFromCurrency}
        />

        <p className="result">
          {(parseFloat(amount || 0) * converted).toFixed(2)} {toCurrency}
        </p>
      </div>
    </main>
  );
};

export default App;
