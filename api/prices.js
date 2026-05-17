// api/prices.js — Vercel Serverless Function

// Built-in stock lists for markets Yahoo Finance search doesn't handle well
const BUILTIN = {
  DFM: [
    { symbol: 'EMAAR.DU', name: 'Emaar Properties' },
    { symbol: 'ENBD.DU', name: 'Emirates NBD' },
    { symbol: 'DIB.DU', name: 'Dubai Islamic Bank' },
    { symbol: 'DEWA.DU', name: 'DEWA' },
    { symbol: 'DFM.DU', name: 'Dubai Financial Market' },
    { symbol: 'ARMX.DU', name: 'Aramex' },
    { symbol: 'DU.DU', name: 'du Telecom (EITC)' },
    { symbol: 'DAMAC.DU', name: 'DAMAC Properties' },
    { symbol: 'DEYAAR.DU', name: 'Deyaar Development' },
    { symbol: 'GFH.DU', name: 'GFH Financial Group' },
    { symbol: 'AMANAT.DU', name: 'Amanat Holdings' },
    { symbol: 'SALIK.DU', name: 'Salik Company' },
    { symbol: 'TECOM.DU', name: 'TECOM Group' },
    { symbol: 'EMAARDEV.DU', name: 'Emaar Development' },
    { symbol: 'AZIZI.DU', name: 'Azizi Developments' },
  ],
  ADX: [
    { symbol: 'ETISALAT.AD', name: 'e& (Etisalat)' },
    { symbol: 'FAB.AD', name: 'First Abu Dhabi Bank' },
    { symbol: 'ADNOCDIST.AD', name: 'ADNOC Distribution' },
    { symbol: 'ADCB.AD', name: 'Abu Dhabi Commercial Bank' },
    { symbol: 'ALDAR.AD', name: 'Aldar Properties' },
    { symbol: 'IHC.AD', name: 'International Holding Company' },
    { symbol: 'ADPORTS.AD', name: 'AD Ports Group' },
    { symbol: 'FERTIGLOBE.AD', name: 'Fertiglobe' },
    { symbol: 'TAQA.AD', name: 'TAQA' },
    { symbol: 'NBAD.AD', name: 'NBAD' },
    { symbol: 'UNB.AD', name: 'Union National Bank' },
    { symbol: 'ALPHADHABI.AD', name: 'Alpha Dhabi Holding' },
    { symbol: 'MULTIPLY.AD', name: 'Multiply Group' },
  ],
  NSE: [
    { symbol: 'RELIANCE.NS', name: 'Reliance Industries' },
    { symbol: 'TCS.NS', name: 'Tata Consultancy Services' },
    { symbol: 'HDFCBANK.NS', name: 'HDFC Bank' },
    { symbol: 'INFY.NS', name: 'Infosys' },
    { symbol: 'ICICIBANK.NS', name: 'ICICI Bank' },
    { symbol: 'WIPRO.NS', name: 'Wipro' },
    { symbol: 'ADANIENT.NS', name: 'Adani Enterprises' },
    { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance' },
    { symbol: 'SBIN.NS', name: 'State Bank of India' },
    { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel' },
    { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank' },
    { symbol: 'LT.NS', name: 'Larsen & Toubro' },
    { symbol: 'TITAN.NS', name: 'Titan Company' },
    { symbol: 'ASIANPAINT.NS', name: 'Asian Paints' },
    { symbol: 'MARUTI.NS', name: 'Maruti Suzuki' },
    { symbol: 'SUNPHARMA.NS', name: 'Sun Pharmaceutical' },
    { symbol: 'ONGC.NS', name: 'ONGC' },
    { symbol: 'POWERGRID.NS', name: 'Power Grid Corporation' },
    { symbol: 'NTPC.NS', name: 'NTPC' },
    { symbol: 'TATAMOTORS.NS', name: 'Tata Motors' },
  ],
  BSE: [
    { symbol: 'RELIANCE.BO', name: 'Reliance Industries' },
    { symbol: 'TCS.BO', name: 'Tata Consultancy Services' },
    { symbol: 'HDFCBANK.BO', name: 'HDFC Bank' },
    { symbol: 'INFY.BO', name: 'Infosys' },
    { symbol: 'ICICIBANK.BO', name: 'ICICI Bank' },
    { symbol: 'WIPRO.BO', name: 'Wipro' },
    { symbol: 'SBIN.BO', name: 'State Bank of India' },
    { symbol: 'BHARTIARTL.BO', name: 'Bharti Airtel' },
    { symbol: 'BAJFINANCE.BO', name: 'Bajaj Finance' },
    { symbol: 'MARUTI.BO', name: 'Maruti Suzuki' },
  ],
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action, symbols, query, market } = req.query;

  try {

    // ── SEARCH ──
    if (action === 'search') {
      if (!query || query.length < 1) return res.json({ results: [] });
      const q = query.toLowerCase();

      // Use built-in list for UAE and India markets
      if (BUILTIN[market]) {
        const results = BUILTIN[market]
          .filter(s => s.name.toLowerCase().includes(q) || s.symbol.toLowerCase().includes(q))
          .slice(0, 8)
          .map(s => ({ symbol: s.symbol, name: s.name, exchange: market, type: 'stock' }));
        return res.json({ results });
      }

      // Crypto via CoinGecko
      if (market === 'Crypto') {
        const r = await fetch('https://api.coingecko.com/api/v3/search?query=' + encodeURIComponent(query));
        const data = await r.json();
        const results = (data.coins || []).slice(0, 8).map(c => ({
          symbol: c.id, name: c.name, exchange: 'Crypto', type: 'crypto', thumb: c.thumb,
        }));
        return res.json({ results });
      }

      // International via Yahoo Finance
      const url = 'https://query2.finance.yahoo.com/v1/finance/search?q=' +
        encodeURIComponent(query) + '&lang=en-US&region=US&quotesCount=10&newsCount=0';
      const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const data = await r.json();
      let quotes = (data.quotes || []).filter(q => q.symbol && !q.symbol.includes('.'));
      const results = quotes.slice(0, 8).map(q => ({
        symbol: q.symbol,
        name: q.longname || q.shortname || q.symbol,
        exchange: q.exchDisp || 'NYSE/NASDAQ',
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

      // Crypto prices
      if (cryptoList.length > 0) {
        const ids = cryptoList.map(s => s.replace('crypto:', '')).join(',');
        try {
          const r = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=' + ids +
            '&vs_currencies=usd&include_24hr_change=true'
          );
          const data = await r.json();
          for (const id in data) {
            prices['crypto:' + id] = { price: data[id].usd, change24h: data[id].usd_24h_change, currency: 'USD' };
          }
        } catch (e) { console.error('CoinGecko:', e.message); }
      }

      // Stock prices via Yahoo Finance
      if (stockList.length > 0) {
        try {
          const r = await fetch(
            'https://query1.finance.yahoo.com/v7/finance/quote?symbols=' +
            encodeURIComponent(stockList.join(',')) +
            '&fields=regularMarketPrice,regularMarketChangePercent,currency',
            { headers: { 'User-Agent': 'Mozilla/5.0' } }
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
        } catch (e) { console.error('Yahoo:', e.message); }
      }

      return res.json({ prices });
    }

    return res.status(400).json({ error: 'Use action=search or action=prices' });

  } catch (err) {
    console.error('Error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
