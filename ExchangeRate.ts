import axios from "axios";
import dotenv from "dotenv";

dotenv.config;

interface AlphaVantageForex {
  [key: string]: {
    //Digital Currency Daily
    [key: string]: {
      //Date: 2023-02-06
      [key: string]: number; //4. close
    };
  };
}
function processData(
  data: AlphaVantageForex,
  fromCurr: string,
  toCurr: string
): void {
  let itemCount: number = 0;
  for (let dt in data["Time Series (Digital Currency Daily)"]) {
    //Convert data to unix timestamp
    const date = new Date(dt);

    //Extract exchange rate
    const rate =
      data["Time Series (Digital Currency Daily)"][dt]["4a. close (CNY)"];

    //Log downloaded data
    console.log(
      `TimeStamp: ${date.getTime()}. ${fromCurr} to ${toCurr}: ${rate}`
    );
    ++itemCount;
  }
  console.log(`Number of data items: ${itemCount}`);
}

//Downloads data from AlphaVantage
async function downloadData() {
  //Currency symbol
  const symbol: string = "BTC";
  const market: string = "CNY";

  //Base url
  let url: string =
    "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY";

  //Add API key
  url += "&apikey=" + process.env.ALPHAVANTAGE_API_KEY;

  //Request complete data
  // url += "&outputsize=full";

  //Add currency symbols
  url += "&symbol=" + symbol + "&market=" + market;

  //Sent GET to endpoint with Axios
  let data: AlphaVantageForex = (await axios.get(url)).data;

  //Output the data
  processData(data, symbol, market);
}

downloadData();
