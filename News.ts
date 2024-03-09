//Use Node module for accessing newsapi
import NewsAPI from "newsapi";

//Module that reads keys from .env file
import dotenv from "dotenv";

//Copy variables in file into environment variables
dotenv.config();

import { saveNews } from "./put";

//Define structure of article returned from NewsAPI
interface Article {
  title: string;
  publishedAt: string;
}

//Define structure of data returned from NewsAPI
interface NewsAPIResult {
  articles: Array<Article>;
}

//Pulls and logs data from API
async function downloadNews(currency: {
  symbol: string;
  newsQuery: string;
}): Promise<void> {
  //Create new NewsAPI class
  const newsapi = new NewsAPI(process.env.NEWS_API);

  //Search API
  const result: NewsAPIResult = await newsapi.v2.everything({
    q: currency.newsQuery,
    pageSize: 5,
    language: "en",
  });

  //Output article titles and dates
  console.log(`Number of articles: ${result.articles.length}`);
  for (let article of result.articles) {
    const date = new Date(article.publishedAt);
    console.log(`Unix Time: ${date.getTime()}; title: ${article.title}`);

    await saveNews(currency.symbol, date.getTime(), article.title);

    //Store timestamp and headlines in DynamoDB
  }
}

async function main() {
  const crytpoCurrencies: Array<{ symbol: string; newsQuery: string }> = [
    { symbol: "BTC", newsQuery: "Bitcoin" },
  ];

  //Work through array to download news for each currency
  for (let currency of crytpoCurrencies) {
    await downloadNews(currency);
  }
}

main();
