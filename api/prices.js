// api/prices.js — Vercel Node.js Serverless Function

const AV_KEY = 'ZMF8T0GYQONK8CWS';

 

// Helper to mimic a normal browser request to prevent Yahoo Finance blocking Vercel's IPs

async function fetchYahooPrice(symbol) {

  try {

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;

    const response = await fetch(url, {

      headers: {

        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',

        'Accept': 'application/json'

      }

    });

   

    if (!response.ok) return null;

   

    const data = await response.json();

    const result = data?.chart?.result?.[0];

    if (!result) return null;

 

    const price = result.meta?.regularMarketPrice;

    const prevClose = result.meta?.chartPreviousClose;

    const change24h = prevClose ? ((price - prevClose) / prevClose) * 100 : 0;

    const currency = result.meta?.currency || 'USD';

 

    return { price, change24h, currency };

  } catch (e) {

    console.error(`Error fetching Yahoo ticker ${symbol}:`, e);

    return null;

  }

}

 

// Alpha Vantage fallback helper for India/International assets if needed

async function fetchAlphaVantagePrice(symbol) {

  try {

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${AV_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    const quote = data['Global Quote'];

    if (!quote || !quote['05. price']) return null;

 

    return {

      price: parseFloat(quote['05. price']),

      change24h: parseFloat(quote['09. change percent']?.replace('%', '')) || 0,

      currency: symbol.endsWith('.NS') || symbol.endsWith('.BO') ? 'INR' : 'USD'

    };

  } catch (e) {

    return null;

  }

}

 

// Vercel Serverless Core Handler

export default async function handler(req, res) {

  // Enable CORS

  res.setHeader('Access-Control-Allow-Credentials', true);

  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

 

  if (req.method === 'OPTIONS') {

    res.status(200).end();

    return;

  }

 

  try {

    const { stocks } = req.query;

    if (!stocks) {

      return res.status(200).json({ error: "No tickers provided" });

    }

 

    const tickerList = stocks.split(',');

    const prices = {};

 

    // Process all requests cleanly

    await Promise.all(tickerList.map(async (ticker) => {

      let data = null;

     

      // Use Yahoo for UAE markets due to extreme data licensing

      if (ticker.endsWith('.DU') || ticker.endsWith('.AD')) {

        data = await fetchYahooPrice(ticker);

      } else {

        // Use Yahoo primarily, fallback to Alpha Vantage for US/India

        data = await fetchYahooPrice(ticker);

        if (!data) {

          data = await fetchAlphaVantagePrice(ticker);

        }

      }

 

      if (data) {

        prices[ticker] = data;

      }

    }));

 

    return res.status(200).json(prices);

  } catch (error) {

    return res.status(500).json({ error: error.message });

  }

}
