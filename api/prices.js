// api/prices.js — Multi-source: CoinGecko + Alpha Vantage + Yahoo Finance

const AV_KEY = 'ZMF8T0GYQONK8CWS';

const BUILTIN = {
  DFM: [
    { symbol: 'EMAAR.DU', name: 'Emaar Properties', yahoo: 'EMAAR.AE' },
    { symbol: 'ENBD.DU', name: 'Emirates NBD', yahoo: 'ENBD.AE' },
    { symbol: 'DIB.DU', name: 'Dubai Islamic Bank', yahoo: 'DIB.AE' },
    { symbol: 'DEWA.DU', name: 'DEWA', yahoo: 'DEWA.AE' },
    { symbol: 'DFM.DU', name: 'Dubai Financial Market', yahoo: 'DFM.AE' },
    { symbol: 'ARMX.DU', name: 'Aramex', yahoo: 'ARMX.AE' },
    { symbol: 'DU.DU', name: 'du Telecom EITC', yahoo: 'DU.AE' },
    { symbol: 'DAMAC.DU', name: 'DAMAC Properties', yahoo: 'DAMAC.AE' },
    { symbol: 'DEYAAR.DU', name: 'Deyaar Development', yahoo: 'DEYAAR.AE' },
    { symbol: 'SALIK.DU', name: 'Salik Company', yahoo: 'SALIK.AE' },
    { symbol: 'TECOM.DU', name: 'TECOM Group', yahoo: 'TECOM.AE' },
    { symbol: 'PARKIN.DU', name: 'Parkin Company', yahoo: 'PARKIN.AE' },
    { symbol: 'AIRARABIA.DU', name: 'Air Arabia', yahoo: 'AIRARABI.AE' },
    { symbol: 'TABREED.DU', name: 'National Central Cooling Tabreed', yahoo: 'TABREED.AE' },
    { symbol: 'DUBAI.DU', name: 'Dubai Investments', yahoo: 'DUBAI.AE' },
    { symbol: 'EMPOWER.DU', name: 'Emirates District Cooling Empower', yahoo: 'EMPOWER.AE' },
    { symbol: 'GFH.DU', name: 'GFH Financial Group', yahoo: 'GFH.AE' },
    { symbol: 'AMANAT.DU', name: 'Amanat Holdings', yahoo: 'AMANAT.AE' },
    { symbol: 'SHUAA.DU', name: 'Shuaa Capital', yahoo: 'SHUAA.AE' },
    { symbol: 'EMAARDEV.DU', name: 'Emaar Development', yahoo: 'EMAARDEV.AE' },
  ],
  ADX: [
    { symbol: 'ETISALAT.AD', name: 'e& Etisalat Emirates Telecom', yahoo: 'ETISALAT.AE' },
    { symbol: 'FAB.AD', name: 'First Abu Dhabi Bank', yahoo: 'FAB.AE' },
    { symbol: 'ADNOCDIST.AD', name: 'ADNOC Distribution', yahoo: 'ADNOCDIST.AE' },
    { symbol: 'ADCB.AD', name: 'Abu Dhabi Commercial Bank', yahoo: 'ADCB.AE' },
    { symbol: 'ALDAR.AD', name: 'Aldar Properties', yahoo: 'ALDAR.AE' },
    { symbol: 'IHC.AD', name: 'International Holding Company IHC', yahoo: 'IHC.AE' },
    { symbol: 'ADPORTS.AD', name: 'AD Ports Group', yahoo: 'ADPORTS.AE' },
    { symbol: 'FERTIGLOBE.AD', name: 'Fertiglobe', yahoo: 'FERTIGLOBE.AE' },
    { symbol: 'TAQA.AD', name: 'Abu Dhabi National Energy TAQA', yahoo: 'TAQA.AE' },
    { symbol: 'ALPHADHABI.AD', name: 'Alpha Dhabi Holding', yahoo: 'ALPHADHABI.AE' },
    { symbol: 'MULTIPLY.AD', name: 'Multiply Group', yahoo: 'MULTIPLY.AE' },
    { symbol: 'LULU.AD', name: 'Lulu Retail Holdings', yahoo: 'LULU.AE' },
    { symbol: 'ADNOC.AD', name: 'ADNOC Gas', yahoo: 'ADNOCGAS.AE' },
    { symbol: 'PUREHEALTH.AD', name: 'Pure Health Holding', yahoo: 'PUREHEALTH.AE' },
    { symbol: 'ADIB.AD', name: 'Abu Dhabi Islamic Bank', yahoo: 'ADIB.AE' },
    { symbol: 'UNB.AD', name: 'Union National Bank', yahoo: 'UNB.AE' },
  ],
  NSE: [
    { symbol: 'RELIANCE.NS', name: 'Reliance Industries' },
    { symbol: 'TCS.NS', name: 'Tata Consultancy Services TCS' },
    { symbol: 'HDFCBANK.NS', name: 'HDFC Bank' },
    { symbol: 'INFY.NS', name: 'Infosys' },
    { symbol: 'ICICIBANK.NS', name: 'ICICI Bank' },
    { symbol: 'WIPRO.NS', name: 'Wipro' },
    { symbol: 'SBIN.NS', name: 'State Bank of India SBI' },
    { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel' },
    { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance' },
    { symbol: 'MARUTI.NS', name: 'Maruti Suzuki' },
    { symbol: 'TATAMOTORS.NS', name: 'Tata Motors' },
    { symbol: 'SUZLON.NS', name: 'Suzlon Energy' },
    { symbol: 'CGPOWER.NS', name: 'CG Power Industrial Solutions' },
    { symbol: 'CASTROLIND.NS', name: 'Castrol India' },
    { symbol: 'LLOYDSENGG.NS', name: 'Lloyds Engineering Works' },
    { symbol: 'RAMASTEEL.NS', name: 'Rama Steel Tubes' },
    { symbol: 'AEROENTER.NS', name: 'Aero Entertain' },
    { symbol: 'BEPL.NS', name: 'Bhansali Engineering Polymers BEPL' },
    { symbol: 'CEMPRO.NS', name: 'Cem Products Cempro' },
    { symbol: 'GENNEX.NS', name: 'Gennex Laboratories' },
    { symbol: 'IRCON.NS', name: 'Ircon International' },
    { symbol: 'KWIL.NS', name: 'Kernex Microsystems KWIL' },
    { symbol: 'SBC.NS', name: 'SBC Exports' },
    { symbol: 'TEXRAIL.NS', name: 'Texmaco Rail Engineering' },
    { symbol: 'TITANIN.NS', name: 'Titan Intech' },
    { symbol: 'HAL.NS', name: 'Hindustan Aeronautics HAL' },
    { symbol: 'BEL.NS', name: 'Bharat Electronics BEL' },
    { symbol: 'LICI.NS', name: 'Life Insurance Corporation LIC' },
    { symbol: 'IRFC.NS', name: 'Indian Railway Finance' },
    { symbol: 'ZOMATO.NS', name: 'Zomato' },
    { symbol: 'ADANIENT.NS', name: 'Adani Enterprises' },
    { symbol: 'YESBANK.NS', name: 'Yes Bank' },
    { symbol: 'VEDL.NS', name: 'Vedanta' },
    { symbol: 'TATAPOWER.NS', name: 'Tata Power' },
    { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever HUL' },
    { symbol: 'ITC.NS', name: 'ITC Limited' },
    { symbol: 'DRREDDY.NS', name: 'Dr Reddys Laboratories' },
    { symbol: 'CIPLA.NS', name: 'Cipla' },
  ],
  BSE: [
    { symbol: 'RELIANCE.BO', name: 'Reliance Industries' },
    { symbol: 'TCS.BO', name: 'Tata Consultancy Services TCS' },
    { symbol: 'HDFCBANK.BO', name: 'HDFC Bank' },
    { symbol: 'SUZLON.BO', name: 'Suzlon Energy' },
    { symbol: 'CGPOWER.BO', name: 'CG Power' },
    { symbol: 'LLOYDSENGG.BO', name: 'Lloyds Engineering Works' },
    { symbol: 'RAMASTEEL.BO', name: 'Rama Steel Tubes' },
    { symbol: 'TATAMOTORS.BO', name: 'Tata Motors' },
    { symbol: 'YESBANK.BO', name: 'Yes Bank' },
    { symbol: 'VEDL.BO', name: 'Vedanta' },
    { symbol: 'TATAPOWER.BO', name: 'Tata Power' },
  ],
};

// Build a map: .DU/.AD symbol -> Yahoo .AE symbol
const UAE_YAHOO_MAP = {};
for (const stocks of [BUILTIN.DFM, BUILTIN.ADX]) {
  for (const s of stocks) {
    if (s.yahoo) UAE_YAHOO_MAP[s.symbol] = s.yahoo;
  }
}

async function fetchPrice(symbol) {
  const isUAE = symbol.endsWith('.DU') || symbol.endsWith('.AD');
  const isIndia = symbol.endsWith('.NS') || symbol.endsWith('.BO');
  const isUS = !isUAE && !isIndia;

  // For UAE stocks: use Yahoo Finance with .AE suffix
  if (isUAE) {
    const yahooSym = UAE_YAHOO_MAP[symbol] || symbol.replace('.DU', '.AE').replace('.AD', '.AE');
    // Try multiple Yahoo endpoints and regional domains
    const endpoints = [
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSym)}?interval=1d&range=1d`,
      `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSym)}?interval=1d&range=1d`,
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(yahooSym)}`,
    ];
    const uaHeaders = [
      { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 'Accept': 'application/json', 'Referer': 'https://finance.yahoo.com' },
      { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36', 'Accept': '*/*' },
      { 'User-Agent': 'python-requests/2.28.0', 'Accept': 'application/json' },
    ];
    for (const url of endpoints) {
      for (const headers of uaHeaders) {
        try {
          const r = await fetch(url, { headers });
          if (!r.ok) continue;
          const data = await r.json();
          // v8 chart response
          const meta = data?.chart?.result?.[0]?.meta;
          if (meta?.regularMarketPrice) {
            console.log('Yahoo UAE success:', symbol, yahooSym, meta.regularMarketPrice);
            return { price: meta.regularMarketPrice, change24h: meta.regularMarketChangePercent || 0, currency: 'AED' };
          }
          // v7 quote response
          const q = data?.quoteResponse?.result?.[0];
          if (q?.regularMarketPrice) {
            console.log('Yahoo UAE v7 success:', symbol, yahooSym, q.regularMarketPrice);
            return { price: q.regularMarketPrice, change24h: q.regularMarketChangePercent || 0, currency: 'AED' };
          }
        } catch(e) {}
      }
    }
    // Last resort: Alpha Vantage for UAE
    try {
      const avSym = symbol.replace('.DU','').replace('.AD','');
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(avSym)}&apikey=${AV_KEY}`;
      const r = await fetch(url);
      const data = await r.json();
      const q = data['Global Quote'];
      if (q?.['05. price'] && parseFloat(q['05. price']) > 0) {
        const price = parseFloat(q['05. price']);
        const prev = parseFloat(q['08. previous close'] || q['05. price']);
        console.log('AV UAE success:', symbol, price);
        return { price, change24h: prev > 0 ? ((price-prev)/prev)*100 : 0, currency: 'AED' };
      }
    } catch(e) {}
    console.log('All UAE methods failed for:', symbol);
    return null;
  }

  // For Indian stocks: use Alpha Vantage with BSE suffix
  if (isIndia) {
    const baseSym = symbol.replace('.NS', '').replace('.BO', '');
    const avSym = baseSym + '.BSE';
    try {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(avSym)}&apikey=${AV_KEY}`;
      const r = await fetch(url);
      const data = await r.json();
      const q = data['Global Quote'];
      if (q?.['05. price'] && parseFloat(q['05. price']) > 0) {
        const price = parseFloat(q['05. price']);
        const prev = parseFloat(q['08. previous close'] || q['05. price']);
        console.log('AV India success:', symbol, avSym, price);
        return { price, change24h: prev > 0 ? ((price - prev) / prev) * 100 : 0, currency: 'INR' };
      }
    } catch(e) {}
    // Fallback: try NSE suffix
    try {
      const avSym2 = baseSym + '.NSE';
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(avSym2)}&apikey=${AV_KEY}`;
      const r = await fetch(url);
      const data = await r.json();
      const q = data['Global Quote'];
      if (q?.['05. price'] && parseFloat(q['05. price']) > 0) {
        const price = parseFloat(q['05. price']);
        const prev = parseFloat(q['08. previous close'] || q['05. price']);
        return { price, change24h: prev > 0 ? ((price - prev) / prev) * 100 : 0, currency: 'INR' };
      }
    } catch(e) {}
    console.log('AV India failed for:', symbol);
    return null;
  }

  // For US/International: use Alpha Vantage directly
  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${AV_KEY}`;
    const r = await fetch(url);
    const data = await r.json();
    const q = data['Global Quote'];
    if (q?.['05. price'] && parseFloat(q['05. price']) > 0) {
      const price = parseFloat(q['05. price']);
      const prev = parseFloat(q['08. previous close'] || q['05. price']);
      console.log('AV US success:', symbol, price);
      return { price, change24h: prev > 0 ? ((price - prev) / prev) * 100 : 0, currency: 'USD' };
    }
  } catch(e) {}

  console.log('All methods failed for:', symbol);
  return null;
}

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

      if (BUILTIN[market]) {
        const results = BUILTIN[market]
          .filter(s => s.name.toLowerCase().includes(q) || s.symbol.toLowerCase().includes(q))
          .slice(0, 8)
          .map(s => ({ symbol: s.symbol, name: s.name, exchange: market, type: 'stock' }));
        return res.json({ results });
      }

      if (market === 'Crypto') {
        const r = await fetch('https://api.coingecko.com/api/v3/search?query=' + encodeURIComponent(query));
        const data = await r.json();
        const results = (data.coins || []).slice(0, 8).map(c => ({
          symbol: c.id, name: c.name, exchange: 'Crypto', type: 'crypto', thumb: c.thumb,
        }));
        return res.json({ results });
      }

      // International via Alpha Vantage symbol search
      try {
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(query)}&apikey=${AV_KEY}`;
        const r = await fetch(url);
        const data = await r.json();
        const matches = (data.bestMatches || [])
          .filter(m => m['4. region'] === 'United States')
          .slice(0, 6)
          .map(m => ({ symbol: m['1. symbol'], name: m['2. name'], exchange: m['3. type'], type: 'stock' }));
        return res.json({ results: matches });
      } catch(e) {
        return res.json({ results: [] });
      }
    }

    // ── PRICES ──
    if (action === 'prices') {
      if (!symbols) return res.json({ prices: {} });
      const prices = {};
      const symbolList = symbols.split(',').map(s => s.trim()).filter(Boolean);
      const cryptoList = symbolList.filter(s => s.startsWith('crypto:'));
      const stockList = symbolList.filter(s => !s.startsWith('crypto:'));

      // Crypto via CoinGecko
      if (cryptoList.length > 0) {
        try {
          const ids = cryptoList.map(s => s.replace('crypto:', '')).join(',');
          const r = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`);
          const data = await r.json();
          for (const id in data) {
            prices[`crypto:${id}`] = { price: data[id].usd, change24h: data[id].usd_24h_change || 0, currency: 'USD' };
          }
        } catch(e) {}
      }

      // Stocks — UAE fetched in parallel, others sequentially (rate limit)
      const uaeStocks = stockList.filter(s => s.endsWith('.DU') || s.endsWith('.AD'));
      const otherStocks = stockList.filter(s => !s.endsWith('.DU') && !s.endsWith('.AD'));

      // UAE in parallel (Yahoo Finance, no rate limit)
      if (uaeStocks.length > 0) {
        const uaeResults = await Promise.all(uaeStocks.map(async sym => ({ sym, p: await fetchPrice(sym) })));
        for (const { sym, p } of uaeResults) { if (p) prices[sym] = p; }
      }

      // Others sequentially (Alpha Vantage rate limit)
      for (const sym of otherStocks) {
        const p = await fetchPrice(sym);
        if (p) prices[sym] = p;
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      console.log('Prices returned:', JSON.stringify(prices));
      return res.json({ prices });
    }

    return res.status(400).json({ error: 'Use action=search or action=prices' });
  } catch (err) {
    console.error('Error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
