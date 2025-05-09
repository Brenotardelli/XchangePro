import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_API_KEY;

const CurrenciesOpt = ({
  fromCurrency,
  toCurrency,
  setToCurrency,
  setFromCurrency,
}) => {
  const [currencies, setCurrencies] = useState([]);
  const flagCodeFrom = fromCurrency.substring(0, 2);
  const flagCodeTo = toCurrency.substring(0, 2);
  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/codes`
        );
        const data = await res.json();
        if (data.result === "success") {
          setCurrencies(data.supported_codes);
        }
      } catch (err) {
        throw new Error("Not Found");
      }
    }

    fetchCurrencies();
  }, []);

  return (
    <div>
      <div>
        <img
          src={`https://flagsapi.com/${flagCodeFrom}/flat/64.png`}
          alt="Flag"
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map(([code, name]) => (
            <option key={code} value={code}>
              {code} - {name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <img
          src={`https://flagsapi.com/${flagCodeTo}/flat/64.png`}
          alt="Flag"
        />
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map(([code, name]) => (
            <option key={code} value={code}>
              {code} - {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrenciesOpt;
