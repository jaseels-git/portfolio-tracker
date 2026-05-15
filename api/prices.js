// api/prices.js — Vercel Serverless Function
// Handles: symbol search, live price fetching (Yahoo Finance + CoinGecko)

export default async function handler(req, res) {
// Allow CORS so your frontend HTML can call this
res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
res.setHeader(‘Access-Control-Allow-Methods’, ‘GET, OPTIONS’);
res.setHeader(‘Access-Control-Allow-Headers’, ‘Content-Type’);
if (req.method === ‘OPTIONS’) return res.status(200).end();

const { action, symbols, query, market } = req.query;

try {
// ── 1. SEARCH: find stocks by name or ticker ──
if (action === ‘search’) {
if (!query || query.length < 2) return res.json({ results: [] });

```
  // Crypto search via CoinGecko
  if (market === 'Crypto') {
    const r = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`
    );
    const data = await r.json();
    const results = (data.coins || []).slice(0, 8).map(c => ({
      symbol: c.id,
      name: c.name,
      exchange: 'Crypto',
      type: 'crypto',
      thumb: c.thumb,
    }));
    return res.json({ results });
  }

  // Stock search via Yahoo Finance
  const suffix = marketSuffix(market);
  const searchQuery = suffix && !query.includes('.') ? query : query;
  const url = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(searchQuery)}&lang=en-US&region=US&quotesCount=10&newsCount=0&enableFuzzyQuery=false&enableCb=true&enableNavLinks=false&enableEnhancedTrivialQuery=true`;

  const r = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json',
    }
  });
  const data = await r.json();
  let quotes = (data.quotes || []);

  // Filter by market suffix if a specific market is selected
  if (market && market !== 'International') {
    const sfx = marketSuffix(market);
    if (sfx) quotes = quotes.filter(q => q.symbol && q.symbol.endsWith(sfx));
  } else if (market === 'International') {
    // International = no suffix (US stocks)
    quotes = quotes.filter(q => q.symbol && !q.symbol.includes('.'));
  }

  const results = quotes.slice(0, 8).map(q => ({
    symbol: q.symbol,
    name: q.longname || q.shortname || q.symbol,
    exchange: q.exchDisp || q.exchange || '',
    type: q.quoteType || 'stock',
  }));

  return res.json({ results });
}

// ── 2. PRICES: fetch live prices for multiple symbols ──
if (action === 'prices') {
  if (!symbols) return res.json({ prices: {} });

  const symbolList = symbols.split(',').map(s => s.trim()).filter(Boolean);
  const prices = {};

  // Split into crypto vs stock symbols
  const cryptoSymbols = symbolList.filter(s => s.startsWith('crypto:'));
  const stockSymbols = symbolList.filter(s => !s.startsWith('crypto:'));

  // Fetch crypto prices
  if (cryptoSymbols.length > 0) {
    const ids = cryptoSymbols.map(s => s.replace('crypto:', '')).join(',');
    try {
      const r = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );
      const data = await r.json();
      for (const [id, info] of Object.entries(data)) {
        prices[`crypto:${id}`] = {
          price: info.usd,
          change24h: info.usd_24h_change,
          currency: 'USD',
        };
      }
    } catch (e) {
      console.error('CoinGecko error:', e);
    }
  }

  // Fetch stock prices via Yahoo Finance
  if (stockSymbols.length > 0) {
    const joined = stockSymbols.join(',');
    try {
      const r = await fetch(
        `https://query2.finance.yahoo.com/v8/finance/spark?symbols=${encodeURIComponent(joined)}&range=1d&interval=1d`,
        { headers: { 'User-Agent': 'Mozilla/5.0' } }
      );

      // Use quote summary for accurate current price
      const quoteUrl = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(joined)}&fields=regularMarketPrice,regularMarketChangePercent,currency`;
      const qr = await fetch(quoteUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' }
      });
      const qdata = await qr.json();
      const result = qdata?.quoteResponse?.result || [];

      for (const q of result) {
        prices[q.symbol] = {
          price: q.regularMarketPrice,
          change24h: q.regularMarketChangePercent,
          currency: q.currency || 'USD',
        };
      }
    } catch (e) {
      console.error('Yahoo Finance error:', e);
    }
  }

  return res.json({ prices });
}

return res.status(400).json({ error: 'Unknown action. Use action=search or action=prices' });
```

} catch (err) {
console.error(‘API error:’, err);
return res.status(500).json({ error: err.message });
}
}

function marketSuffix(market) {
const map = {
DFM: ‘.DU’,
ADX: ‘.AD’,
NSE: ‘.NS’,
BSE: ‘.BO’,
International: ‘’,
};
return map[market] ?? null;
}
