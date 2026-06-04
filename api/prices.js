// api/prices.js v3.1 — Multi-source with corrected frontend parameter mapping
const AV_KEY = 'ZMF8T0GYONK8CWS';

const BUILTIN = {
  DFM: [
    {symbol:'EMAAR.DU',name:'Emaar Properties'},
    {symbol:'ENBD.DU',name:'Emirates NBD'},
    {symbol:'DIB.DU',name:'Dubai Islamic Bank'},
    {symbol:'DEWA.DU',name:'DEWA'},
    {symbol:'DFM.DU',name:'Dubai Financial Market'},
    {symbol:'ARMX.DU',name:'Aramex'},
    {symbol:'DU.DU',name:'du Telecom EITC'},
    {symbol:'DAMAC.DU',name:'DAMAC Properties'},
    {symbol:'DEYAAR.DU',name:'Deyaar Development'},
    {symbol:'SALIK.DU',name:'Salik Company'},
    {symbol:'TECOM.DU',name:'TECOM Group'},
    {symbol:'PARKIN.DU',name:'Parkin Company'},
    {symbol:'AIRARABIA.DU',name:'Air Arabia'},
    {symbol:'TABREED.DU',name:'National Central Cooling Tabreed'},
    {symbol:'DUBAI.DU',name:'Dubai Investments'},
    {symbol:'EMPOWER.DU',name:'Emirates District Cooling Empower'},
    {symbol:'GFH.DU',name:'GFH Financial Group'},
    {symbol:'AMANAT.DU',name:'Amanat Holdings'},
    {symbol:'SHUAA.DU',name:'Shuaa Capital'},
    {symbol:'EMAARDEV.DU',name:'Emaar Development'},
  ],
  ADX: [
    {symbol:'ETISALAT.AD',name:'e& Etisalat Emirates Telecom'},
    {symbol:'FAB.AD',name:'First Abu Dhabi Bank'},
    {symbol:'ADNOCDIST.AD',name:'ADNOC Distribution'},
    {symbol:'ADCB.AD',name:'Abu Dhabi Commercial Bank'},
    {symbol:'ALDAR.AD',name:'Aldar Properties'},
    {symbol:'IHC.AD',name:'International Holding Company IHC'},
    {symbol:'ADPORTS.AD',name:'AD Ports Group'},
    {symbol:'FERTIGLOBE.AD',name:'Fertiglobe'},
    {symbol:'TAQA.AD',name:'Abu Dhabi National Energy TAQA'},
    {symbol:'ALPHADHABI.AD',name:'Alpha Dhabi Holding'},
    {symbol:'MULTIPLY.AD',name:'Multiply Group'},
    {symbol:'LULU.AD',name:'Lulu Retail Holdings'},
    {symbol:'ADNOC.AD',name:'ADNOC Gas'},
    {symbol:'PUREHEALTH.AD',name:'Pure Health Holding'},
    {symbol:'ADIB.AD',name:'Abu Dhabi Islamic Bank'},
    {symbol:'UNB.AD',name:'Union National Bank'},
  ],
  NSE: [
    {symbol:'RELIANCE.NS',name:'Reliance Industries'},
    {symbol:'TCS.NS',name:'Tata Consultancy Services TCS'},
    {symbol:'HDFCBANK.NS',name:'HDFC Bank'},
    {symbol:'INFY.NS',name:'Infosys'},
    {symbol:'ICICIBANK.NS',name:'ICICI Bank'},
    {symbol:'WIPRO.NS',name:'Wipro'},
    {symbol:'SBIN.NS',name:'State Bank of India SBI'},
    {symbol:'BHARTIARTL.NS',name:'Bharti Airtel'},
    {symbol:'BAJFINANCE.NS',name:'Bajaj Finance'},
    {symbol:'MARUTI.NS',name:'Maruti Suzuki'},
    {symbol:'TATAMOTORS.NS',name:'Tata Motors'},
    {symbol:'SUZLON.NS',name:'Suzlon Energy'},
    {symbol:'CGPOWER.NS',name:'CG Power Industrial Solutions'},
    {symbol:'CASTROLIND.NS',name:'Castrol India'},
    {symbol:'LLOYDSENGG.NS',name:'Lloyds Engineering Works'},
    {symbol:'RAMASTEEL.NS',name:'Rama Steel Tubes'},
    {symbol:'AEROENTER.NS',name:'Aero Entertain'},
    {symbol:'BEPL.NS',name:'Bhansali Engineering Polymers BEPL'},
    {symbol:'CEMPRO.NS',name:'Cem Products Cempro'},
    {symbol:'GENNEX.NS',name:'Gennex Laboratories'},
    {symbol:'IRCON.NS',name:'Ircon International'},
    {symbol:'KWIL.NS',name:'Kernex Microsystems KWIL'},
    {symbol:'SBC.NS',name:'SBC Exports'},
    {symbol:'TEXRAIL.NS',name:'Texmaco Rail Engineering'},
    {symbol:'TITANIN.NS',name:'Titan Intech'},
    {symbol:'HAL.NS',name:'Hindustan Aeronautics HAL'},
    {symbol:'BEL.NS',name:'Bharat Electronics BEL'},
    {symbol:'LICI.NS',name:'Life Insurance Corporation LIC'},
    {symbol:'IRFC.NS',name:'Indian Railway Finance'},
    {symbol:'ZOMATO.NS',name:'Zomato'},
    {symbol:'ADANIENT.NS',name:'Adani Enterprises'},
    {symbol:'YESBANK.NS',name:'Yes Bank'},
    {symbol:'VEDL.NS',name:'Vedanta'},
    {symbol:'TATAPOWER.NS',name:'Tata Power'},
    {symbol:'HINDUNILVR.NS',name:'Hindustan Unilever HUL'},
    {symbol:'ITC.NS',name:'ITC Limited'},
    {symbol:'DRREDDY.NS',name:'Dr Reddys Laboratories'},
    {symbol:'CIPLA.NS',name:'Cipla'},
  ],
  BSE: [
    {symbol:'RELIANCE.BO',name:'Reliance Industries'},
    {symbol:'TCS.BO',name:'Tata Consultancy Services TCS'},
    {symbol:'HDFCBANK.BO',name:'HDFC Bank'},
    {symbol:'SUZLON.BO',name:'Suzlon Energy'},
    {symbol:'CGPOWER.BO',name:'CG Power'},
    {symbol:'LLOYDSENGG.BO',name:'Lloyds Engineering Works'},
    {symbol:'RAMASTEEL.BO',name:'Rama Steel Tubes'},
    {symbol:'TATAMOTORS.BO',name:'Tata Motors'},
    {symbol:'YESBANK.BO',name:'Yes Bank'},
    {symbol:'VEDL.BO',name:'Vedanta'},
    {symbol:'TATAPOWER.BO',name:'Tata Power'},
  ],
};

