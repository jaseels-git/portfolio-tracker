<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
<meta name="apple-mobile-web-app-title" content="Portfolio"/>
<meta name="theme-color" content="#0D0D1A"/>
<title>Portfolio Tracker</title>
<script>
const manifestData={name:"Portfolio Tracker",short_name:"Portfolio",start_url:".",display:"standalone",background_color:"#0D0D1A",theme_color:"#C9A84C",orientation:"portrait",icons:[{src:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'%3E%3Crect width='192' height='192' rx='40' fill='%230D0D1A'/%3E%3Ctext x='96' y='130' font-size='100' text-anchor='middle'%3E%F0%9F%93%88%3C/text%3E%3C/svg%3E",sizes:"192x192",type:"image/svg+xml"}]};
const blob=new Blob([JSON.stringify(manifestData)],{type:'application/json'});
document.write('<link rel="manifest" href="'+URL.createObjectURL(blob)+'">');
</script>
<link rel="apple-touch-icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'%3E%3Crect width='180' height='180' rx='40' fill='%230D0D1A'/%3E%3Ctext x='90' y='125' font-size='95' text-anchor='middle'%3E%F0%9F%93%88%3C/text%3E%3C/svg%3E"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
:root{--gold:#C9A84C;--gold-light:#E8C96A;--bg:#0D0D1A;--card:rgba(255,255,255,0.03);--border:rgba(255,255,255,0.07);--green:#4CAF7D;--red:#E05555;--text:#fff;--muted:#888;--dim:#555;--safe-top:env(safe-area-inset-top,0px);--safe-bottom:env(safe-area-inset-bottom,0px)}
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;max-width:480px;margin:0 auto;min-height:100dvh;overflow-x:hidden;-webkit-font-smoothing:antialiased}
body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse at 15% 10%,rgba(201,168,76,.09) 0%,transparent 55%),radial-gradient(ellipse at 85% 85%,rgba(76,142,202,.07) 0%,transparent 55%);pointer-events:none;z-index:0}

/* HEADER */
#header{position:relative;z-index:10;background:linear-gradient(160deg,#12122A,#1A1A38);padding:calc(var(–safe-top) + 18px) 20px 18px;border-bottom:1px solid rgba(201,168,76,.18)}
.h-row{display:flex;justify-content:space-between;align-items:flex-start}
.h-label{color:var(–gold);font-size:10px;letter-spacing:3px;text-transform:uppercase;margin-bottom:5px}
.h-value{font-family:‘Playfair Display’,serif;font-size:28px;font-weight:700;letter-spacing:-.5px;line-height:1}
.h-sub{color:var(–muted);font-size:12px;margin-top:4px}
.h-pl{display:inline-block;padding:4px 11px;border-radius:20px;font-size:13px;font-weight:600}
.h-pl.pos{background:rgba(76,175,125,.15);color:var(–green)}.h-pl.neg{background:rgba(224,85,85,.15);color:var(–red)}
.h-pct{font-size:12px;margin-top:4px;text-align:right}
.refresh-bar{display:flex;align-items:center;justify-content:space-between;margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,.05)}
.refresh-info{color:var(–dim);font-size:11px}
.refresh-info span{color:var(–gold)}
.refresh-btn{background:rgba(201,168,76,.15);border:1px solid rgba(201,168,76,.3);color:var(–gold);border-radius:8px;padding:5px 12px;font-size:11px;cursor:pointer;font-family:‘DM Sans’,sans-serif}
.refresh-btn:disabled{opacity:.4;cursor:default}

/* NAV */
#nav{position:sticky;top:0;z-index:20;display:flex;background:#0e0e22;border-bottom:1px solid #1a1a38}
.nav-btn{flex:1;padding:12px 0;background:none;border:none;color:var(–dim);font-size:11px;cursor:pointer;font-family:‘DM Sans’,sans-serif;display:flex;flex-direction:column;align-items:center;gap:3px;border-bottom:2px solid transparent;transition:color .2s,border-color .2s}
.nav-btn.active{color:var(–gold);border-bottom-color:var(–gold)}
.nav-icon{font-size:17px}
#main{position:relative;z-index:1;padding:14px 14px 110px}
.section{background:var(–card);border:1px solid var(–border);border-radius:18px;padding:15px;margin-bottom:14px;animation:fadeUp .3s ease both}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.section-title{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:13px;font-weight:500}
.mkt-tabs{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;margin-bottom:14px}
.mkt-tabs::-webkit-scrollbar{display:none}
.mkt-tab{flex-shrink:0;padding:7px 14px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:var(–dim);font-size:12px;cursor:pointer;font-family:“DM Sans”,sans-serif;font-weight:600;transition:all .2s;white-space:nowrap}
.mkt-tab.active{color:#000;border-color:transparent}
.dash-stock-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.04)}
.dash-stock-row:last-child{border-bottom:none;padding-bottom:0}
.dash-stock-left{display:flex;align-items:center;gap:10px}
.dash-stock-icon{width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0}
.dash-stock-name{color:var(–text);font-size:13px;font-weight:600;line-height:1.2}
.dash-stock-sub{color:var(–dim);font-size:10px;margin-top:2px}
.dash-stock-right{text-align:right}
.dash-stock-val{color:var(–text);font-size:13px;font-weight:600}
.dash-stock-pl{font-size:11px;margin-top:2px}
.mkt-total-row{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:rgba(0,0,0,.2);border-radius:11px;margin-bottom:12px}
.mkt-total-label{color:var(–dim);font-size:10px;letter-spacing:1px;text-transform:uppercase}
.mkt-total-val{font-size:13px;font-weight:700}
#chartWrap{display:flex;align-items:center;gap:14px}
#pieCanvas{width:145px!important;height:145px!important;flex-shrink:0}
.legend-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:9px}
.legend-left{display:flex;align-items:center;gap:8px}
.legend-dot{width:9px;height:9px;border-radius:2px;flex-shrink:0}
.legend-name{color:#ccc;font-size:12px}
.summary-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}
.sum-card{background:rgba(0,0,0,.25);border:1px solid var(–border);border-radius:14px;padding:12px}
.sum-label{color:var(–dim);font-size:9px;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:5px}
.sum-val{font-size:15px;font-weight:700}
.sum-sub{font-size:11px;color:var(–muted);margin-top:3px}
.top-row{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04)}
.top-row:last-child{border-bottom:none;padding-bottom:0}
.mkt-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}

