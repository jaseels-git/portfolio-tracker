// api/prices.js v2 — fixes UAE fils/dirham issue
const AV_KEY = 'ZMF8T0GYQONK8CWS';

const BUILTIN = {
  DFM: [
    {symbol:'EMAAR.DU',name:'Emaar Properties',yahoo:'EMAAR.AE'},
    {symbol:'ENBD.DU',name:'Emirates NBD',yahoo:'ENBD.AE'},
    {symbol:'DIB.DU',name:'Dubai Islamic Bank',yahoo:'DIB.AE'},
    {symbol:'DEWA.DU',name:'DEWA',yahoo:'DEWA.AE'},
    {symbol:'DFM.DU',name:'Dubai Financial Market',yahoo:'DFM.AE'},
    {symbol:'ARMX.DU',name:'Aramex',yahoo:'ARMX.AE'},
    {symbol:'DU.DU',name:'du Telecom EITC',yahoo:'DU.AE'},
    {symbol:'DAMAC.DU',name:'DAMAC Properties',yahoo:'DAMAC.AE'},
    {symbol:'DEYAAR.DU',name:'Deyaar Development',yahoo:'DEYAAR.AE'},
    {symbol:'SALIK.DU',name:'Salik Company',yahoo:'SALIK.AE'},
    {symbol:'TECOM.DU',name:'TECOM Group',yahoo:'TECOM.AE'},
    {symbol:'PARKIN.DU',name:'Parkin Company',yahoo:'PARKIN.AE'},
    {symbol:'AIRARABIA.DU',name:'Air Arabia',yahoo:'AIRARABI.AE'},
    {symbol:'TABREED.DU',name:'National Central Cooling Tabreed',yahoo:'TABREED.AE'},
    {symbol:'DUBAI.DU',name:'Dubai Investments',yahoo:'DUBAI.AE'},
    {symbol:'EMPOWER.DU',name:'Emirates District Cooling Empower',yahoo:'EMPOWER.AE'},
    {symbol:'GFH.DU',name:'GFH Financial Group',yahoo:'GFH.AE'},
    {symbol:'AMANAT.DU',name:'Amanat Holdings',yahoo:'AMANAT.AE'},
    {symbol:'SHUAA.DU',name:'Shuaa Capital',yahoo:'SHUAA.AE'},
    {symbol:'EMAARDEV.DU',name:'Emaar Development',yahoo:'EMAARDEV.AE'},
  ],
  ADX: [
    {symbol:'ETISALAT.AD',name:'e& Etisalat Emirates Telecom',yahoo:'ETISALAT.AE'},
    {symbol:'FAB.AD',name:'First Abu Dhabi Bank',yahoo:'FAB.AE'},
    {symbol:'ADNOCDIST.AD',name:'ADNOC Distribution',yahoo:'ADNOCDIST.AE'},
    {symbol:'ADCB.AD',name:'Abu Dhabi Commercial Bank',yahoo:'ADCB.AE'},
    {symbol:'ALDAR.AD',name:'Aldar Properties',yahoo:'ALDAR.AE'},
    {symbol:'IHC.AD',name:'International Holding Company IHC',yahoo:'IHC.AE'},
    {symbol:'ADPORTS.AD',name:'AD Ports Group',yahoo:'ADPORTS.AE'},
    {symbol:'FERTIGLOBE.AD',name:'Fertiglobe',yahoo:'FERTIGLOBE.AE'},
    {symbol:'TAQA.AD',name:'Abu Dhabi National Energy TAQA',yahoo:'TAQA.AE'},
    {symbol:'ALPHADHABI.AD',name:'Alpha Dhabi Holding',yahoo:'ALPHADHABI.AE'},
    {symbol:'MULTIPLY.AD',name:'Multiply Group',yahoo:'MULTIPLY.AE'},
    {symbol:'LULU.AD',name:'Lulu Retail Holdings',yahoo:'LULU.AE'},
    {symbol:'ADNOC.AD',name:'ADNOC Gas',yahoo:'ADNOCGAS.AE'},
    {symbol:'PUREHEALTH.AD',name:'Pure Health Holding',yahoo:'PUREHEALTH.AE'},
    {symbol:'ADIB.AD',name:'Abu Dhabi Islamic Bank',yahoo:'ADIB.AE'},
    {symbol:'UNB.AD',name:'Union National Bank',yahoo:'UNB.AE'},
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

// UAE symbol -> Yahoo .AE symbol map
const UAE_MAP = {};
for (const list of [BUILTIN.DFM, BUILTIN.ADX]) {
  for (const s of list) { if (s.yahoo) UAE_MAP[s.symbol] = s.yahoo; }
}

// Fix UAE price: Yahoo returns in fils (x100), convert to AED
function fixUAE(price) {
  if (price > 50) return price / 100;
  return price;
}

async function fetchPrice(symbol) {
  const H = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json',
    'Referer': 'https://finance.yahoo.com',
  };
  const isUAE = symbol.endsWith('.DU') || symbol.endsWith('.AD');
  const isIndia = symbol.endsWith('.NS') || symbol.endsWith('.BO');

  if (isUAE) {
    const ySym = UAE_MAP[symbol] || symbol.replace('.DU','.AE').replace('.AD','.AE');
    for (const base of ['https://query1.finance.yahoo.com','https://query2.finance.yahoo.com']) {
      try {
        const r = await fetch(`${base}/v8/finance/chart/${encodeURIComponent(ySym)}?interval=1d&range=1d`, {headers:H});
        const d = await r.json();
        const m = d?.chart?.result?.[0]?.meta;
        if (m?.regularMarketPrice) {
          const price = fixUAE(m.regularMarketPrice);
          console.log('UAE price:', symbol, m.regularMarketPrice, '->', price, 'AED');
          return {price, change24h: m.regularMarketChangePercent||0, currency:'AED'};
        }
      } catch(e) {}
    }
    // AV fallback for UAE
    try {
      const av = symbol.replace('.DU','').replace('.AD','');
      const r = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${av}&apikey=${AV_KEY}`);
      const d = await r.json();
      const q = d['Global Quote'];
      if (q?.['05. price'] && parseFloat(q['05. price']) > 0) {
        const raw = parseFloat(q['05. price']);
        const price = fixUAE(raw);
        return {price, change24h:0, currency:'AED'};
      }
    } catch(e) {}
    return null;
  }

  if (isIndia) {
    // Try Yahoo Finance for Indian stocks
    for (const base of ['https://query1.finance.yahoo.com','https://query2.finance.yahoo.com']) {
      for (const ua of [H['User-Agent'],'python-requests/2.28.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0']) {
        try {
          const r = await fetch(`${base}/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`, {headers:{...H,'User-Agent':ua}});
          const d = await r.json();
          const m = d?.chart?.result?.[0]?.meta;
          if (m?.regularMarketPrice) {
            console.log('India Yahoo success:', symbol, m.regularMarketPrice);
            return {price: m.regularMarketPrice, change24h: m.regularMarketChangePercent||0, currency:'INR'};
          }
        } catch(e) {}
      }
    }
    // AV fallback for India
    const base = symbol.replace('.NS','').replace('.BO','');
    for (const sfx of ['.BSE','.NSE']) {
      try {
        const r = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${base+sfx}&apikey=${AV_KEY}`);
        const d = await r.json();
        const q = d['Global Quote'];
        if (q?.['05. price'] && parseFloat(q['05. price']) > 0) {
          const price = parseFloat(q['05. price']);
          const prev = parseFloat(q['08. previous close']||q['05. price']);
          return {price, change24h: prev>0?((price-prev)/prev)*100:0, currency:'INR'};
        }
      } catch(e) {}
      await new Promise(r=>setTimeout(r,200));
    }
    return null;
  }

  // US/International via AV
  try {
    const r = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${AV_KEY}`);
    const d = await r.json();
    const q = d['Global Quote'];
    if (q?.['05. price'] && parseFloat(q['05. price']) > 0) {
      const price = parseFloat(q['05. price']);
      const prev = parseFloat(q['08. previous close']||q['05. price']);
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

  const {action,symbols,query,market} = req.query;

  try {
    if (action==='search') {
      if (!query||query.length<1) return res.json({results:[]});
      const q = query.toLowerCase();

      if (BUILTIN[market]) {
        const results = BUILTIN[market]
          .filter(s=>s.name.toLowerCase().includes(q)||s.symbol.toLowerCase().includes(q))
          .slice(0,8)
          .map(s=>({symbol:s.symbol,name:s.name,exchange:market,type:'stock'}));
        return res.json({results});
      }

      if (market==='Crypto') {
        const r = await fetch('https://api.coingecko.com/api/v3/search?query='+encodeURIComponent(query));
        const d = await r.json();
        return res.json({results:(d.coins||[]).slice(0,8).map(c=>({symbol:c.id,name:c.name,exchange:'Crypto',type:'crypto',thumb:c.thumb}))});
      }

      try {
        const r = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(query)}&apikey=${AV_KEY}`);
        const d = await r.json();
        const matches = (d.bestMatches||[]).filter(m=>m['4. region']==='United States').slice(0,6)
          .map(m=>({symbol:m['1. symbol'],name:m['2. name'],exchange:m['3. type'],type:'stock'}));
        return res.json({results:matches});
      } catch(e) { return res.json({results:[]}); }
    }

    if (action==='prices') {
      if (!symbols) return res.json({prices:{}});
      const prices = {};
      const list = symbols.split(',').map(s=>s.trim()).filter(Boolean);
      const cryptos = list.filter(s=>s.startsWith('crypto:'));
      const stocks = list.filter(s=>!s.startsWith('crypto:'));

      if (cryptos.length>0) {
        try {
          const ids = cryptos.map(s=>s.replace('crypto:','')).join(',');
          const r = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`);
          const d = await r.json();
          for (const id in d) prices[`crypto:${id}`]={price:d[id].usd,change24h:d[id].usd_24h_change||0,currency:'USD'};
        } catch(e) {}
      }

      const uae = stocks.filter(s=>s.endsWith('.DU')||s.endsWith('.AD'));
      const other = stocks.filter(s=>!s.endsWith('.DU')&&!s.endsWith('.AD'));

      // UAE in parallel (Yahoo, no rate limit)
      const uaeRes = await Promise.all(uae.map(async s=>({s,p:await fetchPrice(s)})));
      for (const {s,p} of uaeRes) { if(p) prices[s]=p; }

      // Others sequentially (AV rate limit)
      for (const s of other) {
        const p = await fetchPrice(s);
        if (p) prices[s]=p;
        await new Promise(r=>setTimeout(r,300));
      }

      console.log('Prices:', JSON.stringify(prices));
      return res.json({prices});
    }

    return res.status(400).json({error:'Use action=search or action=prices'});
  } catch(err) {
    console.error('Error:',err.message);
    return res.status(500).json({error:err.message});
  }
};