function fixUAE(price) {
  return price > 50 ? price / 100 : price;
}

function toYahooAE(symbol) {
  return symbol.replace('.DU', '.AE').replace('.AD', '.AE');
}

async function fetchUAE(symbol) {
  const yahooSym = toYahooAE(symbol);
  const ticker = symbol.replace('.DU','').replace('.AD','');
  const H = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json',
    'Referer': 'https://finance.yahoo.com',
  };

  for (const base of ['https://query1.finance.yahoo.com','https://query2.finance.yahoo.com']) {
    try {
      const r = await fetch(`${base}/v8/finance/chart/${encodeURIComponent(yahooSym)}?interval=1d&range=1d`, {headers:H});
      if (!r.ok) continue;
      const d = await r.json();
      const m = d?.chart?.result?.[0]?.meta;
      if (m?.regularMarketPrice) {
        const price = fixUAE(m.regularMarketPrice);
        console.log('Yahoo AE success:', symbol, m.regularMarketPrice, '->', price);
        return {price, change24h: m.regularMarketChangePercent||0, currency:'AED'};
      }
    } catch(e) {}
  }

  try {
    const r = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(yahooSym)}`, {headers:H});
    const d = await r.json();
    const q = d?.quoteResponse?.result?.[0];
    if (q?.regularMarketPrice) {
      const price = fixUAE(q.regularMarketPrice);
      console.log('Yahoo v7 success:', symbol, q.regularMarketPrice, '->', price);
      return {price, change24h: q.regularMarketChangePercent||0, currency:'AED'};
    }
  } catch(e) {}

  try {
    const exchange = symbol.endsWith('.DU') ? 'dfm' : 'adx';
    const url = `https://stockanalysis.com/quote/${exchange}/${ticker.toLowerCase()}/`;
    const r = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      }
    });
    const html = await r.text();
    const patterns = [
      /"price"\s*:\s*"?([0-9]+\.?[0-9]*)"?/,
      /data-value="([0-9]+\.?[0-9]*)"/,
      /"regularMarketPrice"\s*:\s*([0-9]+\.?[0-9]*)/,
    ];
    for (const pat of patterns) {
      const match = html.match(pat);
      if (match && match[1]) {
        const raw = parseFloat(match[1]);
        if (raw > 0 && raw < 10000) {
          const price = fixUAE(raw);
          console.log('StockAnalysis success:', symbol, raw, '->', price);
          return {price, change24h:0, currency:'AED'};
        }
      }
    }
  } catch(e) {}

  try {
    const r = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${AV_KEY}`);
    const d = await r.json();
    const q = d['Global Quote'];
    if (q?.['05. price'] && parseFloat(q['05. price']) > 0) {
      const raw = parseFloat(q['05. price']);
      const price = fixUAE(raw);
      console.log('AV UAE success:', symbol, raw, '->', price);
      return {price, change24h:0, currency:'AED'};
    }
  } catch(e) {}

  console.log('All UAE methods failed:', symbol);
  return null;
}

async function fetchIndia(symbol) {
  const H = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json',
    'Referer': 'https://finance.yahoo.com',
  };

  for (const base of ['https://query1.finance.yahoo.com','https://query2.finance.yahoo.com']) {
    for (const ua of [H['User-Agent'], 'python-requests/2.28.0']) {
      try {
        const r = await fetch(`${base}/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`,
          {headers:{...H,'User-Agent':ua}});
        if (!r.ok) continue;
        const d = await r.json();
        const m = d?.chart?.result?.[0]?.meta;
        if (m?.regularMarketPrice) {
          console.log('Yahoo India success:', symbol, m.regularMarketPrice);
          return {price: m.regularMarketPrice, change24h: m.regularMarketChangePercent||0, currency:'INR'};
        }
      } catch(e) {}
    }
  }

  const base = symbol.replace('.NS','').replace('.BO','');
  for (const sfx of ['.BSE','.NSE']) {
    try {
      const r = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${base+sfx}&apikey=${AV_KEY}`);
      const d = await r.json();
      const q = d['Global Quote'];
      if (q?.['05. price'] && parseFloat(q['05. price']) > 0) {
        const price = parseFloat(q['05. price']);
        const prev = parseFloat(q['08. previous close']||q['05. price']);
        console.log('AV India success:', symbol, base+sfx, price);
        return {price, change24h: prev>0?((price-prev)/prev)*100:0, currency:'INR'};
      }
    } catch(e) {}
    await new Promise(r=>setTimeout(r,200));
  }

  console.log('All India methods failed:', symbol);
  return null;
}

