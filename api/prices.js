// api/prices.js — Vercel Serverless Function (CommonJS format)

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action, symbols, query, market } = req.query;

  try {

    // ── SEARCH ──
    if (action === 'search') {
      if (!query || query.length < 2) return res.json({ results: [] });

      // Crypto search
      if (market === 'Crypto') {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/search?query=' + encodeURIComponent(query)
        );
        const data = await response.json();
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
      const suffix = getSuffix(market);
      const searchQ = suffix ? query + ' ' + suffix : query;
      const url = 'https://query2.finance.yahoo.com/v1/finance/search?q=' +
        encodeURIComponent(searchQ) +
        '&lang=en-US&region=US&quotesCount=10&newsCount=0';

      const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' }
      });
      const data = await response.json();
      let quotes = data.quotes || [];

      // Filter by market
      if (market === 'DFM') quotes = quotes.filter(q => q.symbol && q.symbol.endsWith('.DU'));
      else if (market === 'ADX') quotes = quotes.filter(q => q.symbol && q.symbol.endsWith('.AD'));
      else if (market === 'NSE') quotes = quotes.filter(q => q.symbol && q.symbol.endsWith('.NS'));
      else if (market === 'BSE') quotes = quotes.filter(q => q.symbol && q.symbol.endsWith('.BO'));
      else if (market === 'International') quotes = quotes.filter(q => q.symbol && !q.symbol.includes('.'));

      const results = quotes.slice(0, 8).map(q => ({
        symbol: q.symbol,
        name: q.longname || q.shortname || q.symbol,
        exchange: q.exchDisp || q.exchange || market,
        type: 'stock',
      }));

      return res.json({ results });
    }

    // ── PRICES ──
    if (action === 'prices') {
      if (!symbols) return res.json({ prices: {} });

      const symbolList = symbols.split(',').map(s => s.trim()).filter(Boolean);
      const prices = {};

      const cryptoList = symbolList.filter(s => s.startsWith('crypto:'));
      const stockList = symbolList.filter(s => !s.startsWith('crypto:'));

      // Fetch crypto
      if (cryptoList.length > 0) {
        const ids = cryptoList.map(s => s.replace('crypto:', '')).join(',');
        try {
          const r = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=' + ids + '&vs_currencies=usd&include_24hr_change=true'
          );
          const data = await r.json();
          for (const id in data) {
            prices['crypto:' + id] = {
              price: data[id].usd,
              change24h: data[id].usd_24h_change,
              currency: 'USD',
            };
          }
        } catch (e) {
          console.error('CoinGecko error:', e.message);
        }
      }

      // Fetch stocks
      if (stockList.length > 0) {
        const joined = stockList.join(',');
        try {
          const r = await fetch(
            'https://query1.finance.yahoo.com/v7/finance/quote?symbols=' +
            encodeURIComponent(joined) +
            '&fields=regularMarketPrice,regularMarketChangePercent,currency',
            { headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' } }
          );
          const data = await r.json();
          const result = (data && data.quoteResponse && data.quoteResponse.result) || [];
          for (const q of result) {
            prices[q.symbol] = {
              price: q.regularMarketPrice,
              change24h: q.regularMarketChangePercent,
              currency: q.currency || 'USD',
            };
          }
        } catch (e) {
          console.error('Yahoo Finance error:', e.message);
        }
      }

      return res.json({ prices });
    }

    return res.status(400).json({ error: 'Use action=search or action=prices' });

  } catch (err) {
    console.error('Handler error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};

function getSuffix(market) {
  const map = { DFM: '.DU', ADX: '.AD', NSE: '.NS', BSE: '.BO' };
  return map[market] || '';
}
