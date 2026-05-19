// api/prices.js — Alpha Vantage + CoinGecko

const AV_KEY = 'ZMF8T0GYQONK8CWS';

const BUILTIN = {
  DFM: [
    { symbol: 'EMAAR.DU', name: 'Emaar Properties' },
    { symbol: 'ENBD.DU', name: 'Emirates NBD' },
    { symbol: 'DIB.DU', name: 'Dubai Islamic Bank' },
    { symbol: 'DEWA.DU', name: 'DEWA' },
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
    { symbol: 'PARKIN.DU', name: 'Parkin Company' },
    { symbol: 'AIRARABIA.DU', name: 'Air Arabia' },
    { symbol: 'TABREED.DU', name: 'National Central Cooling Tabreed' },
    { symbol: 'DUBAI.DU', name: 'Dubai Investments' },
    { symbol: 'SHUAA.DU', name: 'Shuaa Capital' },
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
    { symbol: 'LT.NS', name: 'Larsen and Toubro' },
    { symbol: 'TITAN.NS', name: 'Titan Company' },
    { symbol: 'SUNPHARMA.NS', name: 'Sun Pharmaceutical' },
    { symbol: 'NTPC.NS', name: 'NTPC Limited' },
    { symbol: 'ONGC.NS', name: 'ONGC' },
    { symbol: 'ITC.NS', name: 'ITC Limited' },
    { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever HUL' },
    { symbol: 'SUZLON.NS', name: 'Suzlon Energy' },
    { symbol: 'CGPOWER.NS', name: 'CG Power Industrial Solutions' },
    { symbol: 'CASTROLIND.NS', name: 'Castrol India' },
    { symbol: 'LLOYDSENGG.NS', name: 'Lloyds Engineering Works' },
    { symbol: 'RAMASTEEL.NS', name: 'Rama Steel Tubes' },
    { symbol: 'AEROENTER.NS', name: 'Aero Entertain' },
    { symbol: 'BEPL.NS', name: 'Bhansali Engineering Polymers BEPL' },
    { symbol: 'CEMPRO.NS', name: 'Cem Products Cempro' },
    { symbol: 'CGPOWER.NS', name: 'CG Power' },
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
    { symbol: 'CGPOWER.BO', name: 'CG Power' },
    { symbol: 'CASTROLIND.BO', name: 'Castrol India' },
    { symbol: 'LLOYDSENGG.BO', name: 'Lloyds Engineering Works' },
    { symbol: 'RAMASTEEL.BO', name: 'Rama Steel Tubes' },
    { symbol: 'YESBANK.BO', name: 'Yes Bank' },
    { symbol: 'TATAMOTORS.BO', name: 'Tata Motors' },
    { symbol: 'VEDL.BO', name: 'Vedanta' },
    { symbol: 'TATAPOWER.BO', name: 'Tata Power' },
  ],
};

// Convert Yahoo-style symbol to Alpha Vantage format
function toAV(symbol) {
  // Alpha Vantage uses: NSE:RELIANCE, BSE:RELIANCE, DFM:EMAAR, etc.
  if (symbol.endsWith('.NS')) return symbol.replace('.NS', '') + '.BSE'; // AV uses BSE for Indian
  if (symbol.endsWith('.BO')) return symbol.replace('.BO', '') + '.BSE';
  if (symbol.endsWith('.DU')) return symbol; // Try as-is
  if (symbol.endsWith('.AD')) return symbol; // Try as-is
  return symbol; // US stocks as-is
}

async function fetchStockPrice(symbol) {
  const headers = { 'User-Agent': 'Mozilla/5.0' };
  
  // Alpha Vantage GLOBAL_QUOTE - works for US, India, UAE
  try {
    const avSym = symbol.endsWith('.NS') || symbol.endsWith('.BO')
      ? symbol.replace('.NS','').replace('.BO','') + '.BSE'
      : symbol;
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(avSym)}&apikey=${AV_KEY}`;
    const r = await fetch(url, { headers });
    const data = await r.json();
    const quote = data['Global Quote'];
    if (quote && quote['05. price'] && parseFloat(quote['05. price']) > 0) {
      const price = parseFloat(quote['05. price']);
      const prevClose = parseFloat(quote['08. previous close'] || quote['05. price']);
      const change = prevClose > 0 ? ((price - prevClose) / prevClose) * 100 : 0;
      // Determine currency
      const cur = (symbol.endsWith('.DU') || symbol.endsWith('.AD')) ? 'AED'
                : (symbol.endsWith('.NS') || symbol.endsWith('.BO')) ? 'INR' : 'USD';
      console.log('AV success:', symbol, price, cur);
      return { price, change24h: change, currency: cur };
    }
  } catch(e) { console.log('AV failed:', symbol, e.message); }

  // Fallback: try original symbol with Alpha Vantage
  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${AV_KEY}`;
    const r = await fetch(url, { headers });
    const data = await r.json();
    const quote = data['Global Quote'];
    if (quote && quote['05. price'] && parseFloat(quote['05. price']) > 0) {
      const price = parseFloat(quote['05. price']);
      const prevClose = parseFloat(quote['08. previous close'] || quote['05. price']);
      const change = prevClose > 0 ? ((price - prevClose) / prevClose) * 100 : 0;
      const cur = (symbol.endsWith('.DU') || symbol.endsWith('.AD')) ? 'AED'
                : (symbol.endsWith('.NS') || symbol.endsWith('.BO')) ? 'INR' : 'USD';
      console.log('AV fallback success:', symbol, price);
      return { price, change24h: change, currency: cur };
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

      // International search via Alpha Vantage SYMBOL_SEARCH
      try {
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(query)}&apikey=${AV_KEY}`;
        const r = await fetch(url);
        const data = await r.json();
        const matches = (data.bestMatches || [])
          .filter(m => m['4. region'] === 'United States')
          .slice(0, 6)
          .map(m => ({
            symbol: m['1. symbol'],
            name: m['2. name'],
            exchange: m['3. type'],
            type: 'stock',
          }));
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

      // Crypto via CoinGecko (unlimited free)
      if (cryptoList.length > 0) {
        try {
          const ids = cryptoList.map(s => s.replace('crypto:', '')).join(',');
          const r = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`);
          const data = await r.json();
          for (const id in data) {
            prices[`crypto:${id}`] = {
              price: data[id].usd,
              change24h: data[id].usd_24h_change || 0,
              currency: 'USD'
            };
          }
        } catch(e) { console.log('CoinGecko error:', e.message); }
      }

      // Stocks via Alpha Vantage — fetch sequentially to avoid rate limit
      if (stockList.length > 0) {
        for (const sym of stockList) {
          const p = await fetchStockPrice(sym);
          if (p) prices[sym] = p;
          // Small delay to avoid hitting rate limit
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }

      console.log('Final prices:', JSON.stringify(prices));
      return res.json({ prices });
    }

    return res.status(400).json({ error: 'Use action=search or action=prices' });
  } catch (err) {
    console.error('Error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
