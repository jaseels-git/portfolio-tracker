// api/prices.js — Multi-source price fetcher

const BUILTIN = {
  DFM: [
    { symbol: 'EMAAR.DU', name: 'Emaar Properties' },
    { symbol: 'ENBD.DU', name: 'Emirates NBD' },
    { symbol: 'DIB.DU', name: 'Dubai Islamic Bank' },
    { symbol: 'DEWA.DU', name: 'DEWA - Dubai Electricity & Water' },
    { symbol: 'DFM.DU', name: 'Dubai Financial Market' },
    { symbol: 'ARMX.DU', name: 'Aramex' },
    { symbol: 'DU.DU', name: 'du Telecom EITC' },
    { symbol: 'DAMAC.DU', name: 'DAMAC Properties' },
    { symbol: 'DEYAAR.DU', name: 'Deyaar Development' },
    { symbol: 'GFH.DU', name: 'GFH Financial Group' },
    { symbol: 'AMANAT.DU', name: 'Amanat Holdings' },
    { symbol: 'SALIK.DU', name: 'Salik Company' },
    { symbol: 'TECOM.DU', name: 'TECOM Group' },
    { symbol: 'EMAARDEV.DU', name: 'Emaar Development' },
    { symbol: 'AZIZI.DU', name: 'Azizi Developments' },
    { symbol: 'PARKIN.DU', name: 'Parkin Company' },
    { symbol: 'DUBAI.DU', name: 'Dubai Investments' },
    { symbol: 'SHUAA.DU', name: 'Shuaa Capital' },
    { symbol: 'EIB.DU', name: 'Emirates Islamic Bank' },
    { symbol: 'TABREED.DU', name: 'National Central Cooling Tabreed' },
    { symbol: 'AIRARABIA.DU', name: 'Air Arabia' },
    { symbol: 'EMPOWER.DU', name: 'Emirates District Cooling Empower' },
  ],
  ADX: [
    { symbol: 'ETISALAT.AD', name: 'e& Etisalat Emirates Telecom' },
    { symbol: 'FAB.AD', name: 'First Abu Dhabi Bank' },
    { symbol: 'ADNOCDIST.AD', name: 'ADNOC Distribution' },
    { symbol: 'ADCB.AD', name: 'Abu Dhabi Commercial Bank' },
    { symbol: 'ALDAR.AD', name: 'Aldar Properties' },
    { symbol: 'IHC.AD', name: 'International Holding Company IHC' },
    { symbol: 'ADPORTS.AD', name: 'AD Ports Group' },
    { symbol: 'FERTIGLOBE.AD', name: 'Fertiglobe' },
    { symbol: 'TAQA.AD', name: 'Abu Dhabi National Energy TAQA' },
    { symbol: 'ALPHADHABI.AD', name: 'Alpha Dhabi Holding' },
    { symbol: 'MULTIPLY.AD', name: 'Multiply Group' },
    { symbol: 'LULU.AD', name: 'Lulu Retail Holdings' },
    { symbol: 'ADNOC.AD', name: 'ADNOC Gas' },
    { symbol: 'PUREHEALTH.AD', name: 'Pure Health Holding' },
    { symbol: 'PRESIGHT.AD', name: 'Presight AI' },
    { symbol: 'ADIB.AD', name: 'Abu Dhabi Islamic Bank' },
    { symbol: 'UNB.AD', name: 'Union National Bank' },
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
    { symbol: 'HCLTECH.NS', name: 'HCL Technologies' },
    { symbol: 'AXISBANK.NS', name: 'Axis Bank' },
    { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank' },
    { symbol: 'LT.NS', name: 'Larsen and Toubro' },
    { symbol: 'TITAN.NS', name: 'Titan Company' },
    { symbol: 'SUNPHARMA.NS', name: 'Sun Pharmaceutical' },
    { symbol: 'NTPC.NS', name: 'NTPC Limited' },
    { symbol: 'ONGC.NS', name: 'ONGC' },
    { symbol: 'ITC.NS', name: 'ITC Limited' },
    { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever HUL' },
    { symbol: 'ADANIENT.NS', name: 'Adani Enterprises' },
    { symbol: 'ZOMATO.NS', name: 'Zomato' },
    { symbol: 'HAL.NS', name: 'Hindustan Aeronautics HAL' },
    { symbol: 'BEL.NS', name: 'Bharat Electronics BEL' },
    { symbol: 'LICI.NS', name: 'Life Insurance Corporation LIC' },
    { symbol: 'IRFC.NS', name: 'Indian Railway Finance' },
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
    { symbol: 'YESBANK.NS', name: 'Yes Bank' },
    { symbol: 'PNB.NS', name: 'Punjab National Bank' },
    { symbol: 'VEDL.NS', name: 'Vedanta' },
    { symbol: 'TATAPOWER.NS', name: 'Tata Power' },
    { symbol: 'ADANIGREEN.NS', name: 'Adani Green Energy' },
    { symbol: 'GODREJCP.NS', name: 'Godrej Consumer Products' },
    { symbol: 'DABUR.NS', name: 'Dabur India' },
    { symbol: 'MARICO.NS', name: 'Marico Parachute' },
    { symbol: 'DRREDDY.NS', name: 'Dr Reddys Laboratories' },
    { symbol: 'CIPLA.NS', name: 'Cipla' },
  ],
  BSE: [
    { symbol: 'RELIANCE.BO', name: 'Reliance Industries' },
    { symbol: 'TCS.BO', name: 'Tata Consultancy Services TCS' },
    { symbol: 'HDFCBANK.BO', name: 'HDFC Bank' },
    { symbol: 'INFY.BO', name: 'Infosys' },
    { symbol: 'SBIN.BO', name: 'State Bank of India SBI' },
    { symbol: 'SUZLON.BO', name: 'Suzlon Energy' },
    { symbol: 'CGPOWER.BO', name: 'CG Power Industrial Solutions' },
    { symbol: 'CASTROLIND.BO', name: 'Castrol India' },
    { symbol: 'LLOYDSENGG.BO', name: 'Lloyds Engineering Works' },
    { symbol: 'RAMASTEEL.BO', name: 'Rama Steel Tubes' },
    { symbol: 'YESBANK.BO', name: 'Yes Bank' },
    { symbol: 'TATAMOTORS.BO', name: 'Tata Motors' },
    { symbol: 'VEDL.BO', name: 'Vedanta' },
    { symbol: 'TATAPOWER.BO', name: 'Tata Power' },
  ],
};

// Convert Yahoo symbol to Stooq format
function toStooq(symbol) {
  if (symbol.endsWith('.DU')) return symbol.replace('.DU', '.DU'); // DFM
  if (symbol.endsWith('.AD')) return symbol.replace('.AD', '.AD'); // ADX
  if (symbol.endsWith('.NS')) return symbol.replace('.NS', '.NS'); // NSE
  if (symbol.endsWith('.BO')) return symbol.replace('.BO', '.BO'); // BSE
  return symbol + '.US'; // US stocks
}

async function fetchPrice(symbol) {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json',
  };

  // Method 1: Yahoo Finance v8 chart (most reliable)
  for (const base of ['https://query1.finance.yahoo.com', 'https://query2.finance.yahoo.com']) {
    try {
      const url = `${base}/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;
      const r = await fetch(url, { headers });
      if (r.ok) {
        const data = await r.json();
        const meta = data?.chart?.result?.[0]?.meta;
        if (meta?.regularMarketPrice) {
          return {
            price: meta.regularMarketPrice,
            change24h: meta.regularMarketChangePercent || 0,
            currency: meta.currency || 'USD',
          };
        }
      }
    } catch (e) {}
  }

  // Method 2: Stooq (good for international + some regional)
  try {
    const stooqSym = symbol.toLowerCase().replace('.du', '.du').replace('.ad', '.ad').replace('.ns', '.ns').replace('.bo', '.bo');
    const url = `https://stooq.com/q/l/?s=${stooqSym}&f=sd2t2ohlcv&h&e=json`;
    const r = await fetch(url, { headers: { 'User-Agent': headers['User-Agent'] } });
    const data = await r.json();
    if (data?.symbols?.[0]?.close) {
      const cur = symbol.endsWith('.DU') || symbol.endsWith('.AD') ? 'AED' :
                  symbol.endsWith('.NS') || symbol.endsWith('.BO') ? 'INR' : 'USD';
      return { price: parseFloat(data.symbols[0].close), change24h: 0, currency: cur };
    }
  } catch (e) {}

  // Method 3: Yahoo Finance v7 quote
  try {
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbol)}`;
    const r = await fetch(url, { headers });
    const data = await r.json();
    const q = data?.quoteResponse?.result?.[0];
    if (q?.regularMarketPrice) {
      return {
        price: q.regularMarketPrice,
        change24h: q.regularMarketChangePercent || 0,
        currency: q.currency || 'USD',
      };
    }
  } catch (e) {}

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

      // International via Yahoo
      const url = 'https://query2.finance.yahoo.com/v1/finance/search?q=' +
        encodeURIComponent(query) + '&lang=en-US&region=US&quotesCount=8&newsCount=0';
      const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const data = await r.json();
      const quotes = (data.quotes || []).filter(q => q.symbol && !q.symbol.includes('.'));
      return res.json({ results: quotes.slice(0, 8).map(q => ({
        symbol: q.symbol,
        name: q.longname || q.shortname || q.symbol,
        exchange: q.exchDisp || 'NYSE/NASDAQ',
        type: 'stock',
      }))});
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
        } catch (e) {}
      }

      // Stocks - fetch all in parallel
      if (stockList.length > 0) {
        const results = await Promise.all(stockList.map(async sym => {
          const p = await fetchPrice(sym);
          return { sym, p };
        }));
        for (const { sym, p } of results) {
          if (p) prices[sym] = p;
        }
      }

      // Debug log
      console.log('Price results:', JSON.stringify(prices));
      return res.json({ prices });
    }

    return res.status(400).json({ error: 'Use action=search or action=prices' });
  } catch (err) {
    console.error('Error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
