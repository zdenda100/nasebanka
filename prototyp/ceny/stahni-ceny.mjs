// Stáhne skutečný pohyb cen a uloží ho do ceny.json.
// Banka NEPOUŽÍVÁ skutečné ceny v dolarech – jen poměr "o kolik se akcie pohnula".
// Cena v Sh = base (z aktiva.json) × (aktuální skutečná cena / referenční skutečná cena).
// Referenční cena se uloží při prvním stažení a pak se už nemění, aby ceny v bance neskákaly.
//
// Spuštění:  node ceny/stahni-ceny.mjs
// (na GitHubu ho spouští .github/workflows/ceny.yml)

import { readFile, writeFile } from 'node:fs/promises';

const DIR = new URL('.', import.meta.url);
const OUT = new URL('ceny.json', DIR);
const assets = JSON.parse(await readFile(new URL('aktiva.json', DIR), 'utf8'));

let old = { assets: {} };
try { old = JSON.parse(await readFile(OUT, 'utf8')); } catch {}

async function chart(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=3mo&interval=1d`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (nasebanka-ceny)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const r = (await res.json()).chart?.result?.[0];
  if (!r) throw new Error('bez dat');
  const closes = (r.indicators?.quote?.[0]?.close || []).map((v, i) => [r.timestamp[i], v]).filter(([, v]) => Number.isFinite(v));
  const last = r.meta.regularMarketPrice ?? closes.at(-1)?.[1];
  if (!Number.isFinite(last) || closes.length < 5) throw new Error('málo dat');
  const sameDay = new Date(closes.at(-1)[0] * 1000).toISOString().slice(0, 10) === new Date(r.meta.regularMarketTime * 1000).toISOString().slice(0, 10);
  const prev = sameDay ? closes.at(-2)[1] : closes.at(-1)[1]; // včerejší závěrečná cena
  return { last, prev, series: closes.slice(-45).map(([t, v]) => [t, +v.toFixed(4)]), time: r.meta.regularMarketTime };
}

const out = { updated: new Date().toISOString(), assets: {} };
let ok = 0;
for (const a of assets) {
  try {
    const d = await chart(a.id);
    const prevRef = old.assets?.[a.id]?.ref;
    // referenční cena: zachová se z minula, jinak cena před 30 obchodními dny
    const ref = Number.isFinite(prevRef) ? prevRef : d.series.at(-30)?.[1] ?? d.series[0][1];
    out.assets[a.id] = { ref, last: d.last, prev: d.prev, time: d.time, series: d.series };
    ok++;
  } catch (e) {
    console.warn(`! ${a.id}: ${e.message}`);
    if (old.assets?.[a.id]) out.assets[a.id] = old.assets[a.id]; // nech poslední známá data
  }
  await new Promise(r => setTimeout(r, 250)); // ať Yahoo nezahltíme
}
await writeFile(OUT, JSON.stringify(out));
console.log(`Hotovo: ${ok}/${assets.length} aktiv, uloženo do ceny.json`);
