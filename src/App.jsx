import React, { useEffect, useState } from "react";
import CurrenciesOpt from "./CurrenciesOpt";

const App = () => {
  const [converted, setConverted] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("GBP");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_API_KEY;

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
  }, [fromCurrency, toCurrency, amount, API_KEY]);
  return (
    <div>
      <h1>XchangePro</h1>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <CurrenciesOpt
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        setToCurrency={setToCurrency}
        setFromCurrency={setFromCurrency}
      />
      {!isLoading && (
        <p>
          {(amount * converted).toFixed(2)} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default App;
