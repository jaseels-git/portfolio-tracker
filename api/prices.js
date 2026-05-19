// api/prices.js — Vercel Serverless Function

// Built-in stock lists for markets Yahoo Finance search doesn't handle well
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
    { symbol: 'EKTTITAB.DU', name: 'Ekttitab Holding' },
    { symbol: 'GGICO.DU', name: 'Gulf General Investments' },
    { symbol: 'TABREED.DU', name: 'National Central Cooling Tabreed' },
    { symbol: 'EMIRATES.DU', name: 'Emirates Integrated Telecom' },
    { symbol: 'DSI.DU', name: 'Drake & Scull International' },
    { symbol: 'AIRARABIA.DU', name: 'Air Arabia' },
    { symbol: 'DAFINANCE.DU', name: 'Dubai Aerospace Enterprise' },
    { symbol: 'BPCC.DU', name: 'Bonyan Properties' },
    { symbol: 'EMPOWER.DU', name: 'Emirates District Cooling Empower' },
    { symbol: 'ITHMAAR.DU', name: 'Ithmaar Holding' },
    { symbol: 'GULFA.DU', name: 'Gulf Finance House' },
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
    { symbol: 'UNB.AD', name: 'Union National Bank' },
    { symbol: 'ALPHADHABI.AD', name: 'Alpha Dhabi Holding' },
    { symbol: 'MULTIPLY.AD', name: 'Multiply Group' },
    { symbol: 'LULU.AD', name: 'Lulu Retail Holdings' },
    { symbol: 'ADNOC.AD', name: 'ADNOC Gas' },
    { symbol: 'PUREHEALTH.AD', name: 'Pure Health Holding' },
    { symbol: 'PRESIGHT.AD', name: 'Presight AI' },
    { symbol: 'GHITHA.AD', name: 'Agthia Group Ghitha' },
    { symbol: 'NBAD.AD', name: 'National Bank of Abu Dhabi' },
    { symbol: 'ALMI.AD', name: 'Al Mazrui Industries' },
    { symbol: 'FOODCO.AD', name: 'Foodco Holding' },
    { symbol: 'ESHRAQ.AD', name: 'Eshraq Investments' },
    { symbol: 'WAHA.AD', name: 'Waha Capital' },
    { symbol: 'NBF.AD', name: 'National Bank of Fujairah' },
    { symbol: 'ADIB.AD', name: 'Abu Dhabi Islamic Bank' },
    { symbol: 'SIB.AD', name: 'Sharjah Islamic Bank' },
    { symbol: 'RAK.AD', name: 'RAK Properties' },
    { symbol: 'METHAQ.AD', name: 'Methaq Takaful Insurance' },
    { symbol: 'ADNIC.AD', name: 'Abu Dhabi National Insurance' },
    { symbol: 'ALAIN.AD', name: 'Al Ain Ahlia Insurance' },
    { symbol: 'APEX.AD', name: 'Apex Investment' },
  ],
  NSE: [
    { symbol: 'RELIANCE.NS', name: 'Reliance Industries' },
    { symbol: 'TCS.NS', name: 'Tata Consultancy Services TCS' },
    { symbol: 'HDFCBANK.NS', name: 'HDFC Bank' },
    { symbol: 'INFY.NS', name: 'Infosys' },
    { symbol: 'ICICIBANK.NS', name: 'ICICI Bank' },
    { symbol: 'WIPRO.NS', name: 'Wipro' },
    { symbol: 'ADANIENT.NS', name: 'Adani Enterprises' },
    { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance' },
    { symbol: 'SBIN.NS', name: 'State Bank of India SBI' },
    { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel' },
    { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank' },
    { symbol: 'LT.NS', name: 'Larsen and Toubro' },
    { symbol: 'TITAN.NS', name: 'Titan Company' },
    { symbol: 'ASIANPAINT.NS', name: 'Asian Paints' },
    { symbol: 'MARUTI.NS', name: 'Maruti Suzuki' },
    { symbol: 'SUNPHARMA.NS', name: 'Sun Pharmaceutical' },
    { symbol: 'ONGC.NS', name: 'Oil and Natural Gas Corporation ONGC' },
    { symbol: 'POWERGRID.NS', name: 'Power Grid Corporation' },
    { symbol: 'NTPC.NS', name: 'NTPC Limited' },
    { symbol: 'TATAMOTORS.NS', name: 'Tata Motors' },
    { symbol: 'HCLTECH.NS', name: 'HCL Technologies' },
    { symbol: 'AXISBANK.NS', name: 'Axis Bank' },
    { symbol: 'ULTRACEMCO.NS', name: 'UltraTech Cement' },
    { symbol: 'BAJAJFINSV.NS', name: 'Bajaj Finserv' },
    { symbol: 'NESTLEIND.NS', name: 'Nestle India' },
    { symbol: 'TECHM.NS', name: 'Tech Mahindra' },
    { symbol: 'HINDALCO.NS', name: 'Hindalco Industries' },
    { symbol: 'TATASTEEL.NS', name: 'Tata Steel' },
    { symbol: 'ADANIPORTS.NS', name: 'Adani Ports' },
    { symbol: 'GRASIM.NS', name: 'Grasim Industries' },
    { symbol: 'DIVISLAB.NS', name: 'Divis Laboratories' },
    { symbol: 'DRREDDY.NS', name: 'Dr Reddys Laboratories' },
    { symbol: 'CIPLA.NS', name: 'Cipla' },
    { symbol: 'EICHERMOT.NS', name: 'Eicher Motors Royal Enfield' },
    { symbol: 'BRITANNIA.NS', name: 'Britannia Industries' },
    { symbol: 'INDUSINDBK.NS', name: 'IndusInd Bank' },
    { symbol: 'HEROMOTOCO.NS', name: 'Hero MotoCorp' },
    { symbol: 'APOLLOHOSP.NS', name: 'Apollo Hospitals' },
    { symbol: 'JSWSTEEL.NS', name: 'JSW Steel' },
    { symbol: 'COALINDIA.NS', name: 'Coal India' },
    { symbol: 'BPCL.NS', name: 'Bharat Petroleum BPCL' },
    { symbol: 'IOC.NS', name: 'Indian Oil Corporation' },
    { symbol: 'TATACONSUM.NS', name: 'Tata Consumer Products' },
    { symbol: 'PIDILITIND.NS', name: 'Pidilite Industries Fevicol' },
    { symbol: 'HAVELLS.NS', name: 'Havells India' },
    { symbol: 'DMART.NS', name: 'Avenue Supermarts DMart' },
    { symbol: 'ZOMATO.NS', name: 'Zomato' },
    { symbol: 'PAYTM.NS', name: 'Paytm One97 Communications' },
    { symbol: 'NYKAA.NS', name: 'Nykaa FSN E-Commerce' },
    { symbol: 'POLICYBZR.NS', name: 'PB Fintech PolicyBazaar' },
    { symbol: 'IRCTC.NS', name: 'IRCTC Indian Railway Catering' },
    { symbol: 'MOTHERSON.NS', name: 'Motherson Sumi Wiring' },
    { symbol: 'MUTHOOTFIN.NS', name: 'Muthoot Finance Gold Loan' },
    { symbol: 'BANDHANBNK.NS', name: 'Bandhan Bank' },
    { symbol: 'TATAPOWER.NS', name: 'Tata Power' },
    { symbol: 'YESBANK.NS', name: 'Yes Bank' },
    { symbol: 'PNB.NS', name: 'Punjab National Bank' },
    { symbol: 'BANKBARODA.NS', name: 'Bank of Baroda' },
    { symbol: 'CANBK.NS', name: 'Canara Bank' },
    { symbol: 'UNIONBANK.NS', name: 'Union Bank of India' },
    { symbol: 'IDEA.NS', name: 'Vodafone Idea Vi' },
    { symbol: 'IRFC.NS', name: 'Indian Railway Finance Corporation' },
    { symbol: 'SAIL.NS', name: 'Steel Authority of India SAIL' },
    { symbol: 'NHPC.NS', name: 'NHPC' },
    { symbol: 'HAL.NS', name: 'Hindustan Aeronautics HAL' },
    { symbol: 'BEL.NS', name: 'Bharat Electronics BEL' },
    { symbol: 'RVNL.NS', name: 'Rail Vikas Nigam RVNL' },
    { symbol: 'ADANIGREEN.NS', name: 'Adani Green Energy' },
    { symbol: 'ADANITRANS.NS', name: 'Adani Transmission' },
    { symbol: 'ADANIPOWER.NS', name: 'Adani Power' },
    { symbol: 'ATGL.NS', name: 'Adani Total Gas' },
    { symbol: 'GODREJCP.NS', name: 'Godrej Consumer Products' },
    { symbol: 'MARICO.NS', name: 'Marico Parachute' },
    { symbol: 'DABUR.NS', name: 'Dabur India' },
    { symbol: 'EMAMILTD.NS', name: 'Emami' },
    { symbol: 'COLPAL.NS', name: 'Colgate Palmolive India' },
    { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever HUL' },
    { symbol: 'ITC.NS', name: 'ITC Limited' },
    { symbol: 'MCDOWELL-N.NS', name: 'United Spirits McDowell' },
    { symbol: 'UBL.NS', name: 'United Breweries Kingfisher' },
    { symbol: 'TRENT.NS', name: 'Trent Westside Zudio' },
    { symbol: 'ABFRL.NS', name: 'Aditya Birla Fashion Retail' },
    { symbol: 'VEDL.NS', name: 'Vedanta' },
    { symbol: 'AUROPHARMA.NS', name: 'Aurobindo Pharma' },
    { symbol: 'LUPIN.NS', name: 'Lupin Pharmaceuticals' },
    { symbol: 'TORNTPHARM.NS', name: 'Torrent Pharmaceuticals' },
    { symbol: 'ALKEM.NS', name: 'Alkem Laboratories' },
    { symbol: 'MFSL.NS', name: 'Max Financial Services' },
    { symbol: 'SBILIFE.NS', name: 'SBI Life Insurance' },
    { symbol: 'HDFCLIFE.NS', name: 'HDFC Life Insurance' },
    { symbol: 'LICI.NS', name: 'Life Insurance Corporation LIC' },
    { symbol: 'ICICIlombard.NS', name: 'ICICI Lombard General Insurance' },
    { symbol: 'IDFCFIRSTB.NS', name: 'IDFC First Bank' },
    { symbol: 'RBLBANK.NS', name: 'RBL Bank' },
    { symbol: 'FEDERALBNK.NS', name: 'Federal Bank' },
    { symbol: 'KARURVYSYA.NS', name: 'Karur Vysya Bank' },
    { symbol: 'PERSISTENT.NS', name: 'Persistent Systems' },
    { symbol: 'MPHASIS.NS', name: 'Mphasis' },
    { symbol: 'LTIM.NS', name: 'LTIMindtree' },
    { symbol: 'COFORGE.NS', name: 'Coforge' },
    { symbol: 'KPITTECH.NS', name: 'KPIT Technologies' },
    { symbol: 'AEROENTER.NS', name: 'Aero Entertain' },
    { symbol: 'BEPL.NS', name: 'Bhansali Engineering Polymers BEPL' },
    { symbol: 'CASTROLIND.NS', name: 'Castrol India' },
    { symbol: 'CEMPRO.NS', name: 'Cem Products Cempro' },
    { symbol: 'CGPOWER.NS', name: 'CG Power Industrial Solutions' },
    { symbol: 'GENNEX.NS', name: 'Gennex Laboratories' },
    { symbol: 'IRCON.NS', name: 'Ircon International' },
    { symbol: 'KWIL.NS', name: 'Kernex Microsystems KWIL' },
    { symbol: 'LLOYDSENGG.NS', name: 'Lloyds Engineering Works' },
    { symbol: 'RAMASTEEL.NS', name: 'Rama Steel Tubes' },
    { symbol: 'SBC.NS', name: 'SBC Exports' },
    { symbol: 'SUZLON.NS', name: 'Suzlon Energy' },
    { symbol: 'TEXRAIL.NS', name: 'Texmaco Rail Engineering' },
    { symbol: 'TITANIN.NS', name: 'Titan Intech' },
  ],
  BSE: [
    { symbol: 'RELIANCE.BO', name: 'Reliance Industries' },
    { symbol: 'TCS.BO', name: 'Tata Consultancy Services TCS' },
    { symbol: 'HDFCBANK.BO', name: 'HDFC Bank' },
    { symbol: 'INFY.BO', name: 'Infosys' },
    { symbol: 'ICICIBANK.BO', name: 'ICICI Bank' },
    { symbol: 'WIPRO.BO', name: 'Wipro' },
    { symbol: 'SBIN.BO', name: 'State Bank of India SBI' },
    { symbol: 'BHARTIARTL.BO', name: 'Bharti Airtel' },
    { symbol: 'BAJFINANCE.BO', name: 'Bajaj Finance' },
    { symbol: 'MARUTI.BO', name: 'Maruti Suzuki' },
    { symbol: 'TATAMOTORS.BO', name: 'Tata Motors' },
    { symbol: 'HCLTECH.BO', name: 'HCL Technologies' },
    { symbol: 'AXISBANK.BO', name: 'Axis Bank' },
    { symbol: 'KOTAKBANK.BO', name: 'Kotak Mahindra Bank' },
    { symbol: 'LT.BO', name: 'Larsen and Toubro' },
    { symbol: 'TITAN.BO', name: 'Titan Company' },
    { symbol: 'SUNPHARMA.BO', name: 'Sun Pharmaceutical' },
    { symbol: 'NTPC.BO', name: 'NTPC Limited' },
    { symbol: 'ONGC.BO', name: 'ONGC Oil Natural Gas' },
    { symbol: 'ITC.BO', name: 'ITC Limited' },
    { symbol: 'HINDUNILVR.BO', name: 'Hindustan Unilever HUL' },
    { symbol: 'ADANIPORTS.BO', name: 'Adani Ports' },
    { symbol: 'TATASTEEL.BO', name: 'Tata Steel' },
    { symbol: 'JSWSTEEL.BO', name: 'JSW Steel' },
    { symbol: 'COALINDIA.BO', name: 'Coal India' },
    { symbol: 'DMART.BO', name: 'Avenue Supermarts DMart' },
    { symbol: 'ZOMATO.BO', name: 'Zomato' },
    { symbol: 'IRFC.BO', name: 'Indian Railway Finance' },
    { symbol: 'HAL.BO', name: 'Hindustan Aeronautics HAL' },
    { symbol: 'BEL.BO', name: 'Bharat Electronics BEL' },
    { symbol: 'LICI.BO', name: 'Life Insurance Corporation LIC' },
    { symbol: 'VEDL.BO', name: 'Vedanta' },
    { symbol: 'YESBANK.BO', name: 'Yes Bank' },
    { symbol: 'PNB.BO', name: 'Punjab National Bank' },
    { symbol: 'BANKBARODA.BO', name: 'Bank of Baroda' },
    { symbol: 'TATAPOWER.BO', name: 'Tata Power' },
    { symbol: 'IDEA.BO', name: 'Vodafone Idea Vi' },
    { symbol: 'SAIL.BO', name: 'Steel Authority SAIL' },
    { symbol: 'ADANIGREEN.BO', name: 'Adani Green Energy' },
    { symbol: 'ADANIENT.BO', name: 'Adani Enterprises' },
    { symbol: 'GODREJCP.BO', name: 'Godrej Consumer Products' },
    { symbol: 'DABUR.BO', name: 'Dabur India' },
    { symbol: 'MARICO.BO', name: 'Marico Parachute' },
    { symbol: 'COLPAL.BO', name: 'Colgate Palmolive India' },
    { symbol: 'NESTLEIND.BO', name: 'Nestle India' },
    { symbol: 'DRREDDY.BO', name: 'Dr Reddys Laboratories' },
    { symbol: 'CIPLA.BO', name: 'Cipla Pharmaceuticals' },
    { symbol: 'LUPIN.BO', name: 'Lupin Pharmaceuticals' },
    { symbol: 'PERSISTENT.BO', name: 'Persistent Systems' },
    { symbol: 'MPHASIS.BO', name: 'Mphasis' },
    { symbol: 'AEROENTER.BO', name: 'Aero Entertain' },
    { symbol: 'BEPL.BO', name: 'Bhansali Engineering Polymers BEPL' },
    { symbol: 'CASTROLIND.BO', name: 'Castrol India' },
    { symbol: 'CEMPRO.BO', name: 'Cem Products Cempro' },
    { symbol: 'CGPOWER.BO', name: 'CG Power Industrial Solutions' },
    { symbol: 'GENNEX.BO', name: 'Gennex Laboratories' },
    { symbol: 'IRCON.BO', name: 'Ircon International' },
    { symbol: 'KWIL.BO', name: 'Kernex Microsystems KWIL' },
    { symbol: 'LLOYDSENGG.BO', name: 'Lloyds Engineering Works' },
    { symbol: 'RAMASTEEL.BO', name: 'Rama Steel Tubes' },
    { symbol: 'SBC.BO', name: 'SBC Exports' },
    { symbol: 'SUZLON.BO', name: 'Suzlon Energy' },
    { symbol: 'TEXRAIL.BO', name: 'Texmaco Rail Engineering' },
    { symbol: 'TITANIN.BO', name: 'Titan Intech' },
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

      // Stock prices - try multiple sources
      if (stockList.length > 0) {
        const fetchPromises = stockList.map(async (symbol) => {
          // Method 1: Yahoo Finance v8 chart API
          const tryYahoo = async (base) => {
            const url = base + '/v8/finance/chart/' + encodeURIComponent(symbol) + '?interval=1d&range=1d&includePrePost=false';
            const r = await fetch(url, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://finance.yahoo.com',
                'Origin': 'https://finance.yahoo.com',
              }
            });
            const data = await r.json();
            const meta = data?.chart?.result?.[0]?.meta;
            if (meta?.regularMarketPrice) {
              prices[symbol] = {
                price: meta.regularMarketPrice,
                change24h: meta.regularMarketChangePercent || 0,
                currency: meta.currency || 'USD',
              };
              return true;
            }
            return false;
          };

          // Method 2: Yahoo Finance crumb-less quote API
          const tryYahooQuote = async () => {
            const url = 'https://query1.finance.yahoo.com/v7/finance/quote?symbols=' + encodeURIComponent(symbol);
            const r = await fetch(url, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                'Accept': 'application/json',
                'Referer': 'https://finance.yahoo.com',
              }
            });
            const data = await r.json();
            const q = data?.quoteResponse?.result?.[0];
            if (q?.regularMarketPrice) {
              prices[symbol] = {
                price: q.regularMarketPrice,
                change24h: q.regularMarketChangePercent || 0,
                currency: q.currency || 'USD',
              };
              return true;
            }
            return false;
          };

          // Try all methods in sequence
          try {
            if (await tryYahoo('https://query1.finance.yahoo.com')) return;
          } catch(e) {}
          try {
            if (await tryYahoo('https://query2.finance.yahoo.com')) return;
          } catch(e) {}
          try {
            if (await tryYahooQuote()) return;
          } catch(e) {}

          console.log('Could not fetch price for:', symbol);
        });
        await Promise.all(fetchPromises);
      }

      return res.json({ prices });
    }

    return res.status(400).json({ error: 'Use action=search or action=prices' });

  } catch (err) {
    console.error('Error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
