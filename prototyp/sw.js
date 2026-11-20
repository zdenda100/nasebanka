// NašeBanka – service worker: aplikace jde nainstalovat a otevře se i při slabém signálu.
// Stránky a skripty: nejdřív síť (ať je vždy nová verze), při výpadku záloha z mezipaměti.
const CACHE = 'nasebanka-v2';
const SHELL = ['prototyp.html', 'prototyp-funkce.js', 'prototyp-funkce2.js', 'ikona.svg', 'manifest.webmanifest', 'ceny/aktiva.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return; // Firebase apod. nechat být
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
