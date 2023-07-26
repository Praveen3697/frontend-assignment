import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [symbol, setSymbol] = useState("");
  const [date, setDate] = useState("");
  const [tradeData, setTradeData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setTradeData(null);

      const response = await axios.post(
        "http://localhost:5000/api/fetchStockData",
        { symbol, date }
      );

      // Update the tradeData state with the received data
      setTradeData(response.data);
    } catch (error) {
      console.log(error);
      setError("Error fetching stock data. Please check the symbol and date.");
      console.error("Error fetching stock data:", error.message);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Stock Trade Statistics</h1>
      <form className="form" onSubmit={handleSubmit}>
        <table className="table">
          <tr className="tableRow">
            <td>
              <label htmlFor="symbol">Stock Symbol:</label>
            </td>
            <td>
              <input
                type="text"
                id="symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="date">Date:</label>
            </td>
            <td>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button type="submit" className="btn-submit">
                Submit
              </button>
            </td>
          </tr>
        </table>
      </form>

      {tradeData && (
        <div className="trade-data">
          <h2>
            Trade Statistics for {symbol} on {date}
          </h2>
          <p>Open: {tradeData.open}</p>
          <p>High: {tradeData.high}</p>
          <p>Low: {tradeData.low}</p>
          <p>Close: {tradeData.close}</p>
          <p>Volume: {tradeData.volume}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