/* HOLDING CARD */
.card{background:rgba(255,255,255,.025);border:1px solid var(–border);border-radius:18px;padding:14px;margin-bottom:12px;animation:fadeUp .25s ease both}
.card-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:11px}
.mkt-badge{font-size:11px;border:1px solid;border-radius:7px;padding:2px 9px;letter-spacing:.8px;font-weight:500}
.live-badge{font-size:10px;background:rgba(76,175,125,.15);color:var(–green);border-radius:6px;padding:2px 7px;margin-left:6px}
.card-actions{display:flex;gap:7px}
.icon-btn{background:rgba(255,255,255,.06);border:none;border-radius:8px;padding:5px 9px;cursor:pointer;font-size:13px}
.card-mid{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px}
.holding-name{font-family:‘Playfair Display’,serif;font-size:15px;font-weight:700}
.holding-sub{color:var(–dim);font-size:11px;margin-top:2px}
.holding-val{font-size:15px;font-weight:600;text-align:right}
.holding-aed{color:var(–dim);font-size:11px;margin-top:2px;text-align:right}
.pl-full{border-radius:12px;padding:11px 13px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,.2)}
.pl-main{font-size:16px;font-weight:700}
.pl-aed{font-size:11px;margin-top:2px}
.pl-pct{font-size:14px;font-weight:700}
.info-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px}
.info-box{background:rgba(0,0,0,.15);border:1px solid rgba(255,255,255,.05);border-radius:11px;padding:9px}
.info-label{color:var(–dim);font-size:9px;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px}
.info-val{font-size:12px;font-weight:600}
.info-sub{font-size:10px;color:var(–muted);margin-top:2px}
.target-wrap{margin-bottom:10px;background:rgba(0,0,0,.15);border:1px solid rgba(255,255,255,.05);border-radius:11px;padding:10px}
.target-bar-bg{height:5px;background:rgba(255,255,255,.08);border-radius:3px;overflow:hidden;margin:7px 0 5px}
.target-bar-fill{height:100%;border-radius:3px;transition:width .5s ease}
.stats-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:10px}
.stat-box{background:rgba(0,0,0,.22);border-radius:10px;padding:8px 6px;text-align:center}
.stat-label{color:var(–dim);font-size:9px;letter-spacing:1px;text-transform:uppercase;margin-bottom:3px}
.stat-val{font-size:11px;font-weight:600}
.price-row{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.update-btn{background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.3);color:var(–gold);border-radius:9px;padding:6px 12px;font-size:11px;cursor:pointer;font-family:‘DM Sans’,sans-serif}
.price-input{flex:1;min-width:80px;background:rgba(255,255,255,.07);border:1px solid #2a2a45;border-radius:9px;padding:7px 10px;color:var(–text);font-size:13px;font-family:‘DM Sans’,sans-serif;outline:none}
.price-confirm{background:var(–green);border:none;border-radius:9px;padding:7px 11px;color:#000;cursor:pointer;font-weight:700}
.price-cancel{background:rgba(255,255,255,.07);border:none;border-radius:9px;padding:7px 11px;color:#aaa;cursor:pointer}
.chg-badge{font-size:10px;padding:2px 7px;border-radius:6px}
.chg-pos{background:rgba(76,175,125,.15);color:var(–green)}
.chg-neg{background:rgba(224,85,85,.15);color:var(–red)}

/* MARKETS TAB */
.mkt-summary{display:flex;justify-content:space-between;align-items:flex-start;background:rgba(0,0,0,.2);border-radius:11px;padding:12px;margin-bottom:13px}
.mkt-val{font-family:‘Playfair Display’,serif;font-size:19px;font-weight:700}
.mkt-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04)}
.mkt-row:last-child{border-bottom:none;padding-bottom:0}

/* FAB */
#fab{position:fixed;bottom:calc(var(–safe-bottom) + 24px);right:18px;z-index:50;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(–gold),var(–gold-light));border:none;color:#000;font-size:28px;cursor:pointer;box-shadow:0 5px 28px rgba(201,168,76,.45);display:flex;align-items:center;justify-content:center;transition:transform .15s}
#fab:active{transform:scale(.92)}

/* MODAL */
#overlay{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:100;display:none;align-items:flex-end;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
#overlay.open{display:flex}
#modal{background:#12122A;border-radius:22px 22px 0 0;padding:22px 18px calc(var(–safe-bottom) + 30px);width:100%;border-top:1px solid rgba(201,168,76,.25);max-height:93dvh;overflow-y:auto;animation:slideUp .28s cubic-bezier(.32,.72,0,1)}
@keyframes slideUp{from{transform:translateY(100%)}to{transform:none}}
.modal-title{color:var(–gold);font-family:‘Playfair Display’,serif;font-size:19px;margin-bottom:18px}

/* MARKET PILLS */
.pills{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:2px}
.pill{padding:6px 12px;border-radius:20px;border:none;font-size:12px;cursor:pointer;font-family:‘DM Sans’,sans-serif;font-weight:600;transition:all .15s;background:rgba(255,255,255,.07);color:#aaa}
.pill.s-dfm{background:#C9A84C;color:#000}.pill.s-adx{background:#4CAF7D;color:#000}
.pill.s-nse{background:#E8834C;color:#000}.pill.s-bse{background:#E84C7A;color:#fff}
.pill.s-international{background:#4C8ECA;color:#000}.pill.s-crypto{background:#B04CCA;color:#fff}
.pill.s-aed,.pill.s-usd,.pill.s-inr{background:var(–gold);color:#000}

/* SEARCH */
.search-wrap{position:relative;margin-bottom:14px}
.search-input{width:100%;background:rgba(255,255,255,.07);border:1px solid #2A2A45;border-radius:12px;padding:12px 14px 12px 38px;color:var(–text);font-size:15px;font-family:‘DM Sans’,sans-serif;outline:none;-webkit-appearance:none}
.search-input:focus{border-color:rgba(201,168,76,.5)}
.search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:16px;pointer-events:none}
.search-loading{position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:13px;color:var(–dim)}
.search-results{background:#1A1A35;border:1px solid rgba(201,168,76,.2);border-radius:12px;overflow:hidden;margin-top:4px}
.search-result{padding:11px 14px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,.05);display:flex;align-items:center;gap:10px;transition:background .15s}
.search-result:last-child{border-bottom:none}
.search-result:active{background:rgba(201,168,76,.1)}
.search-result-name{color:var(–text);font-size:13px;font-weight:500}
.search-result-sym{color:var(–dim);font-size:11px;margin-top:2px}
.search-result-exch{color:var(–gold);font-size:10px;background:rgba(201,168,76,.1);border-radius:5px;padding:1px 6px;white-space:nowrap}
.selected-stock{background:rgba(201,168,76,.08);border:1px solid rgba(201,168,76,.25);border-radius:12px;padding:11px 14px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between}
.selected-name{color:var(–text);font-size:13px;font-weight:600}
.selected-sym{color:var(–gold);font-size:11px;margin-top:2px}
.clear-btn{background:rgba(255,255,255,.07);border:none;border-radius:8px;padding:4px 10px;color:#aaa;cursor:pointer;font-size:12px}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 12px}
.field{margin-bottom:14px}.field.full{grid-column:1/-1}
label{display:block;color:var(–dim);font-size:10px;letter-spacing:1.2px;text-transform:uppercase;margin-bottom:6px}
input[type=text],input[type=number]{width:100%;background:rgba(255,255,255,.06);border:1px solid #2A2A45;border-radius:11px;padding:11px 13px;color:var(–text);font-size:15px;font-family:‘DM Sans’,sans-serif;outline:none;-webkit-appearance:none;appearance:none}
input:focus{border-color:rgba(201,168,76,.5)}
.hint-text{font-size:11px;color:var(–gold);margin-top:5px;min-height:16px}
.modal-btns{display:flex;gap:10px;margin-top:20px}
.btn-cancel{flex:1;padding:14px;background:rgba(255,255,255,.06);border:none;border-radius:13px;color:#aaa;font-size:15px;cursor:pointer;font-family:‘DM Sans’,sans-serif}
.btn-save{flex:2;padding:14px;background:linear-gradient(135deg,var(–gold),var(–gold-light));border:none;border-radius:13px;color:#000;font-size:15px;font-weight:700;cursor:pointer;font-family:‘DM Sans’,sans-serif}
.section-label{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(–dim);margin-bottom:8px;display:block}

#toast{position:fixed;bottom:calc(var(–safe-bottom) + 95px);left:50%;transform:translateX(-50%) translateY(20px);padding:10px 24px;border-radius:22px;font-size:13px;font-weight:600;z-index:200;opacity:0;transition:all .25s;pointer-events:none;white-space:nowrap}
#toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
.empty{text-align:center;padding:26px 0}.empty-icon{font-size:34px}.empty-text{color:var(–dim);font-size:13px;margin-top:8px}
.pos{color:var(–green)}.neg{color:var(–red)}
.spinning{animation:spin .8s linear infinite;display:inline-block}
@keyframes spin{to{transform:rotate(360deg)}}

.mkt-tabs{display:flex;gap:8px;overflow-x:auto;padding-bottom:2px;scrollbar-width:none;margin-bottom:12px}
.mkt-tabs::-webkit-scrollbar{display:none}
.mkt-tab{flex-shrink:0;padding:7px 14px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:var(–dim);font-size:12px;cursor:pointer;font-family:‘DM Sans’,sans-serif;font-weight:600;transition:all .2s;white-space:nowrap}
.mkt-tab.active{color:#000;border-color:transparent}
.dash-stock-row{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer}
.dash-stock-row:last-child{border-bottom:none;padding-bottom:0}
.dash-stock-row:active{opacity:.7}
.dash-stock-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0}
.dash-stock-name{color:var(–text);font-size:13px;font-weight:600;line-height:1.2}
.dash-stock-sub{color:var(–dim);font-size:10px;margin-top:2px}
.mkt-total-row{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;background:rgba(0,0,0,.22);border-radius:11px;margin-bottom:12px}
</style>

</head>
<body>
<div id="header">
  <div class="h-row">
    <div>
      <div class="h-label">My Portfolio</div>
      <div class="h-value" id="hVal">$0.00</div>
      <div class="h-sub" id="hAED">د.إ 0.00</div>
      <div class="h-sub" id="hInv" style="margin-top:2px">Invested: $0.00</div>
    </div>
    <div style="text-align:right">
      <div class="h-pl pos" id="hPL">▲ $0.00</div>
      <div class="h-pct pos" id="hPct">+0.00%</div>
      <div class="h-sub" id="hPLAED" style="margin-top:3px;color:var(--green)">▲ د.إ 0.00</div>
    </div>
  </div>
  <div class="refresh-bar">
    <div class="refresh-info">Prices: <span id="lastRefresh">never</span></div>
    <button class="refresh-btn" id="refreshBtn" onclick="refreshPrices(true)">🔄 Refresh Now</button>
  </div>
</div>

<nav id="nav">
  <button class="nav-btn active" onclick="go('dashboard')" id="btn-dashboard"><span class="nav-icon">📊</span>Dashboard</button>
  <button class="nav-btn" onclick="go('holdings')" id="btn-holdings"><span class="nav-icon">📋</span>Holdings</button>
  <button class="nav-btn" onclick="go('markets')" id="btn-markets"><span class="nav-icon">🗺️</span>Markets</button>
</nav>

<main id="main"></main>
<button id="fab" onclick="openModal()">+</button>

<!-- ADD/EDIT MODAL -->

<div id="overlay" onclick="bgClose(event)">
  <div id="modal">
    <div class="modal-title" id="mTitle">Add Holding</div>

```
<!-- Step 1: Market Filter -->
<span class="section-label">1 · Select Market</span>
<div class="pills" id="mktPills" style="margin-bottom:16px">
  <button class="pill" onclick="selMkt('DFM')">🇦🇪 DFM</button>
  <button class="pill" onclick="selMkt('ADX')">🇦🇪 ADX</button>
  <button class="pill" onclick="selMkt('NSE')">🇮🇳 NSE</button>
  <button class="pill" onclick="selMkt('BSE')">🇮🇳 BSE</button>
  <button class="pill" onclick="selMkt('International')">🌐 Intl</button>
  <button class="pill" onclick="selMkt('Crypto')">₿ Crypto</button>
</div>

<!-- Step 2: Search -->
<span class="section-label">2 · Search Asset</span>
<div class="search-wrap" id="searchWrap">
  <span class="search-icon">🔍</span>
  <input class="search-input" id="searchInput" type="text" placeholder="Type company or coin name..." autocomplete="off" oninput="onSearch(this.value)"/>
  <span class="search-loading" id="searchLoader" style="display:none">⏳</span>
</div>
<div id="searchResults" style="margin-bottom:14px"></div>
<div id="selectedStock" style="display:none"></div>

<!-- Step 3: Details -->
<span class="section-label" id="step3label" style="display:none">3 · Enter Details</span>
<div id="formFields" style="display:none">
  <div class="form-grid">
    <div class="field full">
      <label>Currency</label>
      <div class="pills" id="curPills">
        <button class="pill" onclick="selCur('AED')">AED د.إ</button>
        <button class="pill" onclick="selCur('USD')">USD $</button>
        <button class="pill" onclick="selCur('INR')">INR ₹</button>
      </div>
    </div>
    <div class="field">
      <label>Shares / Units</label>
      <input type="number" id="fShares" placeholder="100" inputmode="decimal" oninput="upHint()"/>
    </div>
    <div class="field">
      <label>Buy Price / share</label>
      <input type="number" id="fBuy" placeholder="0.00" inputmode="decimal" oninput="upHint()"/>
    </div>
    <div class="field full">
      <label>Target Sell Price <span style="color:#444;font-size:9px">(optional)</span></label>
      <input type="number" id="fTarget" placeholder="Leave blank if none" inputmode="decimal"/>
    </div>
    <div class="hint-text full" id="hint"></div>
  </div>
</div>

<div class="modal-btns">
  <button class="btn-cancel" onclick="closeModal()">Cancel</button>
  <button class="btn-save" onclick="saveH()" id="saveBtn">Add Holding</button>
</div>
```

  </div>
</div>

<div id="toast"></div>

<script>
// ── Constants ──
const AED_RATE=3.6725, INR_RATE=83.5;
const MARKETS=['DFM','ADX','NSE','BSE','International','Crypto'];
const COLORS={DFM:'#C9A84C',ADX:'#4CAF7D',NSE:'#E8834C',BSE:'#E84C7A',International:'#4C8ECA',Crypto:'#B04CCA'};
const FLAGS={DFM:'🇦🇪',ADX:'🇦🇪',NSE:'🇮🇳',BSE:'🇮🇳',International:'🌐',Crypto:'₿'};
const SYM={AED:'د.إ',USD:'$',INR:'₹'};
const KEY='portfolio-v6';

// ── State ──
let H=[],tab='dashboard',editId=null;
let fMkt='DFM',fCur='AED',fStock=null;
let pieChart=null,editPrice=null;
let searchTimer=null,lastRefreshTime=null,refreshInterval=null;

// ── API base (auto-detects local vs deployed) ──
const API = window.location.hostname==='localhost'||window.location.hostname==='127.0.0.1'
  ? 'http://localhost:3000/api/prices'
  : '/api/prices';

// ── Storage ──
const load=()=>{try{H=JSON.parse(localStorage.getItem(KEY)||'[]')}catch{H=[]}};
const save=()=>localStorage.setItem(KEY,JSON.stringify(H));

// ── Formatting ──
const n2=(n,loc='en-US')=>Math.abs(n).toLocaleString(loc,{minimumFractionDigits:2,maximumFractionDigits:2});
const fU=n=>'$'+n2(n);
const fA=n=>'د.إ '+n2(n);
const fR=n=>'₹'+n2(n,'en-IN');
const fP=n=>(n>=0?'+':'')+n.toFixed(2)+'%';
const fN=(n,c)=>c==='AED'?fA(n):c==='INR'?fR(n):fU(n);
const toUSD=(a,c)=>c==='AED'?a/AED_RATE:c==='INR'?a/INR_RATE:a;
const fromUSD=(a,c)=>c==='AED'?a*AED_RATE:c==='INR'?a*INR_RATE:a;

// ── Price Key (what to send to API) ──
function priceKey(h){
  if(h.market==='Crypto') return `crypto:${h.symbol}`;
  return h.symbol;
}

// ── Live Price Refresh ──
async function refreshPrices(manual=false){
  if(!H.length) return;
  const btn=document.getElementById('refreshBtn');
  if(btn){btn.disabled=true;btn.textContent='🔄 Refreshing...';}

  const symbols=H.map(h=>priceKey(h)).join(',');
  try{
    const r=await fetch(`${API}?action=prices&symbols=${encodeURIComponent(symbols)}`);
    const data=await r.json();
    if(data.prices){
      H=H.map(h=>{
        const k=priceKey(h);
        if(data.prices[k]){
          const p=data.prices[k];
          // Convert price to holding's native currency
          let price=p.price;
          if(p.currency && p.currency!==h.currency){
            const priceUSD=toUSD(price, p.currency==='USD'?'USD':p.currency==='AED'?'AED':'INR');
            price=fromUSD(priceUSD, h.currency);
          }
          return{...h,currentPrice:Math.round(price*1000)/1000,change24h:p.change24h||0,livePrice:true};
        }
        return h;
      });
      save();
      lastRefreshTime=new Date();
      updateRefreshLabel();
      render();
      if(manual) toast('Prices updated! ✓');
    }
  }catch(e){
    console.error('Price refresh error:',e);
    if(manual) toast('Could not fetch prices — check connection','error');
  }finally{
    if(btn){btn.disabled=false;btn.textContent='🔄 Refresh Now';}
  }
}

function updateRefreshLabel(){
  const el=document.getElementById('lastRefresh');
  if(!el) return;
  if(!lastRefreshTime){el.textContent='never';return;}
  const mins=Math.round((Date.now()-lastRefreshTime)/60000);
  el.textContent=mins===0?'just now':`${mins}m ago`;
}

function startAutoRefresh(){
  if(refreshInterval) clearInterval(refreshInterval);
  refreshInterval=setInterval(()=>{
    refreshPrices();
    updateRefreshLabel();
  },60000);
  setInterval(updateRefreshLabel,30000);
}

// ── Calc ──
function calc(h){
  const inv=h.buyPrice*h.shares, cur=h.currentPrice*h.shares;
  const invU=toUSD(inv,h.currency), curU=toUSD(cur,h.currency);
  const plU=curU-invU, plA=plU*AED_RATE, plP=invU>0?(plU/invU)*100:0;
  let tPct=null,toT=null;
  if(h.targetPrice&&h.targetPrice>h.buyPrice){
    tPct=Math.min(Math.max(((h.currentPrice-h.buyPrice)/(h.targetPrice-h.buyPrice))*100,0),100);
    toT=((h.targetPrice-h.currentPrice)/h.currentPrice)*100;
  }
  return{inv,cur,invU,curU,plU,plA,plP,tPct,toT};
}
function tots(){
  const curU=H.reduce((s,h)=>s+calc(h).curU,0);
  const invU=H.reduce((s,h)=>s+calc(h).invU,0);
  const plU=curU-invU,plP=invU>0?(plU/invU)*100:0;
  return{curU,invU,plU,plP};
}

// ── Header ──
function hdr(){
  const t=tots(),pos=t.plU>=0;
  document.getElementById('hVal').textContent=fU(t.curU);
  document.getElementById('hAED').textContent=fA(t.curU*AED_RATE);
  document.getElementById('hInv').textContent='Invested: '+fU(t.invU);
  const pl=document.getElementById('hPL');
  pl.textContent=(pos?'▲ ':'▼ ')+fU(Math.abs(t.plU));
  pl.className='h-pl '+(pos?'pos':'neg');
  const pc=document.getElementById('hPct');
  pc.textContent=fP(t.plP)+' overall';
  pc.className='h-pct '+(pos?'pos':'neg');
  const pa=document.getElementById('hPLAED');
  pa.textContent=(pos?'▲ ':'▼ ')+fA(Math.abs(t.plU*AED_RATE));
  pa.style.color=pos?'var(--green)':'var(--red)';
}

// ── Tabs ──
function go(t){
  tab=t;
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('btn-'+t).classList.add('active');
  render();
}
function render(){
  hdr();
  const m=document.getElementById('main');
  if(tab==='dashboard') m.innerHTML=dash();
  else if(tab==='holdings') m.innerHTML=holdView();
  else m.innerHTML=mktView();
  if(tab==='dashboard') drawPie();
}

// ── Dashboard ──
let dashTab=null;
function dash(){
  const t=tots();
  const activeMkts=MARKETS.filter(m=>H.some(h=>h.market===m));
  if(!dashTab||!activeMkts.includes(dashTab)) dashTab=activeMkts[0]||null;
  const bm=MARKETS.map(m=>({name:m,v:H.filter(h=>h.market===m).reduce((s,h)=>s+calc(h).curU,0)})).filter(m=>m.v>0);
  const pos=t.plU>=0;
  const sum='<div class="summary-row"><div class="sum-card"><div class="sum-label">Invested</div><div class="sum-val">'+fU(t.invU)+'</div><div class="sum-sub">'+fA(t.invU*AED_RATE)+'</div></div><div class="sum-card"><div class="sum-label">Total P&L</div><div class="sum-val '+(pos?'pos':'neg')+'">'+( pos?'▲':'▼')+' '+fU(Math.abs(t.plU))+'</div><div class="sum-sub '+(pos?'pos':'neg')+'">'+fP(t.plP)+' · '+fA(Math.abs(t.plU*AED_RATE))+'</div></div></div>';
  const leg=bm.map(m=>'<div class="legend-row"><div class="legend-left"><div class="legend-dot" style="background:'+COLORS[m.name]+'"></div><span class="legend-name">'+FLAGS[m.name]+' '+m.name+'</span></div><div><div style="color:var(--text);font-size:12px;font-weight:600">'+(t.curU>0?((m.v/t.curU)*100).toFixed(1)+'%':'0%')+'</div><div style="color:var(--dim);font-size:10px">'+fU(m.v)+'</div></div></div>').join('');
  const tabs=activeMkts.map(m=>{
    const isAct=dashTab===m;
    return '<button class="mkt-tab'+(isAct?' active':'')+'"'+(isAct?' style="background:'+COLORS[m]+';color:#000"':'')+' onclick="setDashTab(''+m+'')">'+(FLAGS[m])+' '+m+'</button>';
  }).join('');
  let stockRows='';
  if(dashTab){
    const mh=H.filter(h=>h.market===dashTab);
    if(mh.length){
      const mV=mh.reduce((s,h)=>s+calc(h).curU,0);
      const mI=mh.reduce((s,h)=>s+calc(h).invU,0);
      const mPL=mV-mI,mPLP=mI>0?(mPL/mI)*100:0,mPos=mPL>=0;
      stockRows='<div class="mkt-total-row"><div><div style="color:var(--dim);font-size:9px;letter-spacing:1px;text-transform:uppercase;margin-bottom:3px">'+FLAGS[dashTab]+' '+dashTab+' Total</div><div style="font-size:14px;font-weight:700;color:var(--gold)">'+fU(mV)+'</div><div style="color:var(--dim);font-size:10px;margin-top:1px">'+fA(mV*AED_RATE)+'</div></div><div style="text-align:right"><div style="font-size:14px;font-weight:700" class="'+(mPos?'pos':'neg')+'">'+( mPos?'▲':'▼')+' '+fU(Math.abs(mPL))+'</div><div style="font-size:11px" class="'+(mPos?'pos':'neg')+'">'+fP(mPLP)+'</div></div></div>';
      stockRows+=mh.map(h=>{
        const{curU,plP,plU}=calc(h);
        const chg=h.change24h,sym=SYM[h.currency],pos2=plP>=0;
        const init=(h.ticker||h.name).slice(0,2).toUpperCase();
        const chgHtml=chg!==undefined?' · <span class="'+(chg>=0?'pos':'neg')+'">'+(chg>=0?'▲':'▼')+Math.abs(chg).toFixed(1)+'%</span>':'';
        return '<div class="dash-stock-row" onclick="go('holdings')"><div style="display:flex;align-items:center;gap:10px"><div class="dash-stock-icon" style="background:'+COLORS[h.market]+'22;color:'+COLORS[h.market]+'">'+init+'</div><div><div class="dash-stock-name">'+h.name+(h.livePrice?' <span style="color:var(--green);font-size:9px">●</span>':'')+'</div><div class="dash-stock-sub">'+h.symbol+' · '+h.shares+' units · '+sym+h.currentPrice+chgHtml+'</div></div></div><div style="text-align:right"><div style="color:var(--text);font-size:13px;font-weight:600">'+fU(curU)+'</div><div style="font-size:11px;margin-top:2px" class="'+(pos2?'pos':'neg')+'">'+(pos2?'▲':'▼')+' '+fU(Math.abs(plU))+' · '+fP(plP)+'</div><div style="color:var(--dim);font-size:10px;margin-top:1px">'+fA(curU*AED_RATE)+'</div></div></div>';
      }).join('');
    } else {
      stockRows='<div class="empty"><div class="empty-icon">📭</div><div class="empty-text">No '+dashTab+' holdings yet. Tap + to add.</div></div>';
    }
  } else {
    stockRows=emp('Tap + to add your first holding');
  }
  return sum+'<div class="section"><div class="section-title" style="color:var(--gold)">Allocation by Market</div>'+(bm.length===0?emp('Add your first holding'):'<div id="chartWrap"><canvas id="pieCanvas" width="145" height="145"></canvas><div id="legend">'+leg+'</div></div>')+'</div><div class="section"><div class="mkt-tabs">'+tabs+'</div>'+stockRows+'</div>';
}
function setDashTab(m){dashTab=m;render();}

// ── Holdings View ──
function holdView(){
  if(!H.length)return`<div class="section"><div class="section-title" style="color:var(--gold)">Holdings</div>${emp('Tap "+" to add your first holding')}</div>`;
  return H.map(h=>{
    const{cur,inv,curU,invU,plU,plA,plP,tPct,toT}=calc(h);
    const pos=plP>=0,sym=SYM[h.currency],ep=editPrice===h.id;
    const chg=h.change24h;
    const barColor=tPct>=100?'var(--green)':tPct>=60?'var(--gold)':'#4C8ECA';
    const tSec=h.targetPrice?`<div class="target-wrap">
      <div style="display:flex;justify-content:space-between">
        <span style="color:var(--dim);font-size:9px;letter-spacing:1px;text-transform:uppercase">Target Progress</span>
        <span style="font-size:11px;color:${barColor}">${toT!==null?(toT>=0?`+${toT.toFixed(1)}% to target`:'🎯 Target reached!'):'—'}</span>
      </div>
      <div class="target-bar-bg"><div class="target-bar-fill" style="width:${tPct||0}%;background:${barColor}"></div></div>
      <div style="display:flex;justify-content:space-between">
        <span style="color:var(--dim);font-size:10px">Buy: ${sym}${h.buyPrice}</span>
        <span style="color:var(--dim);font-size:10px">Now: ${sym}${h.currentPrice}</span>
        <span style="color:${barColor};font-size:10px">Target: ${sym}${h.targetPrice}</span>
      </div>
    </div>`:'';
    return`<div class="card">
      <div class="card-top">
        <div style="display:flex;align-items:center">
          <div class="mkt-badge" style="border-color:${COLORS[h.market]};color:${COLORS[h.market]}">${FLAGS[h.market]} ${h.market}</div>
          ${h.livePrice?'<span class="live-badge">● LIVE</span>':''}
        </div>
        <div class="card-actions"><button class="icon-btn" onclick="editH('${h.id}')">✏️</button><button class="icon-btn" onclick="delH('${h.id}')">🗑️</button></div>
      </div>
      <div class="card-mid">
        <div><div class="holding-name">${h.name}</div><div class="holding-sub">${h.ticker||h.symbol} · ${h.shares} ${h.market==='Crypto'?'units':'shares'}</div></div>
        <div>
          <div class="holding-val">${fU(curU)}</div>
          <div class="holding-aed">${fA(curU*AED_RATE)}</div>
          ${chg!==undefined?`<div class="${chg>=0?'chg-badge chg-pos':'chg-badge chg-neg'}" style="margin-top:4px;display:inline-block">${chg>=0?'▲':'▼'}${Math.abs(chg).toFixed(2)}% today</div>`:''}
        </div>
      </div>
      <div class="pl-full" style="border-left:3px solid ${pos?'var(--green)':'var(--red)'}">
        <div>
          <div style="color:var(--dim);font-size:9px;letter-spacing:1px;text-transform:uppercase;margin-bottom:3px">Profit / Loss</div>
          <div class="pl-main ${pos?'pos':'neg'}">${pos?'▲':'▼'} ${fU(Math.abs(plU))}</div>
          <div class="pl-aed ${pos?'pos':'neg'}">${pos?'▲':'▼'} ${fA(Math.abs(plA))}</div>
        </div>
        <div style="text-align:right"><div class="pl-pct ${pos?'pos':'neg'}">${fP(plP)}</div><div style="color:var(--dim);font-size:10px;margin-top:2px">return</div></div>
      </div>
      <div class="info-row">
        <div class="info-box"><div class="info-label">Total Invested</div><div class="info-val">${fN(inv,h.currency)}</div><div class="info-sub">${fU(invU)} · ${sym}${h.buyPrice}/unit</div></div>
        <div class="info-box"><div class="info-label">Current Value</div><div class="info-val">${fN(cur,h.currency)}</div><div class="info-sub">${fU(curU)} · ${sym}${h.currentPrice}/unit</div></div>
      </div>
      ${tSec}
      <div class="stats-grid">
        <div class="stat-box"><div class="stat-label">Units</div><div class="stat-val">${h.shares}</div></div>
        <div class="stat-box"><div class="stat-label">Buy Price</div><div class="stat-val">${sym}${h.buyPrice}</div></div>
        <div class="stat-box"><div class="stat-label">Target</div><div class="stat-val" style="color:${h.targetPrice?'var(--gold)':'var(--dim)'}">${h.targetPrice?sym+h.targetPrice:'—'}</div></div>
      </div>
      <div class="price-row" id="pr-${h.id}">
        ${ep
          ?`<input class="price-input" id="pi-${h.id}" type="number" value="${h.currentPrice}" inputmode="decimal"/><button class="price-confirm" onclick="confP('${h.id}')">✓</button><button class="price-cancel" onclick="cancelP()">✕</button>`
          :`<button class="update-btn" onclick="startP('${h.id}')">✏️ Override Price (${sym}${h.currentPrice})</button>${h.livePrice?'':'<span style="color:var(--dim);font-size:10px">No live price — update manually</span>'}`
        }
      </div>
    </div>`;
  }).join('');
}

// ── Markets View ──
function mktView(){
  const t=tots();let html='';
  MARKETS.forEach(mkt=>{
    const mh=H.filter(h=>h.market===mkt);if(!mh.length)return;
    const mV=mh.reduce((s,h)=>s+calc(h).curU,0),mI=mh.reduce((s,h)=>s+calc(h).invU,0);
    const mPL=mV-mI,mPLP=mI>0?(mPL/mI)*100:0,mPct=t.curU>0?(mV/t.curU)*100:0,pos=mPL>=0;
    html+=`<div class="section">
      <div class="section-title" style="color:${COLORS[mkt]}">${FLAGS[mkt]} ${mkt}</div>
      <div class="mkt-summary">
        <div><div class="mkt-val">${fU(mV)}</div><div style="color:var(--dim);font-size:12px;margin-top:3px">${fA(mV*AED_RATE)}</div><div style="color:var(--dim);font-size:11px;margin-top:2px">Invested: ${fU(mI)}</div></div>
        <div style="text-align:right">
          <div style="color:${pos?'var(--green)':'var(--red)'};font-size:15px;font-weight:700">${pos?'▲':'▼'} ${fU(Math.abs(mPL))}</div>
          <div style="color:${pos?'var(--green)':'var(--red)'};font-size:12px;margin-top:2px">${fP(mPLP)}</div>
          <div style="color:var(--dim);font-size:11px;margin-top:2px">${mPct.toFixed(1)}% of portfolio</div>
        </div>
      </div>
      ${mh.map(h=>{const{curU,plP}=calc(h);const sym=SYM[h.currency];return`<div class="mkt-row">
        <div><div style="color:var(--text);font-size:13px;font-weight:500">${h.name}${h.livePrice?' <span style="color:var(--green);font-size:10px">●</span>':''}</div>
        <div style="color:var(--dim);font-size:10px;margin-top:2px">${h.symbol} · ${h.shares} units · Buy: ${sym}${h.buyPrice}${h.targetPrice?' · 🎯'+sym+h.targetPrice:''}</div></div>
        <div style="text-align:right"><div style="color:#ddd;font-size:13px">${fU(curU)}</div><div class="${plP>=0?'pos':'neg'}" style="font-size:11px">${fP(plP)}</div></div>
      </div>`;}).join('')}
    </div>`;
  });
  if(!html)html=`<div class="section"><div class="section-title" style="color:var(--gold)">Markets</div>${emp('No holdings yet')}</div>`;
  return html;
}
function emp(msg){return`<div class="empty"><div class="empty-icon">📭</div><div class="empty-text">${msg}</div></div>`;}

// ── Search ──
let searchDebounce=null;
function onSearch(val){
  document.getElementById('searchResults').innerHTML='';
  clearTimeout(searchDebounce);
  if(val.length<2)return;
  document.getElementById('searchLoader').style.display='block';
  searchDebounce=setTimeout(()=>doSearch(val),400);
}
async function doSearch(q){
  try{
    const r=await fetch(`${API}?action=search&query=${encodeURIComponent(q)}&market=${encodeURIComponent(fMkt)}`);
    const data=await r.json();
    document.getElementById('searchLoader').style.display='none';
    showResults(data.results||[]);
  }catch(e){
    document.getElementById('searchLoader').style.display='none';
    document.getElementById('searchResults').innerHTML=`<div style="color:var(--dim);font-size:12px;padding:10px">Search unavailable — enter ticker manually</div>`;
  }
}
function showResults(results){
  if(!results.length){
    document.getElementById('searchResults').innerHTML=`<div style="color:var(--dim);font-size:12px;padding:10px">No results found. Try a different name.</div>`;
    return;
  }
  const html=`<div class="search-results">${results.map(r=>`
    <div class="search-result" onclick="selectStock(${JSON.stringify(r).replace(/"/g,'&quot;')})">
      ${r.thumb?`<img src="${r.thumb}" style="width:24px;height:24px;border-radius:50%">`:'<div style="width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:12px">'+(r.type==='crypto'?'₿':'📈')+'</div>'}
      <div style="flex:1;min-width:0">
        <div class="search-result-name">${r.name}</div>
        <div class="search-result-sym">${r.symbol}</div>
      </div>
      <div class="search-result-exch">${r.exchange||fMkt}</div>
    </div>`).join('')}</div>`;
  document.getElementById('searchResults').innerHTML=html;
}
function selectStock(stock){
  fStock=stock;
  document.getElementById('searchResults').innerHTML='';
  document.getElementById('searchInput').value='';
  document.getElementById('selectedStock').style.display='block';
  document.getElementById('selectedStock').innerHTML=`
    <div class="selected-stock">
      <div>
        <div class="selected-name">${stock.name}</div>
        <div class="selected-sym">${stock.symbol} · ${stock.exchange||fMkt}</div>
      </div>
      <button class="clear-btn" onclick="clearStock()">Change</button>
    </div>`;
  document.getElementById('step3label').style.display='block';
  document.getElementById('formFields').style.display='block';
  // Auto-set currency based on market
  const autoCur={DFM:'AED',ADX:'AED',NSE:'INR',BSE:'INR',International:'USD',Crypto:'USD'}[fMkt]||'USD';
  selCur(autoCur);
}
function clearStock(){
  fStock=null;
  document.getElementById('selectedStock').style.display='none';
  document.getElementById('selectedStock').innerHTML='';
  document.getElementById('step3label').style.display='none';
  document.getElementById('formFields').style.display='none';
}

// ── Modal ──
function openModal(id=null){
  editId=id;
  document.getElementById('mTitle').textContent=id?'Edit Holding':'Add Holding';
  document.getElementById('saveBtn').textContent=id?'Update':'Add Holding';
  if(id){
    const h=H.find(x=>x.id===id);
    fStock={symbol:h.symbol,name:h.name,exchange:h.market,type:h.market==='Crypto'?'crypto':'stock'};
    selMkt(h.market);
    document.getElementById('selectedStock').style.display='block';
    document.getElementById('selectedStock').innerHTML=`<div class="selected-stock"><div><div class="selected-name">${h.name}</div><div class="selected-sym">${h.symbol} · ${h.market}</div></div><button class="clear-btn" onclick="clearStock()">Change</button></div>`;
    document.getElementById('step3label').style.display='block';
    document.getElementById('formFields').style.display='block';
    document.getElementById('fShares').value=h.shares;
    document.getElementById('fBuy').value=h.buyPrice;
    document.getElementById('fTarget').value=h.targetPrice||'';
    selCur(h.currency);
  } else {
    fStock=null;
    clearStock();
    document.getElementById('searchInput').value='';
    document.getElementById('searchResults').innerHTML='';
    ['fShares','fBuy','fTarget'].forEach(i=>document.getElementById(i).value='');
    selMkt('DFM');selCur('AED');
  }
  upHint();
  document.getElementById('overlay').classList.add('open');
}
function closeModal(){document.getElementById('overlay').classList.remove('open');}
function bgClose(e){if(e.target===document.getElementById('overlay'))closeModal();}

function selMkt(m){
  fMkt=m;
  document.querySelectorAll('#mktPills .pill').forEach(p=>{
    p.className='pill';
    if(m==='International'&&p.textContent.includes('Intl'))p.classList.add('s-international');
    else if(p.textContent.includes(m))p.classList.add('s-'+m.toLowerCase());
  });
  // Clear search when market changes
  document.getElementById('searchInput').value='';
  document.getElementById('searchResults').innerHTML='';
  // Update placeholder
  const placeholders={DFM:'Search UAE stocks (e.g. Emaar)',ADX:'Search ADX stocks (e.g. FAB)',NSE:'Search NSE stocks (e.g. Reliance)',BSE:'Search BSE stocks (e.g. TCS)',International:'Search global stocks (e.g. Apple)',Crypto:'Search crypto (e.g. Bitcoin)'};
  document.getElementById('searchInput').placeholder=placeholders[m]||'Type company or coin name...';
}
function selCur(c){
  fCur=c;
  document.querySelectorAll('#curPills .pill').forEach(p=>{p.className='pill';if(p.textContent.includes(c))p.classList.add('s-'+c.toLowerCase());});
  upHint();
}
function upHint(){
  const sh=parseFloat(document.getElementById('fShares')?.value)||0;
  const bp=parseFloat(document.getElementById('fBuy')?.value)||0;
  const h=document.getElementById('hint');
  if(!h)return;
  if(sh&&bp){const t=sh*bp;h.textContent=`Total invested: ${SYM[fCur]||'$'}${t.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`;}
  else h.textContent='';
}
async function saveH(){
  if(!fStock){toast('Please search and select an asset first','error');return;}
  const shares=parseFloat(document.getElementById('fShares').value);
  const buyPrice=parseFloat(document.getElementById('fBuy').value);
  const targetPrice=parseFloat(document.getElementById('fTarget').value)||null;
  if(!shares||!buyPrice){toast('Please fill shares and buy price','error');return;}
  const entry={
    id:editId||Math.random().toString(36).slice(2,9),
    name:fStock.name,
    ticker:fStock.symbol,
    symbol:fStock.symbol,
    market:fMkt,
    shares,buyPrice,
    currentPrice:buyPrice, // will be overwritten on first refresh
    targetPrice,
    currency:fCur,
    livePrice:false,
    change24h:undefined,
  };
  if(editId) H=H.map(h=>h.id===editId?{...h,...entry,id:editId}:h);
  else H.push(entry);
  save();closeModal();render();
  toast(editId?'Updated!':'Added! Fetching live price...');
  // Immediately fetch price for new holding
  setTimeout(()=>refreshPrices(),500);
}
function editH(id){openModal(id);}
function delH(id){if(!confirm('Remove this holding?'))return;H=H.filter(h=>h.id!==id);save();render();toast('Removed');}
function startP(id){editPrice=id;render();const i=document.getElementById('pi-'+id);if(i){i.focus();i.select();}}
function cancelP(){editPrice=null;render();}
function confP(id){const v=parseFloat(document.getElementById('pi-'+id)?.value);if(!isNaN(v)&&v>0){H=H.map(h=>h.id===id?{...h,currentPrice:v,livePrice:false}:h);save();}editPrice=null;render();toast('Price updated!');}
function toast(msg,type='success'){const e=document.getElementById('toast');e.textContent=msg;e.style.background=type==='error'?'var(--red)':'var(--green)';e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2500);}

// ── iOS hint ──
if(/iphone|ipad|ipod/i.test(navigator.userAgent)&&!navigator.standalone&&!localStorage.getItem('ios-h')){
  setTimeout(()=>{toast('Tap Share → Add to Home Screen!');localStorage.setItem('ios-h','1');},3000);
}

// ── Init ──
load();render();
refreshPrices();
startAutoRefresh();
</script>

</body>
</html>