async function fetchUS(symbol) {
  try {
    const r = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${AV_KEY}`);
    const d = await r.json();
    const q = d['Global Quote'];
    if (q?.['05. price'] && parseFloat(q['05. price']) > 0) {
      const price = parseFloat(q['05. price']);
      const prev = parseFloat(q['08. previous close']||q['05. price']);
      console.log('AV US success:', symbol, price);
      return {price, change24h: prev>0?((price-prev)/prev)*100:0, currency:'USD'};
    }
  } catch(e) {}
  return null;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if (req.method==='OPTIONS') return res.status(200).end();

  // ROUTING FIX: Handle frontend requests whether they use action=prices, stocks=..., or symbols=...
  let { action, symbols, stocks, query, market } = req.query;
  const targetStocks = symbols || stocks; 

  try {
    // ── SEARCH ROUTE ──
    if (action === 'search' || query) {
      const searchStr = (query || '').toLowerCase();
      if (!searchStr) return res.json({results:[]});

      if (market && BUILTIN[market.toUpperCase()]) {
        const results = BUILTIN[market.toUpperCase()]
          .filter(s=>s.name.toLowerCase().includes(searchStr)||s.symbol.toLowerCase().includes(searchStr))
          .slice(0,8)
          .map(s=>({symbol:s.symbol,name:s.name,exchange:market,type:'stock'}));
        return results;
      }

      if (market === 'Crypto' || searchStr.startsWith('crypto:')) {
        const cleanedQuery = searchStr.replace('crypto:','');
        const r = await fetch('https://api.coingecko.com/api/v3/search?query='+encodeURIComponent(cleanedQuery));
        const d = await r.json();
        return res.json({results:(d.coins||[]).slice(0,8).map(c=>({
          symbol:c.id,name:c.name,exchange:'Crypto',type:'crypto',thumb:c.thumb
        }))});
      }

      try {
        const r = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(searchStr)}&apikey=${AV_KEY}`);
        const d = await r.json();
        const matches = (d.bestMatches||[])
          .filter(m=>m['4. region']==='United States')
          .slice(0,6)
          .map(m=>({symbol:m['1. symbol'],name:m['2. name'],exchange:m['3. type'],type:'stock'}));
        return res.json({results:matches});
      } catch(e) { return res.json({results:[]}); }
    }

    // ── PRICES ROUTE ──
    if (action === 'prices' || targetStocks) {
      if (!targetStocks) return res.json({});
      const prices = {};
      const list = targetStocks.split(',').map(s=>s.trim()).filter(Boolean);
      const cryptos = list.filter(s=>s.startsWith('crypto:'));
      const stocksList = list.filter(s=>!s.startsWith('crypto:'));

      if (cryptos.length > 0) {
        try {
          const ids = cryptos.map(s=>s.replace('crypto:','')).join(',');
          const r = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`);
          const d = await r.json();
          for (const id in d) {
            prices[`crypto:${id}`]={price:d[id].usd,change24h:d[id].usd_24h_change||0,currency:'USD'};
          }
        } catch(e) {}
      }

      const uae = stocksList.filter(s=>s.endsWith('.DU')||s.endsWith('.AD'));
      const india = stocksList.filter(s=>s.endsWith('.NS')||s.endsWith('.BO'));
      const intl = stocksList.filter(s=>!s.endsWith('.DU')&&!s.endsWith('.AD')&&!s.endsWith('.NS')&&!s.endsWith('.BO'));

      if (uae.length > 0) {
        const results = await Promise.all(uae.map(async s=>({s,p:await fetchUAE(s)})));
        for (const {s,p} of results) { if(p) prices[s]=p; }
      }

      for (const s of india) {
        const p = await fetchIndia(s);
        if (p) prices[s]=p;
        await new Promise(r=>setTimeout(r,250));
      }

      for (const s of intl) {
        const p = await fetchUS(s);
        if (p) prices[s]=p;
        await new Promise(r=>setTimeout(r,250));
      }

      console.log('Final prices:', JSON.stringify(prices));
      
      // Return a flat structure so both formatting styles match frontend expectations safely
      return res.json({ ...prices, prices: prices });
    }

    return res.status(400).json({error:'Provide search parameters or stock identifiers.'});
  } catch(err) {
    console.error('Error:',err.message);
    return res.status(500).json({error:err.message});
  }
};
