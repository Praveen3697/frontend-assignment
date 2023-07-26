// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.enable("trust proxy");

app.post("/api/fetchStockData", async (req, res) => {
  // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
  try {
    const { symbol, date } = req.body;

    // Validate symbol and date inputs
    if (!symbol || !date) {
      return res.status(400).json({ error: "Symbol and date are required." });
    }

    // Fetch trade data from Polygon API
    const response = await axios.get(
      `https://api.polygon.io/v1/open-close/${symbol}/${date}?adjusted=true&apiKey=eUpsaIhAYostOhbwuvQ6_cTeHTJ9XyEM`
    );

    const { open, high, low, close, volume } = response.data;

    // Return only the required fields
    return res.json({ open, high, low, close, volume });
  } catch (error) {
    console.error("Error fetching stock data:", error.message);
    return res
      .status(500)
      .json({ error: "Something went wrong while fetching stock data." });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
